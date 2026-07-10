import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { MagneticButton } from '@/components/motion/magnetic-button';
import { Reveal } from '@/components/motion/reveal';
import { resumeData } from '@/lib/resume-data';

export default function ContactSection() {
  return (
    <section id="contact" className="mesh-bg noise relative overflow-hidden py-24 md:py-36">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">Get in touch</p>
            <h2 className="text-balance font-headline text-4xl font-bold leading-tight md:text-6xl">
              Let&apos;s build <span className="gradient-text">production AI</span> together
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg text-muted-foreground md:text-xl">
              {resumeData.availability} — full-time or contract.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <MagneticButton>
              <a
                href={`mailto:${resumeData.contact.email}`}
                className="glow-primary inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-headline text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:px-10 md:py-5 md:text-lg"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                {resumeData.contact.email}
              </a>
            </MagneticButton>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={resumeData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in new tab)"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={resumeData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <span className="glass flex items-center gap-1.5 rounded-full px-4 py-2.5 font-mono text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {resumeData.contact.location}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
