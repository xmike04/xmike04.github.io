'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Eraser, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  getMnistSession,
  predict,
  resetMnistSession,
  type DigitPrediction,
} from '@/lib/mnist';

const CANVAS_SIZE = 280;
const STROKE_WIDTH = 20;
const AUTO_PREDICT_DELAY = 400;

type ModelStatus = 'loading' | 'ready' | 'error';

export default function MnistRecognizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const autoPredictTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<ModelStatus>('loading');
  const [predicting, setPredicting] = useState(false);
  const [hasInk, setHasInk] = useState(false);
  const [predictions, setPredictions] = useState<DigitPrediction[] | null>(null);

  const loadModel = useCallback(() => {
    setStatus('loading');
    getMnistSession()
      .then(() => setStatus('ready'))
      .catch(() => setStatus('error'));
  }, []);

  useEffect(() => {
    loadModel();
    return () => {
      if (autoPredictTimer.current) clearTimeout(autoPredictTimer.current);
    };
  }, [loadModel]);

  const fillBackground = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }, []);

  // Prime the black background once the canvas mounts.
  useEffect(() => {
    fillBackground();
  }, [fillBackground]);

  const runPredict = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setPredicting(true);
    try {
      setPredictions(await predict(canvas));
    } catch {
      setStatus('error');
    } finally {
      setPredicting(false);
    }
  }, []);

  const scheduleAutoPredict = useCallback(() => {
    if (autoPredictTimer.current) clearTimeout(autoPredictTimer.current);
    autoPredictTimer.current = setTimeout(() => {
      void runPredict();
    }, AUTO_PREDICT_DELAY);
  }, [runPredict]);

  const canvasPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const point = canvasPoint(e);
    isDrawingRef.current = true;
    lastPointRef.current = point;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(point.x, point.y, STROKE_WIDTH / 2, 0, Math.PI * 2);
    ctx.fill();
    setHasInk(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    const last = lastPointRef.current;
    if (!ctx || !last) return;
    const point = canvasPoint(e);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = STROKE_WIDTH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    if (status === 'ready') scheduleAutoPredict();
  };

  const handleClear = () => {
    if (autoPredictTimer.current) clearTimeout(autoPredictTimer.current);
    fillBackground();
    setPredictions(null);
    setHasInk(false);
  };

  const handleRetry = () => {
    resetMnistSession();
    loadModel();
  };

  const byDigit = predictions
    ? [...predictions].sort((a, b) => a.digit - b.digit)
    : null;
  const top = predictions?.[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
        {/* Drawing surface */}
        <div className="flex flex-col items-center gap-3">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            role="img"
            aria-label="Drawing canvas — draw a digit from 0 to 9"
            className="h-[280px] w-[280px] max-w-full cursor-crosshair touch-none rounded-xl border border-border/70 bg-black shadow-inner"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!hasInk && !predictions}
            >
              <Eraser className="mr-1.5" />
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => void runPredict()}
              disabled={status !== 'ready' || predicting || !hasInk}
            >
              {predicting ? (
                <Loader2 className="mr-1.5 animate-spin" />
              ) : (
                <Sparkles className="mr-1.5" />
              )}
              Predict
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="w-full max-w-sm space-y-3">
          {status === 'loading' ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Loading the CNN (26 KB) into your browser…
            </p>
          ) : status === 'error' ? (
            <div className="space-y-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
              <p className="text-foreground">
                Couldn&apos;t load the model — a network hiccup or blocked
                WebAssembly can cause this.
              </p>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                <RefreshCw className="mr-1.5" />
                Retry
              </Button>
            </div>
          ) : (
            <>
              <p
                className="font-headline text-lg"
                aria-live="polite"
                aria-atomic="true"
              >
                {top ? (
                  <>
                    Prediction:{' '}
                    <span className="font-mono text-2xl font-bold text-primary">
                      {top.digit}
                    </span>{' '}
                    <span className="text-sm text-muted-foreground">
                      ({(top.probability * 100).toFixed(1)}% confident)
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-normal text-muted-foreground">
                    Draw a digit (0–9) to run inference.
                  </span>
                )}
              </p>
              <div className="space-y-1.5" aria-hidden={!byDigit}>
                {Array.from({ length: 10 }, (_, digit) => {
                  const p =
                    byDigit?.find((entry) => entry.digit === digit)
                      ?.probability ?? 0;
                  const isTop = top?.digit === digit && byDigit !== null;
                  return (
                    <div key={digit} className="flex items-center gap-2">
                      <span className="w-4 text-right font-mono text-xs text-muted-foreground">
                        {digit}
                      </span>
                      <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-muted/60">
                        <div
                          className={cn(
                            'h-full rounded-full motion-safe:transition-[width] motion-safe:duration-500',
                            isTop ? 'bg-primary' : 'bg-primary/30'
                          )}
                          style={{ width: `${Math.max(p * 100, p > 0 ? 1 : 0)}%` }}
                        />
                      </div>
                      <span className="w-12 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                        {(p * 100).toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        26 KB CNN running locally via onnxruntime-web — your drawing never
        leaves the browser.
      </p>
    </div>
  );
}
