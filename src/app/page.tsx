
import { Mail, Github, Linkedin, Phone, Code, BrainCircuit, Rocket, Briefcase, GraduationCap, Building, Link as LinkIcon } from 'lucide-react';
import { resumeData, resumeText } from '@/lib/resume-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AnimatedTimeline from '@/components/animated-timeline';
import NeuralNetGame from '@/components/neural-net-game';
import ChatBot from '@/components/chat-bot';
import type { ElementType } from 'react';
import Link from 'next/link';

interface SectionProps {
  id: string;
  title: string;
  icon: ElementType;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ id, title, icon: Icon, children, className = '' }: SectionProps) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="container mx-auto px-4">
      <h2 className="font-headline text-4xl md:text-5xl font-bold mb-12 text-center flex items-center justify-center gap-4">
        <Icon className="w-10 h-10 text-primary" />
        {title}
      </h2>
      {children}
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="fixed top-0 left-0 right-0 p-4 z-20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="#hero" className="font-headline text-2xl font-bold text-primary">Marin Insights</Link>
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild><Link href="#about">About</Link></Button>
            <Button variant="ghost" asChild><Link href="#experience">Experience</Link></Button>
            <Button variant="ghost" asChild><Link href="#skills">Skills</Link></Button>
            <Button variant="accent" asChild><Link href="#contact">Contact</Link></Button>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu can be added here if needed */}
          </div>
        </div>
      </header>

      <main>
        <section id="hero" className="h-screen min-h-[700px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10 text-center container mx-auto px-4">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              Michael E. Marin
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-8">
              AI/ML Engineer & Product Innovator
            </p>
            <div className="flex justify-center items-center gap-4 mb-8">
              <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg">
                <Link href="#experience">View My Work</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full shadow-lg">
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </div>
            <div className="flex justify-center gap-6 mt-12">
              <Link href="mailto:miked24977@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="w-7 h-7" /></Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-7 h-7" /></Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-7 h-7" /></Link>
              <Link href="tel:+14699800069" className="text-muted-foreground hover:text-primary transition-colors"><Phone className="w-7 h-7" /></Link>
            </div>
          </div>
        </section>

        <Section id="about" title="About Me" icon={BrainCircuit}>
          <Card className="max-w-4xl mx-auto shadow-lg border-2 border-primary/10">
            <CardContent className="p-8">
              <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
                {resumeData.summary}
              </p>
            </CardContent>
          </Card>
        </Section>

        <Section id="skills" title="Technical Skills" icon={Code} className="bg-muted/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <NeuralNetGame />
        </Section>
        
        <Section id="education" title="Education" icon={GraduationCap}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {resumeData.education.map((edu, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-headline text-xl">{edu.degree}</CardTitle>
                      <CardDescription>{edu.school}</CardDescription>
                    </div>
                    <Badge variant="outline">{edu.date}</Badge>
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
            <p className="text-xl text-muted-foreground mb-8">
              I'm actively seeking opportunities in AI/ML and Product Management. Let's connect!
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg">
              <a href={`mailto:${resumeData.contact.email}`}>Send me an email</a>
            </Button>
          </div>
        </Section>
      </main>

      <footer className="bg-foreground text-muted-foreground text-center p-6">
        <div className="flex justify-center gap-6 mb-4">
            <Link href={`mailto:${resumeData.contact.email}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Mail className="w-6 h-6" /></Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Github className="w-6 h-6" /></Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></Link>
            <Link href={`tel:${resumeData.contact.phone}`} className="hover:text-primary transition-colors"><Phone className="w-6 h-6" /></Link>
        </div>
        <p>&copy; 2024 Michael E. Marin. All Rights Reserved.</p>
      </footer>
      
      <ChatBot resume={resumeText} />
    </div>
  );
}

// A simple decorative pattern
const GridPattern = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 h-full w-full"
  >
    <defs>
      <pattern
        id="grid-pattern"
        width="72"
        height="72"
        patternUnits="userSpaceOnUse"
        x="50%"
        y="50%"
      >
        <path d="M.5 71.5V.5H71.5" fill="none" className="stroke-primary/20" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);
