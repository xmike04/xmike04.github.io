
'use client';

import { Mail, Github, Linkedin, Code, BrainCircuit, Rocket, Briefcase, GraduationCap, Star, ArrowRight, Menu, X } from 'lucide-react';
import { resumeData, resumeText } from '@/lib/resume-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AnimatedTimeline from '@/components/sections/animated-timeline';
import AiPlayground from '@/components/sections/ai-playground';
import ChatBot from '@/components/sections/chat-bot';
import type { ElementType } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// ── Flagship project definitions ─────────────────────────────────────────────
// LLM Life Simulator is a placeholder; the other two map to existing case studies.
const flagshipProjects = [
  {
    id: 'nasa-waving-project',
    title: 'NASA PACE — Waving',
    problem: 'Scientists needed an interactive way to explore real-time oceanographic satellite data.',
    result: 'Led 5-person team to ship a live visualization platform, now exhibited at Kennedy Space Center.',
    stack: ['React', 'TypeScript', 'Unity', 'OpenCV', 'ZED SDK', 'GraphQL'],
    caseStudyHref: '/item/nasa-waving-project' as string | null,
    status: 'live' as 'live' | 'coming-soon',
  },
  {
    id: 'ragops-platform',
    title: 'RAGOps',
    problem: 'Naive RAG systems hallucinate and give no way to measure or improve retrieval quality.',
    result: 'Hybrid retrieval pipeline raised Recall@10 from 58% to 81% with full query observability.',
    stack: ['Python', 'FastAPI', 'pgvector', 'BM25', 'PostgreSQL', 'Celery'],
    caseStudyHref: '/item/ragops-platform' as string | null,
    status: 'live' as 'live' | 'coming-soon',
  },
  {
    id: 'llm-life-simulator',
    title: 'LLM Life Simulator',
    problem: 'Exploring how LLMs reason across long-horizon decisions and simulate emergent behavior.',
    result: 'In development — multi-agent memory, planning, and behavioral divergence experiments.',
    stack: ['Python', 'LLM API', 'Multi-agent'],
    caseStudyHref: null,
    status: 'coming-soon' as 'live' | 'coming-soon',
  },
] as const;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  interface SectionProps {
    id: string;
    title: string;
    icon: ElementType;
    children: React.ReactNode;
    className?: string;
  }

  function Section({ id, title, icon: Icon, children, className = '' }: SectionProps) {
    return (
      <section id={id} className={cn('py-16 md:py-24', className)}>
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-12 text-center flex items-center justify-center gap-4">
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            {title}
          </h2>
          {children}
        </div>
      </section>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* ── Nav ── */}
      <header className="fixed top-0 left-0 right-0 p-4 z-30 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="#hero" className="font-headline text-2xl font-bold text-primary">Michael Marin</Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Button key={href} variant="ghost" asChild>
                <Link href={href}>{label}</Link>
              </Button>
            ))}
            <Button asChild><Link href="#contact">Contact</Link></Button>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
        <div className={cn(
          "md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="flex flex-col items-center p-4 gap-2">
            {navLinks.map(({ href, label }) => (
              <Button key={href} variant="ghost" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
                <Link href={href}>{label}</Link>
              </Button>
            ))}
            <Button className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href="#contact">Contact</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section id="hero" aria-label="Introduction" className="h-screen min-h-[700px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" aria-hidden="true" />
          <div className="relative z-10 text-center container mx-auto px-4 max-w-3xl">
            <Image
              src="/headshot.png"
              alt="Michael E. Marin, ML Engineer"
              width={140}
              height={140}
              className="rounded-full w-[140px] h-[140px] object-cover mx-auto mb-6 border-4 border-primary/20 shadow-lg"
              priority
            />
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              AI / ML Engineer
            </p>
            <h1 className="font-headline text-3xl md:text-5xl lg:text-[3.5rem] font-bold mb-5 leading-tight">
              ML Engineer building production AI systems with measurable impact
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Collaborated with NASA on applied ML research. Specializing in agentic AI pipelines, hybrid retrieval systems, and full-stack products that ship.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10">
              <Button asChild size="lg" className="rounded-full shadow-lg w-full sm:w-auto px-8">
                <Link href="#projects">View Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full shadow-lg w-full sm:w-auto px-8">
                <Link href="/resume" target="_blank" rel="noopener noreferrer">Download Resume</Link>
              </Button>
            </div>
            <div className="flex justify-center items-center gap-6 flex-wrap" role="list" aria-label="Contact and social links">
              <a role="listitem" href="mailto:miked24977@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                aria-label="Email Michael">
                <Mail className="w-4 h-4" aria-hidden="true" />
                miked24977@gmail.com
              </a>
              <a role="listitem" href="https://github.com/xmike04" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                aria-label="GitHub profile">
                <Github className="w-4 h-4" aria-hidden="true" />
                GitHub
              </a>
              <a role="listitem" href="https://linkedin.com/in/xmike04" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                aria-label="LinkedIn profile">
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* ── Flagship Projects ── */}
        <Section id="projects" title="Flagship Projects" icon={Star}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {flagshipProjects.map((project) => (
              <Card key={project.id} className="flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <CardTitle className="font-headline text-lg leading-snug">{project.title}</CardTitle>
                    {project.status === 'coming-soon' && (
                      <Badge variant="outline" className="shrink-0 text-xs">In Dev</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">{project.problem}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1">
                  <p className="text-sm font-medium leading-snug">
                    {project.result}
                  </p>
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tech stack">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs" role="listitem">{tech}</Badge>
                    ))}
                  </div>
                  <div className="mt-auto pt-2">
                    {project.caseStudyHref ? (
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={project.caseStudyHref}>
                          Case Study
                          <ArrowRight className="w-3.5 h-3.5 ml-2" aria-hidden="true" />
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full" disabled aria-label="Case study coming soon">
                        Case Study Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── About ── */}
        <Section id="about" title="About Me" icon={BrainCircuit} className="bg-muted/10">
          <Card className="max-w-4xl mx-auto shadow-lg border-2 border-primary/10">
            <CardContent className="p-6 md:p-8">
              <p className="text-base md:text-xl text-center text-muted-foreground leading-relaxed">
                {resumeData.summary}
              </p>
            </CardContent>
          </Card>
        </Section>

        {/* ── Resume Highlights ── */}
        <Section id="highlights" title="Resume Highlights" icon={Rocket}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: "81%",       label: "Recall@10",        detail: "RAGOps hybrid retrieval vs 58% dense-only baseline" },
              { metric: "NASA",      label: "PACE Satellite",   detail: "Real-time oceanographic data visualization for NASA's PACE mission" },
              { metric: "5-person",  label: "Team Lead",        detail: "Led cross-functional engineering team on NASA capstone" },
              { metric: "150+",      label: "Benchmark Queries", detail: "Human-labeled evaluation dataset for LLM system quality" },
            ].map((h) => (
              <Card key={h.label} className="shadow-md text-center">
                <CardContent className="p-6 flex flex-col gap-2">
                  <p className="font-headline text-4xl font-bold text-primary">{h.metric}</p>
                  <p className="font-semibold text-sm uppercase tracking-wide">{h.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{h.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── Skills ── */}
        <Section id="skills" title="Technical Skills" icon={Code} className="bg-muted/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {resumeData.skills.map((skillCategory) => (
              <Card key={skillCategory.category} className="shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{skillCategory.category}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {skillCategory.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">{tech}</Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── Experience timeline ── */}
        <Section id="experience" title="Experience & Projects" icon={Briefcase}>
          <AnimatedTimeline items={[...resumeData.workExperience, ...resumeData.projects]} />
        </Section>

        {/* ── AI Playground (de-emphasized — below the fold) ── */}
        <Section id="playground" title="AI Playground" icon={BrainCircuit} className="bg-muted/10">
          <div className="container mx-auto px-4">
            <AiPlayground />
          </div>
        </Section>

        {/* ── Education ── */}
        <Section id="education" title="Education" icon={GraduationCap}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {resumeData.education.map((edu, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <CardTitle className="font-headline text-xl">{edu.degree}</CardTitle>
                      <CardDescription>{edu.school}</CardDescription>
                    </div>
                    <Badge variant="outline" className="mt-2 sm:mt-0">{edu.date}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {edu.gpa && <li>GPA: {edu.gpa}</li>}
                    {edu.grade && <li>{edu.grade}</li>}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── Contact ── */}
        <Section id="contact" title="Get In Touch" icon={Mail} className="bg-foreground text-background">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Actively seeking ML Engineer and AI Product roles. Open to full-time and contract.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg">
              <a href="mailto:miked24977@gmail.com">miked24977@gmail.com</a>
            </Button>
          </div>
        </Section>

      </main>

      <footer className="bg-foreground text-muted-foreground text-center p-6">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="mailto:miked24977@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Email"><Mail className="w-6 h-6" /></Link>
          <Link href="https://github.com/xmike04" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="GitHub"><Github className="w-6 h-6" /></Link>
          <Link href="https://linkedin.com/in/xmike04" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin className="w-6 h-6" /></Link>
        </div>
        <p>&copy; 2024 Michael E. Marin. All Rights Reserved.</p>
      </footer>

      <ChatBot resume={resumeText} />
    </div>
  );
}
