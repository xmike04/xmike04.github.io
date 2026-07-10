'use client';

import { Briefcase } from 'lucide-react';
import AnimatedTimeline from '@/components/sections/animated-timeline';
import { resumeData } from '@/lib/resume-data';

/** Phase-1 placeholder wrapping the legacy timeline — rebuilt with scroll-linked line draw in Phase 2E. */
export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 flex items-center justify-center gap-4 text-center font-headline text-3xl font-bold md:text-5xl">
          <Briefcase className="h-8 w-8 text-primary md:h-10 md:w-10" />
          Experience &amp; Projects
        </h2>
        <AnimatedTimeline items={[...resumeData.workExperience, ...resumeData.projects]} />
      </div>
    </section>
  );
}
