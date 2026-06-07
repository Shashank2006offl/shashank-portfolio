import { useEffect, useState } from 'react';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import WelcomeIntro from '@/components/WelcomeIntro';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import AestheticBackground from '@/components/AestheticBackground';
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
  useSmoothScroll();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeIntro, setShowWelcomeIntro] = useState(true);

  useEffect(() => {
    document.title = 'Shashank R | AI & Data Science Portfolio';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Portfolio of Shashank R - AI & Data Science student specializing in Machine Learning, Deep Learning, and Computer Vision.');
    }
    
    // Set initial dark mode state
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains('dark');
    
    if (isCurrentlyDark) {
      // Switching from dark to light: change immediately without showing the code loader
      root.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      // Switching from light to dark: scroll to top, then show the code-typing LoadingScreen
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(true);
      root.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-background" style={{ overflowX: 'clip' }}>
      {/* Code-typing loader screen on initial page load only */}
      {isLoading && (
        <LoadingScreen 
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* WelcomeIntro with Explore button shown only when changing the theme */}
      <WelcomeIntro 
        visible={showWelcomeIntro} 
        onExplore={() => setShowWelcomeIntro(false)} 
      />

      <CustomCursor />
      <AestheticBackground />

      {/* Main content */}
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
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
  );
};

export default Index;