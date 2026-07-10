'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Real single-head scaled dot-product attention, computed in TypeScript:
 *
 *   attention = softmax(QKᵀ / √d)
 *
 * Token embeddings (d = 16) are deterministic hash-seeded vectors plus a
 * sinusoidal positional term; Q and K come from fixed seeded projection
 * matrices. The projections are NOT trained — the math is genuine, the
 * "knowledge" is not.
 */

const D = 16;

const SENTENCES = [
  'The cat sat on the mat',
  'She trained the model and deployed it',
  'Attention is all you need',
];

// ---------------------------------------------------------------------------
// Deterministic linear algebra
// ---------------------------------------------------------------------------

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

/** FNV-1a string hash → PRNG seed, so each token maps to a stable vector. */
function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function randMatrix(rows: number, cols: number, seed: number): number[][] {
  const rand = mulberry32(seed);
  const scale = 1 / Math.sqrt(cols);
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (rand() * 2 - 1) * scale)
  );
}

// Fixed "learned-looking" projections — deterministic across visits.
const W_QUERY = randMatrix(D, D, 42);
const W_KEY = randMatrix(D, D, 1337);

function tokenEmbedding(token: string, position: number): number[] {
  const rand = mulberry32(hashString(token.toLowerCase()));
  const v = Array.from({ length: D }, () => rand() * 2 - 1);
  // Sinusoidal positional encoding (transformer-style), lightly scaled.
  for (let i = 0; i < D; i++) {
    const angle = position / Math.pow(10000, (2 * Math.floor(i / 2)) / D);
    v[i] += 0.4 * (i % 2 === 0 ? Math.sin(angle) : Math.cos(angle));
  }
  return v;
}

function matVec(m: number[][], v: number[]): number[] {
  return m.map((row) => row.reduce((acc, w, i) => acc + w * v[i], 0));
}

function dot(a: number[], b: number[]): number {
  return a.reduce((acc, v, i) => acc + v * b[i], 0);
}

function softmaxRow(row: number[]): number[] {
  const max = Math.max(...row);
  const exps = row.map((v) => Math.exp(v - max));
  const sum = exps.reduce((acc, v) => acc + v, 0);
  return exps.map((v) => v / sum);
}

/** attention[i][j] = softmax over j of Q_i · K_j / √d (rows sum to 1). */
function computeAttention(tokens: string[]): number[][] {
  const embeddings = tokens.map((t, i) => tokenEmbedding(t, i));
  const Q = embeddings.map((e) => matVec(W_QUERY, e));
  const K = embeddings.map((e) => matVec(W_KEY, e));
  const scale = 1 / Math.sqrt(D);
  return Q.map((q) => softmaxRow(K.map((k) => dot(q, k) * scale)));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AttentionVisualizer() {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const tokens = useMemo(
    () => SENTENCES[sentenceIndex].split(' '),
    [sentenceIndex]
  );
  const attention = useMemo(() => computeAttention(tokens), [tokens]);

  const selected = hovered ?? pinned;
  const selectedRowMax =
    selected !== null ? Math.max(...attention[selected]) : 1;

  const selectSentence = (index: number) => {
    setSentenceIndex(index);
    setPinned(null);
    setHovered(null);
  };

  return (
    <div className="space-y-5">
      {/* Sentence picker */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Example sentence">
        {SENTENCES.map((sentence, i) => (
          <button
            key={sentence}
            type="button"
            onClick={() => selectSentence(i)}
            aria-pressed={sentenceIndex === i}
            className={cn(
              'rounded-full border px-3 py-1 font-mono text-xs transition-colors',
              sentenceIndex === i
                ? 'border-primary/60 bg-primary/15 text-primary'
                : 'border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground'
            )}
          >
            {sentence}
          </button>
        ))}
      </div>

      {/* Token strip — hover/tap a token to see where it attends */}
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          Hover or tap a token to see where it attends:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tokens.map((token, j) => {
            const isQuery = selected === j;
            const weight = selected !== null ? attention[selected][j] : null;
            const alpha =
              weight !== null && !isQuery
                ? 0.06 + (weight / selectedRowMax) * 0.8
                : 0;
            return (
              <button
                key={`${token}-${j}`}
                type="button"
                aria-pressed={pinned === j}
                aria-label={`Token "${token}"${
                  weight !== null && selected !== null
                    ? ` — attention from "${tokens[selected]}": ${(weight * 100).toFixed(1)}%`
                    : ''
                }`}
                onMouseEnter={() => setHovered(j)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(j)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned((prev) => (prev === j ? null : j))}
                className={cn(
                  'rounded-md border px-2.5 py-1.5 font-mono text-sm transition-colors',
                  isQuery
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border/70'
                )}
                style={
                  !isQuery && weight !== null
                    ? { backgroundColor: `hsl(var(--primary) / ${alpha})` }
                    : undefined
                }
              >
                {token}
                {weight !== null && (
                  <span
                    className={cn(
                      'ml-1.5 text-[10px] tabular-nums',
                      isQuery
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground'
                    )}
                  >
                    {(weight * 100).toFixed(0)}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Heatmap: rows = query token, columns = key token */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-0">
          <div
            className="grid gap-0.5"
            style={{
              gridTemplateColumns: `minmax(64px, auto) repeat(${tokens.length}, 2.25rem)`,
            }}
            role="img"
            aria-label="Attention heatmap matrix — rows are query tokens, columns are key tokens"
          >
            {/* Column header */}
            <div />
            {tokens.map((token, j) => (
              <div
                key={`col-${j}`}
                className="truncate pb-1 text-center font-mono text-[10px] text-muted-foreground"
                title={token}
              >
                {token.length > 4 ? `${token.slice(0, 4)}…` : token}
              </div>
            ))}
            {/* Rows */}
            {tokens.map((rowToken, i) => {
              const rowMax = Math.max(...attention[i]);
              const isSelectedRow = selected === i;
              return (
                <div key={`row-${i}`} className="contents">
                  <div
                    className={cn(
                      'flex items-center justify-end pr-2 font-mono text-[11px]',
                      isSelectedRow
                        ? 'font-semibold text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    {rowToken}
                  </div>
                  {attention[i].map((weight, j) => (
                    <div
                      key={`cell-${i}-${j}`}
                      title={`"${rowToken}" → "${tokens[j]}": ${(weight * 100).toFixed(1)}%`}
                      className={cn(
                        'h-9 rounded-[3px]',
                        isSelectedRow && 'ring-1 ring-primary/70'
                      )}
                      style={{
                        backgroundColor: `hsl(var(--primary) / ${
                          0.04 + (weight / rowMax) * 0.82
                        })`,
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Toy single-head attention — real computation
        <span className="font-mono"> softmax(QKᵀ/√d)</span> over deterministic
        16-dim embeddings, tiny dimensions. The Q/K projections are seeded, not
        trained, so patterns reflect token identity and position rather than
        learned linguistics. Heatmap shading is normalized per row.
      </p>
    </div>
  );
}
