/**
 * MNIST inference helpers built on onnxruntime-web.
 *
 * The ONNX runtime (and its wasm binary) is only pulled in via dynamic import,
 * so nothing here lands in the main bundle until the Digit Recognizer tab is
 * actually opened. The session is a lazy singleton shared across predictions.
 *
 * Model: /public/models/mnist-12.onnx (MNIST-12) — input float32 [1,1,28,28]
 * normalized 0–1, white digit on black background; output [1,10] logits.
 * Input/output names are introspected from the session rather than hardcoded.
 */

type Ort = typeof import('onnxruntime-web');
type OrtSession = import('onnxruntime-web').InferenceSession;

export interface DigitPrediction {
  digit: number;
  probability: number;
}

const MODEL_URL = '/models/mnist-12.onnx';

let sessionPromise: Promise<{ ort: Ort; session: OrtSession }> | null = null;

/** Lazily create (and cache) the ORT wasm session. Safe to call repeatedly. */
export function getMnistSession(): Promise<{ ort: Ort; session: OrtSession }> {
  if (!sessionPromise) {
    sessionPromise = (async () => {
      const ort = await import('onnxruntime-web');
      // Self-hosted wasm assets (see /public/ort/) — no CDN request.
      ort.env.wasm.wasmPaths = '/ort/';
      // Single-threaded: the page is not cross-origin isolated, so threads
      // would silently clamp to 1 anyway; being explicit avoids worker spawn.
      ort.env.wasm.numThreads = 1;
      const session = await ort.InferenceSession.create(MODEL_URL, {
        executionProviders: ['wasm'],
      });
      return { ort, session };
    })();
    // Allow retry after a failed load (offline, blocked wasm, etc.).
    sessionPromise.catch(() => {
      sessionPromise = null;
    });
  }
  return sessionPromise;
}

/** Drop the cached session so the next getMnistSession() starts fresh. */
export function resetMnistSession(): void {
  sessionPromise = null;
}

/** Numerically stable softmax. */
export function softmax(logits: ArrayLike<number>): number[] {
  const values = Array.from(logits);
  const max = Math.max(...values);
  const exps = values.map((v) => Math.exp(v - max));
  const sum = exps.reduce((acc, v) => acc + v, 0);
  return exps.map((v) => v / sum);
}

const INK_THRESHOLD = 40; // luminance (0–255) above which a pixel counts as ink

/**
 * MNIST-style preprocessing: find the ink bounding box on the source canvas
 * (white stroke on black), scale its longest side to 20px, center it in a
 * 28×28 frame, and return a Float32Array [1*1*28*28] normalized to 0–1.
 * Returns null when the canvas is blank.
 */
export function preprocess(canvas: HTMLCanvasElement): Float32Array | null {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  const { width, height } = canvas;
  const { data } = ctx.getImageData(0, 0, width, height);

  // Bounding box of drawn ink.
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      if (lum > INK_THRESHOLD) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null; // blank canvas

  const boxW = maxX - minX + 1;
  const boxH = maxY - minY + 1;

  // Scale longest side to 20px (MNIST digits live in a 20×20 box), keep aspect.
  const scale = 20 / Math.max(boxW, boxH);
  const drawW = Math.max(1, Math.round(boxW * scale));
  const drawH = Math.max(1, Math.round(boxH * scale));

  const off = document.createElement('canvas');
  off.width = 28;
  off.height = 28;
  const offCtx = off.getContext('2d', { willReadFrequently: true });
  if (!offCtx) return null;
  offCtx.fillStyle = '#000';
  offCtx.fillRect(0, 0, 28, 28);
  offCtx.imageSmoothingEnabled = true;
  offCtx.imageSmoothingQuality = 'high';

  // Center the bounding box in the 28×28 frame.
  const dx = Math.floor((28 - drawW) / 2);
  const dy = Math.floor((28 - drawH) / 2);
  offCtx.drawImage(canvas, minX, minY, boxW, boxH, dx, dy, drawW, drawH);

  const small = offCtx.getImageData(0, 0, 28, 28).data;
  const input = new Float32Array(28 * 28);
  for (let p = 0; p < 28 * 28; p++) {
    const i = p * 4;
    const lum = 0.299 * small[i] + 0.587 * small[i + 1] + 0.114 * small[i + 2];
    input[p] = lum / 255;
  }
  return input;
}

/**
 * Run the CNN on the current canvas drawing.
 * Returns per-digit probabilities sorted descending, or null for a blank canvas.
 */
export async function predict(
  canvas: HTMLCanvasElement
): Promise<DigitPrediction[] | null> {
  const input = preprocess(canvas);
  if (!input) return null;

  const { ort, session } = await getMnistSession();
  const tensor = new ort.Tensor('float32', input, [1, 1, 28, 28]);
  const results = await session.run({ [session.inputNames[0]]: tensor });
  const logits = results[session.outputNames[0]].data as Float32Array;

  return softmax(logits)
    .map((probability, digit) => ({ digit, probability }))
    .sort((a, b) => b.probability - a.probability);
}
