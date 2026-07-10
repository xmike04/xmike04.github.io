'use client';

import { CountUp } from '@/components/motion/count-up';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { resumeData } from '@/lib/resume-data';
import { cn } from '@/lib/utils';

/** Single glass proof band driven by resumeData.heroStats. */
export default function StatsStrip() {
  return (
    <section id="highlights" aria-label="Career highlights" className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <RevealGroup
          className="glass mx-auto grid max-w-5xl grid-cols-2 overflow-hidden rounded-2xl md:grid-cols-4"
          stagger={0.08}
        >
          {resumeData.heroStats.map((stat, i) => (
            <RevealItem
              key={stat.label}
              className={cn(
                'flex flex-col items-center gap-1.5 border-border/50 px-5 py-8 text-center',
                i % 2 === 1 && 'border-l',
                i >= 2 && 'border-t md:border-t-0',
                i > 0 && 'md:border-l'
              )}
            >
              <p className="font-headline text-3xl font-bold text-primary md:text-4xl">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </p>
              <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-foreground/80">
                {stat.label}
              </p>
              {stat.sub ? <p className="text-xs leading-relaxed text-muted-foreground">{stat.sub}</p> : null}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
