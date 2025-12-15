import { useEffect, useState } from 'react';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import WelcomeIntro from '@/components/WelcomeIntro';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import Hero from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import RoadmapSection from '@/components/roadmapItems';
import ProjectsSection from '@/components/ProjectsSection';
import DesignDecisionsSection from '@/components/DesignDecisionsSection'; 
import PublicationsSection from '@/components/PublicationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Use smooth scroll hook
  useSmoothScroll();

  useEffect(() => {
    // Prevent flash of content
    setIsReady(true);

    // Update page title
    document.title = 'Shashank R | AI & Data Science Portfolio';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Portfolio of Shashank R - AI & Data Science student specializing in Machine Learning, Deep Learning, and Computer Vision.');
    }

    // Show main content after welcome screen duration
    const timer = setTimeout(() => {
      setShowMainContent(true);
    }, 5800); // Match the welcome screen duration

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <div className="fixed inset-0 bg-background z-[200]" />;
  }

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <WelcomeIntro />
      <div className={`transition-opacity duration-500 ${showMainContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ParticleBackground />
        <Navigation />
        <main>
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <PublicationsSection />
          <RoadmapSection />
          <DesignDecisionsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;