'use client';

import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

function makeVariants(direction: Direction): Variants {
  const { x, y } = offsets[direction];
  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={makeVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  direction = 'up',
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={makeVariants(direction)}>
      {children}
    </motion.div>
  );
}
