'use client';

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Shared SVG building blocks for the animated architecture diagrams. */

export type DiagramTone = 'primary' | 'accent' | 'muted';

const TONE_COLOR: Record<DiagramTone, string> = {
  primary: 'hsl(var(--primary))',
  accent: 'hsl(var(--accent))',
  muted: 'hsl(var(--muted-foreground))',
};

const PARTICLE_GLOW: Record<DiagramTone, string | undefined> = {
  primary: 'drop-shadow(0 0 3px hsl(var(--glow-primary) / 0.8))',
  accent: 'drop-shadow(0 0 3px hsl(var(--glow-accent) / 0.8))',
  muted: undefined,
};

interface DiagramContextValue {
  /** Unique-per-container marker id for a tone's arrowhead. */
  markerId: (tone: DiagramTone) => string;
  /** Unique-per-container cyan → violet stroke gradient id. */
  gradientId: string;
}

const DiagramContext = createContext<DiagramContextValue>({
  markerId: () => '',
  gradientId: '',
});

export interface DiagramLegendEntry {
  label: string;
  tone: DiagramTone;
  dashed?: boolean;
}

/**
 * Responsive viewBox SVG wrapper. Horizontal flow scales down with the page;
 * below `minWidth` the diagram keeps its size and scrolls horizontally instead.
 */
export function DiagramContainer({
  viewBox,
  label,
  minWidth = 720,
  legend,
  className,
  children,
}: {
  /** e.g. "0 0 840 470" */
  viewBox: string;
  /** Full-sentence description of the flow, read in place of the SVG. */
  label: string;
  /** Below this CSS width the container scrolls horizontally (mobile). */
  minWidth?: number;
  legend?: DiagramLegendEntry[];
  className?: string;
  children: ReactNode;
}) {
  // useId can contain ":" which is not safe inside url(#...) references.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const markerId = (tone: DiagramTone) => `${uid}-arrow-${tone}`;
  const gradientId = `${uid}-stroke-gradient`;

  return (
    <div className={cn('w-full', className)}>
      <div className="overflow-x-auto">
        <svg
          viewBox={viewBox}
          role="img"
          aria-label={label}
          className="h-auto w-full"
          style={{ minWidth }}
        >
          <defs>
            {(Object.keys(TONE_COLOR) as DiagramTone[]).map((tone) => (
              <marker
                key={tone}
                id={markerId(tone)}
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6.5"
                markerHeight="6.5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill={TONE_COLOR[tone]} fillOpacity={0.85} />
              </marker>
            ))}
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          <DiagramContext.Provider value={{ markerId, gradientId }}>
            {children}
          </DiagramContext.Provider>
        </svg>
      </div>
      {legend && legend.length > 0 && (
        <div
          className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5"
          aria-hidden="true"
        >
          {legend.map((entry) => (
            <span
              key={entry.label}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span
                className="h-0 w-5 border-t-2"
                style={{
                  borderColor: TONE_COLOR[entry.tone],
                  borderStyle: entry.dashed ? 'dashed' : 'solid',
                }}
              />
              {entry.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Rounded glass rect with a title, optional sub-caption and icon slot. */
export function DiagramNode({
  x,
  y,
  width,
  height,
  title,
  sub,
  icon,
  tone = 'muted',
  highlight = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  sub?: string;
  /** Small SVG icon (e.g. a lucide icon sized ~16px), rendered left of the text. */
  icon?: ReactNode;
  tone?: DiagramTone;
  /** Terminal node — cyan → violet gradient border + permanent soft glow. */
  highlight?: boolean;
}) {
  const { gradientId } = useContext(DiagramContext);
  const cx = x + width / 2;
  const cy = y + height / 2;
  const textX = icon ? x + 38 : cx;
  const anchor = icon ? 'start' : 'middle';
  const titleY = sub ? cy - 3 : cy + 4.5;

  const stroke = highlight
    ? `url(#${gradientId})`
    : tone === 'muted'
      ? 'hsl(var(--border))'
      : TONE_COLOR[tone];

  return (
    <g className="group">
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill="hsl(var(--card) / 0.65)"
        stroke={stroke}
        strokeWidth={highlight ? 1.5 : 1}
        strokeOpacity={highlight ? 1 : tone === 'muted' ? 1 : 0.5}
        className={cn(
          'transition-all duration-300 group-hover:[stroke-opacity:1]',
          highlight &&
            '[filter:drop-shadow(0_0_10px_hsl(var(--glow-primary)/0.25))]',
          tone === 'accent'
            ? 'group-hover:[filter:drop-shadow(0_0_8px_hsl(var(--glow-accent)/0.4))]'
            : 'group-hover:[filter:drop-shadow(0_0_8px_hsl(var(--glow-primary)/0.4))]'
        )}
      />
      {icon && (
        <g
          transform={`translate(${x + 14}, ${cy - 8})`}
          style={{
            color: TONE_COLOR[tone === 'muted' ? 'primary' : tone],
          }}
        >
          {icon}
        </g>
      )}
      <text
        x={textX}
        y={titleY}
        textAnchor={anchor}
        fontSize={13}
        fontWeight={600}
        fill="hsl(var(--foreground))"
        className="font-headline"
      >
        {title}
      </text>
      {sub && (
        <text
          x={textX}
          y={cy + 14}
          textAnchor={anchor}
          fontSize={9.5}
          fill="hsl(var(--muted-foreground))"
          className="font-mono"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/** Path between anchor points, with an optional arrowhead and label. */
export function DiagramEdge({
  d,
  tone = 'primary',
  dashed = false,
  arrow = true,
  label,
  labelX,
  labelY,
  labelAnchor = 'middle',
}: {
  d: string;
  tone?: DiagramTone;
  dashed?: boolean;
  arrow?: boolean;
  label?: string;
  labelX?: number;
  labelY?: number;
  labelAnchor?: 'start' | 'middle' | 'end';
}) {
  const { markerId } = useContext(DiagramContext);
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={TONE_COLOR[tone]}
        strokeOpacity={dashed ? 0.4 : 0.5}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray={dashed ? '4 5' : undefined}
        markerEnd={arrow ? `url(#${markerId(tone)})` : undefined}
      />
      {label && labelX !== undefined && labelY !== undefined && (
        <text
          x={labelX}
          y={labelY}
          textAnchor={labelAnchor}
          fontSize={9.5}
          fill="hsl(var(--muted-foreground))"
          stroke="hsl(var(--background))"
          strokeWidth={3.5}
          strokeLinejoin="round"
          paintOrder="stroke"
          className="font-mono"
        >
          {label}
        </text>
      )}
    </g>
  );
}

/**
 * Small circle animating along a path via CSS offset-path + motion's
 * offsetDistance. Hidden entirely under reduced motion or when the
 * browser doesn't support offset-path (mounted client-side only, so
 * there is no hydration mismatch either way).
 */
export function FlowParticle({
  d,
  tone = 'primary',
  duration = 4,
  delay = 0,
  r = 3,
}: {
  d: string;
  tone?: DiagramTone;
  duration?: number;
  delay?: number;
  r?: number;
}) {
  const reducedMotion = useReducedMotion();
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (
      typeof CSS !== 'undefined' &&
      CSS.supports('offset-path', 'path("M 0 0 L 10 10")')
    ) {
      setSupported(true);
    }
  }, []);

  if (reducedMotion || !supported) return null;

  return (
    <motion.circle
      r={r}
      fill={TONE_COLOR[tone]}
      style={
        {
          offsetPath: `path("${d}")`,
          offsetRotate: '0deg',
          filter: PARTICLE_GLOW[tone],
        } as CSSProperties
      }
      initial={{ offsetDistance: '0%', opacity: 0 }}
      animate={{
        offsetDistance: ['0%', '8%', '92%', '100%'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.08, 0.92, 1],
      }}
    />
  );
}
