'use client';

import { useMemo, useRef, useState } from 'react';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

/**
 * A real multilayer perceptron forward pass computed in TypeScript on every
 * slider move: z = Wx + b, ReLU on hidden layers, softmax on the output.
 * The architecture is fixed at 3-4-4-2 and weights come from a seeded PRNG,
 * so the math is genuine even though the scale is a toy.
 */

const LAYER_SIZES = [3, 4, 4, 2] as const;
const LAYER_LABELS = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
const OUTPUT_LABELS = ['Class A', 'Class B'];

const SVG_W = 560;
const SVG_H = 250;
const NODE_R = 14;

// Deterministic PRNG so "random" weights are reproducible.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Net {
  /** weights[l][j][i] — connection from node i in layer l to node j in layer l+1 */
  weights: number[][][];
  biases: number[][];
}

function initNet(seed: number): Net {
  const rand = mulberry32(seed);
  const weights: number[][][] = [];
  const biases: number[][] = [];
  for (let l = 0; l < LAYER_SIZES.length - 1; l++) {
    const fanIn = LAYER_SIZES[l];
    const scale = Math.sqrt(2 / fanIn); // He-style init
    weights.push(
      Array.from({ length: LAYER_SIZES[l + 1] }, () =>
        Array.from({ length: fanIn }, () => (rand() * 2 - 1) * scale)
      )
    );
    biases.push(
      Array.from({ length: LAYER_SIZES[l + 1] }, () => (rand() * 2 - 1) * 0.3)
    );
  }
  return { weights, biases };
}

function relu(x: number) {
  return Math.max(0, x);
}

function softmax(logits: number[]): number[] {
  const max = Math.max(...logits);
  const exps = logits.map((v) => Math.exp(v - max));
  const sum = exps.reduce((acc, v) => acc + v, 0);
  return exps.map((v) => v / sum);
}

/** Full forward pass. Returns post-activation values for every layer. */
function forward(net: Net, inputs: number[]): number[][] {
  const activations: number[][] = [inputs];
  let current = inputs;
  for (let l = 0; l < net.weights.length; l++) {
    const z = net.weights[l].map((row, j) =>
      row.reduce((acc, w, i) => acc + w * current[i], net.biases[l][j])
    );
    current = l === net.weights.length - 1 ? softmax(z) : z.map(relu);
    activations.push(current);
  }
  return activations;
}

function nodePos(layer: number, index: number) {
  return {
    x: (SVG_W / (LAYER_SIZES.length + 1)) * (layer + 1),
    y: (SVG_H / (LAYER_SIZES[layer] + 1)) * (index + 1),
  };
}

// First-layer weights the user can drag directly.
const EDITABLE_WEIGHTS = [
  { layer: 0, to: 0, from: 0, label: 'weight x₁ → h₁' },
  { layer: 0, to: 1, from: 1, label: 'weight x₂ → h₂' },
];

const INPUT_LABELS = ['x₁', 'x₂', 'x₃'];

export default function NeuralNetPlayground() {
  const seedRef = useRef(7);
  const [net, setNet] = useState<Net>(() => initNet(seedRef.current));
  const [inputs, setInputs] = useState<number[]>([0.8, -0.3, 0.5]);

  const activations = useMemo(() => forward(net, inputs), [net, inputs]);
  const probs = activations[activations.length - 1];

  const randomize = () => {
    seedRef.current += 1;
    setNet(initNet(seedRef.current));
  };

  const setInput = (index: number, value: number) => {
    setInputs((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const setWeight = (layer: number, to: number, from: number, value: number) => {
    setNet((prev) => ({
      ...prev,
      weights: prev.weights.map((lw, l) =>
        l === layer
          ? lw.map((row, j) =>
              j === to ? row.map((w, i) => (i === from ? value : w)) : row
            )
          : lw
      ),
    }));
  };

  /** 0–1 intensity used to shade a node by its activation. */
  const nodeIntensity = (layer: number, index: number) => {
    const value = activations[layer][index];
    if (layer === 0) return Math.min(1, Math.abs(value));
    if (layer === LAYER_SIZES.length - 1) return value;
    const layerMax = Math.max(...activations[layer], 1e-6);
    return value / layerMax;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Network diagram */}
        <div className="min-w-0 flex-1 overflow-x-auto rounded-xl border border-border/60 bg-muted/20 p-3">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H + 24}`}
            className="mx-auto w-full min-w-[480px] max-w-[620px]"
            role="img"
            aria-label="Diagram of a 3-4-4-2 multilayer perceptron with node shading showing live activations"
          >
            {/* Edges */}
            {net.weights.map((layerWeights, l) =>
              layerWeights.map((row, j) =>
                row.map((w, i) => {
                  const from = nodePos(l, i);
                  const to = nodePos(l + 1, j);
                  const editable = EDITABLE_WEIGHTS.some(
                    (e) => e.layer === l && e.to === j && e.from === i
                  );
                  return (
                    <line
                      key={`${l}-${i}-${j}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={w >= 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'}
                      strokeWidth={0.75 + Math.min(2.75, Math.abs(w) * 2)}
                      strokeDasharray={editable ? '5 3' : undefined}
                      opacity={
                        (editable ? 0.35 : 0.15) + Math.min(0.6, Math.abs(w) * 0.45)
                      }
                    />
                  );
                })
              )
            )}

            {/* Layer labels */}
            {LAYER_LABELS.map((label, l) => (
              <text
                key={label}
                x={(SVG_W / (LAYER_SIZES.length + 1)) * (l + 1)}
                y={SVG_H + 16}
                textAnchor="middle"
                fontSize={11}
                fill="hsl(var(--muted-foreground))"
              >
                {label}
              </text>
            ))}

            {/* Nodes with live activation values */}
            {LAYER_SIZES.map((count, l) =>
              Array.from({ length: count }, (_, n) => {
                const { x, y } = nodePos(l, n);
                const value = activations[l][n];
                const intensity = nodeIntensity(l, n);
                const negativeInput = l === 0 && value < 0;
                return (
                  <g key={`${l}-${n}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={NODE_R}
                      fill={
                        negativeInput
                          ? `hsl(var(--accent) / ${0.15 + intensity * 0.75})`
                          : `hsl(var(--primary) / ${0.12 + intensity * 0.78})`
                      }
                      stroke="hsl(var(--border))"
                      strokeWidth={1.25}
                    />
                    <text
                      x={x}
                      y={y + 3}
                      textAnchor="middle"
                      fontSize={8.5}
                      fontFamily="var(--font-mono), monospace"
                      fill="hsl(var(--foreground))"
                    >
                      {value.toFixed(2)}
                    </text>
                  </g>
                );
              })
            )}
          </svg>
        </div>

        {/* Controls */}
        <div className="w-full space-y-5 lg:max-w-xs">
          <div className="space-y-4">
            {inputs.map((value, i) => (
              <div key={INPUT_LABELS[i]} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-muted-foreground">
                    input {INPUT_LABELS[i]}
                  </span>
                  <span className="font-mono tabular-nums">{value.toFixed(2)}</span>
                </div>
                <Slider
                  value={[value]}
                  min={-1}
                  max={1}
                  step={0.05}
                  onValueChange={([v]) => setInput(i, v)}
                  aria-label={`Input ${INPUT_LABELS[i]}`}
                />
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-border/60 pt-4">
            {EDITABLE_WEIGHTS.map((e) => {
              const value = net.weights[e.layer][e.to][e.from];
              return (
                <div key={e.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-muted-foreground">
                      {e.label}
                      <span className="ml-1.5 text-[10px] uppercase tracking-wide opacity-70">
                        dashed edge
                      </span>
                    </span>
                    <span className="font-mono tabular-nums">{value.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[value]}
                    min={-2}
                    max={2}
                    step={0.05}
                    onValueChange={([v]) => setWeight(e.layer, e.to, e.from, v)}
                    aria-label={e.label}
                  />
                </div>
              );
            })}
            <Button variant="outline" size="sm" onClick={randomize}>
              <Shuffle className="mr-1.5" />
              Randomize weights
            </Button>
          </div>

          {/* Output probabilities */}
          <div className="space-y-2 border-t border-border/60 pt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Softmax output
            </p>
            {probs.map((p, i) => (
              <div key={OUTPUT_LABELS[i]} className="flex items-center gap-2">
                <span className="w-14 font-mono text-xs text-muted-foreground">
                  {OUTPUT_LABELS[i]}
                </span>
                <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-muted/60">
                  <div
                    className={cn(
                      'h-full rounded-full motion-safe:transition-[width] motion-safe:duration-300',
                      p >= 0.5 ? 'bg-primary' : 'bg-primary/40'
                    )}
                    style={{ width: `${p * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                  {(p * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          Edge color: <span className="text-primary">positive</span> /{' '}
          <span className="text-accent">negative</span> weight · thickness ∝ |w| ·
          node shading ∝ activation
        </span>
        <span>Toy MLP — real math (ReLU + softmax), illustrative scale.</span>
      </div>
    </div>
  );
}
