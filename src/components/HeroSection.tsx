import { useEffect, useState } from 'react';
import { ArrowDown, Mail, Linkedin, Github } from 'lucide-react';
import GlobeScene from './GlobeScene';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const fullText = 'AI & DATA SCIENCE';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

  useEffect(() => {
    // Delay start after welcome screen
    const startDelay = setTimeout(() => {
      let frame = 0;
      const fps = 60; // 60 frames per second for smooth animation
      const revealsPerSecond = 15; // Reveal 15 characters per second
      const framesPerReveal = fps / revealsPerSecond; // ~4 frames per character reveal

      const interval = setInterval(() => {
        const revealedCount = Math.floor(frame / framesPerReveal);

        setDisplayText(
          fullText
            .split('')
            .map((letter, index) => {
              if (letter === ' ') return ' ';

              if (index < revealedCount) {
                // Character is revealed
                return fullText[index];
              } else {
                // Show rapidly cycling random characters
                return characters[Math.floor(Math.random() * characters.length)];
              }
            })
            .join('')
        );

        frame++;

        // Stop when all characters are revealed
        if (revealedCount >= fullText.replace(/ /g, '').length) {
          clearInterval(interval);
          setDisplayText(fullText);
        }
      }, 1000 / fps); // Run at 60fps

      return () => clearInterval(interval);
    }, 6000);

    return () => clearTimeout(startDelay);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-16">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center z-10 max-w-7xl">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-6 relative">
          {/* Mobile Globe - Behind content */}
          <div className="lg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] pointer-events-none z-0">
            <div className="relative h-[500px] w-[500px] opacity-30">
              <GlobeScene />
            </div>
          </div>

          {/* Greeting */}
          <div className="flex items-center gap-2 justify-center lg:justify-start relative z-10">
            <span className="w-10 h-[2px] bg-primary"></span>
            <p className="text-primary font-mono text-sm md:text-base animate-fade-in">
              Hello, I'm
            </p>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold animate-slide-up leading-tight relative z-10">
            <span className="gradient-text">Shashank R</span>
          </h1>

          {/* Typing Effect Title */}
          <div className="h-12 md:h-14 flex items-center justify-center lg:justify-start relative z-10">
            <span className="text-2xl md:text-3xl font-bold text-muted-foreground tracking-wider uppercase" style={{ fontFamily: '"Orbitron", "Rajdhani", monospace', letterSpacing: '0.15em' }}>
              <span className="inline-block min-w-[280px] sm:min-w-[400px] text-left">
                {displayText}
                <span
                  className={`inline-block w-0.5 h-8 bg-primary ml-2 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              </span>
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed relative z-10">
            Passionate about building intelligent systems using Machine Learning,
            Deep Learning, and cutting-edge AI technologies.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 relative z-10">
            <a
              href="mailto:r8013938@gmail.com"
              className="group relative p-3 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:glow hover:scale-110"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:glow hover:scale-110"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:glow hover:scale-110"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors pt-6 relative z-10"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll Down</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

        {/* Right - 3D Globe - Desktop only */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative h-[600px] w-[600px]">
            <GlobeScene />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;