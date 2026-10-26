import { Award, CheckCircle2, GraduationCap } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { resumeData } from '@/lib/resume-data';

export default function EducationSpotlight() {
  const [ms, bs] = resumeData.education;
  const coursework = 'coursework' in ms && ms.coursework ? ms.coursework : [];

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
                <div className="flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-center">
                  <GraduationCap className="h-9 w-9 text-primary" aria-hidden="true" />
                  <span className="mt-3 font-headline text-xl font-bold">M.S. AI</span>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">ML concentration</span>
                </div>
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
                        Selected graduate coursework
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
              </article>
            </Reveal>

            <Reveal direction="left" delay={0.15}>
              <article className="glass flex h-full flex-col gap-4 rounded-xl p-6">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                  <Award className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Cloud credentials
                </span>
                <ul className="space-y-4">
                  {resumeData.certifications.map((certification) => (
                    <li key={certification.name}>
                      <p className="text-sm font-semibold text-foreground">{certification.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {certification.issuer} · {certification.date}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
