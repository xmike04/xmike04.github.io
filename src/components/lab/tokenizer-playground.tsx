'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

/**
 * Live BPE tokenization with the real o200k_base vocabulary (GPT-4o family)
 * via gpt-tokenizer. The encoder (~a few MB of merge tables) is dynamically
 * imported on mount so it never touches the main bundle.
 */

const DEFAULT_TEXT =
  "Tokenization is how language models read: common words survive intact, but 'backpropagation' gets chopped into subword pieces!";

// 5 cycling chip hues, legible in both themes.
const CHIP_STYLES = [
  'border-cyan-500/30 bg-cyan-500/15 text-cyan-700 dark:text-cyan-300',
  'border-violet-500/30 bg-violet-500/15 text-violet-700 dark:text-violet-300',
  'border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  'border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300',
  'border-rose-500/30 bg-rose-500/15 text-rose-700 dark:text-rose-300',
];

interface Tokenizer {
  encode: (text: string) => number[];
  decode: (tokens: number[]) => string;
}

/** Make whitespace visible inside chips without altering the real token text. */
function displayToken(text: string): string {
  return text.replace(/\n/g, '⏎').replace(/\t/g, '⇥');
}

export default function TokenizerPlayground() {
  const [tokenizer, setTokenizer] = useState<Tokenizer | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [text, setText] = useState(DEFAULT_TEXT);
  const deferredText = useDeferredValue(text);

  useEffect(() => {
    let cancelled = false;
    import('gpt-tokenizer/encoding/o200k_base')
      .then((mod) => {
        if (!cancelled) {
          setTokenizer({ encode: mod.encode, decode: mod.decode });
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const tokens = useMemo(() => {
    if (!tokenizer) return null;
    return tokenizer
      .encode(deferredText)
      .map((id) => ({ id, text: tokenizer.decode([id]) }));
  }, [tokenizer, deferredText]);

  const charCount = deferredText.length;

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="tokenizer-input"
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Type anything
        </label>
        <Textarea
          id="tokenizer-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="font-mono text-sm"
          placeholder="Type some text to tokenize…"
        />
      </div>

      {loadError ? (
        <p className="text-sm text-destructive">
          Couldn&apos;t load the tokenizer — check your connection and reload
          the page.
        </p>
      ) : !tokenizer ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Loading the o200k_base vocabulary…
        </p>
      ) : (
        <>
          <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
            <span className="font-semibold text-primary">{tokens?.length ?? 0}</span>{' '}
            tokens ·{' '}
            <span className="font-semibold text-foreground">{charCount}</span>{' '}
            characters
            {tokens && tokens.length > 0 && (
              <> · {(charCount / tokens.length).toFixed(1)} chars/token</>
            )}
          </p>
          <div
            className="flex min-h-16 flex-wrap gap-1 rounded-xl border border-border/60 bg-muted/20 p-3"
            aria-label="Tokenized output"
          >
            {tokens && tokens.length > 0 ? (
              tokens.map((token, i) => (
                <span
                  key={`${token.id}-${i}`}
                  title={`token id ${token.id}`}
                  className={cn(
                    'whitespace-pre rounded border px-1 py-0.5 font-mono text-xs',
                    CHIP_STYLES[i % CHIP_STYLES.length]
                  )}
                >
                  {displayToken(token.text)}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Nothing to tokenize yet.
              </span>
            )}
          </div>
        </>
      )}

      <p className="text-xs text-muted-foreground">
        Byte-pair encoding (BPE) greedily merges the most frequent byte pairs
        into a fixed vocabulary — this is the real o200k_base encoding used by
        the GPT-4o model family, running entirely in your browser.
      </p>
    </div>
  );
}
