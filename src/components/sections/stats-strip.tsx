'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CountUp } from '@/components/motion/count-up';
import { resumeData } from '@/lib/resume-data';

/** Count-up proof bar driven by resumeData.heroStats. Polished further in Phase 2B. */
export default function StatsStrip() {
  return (
    <section id="highlights" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resumeData.heroStats.map((stat) => (
            <Card key={stat.label} className="glass text-center shadow-md">
              <CardContent className="flex flex-col gap-2 p-6">
                <p className="font-headline text-4xl font-bold text-primary">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                </p>
                <p className="text-sm font-semibold uppercase tracking-wide">{stat.label}</p>
                {stat.sub ? <p className="text-xs leading-relaxed text-muted-foreground">{stat.sub}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
