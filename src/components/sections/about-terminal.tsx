'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { Reveal } from '@/components/motion/reveal';
import { resumeData } from '@/lib/resume-data';
import { cn } from '@/lib/utils';

const TERMINAL_LINES = [
  { text: '$ whoami', kind: 'cmd' },
  { text: 'ml-engineer — dallas, tx', kind: 'out' },
  { text: '$ current_focus', kind: 'cmd' },
  { text: '→ agentic AI @ Mr. Cooper', kind: 'out' },
  { text: '→ M.S. AI @ UNT (May 2027)', kind: 'out' },
] as const;

const TOTAL_CHARS = TERMINAL_LINES.reduce((n, line) => n + line.text.length, 0);
const TYPE_INTERVAL_MS = 26;

function TerminalCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setTyped(TOTAL_CHARS);
      return;
    }
    const interval = window.setInterval(() => {
      setTyped((t) => {
        if (t >= TOTAL_CHARS) {
          window.clearInterval(interval);
          return t;
        }
        return t + 1;
      });
    }, TYPE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [inView, reduced]);

  let remaining = typed;
  const rendered = TERMINAL_LINES.map((line) => {
    const shown = Math.max(0, Math.min(line.text.length, remaining));
    remaining -= shown;
    return { ...line, shown };
  });
  const lastVisible = rendered.reduce((last, line, i) => (line.shown > 0 ? i : last), 0);
  const done = typed >= TOTAL_CHARS;

  return (
    <div ref={ref} className="glass overflow-hidden rounded-xl shadow-lg">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">michael@dallas — zsh</span>
      </div>

      {/* Animated body (full transcript provided for screen readers below) */}
      <div className="min-h-[196px] p-5 font-mono text-sm leading-7" aria-hidden="true">
        {rendered.map((line, i) =>
          line.shown > 0 ? (
            <p key={line.text} className={line.kind === 'cmd' ? 'text-foreground' : 'text-muted-foreground'}>
              {line.text[0] === '$' || line.text[0] === '→' ? (
                <>
                  <span className={line.text[0] === '$' ? 'text-primary' : 'text-accent'}>{line.text[0]}</span>
                  {line.text.slice(1, line.shown)}
                </>
              ) : (
                line.text.slice(0, line.shown)
              )}
              {i === lastVisible ? (
                <span
                  className={cn(
                    'ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-primary motion-reduce:animate-none',
                    done && 'animate-pulse'
                  )}
                />
              ) : null}
            </p>
          ) : null
        )}
      </div>
      <p className="sr-only">{TERMINAL_LINES.map((line) => line.text).join('. ')}</p>
    </div>
  );
}

export default function AboutTerminal() {
  return (
    <section id="about" aria-label="About Michael" className="bg-muted/10 py-16 md:py-24">
      <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="up">
          <TerminalCard />
        </Reveal>
        <Reveal direction="up" delay={0.1}>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">$ cat about.md</p>
            <h2 className="mb-5 font-headline text-3xl font-bold md:text-4xl">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">{resumeData.personalBio}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{resumeData.summary}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
