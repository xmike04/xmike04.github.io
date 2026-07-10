'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Github, Star } from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { resumeData, type ProjectItem } from '@/lib/resume-data';
import { cn } from '@/lib/utils';

/** Trim at a word boundary — never mid-word — and close with an ellipsis. */
function trimAtWord(text: string, max = 220): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  const clean = cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:.]+$/, '');
  return `${clean}…`;
}

/** Per-project proof panel: honest metrics only, straight from resume-data. */
function MetricHighlight({ project }: { project: ProjectItem }) {
  if (project.id === 'nasa-waving-project') {
    return (
      <div className="flex h-full flex-col justify-center gap-4 rounded-xl border border-border/60 bg-background/40 p-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-medium text-primary">
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          Kennedy Center, Washington, D.C.
        </span>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-baseline gap-2">
            <span className="font-mono text-primary">→</span> Premiered March 2025 · national museum tour planned
          </li>
          <li className="flex items-baseline gap-2">
            <span className="font-mono text-primary">→</span> Led a 5-person capstone team
          </li>
          <li className="flex items-baseline gap-2">
            <span className="font-mono text-primary">→</span> ~70% setup-time cut via automated calibration wizard
          </li>
        </ul>
      </div>
    );
  }

  // simlyfe
  return (
    <div className="flex h-full flex-col justify-center gap-4 rounded-xl border border-border/60 bg-background/40 p-6">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 font-mono text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/50 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        Live in production
      </span>
      <div className="flex flex-wrap gap-3">
        <Button asChild className="glow-primary rounded-full">
          <a href="https://simlyfe.vercel.app" target="_blank" rel="noopener noreferrer">
            Live Demo
            <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <a href="https://github.com/xmike04/SIMLYFE" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            Repository
          </a>
        </Button>
      </div>
      <p className="font-mono text-xs text-muted-foreground">350+ automated test assertions · Vitest</p>
    </div>
  );
}

function FlagshipCard({ project, index }: { project: ProjectItem; index: number }) {
  const caseStudy = project.caseStudy;
  const stack = caseStudy?.techStack ?? [];
  const shownStack = stack.slice(0, 6);
  const extraCount = stack.length - shownStack.length;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/40 via-border/40 to-accent/40 p-px">
      <SpotlightCard as="article" className="rounded-[calc(1rem-1px)] bg-card/70 p-6 backdrop-blur-xl md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-stretch">
          <div className={cn('flex flex-col gap-4', index % 2 === 1 && 'md:order-2')}>
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-primary">{String(index + 1).padStart(2, '0')}</span>
              {' / '}
              {project.company} · {project.date}
            </p>
            <h3 className="font-headline text-2xl font-bold leading-tight md:text-3xl">{project.title}</h3>
            {caseStudy ? (
              <div>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">The problem</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{trimAtWord(caseStudy.problem)}</p>
              </div>
            ) : null}
            <div>
              <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">The build</p>
              <p className="text-sm font-medium leading-relaxed">{project.description[0]}</p>
            </div>
            <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${project.title} tech stack`}>
              {shownStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-mono text-xs font-normal" role="listitem">
                  {tech}
                </Badge>
              ))}
              {extraCount > 0 ? (
                <Badge variant="outline" className="font-mono text-xs font-normal text-muted-foreground" role="listitem">
                  +{extraCount} more
                </Badge>
              ) : null}
            </div>
            <div className="mt-auto pt-2">
              <Button asChild variant="outline" className="group/cta rounded-full">
                <Link href={`/item/${project.id}`}>
                  Read the case study
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </div>
          <div className={cn(index % 2 === 1 && 'md:order-1')}>
            <MetricHighlight project={project} />
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default function FlagshipProjects() {
  const flagship = resumeData.projects.filter((p) => p.flagship);

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">Selected work</p>
          <h2 className="font-headline text-3xl font-bold md:text-5xl">Flagship Projects</h2>
          <p className="mt-4 text-muted-foreground">
            A national research exhibit and a shipped, LLM-driven product.
          </p>
        </div>
        <RevealGroup className="mx-auto flex max-w-5xl flex-col gap-8" stagger={0.15}>
          {flagship.map((project, index) => (
            <RevealItem key={project.id}>
              <FlagshipCard project={project} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
