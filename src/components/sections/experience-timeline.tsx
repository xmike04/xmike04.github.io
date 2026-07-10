'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { resumeData, type ProjectItem, type WorkItem } from '@/lib/resume-data';
import { cn } from '@/lib/utils';

type TimelineEntry = WorkItem | ProjectItem;

export default function ExperienceTimeline() {
  // Single source, sorted most-recent-first so the timeline reads top-to-bottom in time.
  const items: TimelineEntry[] = [...resumeData.workExperience, ...resumeData.projects].sort(
    (a, b) => b.sortKey - a.sortKey
  );

  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">Track record</p>
          <h2 className="font-headline text-3xl font-bold md:text-5xl">Experience &amp; Projects</h2>
        </div>

        <ol className="mx-auto max-w-3xl">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.id} className="relative grid grid-cols-[1rem_1fr] gap-x-5 sm:gap-x-8">
                {/* Rail column: connector to the next node (omitted on the last) + node dot */}
                <div className="relative flex justify-center">
                  {!isLast ? (
                    <span
                      className="absolute top-3 h-full w-px bg-border/60"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative z-10 mt-2 flex h-3.5 w-3.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background" />
                  </span>
                </div>

                {/* Card */}
                <div className={cn('pb-10', isLast && 'pb-0')}>
                  <Reveal direction="left">
                    <article className="glass rounded-xl p-6 transition-colors hover:border-primary/25">
                      <p className="mb-2 font-mono text-xs text-primary">{item.date}</p>
                      <h3 className="font-headline text-lg font-bold leading-snug">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.company}</p>
                      <ul className="mt-4 space-y-2">
                        {item.description.slice(0, 3).map((point) => (
                          <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-px shrink-0 font-mono text-primary" aria-hidden="true">
                              →
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/item/${item.id}`}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Details
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </article>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
