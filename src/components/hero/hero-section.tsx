'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { MagneticButton } from '@/components/motion/magnetic-button';
import { TextScramble } from '@/components/motion/text-scramble';
import HeroVisual from '@/components/hero/hero-visual';
import { resumeData } from '@/lib/resume-data';

export default function HeroSection() {
  const cooper = resumeData.workExperience[0];
  const masters = resumeData.education[0];

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="noise relative flex min-h-[max(100svh,700px)] items-center overflow-hidden pb-20 pt-28 lg:pt-24"
    >
      <HeroVisual />

      <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Headshot — first on mobile, right column on desktop */}
        <Reveal direction="none" delay={0.15} className="order-1 flex justify-center lg:order-2">
          <div className="relative">
            {/* Soft halo */}
            <div
              className="absolute -inset-8 rounded-full bg-[conic-gradient(from_140deg,hsl(var(--primary)/0.5),hsl(var(--accent)/0.5),hsl(var(--primary)/0.5))] opacity-30 blur-2xl"
              aria-hidden="true"
            />
            {/* Spinning conic ring */}
            <div className="relative h-44 w-44 overflow-hidden rounded-full p-1 sm:h-52 sm:w-52 lg:h-60 lg:w-60">
              <div
                className="absolute -inset-4 animate-[spin_7s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,hsl(var(--primary)),hsl(var(--accent))_50%,hsl(var(--primary)))] motion-reduce:animate-none"
                aria-hidden="true"
              />
              <Image
                src="/headshot.png"
                alt="Michael E. Marin, ML Engineer"
                width={240}
                height={240}
                priority
                className="relative h-full w-full rounded-full border-4 border-background object-cover"
              />
            </div>
          </div>
        </Reveal>

        <RevealGroup className="order-2 text-center lg:order-1 lg:text-left" stagger={0.1}>
          <RevealItem>
            <p className="mb-5 font-mono text-xs text-primary sm:text-sm">
              <TextScramble text="> ml_engineer --location dallas_tx" />
            </p>
          </RevealItem>

          <RevealItem>
            <h1 className="text-balance mb-5 font-headline text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-[4rem]">
              Building <span className="gradient-text">production AI systems</span> with measurable impact
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-foreground/90">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {resumeData.availability}
            </p>
          </RevealItem>

          <RevealItem>
            <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg lg:mx-0">
              I turn research-grade ML ideas into things people can actually use — real-time interfaces,
              LLM-powered products, and agentic tools. Currently building agentic AI at {cooper.company} while
              finishing an M.S. in Artificial Intelligence at UNT ({masters.date}).
            </p>
          </RevealItem>

          <RevealItem>
            <div className="mb-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <MagneticButton>
                <Button asChild size="lg" className="glow-primary rounded-full px-8 font-semibold">
                  <Link href="#projects">View Work</Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-background/40 px-8 backdrop-blur"
                >
                  <Link href="/resume">Resume</Link>
                </Button>
              </MagneticButton>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="flex items-center justify-center gap-5 lg:justify-start">
              <a
                href={resumeData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={resumeData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${resumeData.contact.email}`}
                aria-label={`Email ${resumeData.name}`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
              <span className="h-4 w-px bg-border" aria-hidden="true" />
              <span className="font-mono text-xs text-muted-foreground">
                {resumeData.contact.location.toLowerCase()}
              </span>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#highlights"
        aria-label="Scroll to highlights"
        className="absolute bottom-6 left-1/2 z-10 text-muted-foreground transition-colors hover:text-primary motion-reduce:hidden"
        style={{ x: '-50%' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
