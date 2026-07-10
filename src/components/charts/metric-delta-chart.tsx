'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { CaseStudyMetricDelta } from '@/components/sections/case-study-view';
import { cn } from '@/lib/utils';

/**
 * Horizontal grouped bar chart for before/after metric pairs.
 *
 * Baseline is a muted neutral reference; achieved wears the primary hue —
 * except when a lower-is-better metric regressed (achieved > baseline),
 * which flips to amber. Values are direct-labeled at the bar tips, so the
 * number axis is hidden; the full data also lives in the metrics table
 * rendered below this chart in the case study.
 */

const BASELINE_FILL = 'hsl(var(--muted-foreground))';
const ACHIEVED_FILL = 'hsl(var(--primary))';
const REGRESSION_FILL = 'hsl(var(--chart-4))'; // amber — lower-is-better metric that got worse

const ROW_HEIGHT = 76;

function formatValue(value: number, unit?: string) {
  return `${value.toLocaleString()}${unit ?? ''}`;
}

function describeDelta(d: CaseStudyMetricDelta) {
  const direction =
    d.achieved > d.baseline ? 'up from' : d.achieved < d.baseline ? 'down from' : 'unchanged at';
  const note = d.lowerIsBetter ? ', lower is better' : '';
  return `${d.label}: ${formatValue(d.achieved, d.unit)} achieved, ${direction} ${formatValue(
    d.baseline,
    d.unit
  )} baseline${note}`;
}

interface TooltipPayloadEntry {
  payload: CaseStudyMetricDelta;
}

function DeltaTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  const delta = row.achieved - row.baseline;
  const improved = row.lowerIsBetter ? delta < 0 : delta > 0;

  return (
    <div className="glass rounded-lg px-3.5 py-2.5 text-xs shadow-xl">
      <p className="mb-2 font-medium text-foreground">{row.label}</p>
      <div className="space-y-1.5">
        <p className="flex items-center gap-2">
          <span
            className="h-0 w-4 border-t-2"
            style={{ borderColor: BASELINE_FILL }}
            aria-hidden="true"
          />
          <span className="font-semibold tabular-nums text-foreground">
            {formatValue(row.baseline, row.unit)}
          </span>
          <span className="text-muted-foreground">baseline</span>
        </p>
        <p className="flex items-center gap-2">
          <span
            className="h-0 w-4 border-t-2"
            style={{
              borderColor:
                row.lowerIsBetter && row.achieved > row.baseline
                  ? REGRESSION_FILL
                  : ACHIEVED_FILL,
            }}
            aria-hidden="true"
          />
          <span className="font-semibold tabular-nums text-foreground">
            {formatValue(row.achieved, row.unit)}
          </span>
          <span className="text-muted-foreground">achieved</span>
        </p>
      </div>
      <p className="mt-2 border-t border-border/60 pt-1.5 text-muted-foreground">
        {delta > 0 ? '+' : ''}
        {delta.toLocaleString()}
        {row.unit ?? ''} {improved ? 'improvement' : delta === 0 ? '' : 'regression'}
        {row.lowerIsBetter ? ' (lower is better)' : ''}
      </p>
    </div>
  );
}

interface BarLabelProps {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  index?: number;
}

export default function MetricDeltaChart({
  data,
  className,
}: {
  data: CaseStudyMetricDelta[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  if (!data.length) return null;

  const height = data.length * ROW_HEIGHT + 8;
  const max = Math.max(...data.flatMap((d) => [d.baseline, d.achieved]));
  const summary = `Baseline versus achieved metrics. ${data.map(describeDelta).join('. ')}.`;

  const makeLabel =
    (series: 'baseline' | 'achieved') =>
    // eslint-disable-next-line react/display-name
    (props: BarLabelProps) => {
      const { x, y, width, height: h, index } = props;
      if (index === undefined || x === undefined || y === undefined) return null;
      const row = data[index];
      const value = series === 'baseline' ? row.baseline : row.achieved;
      return (
        <text
          x={Number(x) + Number(width ?? 0) + 8}
          y={Number(y) + Number(h ?? 0) / 2}
          dominantBaseline="central"
          textAnchor="start"
          fontSize={12}
          className="font-mono tabular-nums"
          fill={
            series === 'achieved'
              ? 'hsl(var(--foreground))'
              : 'hsl(var(--muted-foreground))'
          }
          fontWeight={series === 'achieved' ? 600 : 400}
        >
          {formatValue(value, row.unit)}
        </text>
      );
    };

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      {/* Legend — identity never rides on color alone */}
      <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1.5" aria-hidden="true">
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="h-2.5 w-2.5 rounded-[3px]"
            style={{ backgroundColor: BASELINE_FILL }}
          />
          Baseline
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="h-2.5 w-2.5 rounded-[3px]"
            style={{ backgroundColor: ACHIEVED_FILL }}
          />
          Achieved
        </span>
      </div>

      <div role="img" aria-label={summary} style={{ height }}>
        {inView && (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 64, bottom: 4, left: 0 }}
              barCategoryGap={20}
              barGap={2}
            >
              <XAxis type="number" domain={[0, Math.ceil(max * 1.15)]} hide />
              <YAxis
                type="category"
                dataKey="label"
                width={132}
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted) / 0.35)' }}
                content={<DeltaTooltip />}
                isAnimationActive={false}
              />
              <Bar
                dataKey="baseline"
                name="Baseline"
                fill={BASELINE_FILL}
                barSize={12}
                radius={[0, 4, 4, 0]}
                isAnimationActive={!reducedMotion}
                animationDuration={700}
              >
                <LabelList dataKey="baseline" content={makeLabel('baseline')} />
              </Bar>
              <Bar
                dataKey="achieved"
                name="Achieved"
                barSize={12}
                radius={[0, 4, 4, 0]}
                isAnimationActive={!reducedMotion}
                animationDuration={700}
                animationBegin={150}
              >
                {data.map((row, i) => (
                  <Cell
                    key={i}
                    fill={
                      row.lowerIsBetter && row.achieved > row.baseline
                        ? REGRESSION_FILL
                        : ACHIEVED_FILL
                    }
                  />
                ))}
                <LabelList dataKey="achieved" content={makeLabel('achieved')} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
