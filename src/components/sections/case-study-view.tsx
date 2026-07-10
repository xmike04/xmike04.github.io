import type { ComponentType, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ImageIcon, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import MetricDeltaChart from '@/components/charts/metric-delta-chart';
import RagPipelineDiagram from '@/components/diagrams/rag-pipeline-diagram';
import NasaPipelineDiagram from '@/components/diagrams/nasa-pipeline-diagram';
import SimlyfeDiagram from '@/components/diagrams/simlyfe-diagram';
import { cn } from '@/lib/utils';

export interface CaseStudyMetric {
  label: string;
  baseline: string;
  achieved: string;
}

/** Numeric before/after pair rendered as an animated delta chart. */
export interface CaseStudyMetricDelta {
  label: string;
  baseline: number;
  achieved: number;
  unit?: string;
  /** e.g. error rates, where the achieved bar being smaller is the win */
  lowerIsBetter?: boolean;
}

/** Keys into the animated SVG diagram registry (see src/components/diagrams/). */
export type ArchitectureDiagramKey = 'ragops' | 'nasa' | 'simlyfe';

export interface CaseStudy {
  problem: string;
  constraints: string[];
  approach: string;
  architectureNote?: string;      // caption for placeholder or below the diagram
  architectureDiagram?: ArchitectureDiagramKey; // animated SVG component key
  architectureImageSrc?: string;  // legacy: path relative to /public
  architectureImageAlt?: string;  // descriptive alt text for the diagram
  metrics: CaseStudyMetric[];
  metricsChart?: CaseStudyMetricDelta[];
  productImpact: string;
  techStack: string[];
  links: { label: string; url: string }[];
  /** Shown under links, e.g. repo-publication status — keeps the site honest without fake URLs. */
  linksNote?: string;
}

/** Animated SVG diagram registry, keyed by ArchitectureDiagramKey. */
const DIAGRAMS: Record<ArchitectureDiagramKey, ComponentType> = {
  ragops: RagPipelineDiagram,
  nasa: NasaPipelineDiagram,
  simlyfe: SimlyfeDiagram,
};

interface SectionProps {
  number: string;
  title: string;
  children: ReactNode;
}

function Section({ number, title, children }: SectionProps) {
  return (
    <Reveal direction="up">
      <section aria-labelledby={`cs-section-${number}`} className="mb-14">
        <div className="mb-5 flex items-baseline gap-3">
          <span className="gradient-text font-mono text-sm font-bold" aria-hidden="true">
            {number}
          </span>
          <h2
            id={`cs-section-${number}`}
            className="font-headline text-xl font-bold tracking-tight md:text-2xl"
          >
            {title}
          </h2>
          <span
            className="ml-1 h-px flex-1 self-center bg-gradient-to-r from-border to-transparent"
            aria-hidden="true"
          />
        </div>
        {children}
      </section>
    </Reveal>
  );
}

function ProseCard({ children }: { children: ReactNode }) {
  return (
    <div className="glass rounded-xl p-5 md:p-6">
      <p className="leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export default function CaseStudyView({ data }: { data: CaseStudy }) {
  const Diagram = data.architectureDiagram
    ? DIAGRAMS[data.architectureDiagram]
    : undefined;

  return (
    <div className="mx-auto max-w-3xl">

      {/* 01 — Problem */}
      <Section number="01" title="Problem">
        <ProseCard>{data.problem}</ProseCard>
      </Section>

      {/* 02 — Constraints */}
      <Section number="02" title="Constraints">
        <ul className="grid gap-3" role="list">
          {data.constraints.map((constraint, i) => (
            <li
              key={i}
              className="glass flex items-start gap-3 rounded-lg px-4 py-3 text-sm leading-relaxed text-muted-foreground"
            >
              <ShieldAlert
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>{constraint}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 03 — Approach */}
      <Section number="03" title="Approach">
        <ProseCard>{data.approach}</ProseCard>
      </Section>

      {/* 04 — Architecture */}
      <Section number="04" title="Architecture">
        {Diagram ? (
          <figure className="glass relative overflow-hidden rounded-xl p-4 md:p-6">
            <Diagram />
            {data.architectureNote && (
              <figcaption className="mt-4 border-t border-border/60 pt-3 text-center font-mono text-xs leading-relaxed text-muted-foreground">
                {data.architectureNote}
              </figcaption>
            )}
          </figure>
        ) : data.architectureImageSrc ? (
          <figure className="glass overflow-hidden rounded-xl">
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src={data.architectureImageSrc}
                alt={data.architectureImageAlt ?? 'System architecture diagram'}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            {data.architectureNote && (
              <figcaption className="border-t border-border/60 px-4 py-3 text-center font-mono text-xs text-muted-foreground">
                {data.architectureNote}
              </figcaption>
            )}
          </figure>
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-14 text-center"
            role="img"
            aria-label={data.architectureNote ?? 'Architecture diagram placeholder'}
          >
            <ImageIcon className="h-8 w-8 text-muted-foreground/50" aria-hidden="true" />
            <p className="text-sm font-medium text-muted-foreground">
              {data.architectureNote ?? 'Architecture diagram coming soon'}
            </p>
          </div>
        )}
      </Section>

      {/* 05 — Metrics */}
      <Section number="05" title="Metrics">
        {data.metricsChart && data.metricsChart.length > 0 && (
          <div className="glass mb-5 rounded-xl p-4 md:p-6">
            <MetricDeltaChart data={data.metricsChart} />
          </div>
        )}
        <div className="glass overflow-x-auto rounded-xl">
          <table className="w-full text-sm" aria-label="Performance metrics">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">
                  Metric
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-muted-foreground">
                  Baseline
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-primary">
                  Achieved
                </th>
              </tr>
            </thead>
            <tbody>
              {data.metrics.map((metric, i) => (
                <tr key={i} className="border-t border-border/40 first:border-t-0">
                  <td className="px-4 py-3 font-medium text-foreground">{metric.label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{metric.baseline}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{metric.achieved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 06 — Product Impact */}
      <Section number="06" title="Product Impact">
        <ProseCard>{data.productImpact}</ProseCard>
      </Section>

      {/* 07 — Tech Stack */}
      <Section number="07" title="Tech Stack">
        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {data.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              role="listitem"
              className="font-mono text-xs font-normal"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </Section>

      {/* 08 — Links */}
      {(data.links.length > 0 || data.linksNote) && (
        <Section number="08" title="Links">
          {data.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {data.links.map((link, i) => (
                <Button key={i} asChild variant="outline" size="sm">
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          )}
          {data.linksNote && (
            <p
              className={cn(
                'text-sm italic leading-relaxed text-muted-foreground',
                data.links.length > 0 && 'mt-4'
              )}
            >
              {data.linksNote}
            </p>
          )}
        </Section>
      )}

    </div>
  );
}
