'use client';

import dynamic from 'next/dynamic';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { resumeData } from '@/lib/resume-data';

// recharts is heavy and this chart sits below the fold — keep it out of first-load JS
const SkillsRadar = dynamic(() => import('@/components/charts/skills-radar'), {
  ssr: false,
  loading: () => <Skeleton className="h-[320px] w-full rounded-xl" />,
});

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-muted/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">Capabilities</p>
          <h2 className="font-headline text-3xl font-bold md:text-5xl">Technical Skills</h2>
        </div>

        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <Reveal direction="right" className="lg:sticky lg:top-24">
            <div className="glass rounded-2xl p-6">
              <SkillsRadar />
            </div>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {resumeData.skills.map((skillCategory) => (
              <RevealItem key={skillCategory.category}>
                <div className="glass h-full rounded-xl p-5 transition-colors hover:border-primary/25">
                  <h3 className="mb-3 font-headline text-sm font-bold uppercase tracking-wider text-foreground/90">
                    {skillCategory.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${skillCategory.category} technologies`}>
                    {skillCategory.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-mono text-xs font-normal" role="listitem">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
