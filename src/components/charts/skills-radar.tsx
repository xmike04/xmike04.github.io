'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from 'recharts';
import { resumeData } from '@/lib/resume-data';

function RadarTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  const axis = (point.payload as { axis?: string }).axis ?? '';
  return (
    <div className="glass rounded-lg px-3 py-2 shadow-lg">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{axis}</p>
      <p className="font-headline text-sm font-bold text-primary">{point.value} / 100</p>
    </div>
  );
}

/** Single-series radar over resumeData.skillsRadar. Grid and text ride theme tokens. */
export default function SkillsRadar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const data = resumeData.skillsRadar;

  const ariaLabel = `Radar chart of self-assessed focus areas, each rated out of 100: ${data
    .map((d) => `${d.axis} ${d.value}`)
    .join(', ')}.`;

  return (
    <figure className="flex h-full flex-col">
      <div ref={ref} role="img" aria-label={ariaLabel} className="h-[300px] w-full md:h-[340px]">
        {/* Mounted on first in-view so the draw animation plays when seen. */}
        {inView ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="72%" margin={{ top: 12, right: 24, bottom: 12, left: 24 }}>
              <PolarGrid stroke="hsl(var(--border))" strokeWidth={1} />
              <PolarAngleAxis
                dataKey="axis"
                tick={{
                  fill: 'hsl(var(--muted-foreground))',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Focus"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="hsl(var(--primary))"
                fillOpacity={0.25}
                dot={{ r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
                isAnimationActive={!reduced}
                animationDuration={900}
                animationEasing="ease-out"
              />
              <Tooltip content={<RadarTooltip />} cursor={false} />
            </RadarChart>
          </ResponsiveContainer>
        ) : null}
      </div>
      <figcaption className="mt-2 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Self-assessed focus areas · 0–100
      </figcaption>
    </figure>
  );
}
