'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const CHARSET = '!<>-_\\/[]{}—=+*^?#________';

/** Terminal-style decode-in text effect. Renders plain text under reduced motion. */
export function TextScramble({ text, className, speed = 28 }: { text: string; className?: string; speed?: number }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : '');
  const frame = useRef(0);

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }
    let raf: number;
    let tick = 0;
    const total = text.length * 3;
    const step = () => {
      tick++;
      const progress = Math.min(1, tick / total);
      const settled = Math.floor(progress * text.length);
      let out = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        out += text[i] === ' ' ? ' ' : CHARSET[Math.floor(Math.random() * CHARSET.length)];
      }
      setDisplay(out);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, speed);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced]);

  // Reserve full width to avoid layout shift while scrambling
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
      {frame.current === 0 && display.length < text.length ? <span className="invisible">{text.slice(display.length)}</span> : null}
    </span>
  );
}
