
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Example {
  sentence: string[];
  // attention[i][j] = how much token i attends to token j (rows sum to ~1)
  attention: number[][];
  insight: string;
}

const EXAMPLES: Example[] = [
  {
    sentence: ['The', 'cat', 'sat', 'on', 'the', 'mat'],
    attention: [
      [0.75, 0.08, 0.05, 0.04, 0.05, 0.03],
      [0.12, 0.55, 0.18, 0.05, 0.06, 0.04],
      [0.06, 0.28, 0.48, 0.07, 0.06, 0.05],
      [0.05, 0.10, 0.18, 0.42, 0.14, 0.11],
      [0.08, 0.08, 0.06, 0.12, 0.52, 0.14],
      [0.05, 0.16, 0.18, 0.10, 0.22, 0.29],
    ],
    insight: '"cat" attends strongly to "sat" — subject–verb relationship captured by the attention head.',
  },
  {
    sentence: ['She', 'trained', 'the', 'model', 'and', 'deployed', 'it'],
    attention: [
      [0.68, 0.12, 0.05, 0.06, 0.03, 0.04, 0.02],
      [0.18, 0.42, 0.06, 0.16, 0.06, 0.08, 0.04],
      [0.06, 0.06, 0.55, 0.22, 0.05, 0.04, 0.02],
      [0.06, 0.14, 0.14, 0.44, 0.06, 0.10, 0.06],
      [0.05, 0.10, 0.06, 0.06, 0.48, 0.20, 0.05],
      [0.08, 0.18, 0.05, 0.12, 0.06, 0.38, 0.13],
      [0.05, 0.05, 0.06, 0.18, 0.05, 0.28, 0.33],
    ],
    insight: '"it" attends most to "model" — the attention head resolves pronoun coreference.',
  },
  {
    sentence: ['Transformers', 'use', 'attention', 'not', 'recurrence'],
    attention: [
      [0.52, 0.14, 0.18, 0.08, 0.08],
      [0.16, 0.44, 0.22, 0.10, 0.08],
      [0.18, 0.20, 0.40, 0.12, 0.10],
      [0.10, 0.12, 0.14, 0.42, 0.22],
      [0.10, 0.10, 0.16, 0.24, 0.40],
    ],
    insight: '"not" and "recurrence" attend to each other — negation scope captured in weights.',
  },
  {
    sentence: ['Loss', 'fell', 'after', 'warmup', 'ended'],
    attention: [
      [0.58, 0.14, 0.10, 0.10, 0.08],
      [0.18, 0.45, 0.18, 0.10, 0.09],
      [0.10, 0.16, 0.44, 0.18, 0.12],
      [0.10, 0.10, 0.18, 0.46, 0.16],
      [0.08, 0.14, 0.16, 0.22, 0.40],
    ],
    insight: '"fell" attends to "warmup" — temporal causality encoded across tokens.',
  },
];

function heatColor(v: number) {
  // warm amber scale: low opacity = low attention, high = bright
  const intensity = Math.round(v * 255);
  return `rgba(251, 146, 60, ${(v * 0.85 + 0.08).toFixed(2)})`;
}

export default function AttentionHeatmap() {
  const [idx, setIdx] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const ex = EXAMPLES[idx];
  const n = ex.sentence.length;

  const next = () => {
    setIdx(i => (i + 1) % EXAMPLES.length);
    setHoveredRow(null);
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Zap className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline">Transformer Attention Heatmap</CardTitle>
            <CardDescription>Hover a token to see what the attention head focuses on</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        {/* Token chips */}
        <div className="flex justify-center gap-2 flex-wrap">
          {ex.sentence.map((word, i) => (
            <div
              key={i}
              className={cn(
                'px-3 py-1.5 rounded-lg border-2 cursor-pointer font-mono text-sm font-semibold select-none transition-all',
                hoveredRow === i
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/50 text-foreground'
              )}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="overflow-x-auto flex justify-center">
          <div>
            {/* Column headers */}
            <div className="flex ml-20">
              {ex.sentence.map((word, j) => (
                <div
                  key={j}
                  className={cn(
                    'text-center text-xs font-mono truncate transition-colors',
                    hoveredRow !== null && 'opacity-60',
                  )}
                  style={{ width: '52px' }}
                >
                  {word}
                </div>
              ))}
            </div>

            {/* Rows */}
            {ex.attention.map((row, i) => (
              <div
                key={i}
                className="flex items-center mt-1 cursor-default"
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Row label */}
                <div
                  className={cn(
                    'w-20 text-right pr-2 text-xs font-mono font-semibold truncate transition-colors',
                    hoveredRow === i ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {ex.sentence[i]}
                </div>
                {/* Cells */}
                {row.map((val, j) => (
                  <div
                    key={j}
                    className="rounded flex items-center justify-center text-xs font-mono font-bold transition-all duration-200"
                    style={{
                      width: '52px',
                      height: '34px',
                      backgroundColor: heatColor(val),
                      opacity: hoveredRow === null || hoveredRow === i ? 1 : 0.3,
                    }}
                    title={`${ex.sentence[i]} → ${ex.sentence[j]}: ${(val * 100).toFixed(0)}%`}
                  >
                    <span className="text-white drop-shadow">{(val * 100).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span
              className="w-4 h-4 rounded"
              style={{ backgroundColor: heatColor(0.08) }}
            />
            low
          </div>
          <div className="w-16 h-2 rounded" style={{
            background: 'linear-gradient(to right, rgba(251,146,60,0.15), rgba(251,146,60,0.9))',
          }} />
          <div className="flex items-center gap-1">
            high
            <span
              className="w-4 h-4 rounded"
              style={{ backgroundColor: heatColor(0.9) }}
            />
          </div>
          <span className="ml-3">· values = attention weight %</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-2 p-4">
        {ex.insight && (
          <p className="text-sm text-muted-foreground text-center italic max-w-lg">{ex.insight}</p>
        )}
        <Button variant="outline" onClick={next}>
          <RefreshCw className="mr-2 w-4 h-4" />
          Next Example
        </Button>
      </CardFooter>
    </Card>
  );
}
