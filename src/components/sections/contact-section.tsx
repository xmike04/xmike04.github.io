'use client';

import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resumeData } from '@/lib/resume-data';

/** Phase-1 placeholder — becomes the gradient-mesh finale band in Phase 2E. */
export default function ContactSection() {
  return (
    <section id="contact" className="bg-foreground py-16 text-background md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 flex items-center justify-center gap-4 text-center font-headline text-3xl font-bold md:text-5xl">
          <Mail className="h-8 w-8 text-primary md:h-10 md:w-10" />
          Get In Touch
        </h2>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">{resumeData.availability}. Open to full-time and contract.</p>
          <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
            <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
