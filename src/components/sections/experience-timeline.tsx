'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Reveal } from '@/components/motion/reveal';
import { resumeData, type ProjectItem, type WorkItem } from '@/lib/resume-data';
import { cn } from '@/lib/utils';

type TimelineEntry = WorkItem | ProjectItem;

function TimelineNode({ item, index }: { item: TimelineEntry; index: number }) {
  const onLeft = index % 2 === 0;

  return (
    <li className="relative pl-12 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0">
      {/* Pulsing node dot — ping is gated by motion-safe */}
      <span
        className="absolute left-[15px] top-2 z-10 -translate-x-1/2 md:left-1/2"
        aria-hidden="true"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 motion-safe:animate-ping" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
        </span>
      </span>

      {/* Desktop date label on the opposite side of the card */}
      <div
        className={cn(
          'hidden md:row-start-1 md:flex md:items-start md:pt-1',
          onLeft ? 'md:col-start-2 md:justify-start' : 'md:col-start-1 md:justify-end'
        )}
      >
        <span className="font-mono text-sm text-muted-foreground">{item.date}</span>
      </div>

      <Reveal
        direction={onLeft ? 'right' : 'left'}
        className={cn('md:row-start-1', onLeft ? 'md:col-start-1' : 'md:col-start-2')}
      >
        <article className="glass rounded-xl p-6 transition-colors hover:border-primary/25">
          <p className="mb-2 font-mono text-xs text-primary md:hidden">{item.date}</p>
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
    </li>
  );
}

export default function ExperienceTimeline() {
  const items: TimelineEntry[] = [...resumeData.workExperience, ...resumeData.projects];
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.8', 'end 0.45'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">Track record</p>
          <h2 className="font-headline text-3xl font-bold md:text-5xl">Experience &amp; Projects</h2>
        </div>

        <div ref={trackRef} className="relative mx-auto max-w-5xl">
          {/* Static track */}
          <div
            className="absolute bottom-0 left-[15px] top-0 w-px -translate-x-1/2 bg-border/60 md:left-1/2"
            aria-hidden="true"
          />
          {/* Scroll-linked draw — static full line under reduced motion */}
          <motion.div
            className="absolute bottom-0 left-[15px] top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-primary to-accent md:left-1/2"
            style={{ scaleY: reduced ? 1 : scaleY }}
            aria-hidden="true"
          />
          <ol className="space-y-12 md:space-y-16">
            {items.map((item, index) => (
              <TimelineNode key={item.id} item={item} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
