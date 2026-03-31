import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, ImageIcon } from 'lucide-react';
import Link from 'next/link';

export interface CaseStudyMetric {
  label: string;
  baseline: string;
  achieved: string;
}

export interface CaseStudy {
  problem: string;
  constraints: string[];
  approach: string;
  architectureNote?: string; // caption shown inside the diagram placeholder
  metrics: CaseStudyMetric[];
  productImpact: string;
  techStack: string[];
  links: { label: string; url: string }[];
}

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function Section({ number, title, children }: SectionProps) {
  return (
    <section aria-labelledby={`cs-section-${number}`} className="mb-12">
      <div className="flex items-baseline gap-3 mb-4 border-b border-border pb-2">
        <span className="text-xs font-mono text-primary font-bold">{number}</span>
        <h2
          id={`cs-section-${number}`}
          className="font-headline text-xl md:text-2xl font-bold"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function CaseStudyView({ data }: { data: CaseStudy }) {
  return (
    <div className="max-w-3xl mx-auto space-y-2">

      {/* 01 — Problem */}
      <Section number="01" title="Problem">
        <p className="text-muted-foreground leading-relaxed">{data.problem}</p>
      </Section>

      {/* 02 — Constraints */}
      <Section number="02" title="Constraints">
        <ul className="space-y-2" role="list">
          {data.constraints.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* 03 — Approach */}
      <Section number="03" title="Approach">
        <p className="text-muted-foreground leading-relaxed">{data.approach}</p>
      </Section>

      {/* 04 — Architecture */}
      <Section number="04" title="Architecture">
        <div
          className="rounded-lg border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-3 py-14 px-6 text-center"
          role="img"
          aria-label={data.architectureNote ?? 'Architecture diagram placeholder'}
        >
          <ImageIcon className="w-8 h-8 text-muted-foreground/50" aria-hidden="true" />
          <p className="text-sm text-muted-foreground font-medium">
            {data.architectureNote ?? 'Architecture diagram — add image here'}
          </p>
          <p className="text-xs text-muted-foreground/60">
            Replace this block with an image or diagram
          </p>
        </div>
      </Section>

      {/* 05 — Metrics */}
      <Section number="05" title="Metrics">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm" aria-label="Performance metrics">
            <thead>
              <tr className="bg-muted/50">
                <th scope="col" className="text-left px-4 py-3 font-semibold text-foreground">Metric</th>
                <th scope="col" className="text-left px-4 py-3 font-semibold text-muted-foreground">Baseline</th>
                <th scope="col" className="text-left px-4 py-3 font-semibold text-primary">Achieved</th>
              </tr>
            </thead>
            <tbody>
              {data.metrics.map((m, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{m.label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.baseline}</td>
                  <td className="px-4 py-3 text-primary font-semibold">{m.achieved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 06 — Product Impact */}
      <Section number="06" title="Product Impact">
        <p className="text-muted-foreground leading-relaxed">{data.productImpact}</p>
      </Section>

      {/* 07 — Tech Stack */}
      <Section number="07" title="Tech Stack">
        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {data.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" role="listitem">{tech}</Badge>
          ))}
        </div>
      </Section>

      {/* 08 — Links */}
      {data.links.length > 0 && (
        <Section number="08" title="Links">
          <div className="flex flex-wrap gap-3">
            {data.links.map((link, i) => (
              <Button key={i} asChild variant="outline" size="sm">
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </Section>
      )}

    </div>
  );
}
