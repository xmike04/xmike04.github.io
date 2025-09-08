
'use client';

import { Mail, Github, Linkedin, Phone, Code, BrainCircuit, Rocket, Briefcase, GraduationCap, Building, Link as LinkIcon, Menu, X } from 'lucide-react';
import { resumeData, resumeText } from '@/lib/resume-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AnimatedTimeline from '@/components/animated-timeline';
import AiPlayground from '@/components/ai-playground';
import ChatBot from '@/components/chat-bot';
import type { ElementType } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'About' },
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
      <header className="fixed top-0 left-0 right-0 p-4 z-30 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="#hero" className="font-headline text-2xl font-bold text-primary">Marin Insights</Link>
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
        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}>
            <nav className="flex flex-col items-center p-4 gap-2">
                {navLinks.map(({href, label}) => (
                    <Button key={href} variant="ghost" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
                        <Link href={href}>{label}</Link>
                    </Button>
                ))}
                 <Button variant="accent" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link href="#contact">Contact</Link>
                </Button>
            </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="h-screen min-h-[700px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10 text-center container mx-auto px-4">
             <Image
              src="https://picsum.photos/200/200"
              alt="Michael E. Marin"
              width={200}
              height={200}
              className="rounded-full w-[200px] h-[200px] object-cover mx-auto mb-8 border-4 border-primary/20 shadow-lg"
              data-ai-hint="headshot"
              priority
            />
            <h1 className="font-headline text-4xl md:text-7xl lg:text-8xl font-bold mb-4">
              Michael E. Marin
            </h1>
            <p className="text-lg md:text-2xl text-primary font-medium mb-8">
              AI/ML Engineer & Product Innovator
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg w-full sm:w-auto">
                <Link href="#experience">View My Work</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full shadow-lg w-full sm:w-auto">
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </div>
            <div className="flex justify-center gap-6 mt-12">
              <Link href="mailto:miked24977@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="w-7 h-7" /></Link>
              <Link href="https://github.com/xmike04" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-7 h-7" /></Link>
              <Link href="https://linkedin.com/in/xmike04" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-7 h-7" /></Link>
              <Link href="tel:4699800069" className="text-muted-foreground hover:text-primary transition-colors"><Phone className="w-7 h-7" /></Link>
            </div>
          </div>
        </section>

        <Section id="about" title="About Me" icon={BrainCircuit}>
          <Card className="max-w-4xl mx-auto shadow-lg border-2 border-primary/10">
            <CardContent className="p-6 md:p-8">
              <p className="text-base md:text-xl text-center text-muted-foreground leading-relaxed">
                {resumeData.summary}
              </p>
            </CardContent>
          </Card>
        </Section>

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

        <Section id="experience" title="Experience & Projects" icon={Briefcase}>
          <AnimatedTimeline items={[...resumeData.workExperience, ...resumeData.projects]} />
        </Section>

        <Section id="playground" title="AI Playground" icon={Rocket} className="bg-muted/10">
          <div className="container mx-auto px-4">
            <AiPlayground />
          </div>
        </Section>
        
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
                    {edu.grade && <li>Grade: {edu.grade}</li>}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
        
        <Section id="contact" title="Get In Touch" icon={Mail} className="bg-foreground text-background">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              I'm actively seeking opportunities in AI/ML and Product Management. Let's connect!
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg">
              <a href="mailto:miked24977@gmail.com">Send me an email</a>
            </Button>
          </div>
        </Section>
      </main>

      <footer className="bg-foreground text-muted-foreground text-center p-6">
        <div className="flex justify-center gap-6 mb-4">
            <Link href="mailto:miked24977@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Mail className="w-6 h-6" /></Link>
            <Link href="https://github.com/xmike04" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Github className="w-6 h-6" /></Link>
            <Link href="https://linkedin.com/in/xmike04" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></Link>
            <Link href="tel:4699800069" className="hover:text-primary transition-colors"><Phone className="w-6 h-6" /></Link>
        </div>
        <p>&copy; 2024 Michael E. Marin. All Rights Reserved.</p>
      </footer>
      
      <ChatBot resume={resumeText} />
    </div>
  );
}
