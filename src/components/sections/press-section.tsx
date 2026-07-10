import { ArrowUpRight } from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { resumeData } from '@/lib/resume-data';

/** First word of the outlet name reads like a masthead mark: UMD, NASA. */
function outletMonogram(outlet: string): string {
  return outlet.split(/\s+/)[0].slice(0, 4).toUpperCase();
}

export default function PressSection() {
  return (
    <section id="press" className="bg-muted/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Third-party proof of the NASA PACE exhibit
          </p>
          <h2 className="font-headline text-3xl font-bold md:text-5xl">Independent Coverage</h2>
        </div>

        <RevealGroup className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3" stagger={0.1}>
          {resumeData.press.map((item) => (
            <RevealItem key={item.url} className="h-full">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`${item.title} — ${item.outlet} (opens in new tab)`}
              >
                <SpotlightCard as="article" className="glass h-full rounded-xl transition-colors hover:border-primary/25">
                  <div className="flex h-full flex-col gap-3 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 font-mono text-xs font-bold text-primary"
                        aria-hidden="true"
                      >
                        {outletMonogram(item.outlet)}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{item.outlet}</p>
                    <h3 className="font-headline text-lg font-semibold leading-snug">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <span className="mt-auto pt-2 font-mono text-xs text-primary">Read coverage →</span>
                  </div>
                </SpotlightCard>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
