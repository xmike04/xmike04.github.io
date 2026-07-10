'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resumeData } from '@/lib/resume-data';

/** Phase-1 placeholder — replaced by the immersive 3D hero in Phase 2B. */
export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="mesh-bg relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden"
    >
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
        <Image
          src="/headshot.png"
          alt="Michael E. Marin, ML Engineer"
          width={140}
          height={140}
          className="mx-auto mb-6 h-[140px] w-[140px] rounded-full border-4 border-primary/20 object-cover shadow-lg"
          priority
        />
        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
          {resumeData.role}
        </p>
        <h1 className="mb-5 font-headline text-3xl font-bold leading-tight md:text-5xl lg:text-[3.5rem]">
          ML Engineer building <span className="gradient-text">production AI systems</span> with measurable impact
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Collaborated with NASA on applied ML research. Specializing in agentic AI pipelines, hybrid retrieval
          systems, and full-stack products that ship.
        </p>
        <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full rounded-full px-8 shadow-lg sm:w-auto">
            <Link href="#projects">View Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full rounded-full px-8 shadow-lg sm:w-auto">
            <Link href="/resume" target="_blank" rel="noopener noreferrer">
              Download Resume
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6" role="list" aria-label="Contact and social links">
          <a
            role="listitem"
            href={`mailto:${resumeData.contact.email}`}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            aria-label="Email Michael"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {resumeData.contact.email}
          </a>
          <a
            role="listitem"
            href={resumeData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            aria-label="GitHub profile"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            role="listitem"
            href={resumeData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
