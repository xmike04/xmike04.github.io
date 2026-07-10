'use client';

import { ExternalLink, Newspaper } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { resumeData } from '@/lib/resume-data';

/** Third-party proof: press coverage of the NASA PACE exhibit. Polished in Phase 2E. */
export default function PressSection() {
  return (
    <section id="press" className="bg-muted/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 flex items-center justify-center gap-4 text-center font-headline text-3xl font-bold md:text-5xl">
          <Newspaper className="h-8 w-8 text-primary md:h-10 md:w-10" />
          Press &amp; Proof
        </h2>
        <p className="mb-12 text-center text-muted-foreground">Don&apos;t take my word for it — third-party coverage of work I helped build.</p>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {resumeData.press.map((item) => (
            <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                <CardContent className="flex h-full flex-col gap-2 p-6">
                  <p className="font-mono text-xs uppercase tracking-wide text-primary">{item.outlet}</p>
                  <p className="font-headline text-lg font-semibold leading-snug">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <span className="mt-auto flex items-center gap-1 pt-2 text-xs text-muted-foreground group-hover:text-primary">
                    Read coverage <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
