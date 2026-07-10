'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import type { ReactNode, PointerEvent } from 'react';

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current || e.pointerType !== 'mouse') return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}
