import { useEffect, useState } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import DotMatrix from './DotMatrix';
import GlobeScene from './GlobeScene';
import bgImage from './james-harrison-vpOeXr5wmR4-unsplash.jpg';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const fullText = 'AI & DATA SCIENCE';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let frame = 0;
      const fps = 60;
      const revealsPerSecond = 15;
      const framesPerReveal = fps / revealsPerSecond;

      const interval = setInterval(() => {
        const revealedCount = Math.floor(frame / framesPerReveal);

        setDisplayText(
          fullText
            .split('')
            .map((letter, index) => {
              if (letter === ' ') return ' ';
              if (index < revealedCount) return fullText[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        frame++;

        if (revealedCount >= fullText.replace(/ /g, '').length) {
          clearInterval(interval);
          setDisplayText(fullText);
        }
      }, 1000 / fps);

      return () => clearInterval(interval);
    }, 6000);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-16"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background Overlay with Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40 dark:from-background dark:via-background/95 dark:to-background/70 z-0 pointer-events-none"></div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center z-10 max-w-7xl w-full relative">

        {/* Left Content */}
        <div className="text-center lg:text-left space-y-4 sm:space-y-6 relative w-full">

          {/* Mobile Visualization - Behind content */}
          <div className="lg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] pointer-events-none z-0 flex justify-center items-center">
            <div className="relative h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] opacity-30 flex justify-center items-center">
              <div className="w-full h-full dark:hidden flex justify-center items-center scale-75">
                <DotMatrix />
              </div>
              <div className="w-full h-full hidden dark:flex justify-center items-center">
                <GlobeScene />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="flex items-center gap-2 justify-center lg:justify-start relative z-10">
            <span className="w-8 sm:w-10 h-[2px] bg-primary"></span>
            <p className="text-primary font-mono text-xs sm:text-sm md:text-base animate-fade-in">
              Hello, I'm
            </p>
          </div>

          {/* Name */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal animate-slide-up leading-tight relative z-10 px-2 text-foreground tracking-wide"
          >
            <span className="dark:hidden gradient-text" style={{ fontFamily: "'Anton', sans-serif" }}>Shashank R</span>
            <span className="hidden dark:inline text-purple-400 font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              const <span className="text-cyan-400">developer</span> <span className="text-primary">=</span> <span className="gradient-text">'Shashank R'</span><span className="text-purple-400">;</span>
            </span>
          </h1>

          {/* Typing Effect Title */}
          <div className="h-10 sm:h-12 md:h-14 flex items-center justify-center lg:justify-start relative z-10 px-2">
            <span
              className="text-lg sm:text-2xl md:text-3xl font-bold text-muted-foreground tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
            >
              <span className="inline-block text-center lg:text-left">
                {displayText}
                <span className={`inline-block w-0.5 h-6 sm:h-8 bg-primary ml-1 sm:ml-2 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
              </span>
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed relative z-10 px-4 sm:px-2">
            Passionate about building intelligent systems using Machine Learning,
            Deep Learning, and cutting-edge AI technologies.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4 relative z-10">
            <a href="mailto:r8013938@gmail.com" className="group relative p-2.5 sm:p-3 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:glow hover:scale-110">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group relative p-2.5 sm:p-3 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:glow hover:scale-110">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group relative p-2.5 sm:p-3 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:glow hover:scale-110">
              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Scroll hint */}
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors pt-4 sm:pt-6 relative z-10 group"
          >
            <div
              className="w-px h-12 origin-top"
              style={{
                background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.8), transparent)',
                animation: 'scroll-line 2s ease-in-out infinite',
              }}
            />
            <span className="text-xs font-mono uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
              Scroll
            </span>
          </a>
        </div>

        {/* Right - Visualization - Desktop only */}
        <div className="hidden lg:flex justify-center items-center -translate-y-8 md:-translate-y-12">
          <div className="relative h-[600px] w-[600px]">
            <div className="w-full h-full dark:hidden flex justify-center items-center">
              <DotMatrix />
            </div>
            <div className="w-full h-full hidden dark:flex justify-center items-center">
              <GlobeScene />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;