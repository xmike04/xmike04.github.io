'use client';

import { useRef } from 'react';
import type { ReactNode, PointerEvent } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card wrapper with a pointer-tracked radial highlight (see `.spotlight` in globals.css).
 * Pure CSS-variable update on pointermove — no re-renders.
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}) {
  const ref = useRef<HTMLElement>(null);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }

  return (
    // @ts-expect-error -- polymorphic ref typing
    <Tag ref={ref} onPointerMove={onPointerMove} className={cn('group relative overflow-hidden', className)}>
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </Tag>
  );
}
