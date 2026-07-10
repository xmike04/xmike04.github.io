import SiteNav from '@/components/sections/site-nav';
import HeroSection from '@/components/hero/hero-section';
import StatsStrip from '@/components/sections/stats-strip';
import FlagshipProjects from '@/components/sections/flagship-projects';
import MlLab from '@/components/lab/ml-lab';
import AboutTerminal from '@/components/sections/about-terminal';
import ExperienceTimeline from '@/components/sections/experience-timeline';
import SkillsSection from '@/components/sections/skills-section';
import EducationSpotlight from '@/components/sections/education-spotlight';
import PressSection from '@/components/sections/press-section';
import GithubShowcase from '@/components/sections/github-showcase';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/sections/footer';
import ChatBot from '@/components/sections/chat-bot';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <HeroSection />
        <StatsStrip />
        <FlagshipProjects />
        <MlLab />
        <AboutTerminal />
        <ExperienceTimeline />
        <SkillsSection />
        <EducationSpotlight />
        <PressSection />
        <GithubShowcase />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
