'use client';

import { BrainCircuit } from 'lucide-react';
import AiPlayground from '@/components/sections/ai-playground';

/** Phase-1 placeholder wrapping the legacy carousel — replaced by the tabbed Interactive ML Lab in Phase 2C. */
export default function MlLab() {
  return (
    <section id="lab" className="bg-muted/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 flex items-center justify-center gap-4 text-center font-headline text-3xl font-bold md:text-5xl">
          <BrainCircuit className="h-8 w-8 text-primary md:h-10 md:w-10" />
          Interactive ML Lab
        </h2>
        <AiPlayground />
      </div>
    </section>
  );
}
