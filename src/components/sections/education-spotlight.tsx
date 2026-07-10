'use client';

import { useRef } from 'react';
import { CheckCircle2, GraduationCap, Users } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { CountUp } from '@/components/motion/count-up';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { resumeData } from '@/lib/resume-data';

const RING_SIZE = 168;
const RING_STROKE = 10;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Animated sweep to `progress` (0–1); renders the final state under reduced motion. */
function ProgressRing({ progress, label }: { progress: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const targetOffset = RING_CIRCUMFERENCE * (1 - progress);
  const percent = Math.round(progress * 100);

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      role="img"
      aria-label={`Degree progress: ${percent}% — ${label}`}
    >
      <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} className="-rotate-90">
        <defs>
          <linearGradient id="edu-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={RING_STROKE}
        />
        <motion.circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="url(#edu-ring-gradient)"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          initial={{ strokeDashoffset: reduced ? targetOffset : RING_CIRCUMFERENCE }}
          animate={{ strokeDashoffset: inView || reduced ? targetOffset : RING_CIRCUMFERENCE }}
          transition={{ duration: reduced ? 0 : 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <CountUp value={percent} suffix="%" className="font-headline text-3xl font-bold text-primary" />
        <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

export default function EducationSpotlight() {
  const [ms, bs] = resumeData.education;
  const msProgress = 'progress' in ms && typeof ms.progress === 'number' ? ms.progress : 0;
  const coursework = 'coursework' in ms && ms.coursework ? ms.coursework : [];
  const bsGpa = 'gpa' in bs && bs.gpa ? bs.gpa : null;
  const interest = resumeData.interests[0];

  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">Academic foundation</p>
          <h2 className="font-headline text-3xl font-bold md:text-5xl">Education</h2>
          <p className="mt-4 text-muted-foreground">
            Pursuing a master&apos;s in AI while shipping production systems.
          </p>
        </div>

        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {/* MS hero card */}
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-primary/40 via-border/40 to-accent/40 p-px">
              <article className="flex flex-col items-center gap-8 rounded-[calc(1rem-1px)] bg-card/70 p-8 backdrop-blur-xl md:flex-row md:items-center md:gap-12 md:p-12">
                <ProgressRing progress={msProgress} label="Year 1 of 2" />
                <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                  <Badge className="rounded-full border-primary/30 bg-primary/10 font-mono text-xs font-medium text-primary hover:bg-primary/10">
                    {ms.date}
                  </Badge>
                  <div>
                    <h3 className="font-headline text-2xl font-bold leading-tight md:text-3xl">{ms.degree}</h3>
                    <p className="mt-2 flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
                      <GraduationCap className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {ms.school}
                    </p>
                  </div>
                  {coursework.length > 0 ? (
                    <div>
                      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        Current coursework
                      </p>
                      <div className="flex flex-wrap justify-center gap-1.5 md:justify-start" role="list" aria-label="Current coursework">
                        {coursework.map((course) => (
                          <Badge
                            key={course}
                            variant="secondary"
                            className="font-mono text-xs font-normal"
                            title={course}
                            role="listitem"
                          >
                            {course.split(' — ')[0]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {/* BS card */}
            <Reveal direction="right" delay={0.1}>
              <article className="glass flex h-full flex-col gap-3 rounded-xl p-6">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  Graduated · {bs.date}
                </span>
                <h3 className="font-headline text-lg font-bold leading-snug">{bs.degree}</h3>
                <p className="text-sm text-muted-foreground">{bs.school}</p>
                {bsGpa ? <p className="mt-auto font-mono text-sm text-foreground/80">GPA {bsGpa}</p> : null}
              </article>
            </Reveal>

            {/* Community note */}
            {interest ? (
              <Reveal direction="left" delay={0.15}>
                <article className="glass flex h-full flex-col gap-3 rounded-xl p-6">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Beyond the classroom
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{interest}</p>
                </article>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
