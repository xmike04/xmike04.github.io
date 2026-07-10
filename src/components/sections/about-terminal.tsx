'use client';

import { BrainCircuit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { resumeData } from '@/lib/resume-data';

/** Phase-1 placeholder — becomes the animated `whoami` terminal card in Phase 2B. */
export default function AboutTerminal() {
  return (
    <section id="about" className="bg-muted/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 flex items-center justify-center gap-4 text-center font-headline text-3xl font-bold md:text-5xl">
          <BrainCircuit className="h-8 w-8 text-primary md:h-10 md:w-10" />
          About Me
        </h2>
        <Card className="mx-auto max-w-4xl border-2 border-primary/10 shadow-lg">
          <CardContent className="p-6 md:p-8">
            <p className="text-center text-base leading-relaxed text-muted-foreground md:text-xl">
              {resumeData.summary}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
