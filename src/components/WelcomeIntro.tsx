import { useState, useEffect } from 'react';

const WelcomeIntro = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure component is mounted before showing
    setIsLoaded(true);

    // Stage progression - slower timing
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setStage(3), 2400),
      setTimeout(() => setStage(4), 3600),
      setTimeout(() => {
        setStage(5);
        // Start fade out
        setTimeout(() => setIsVisible(false), 800);
      }, 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!isVisible || !isLoaded) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${stage === 5 ? 'opacity-0' : 'opacity-100'
        }`}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridSlide 2s linear infinite',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 10 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Diagonal lines */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                width: '200%',
                top: `${i * 15}%`,
                left: '-50%',
                transform: 'rotate(-15deg)',
                animation: `slideRight ${15 + i * 2}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Expanding circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`absolute rounded-full border-2 border-primary/20 transition-all duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              width: `${(i + 1) * 120}px`,
              height: `${(i + 1) * 120}px`,
              animation: `expandPulse ${2 + i * 0.5}s ease-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Rotating hexagons */}
        {[0, 1].map((i) => (
          <div
            key={`hex-${i}`}
            className={`absolute transition-all duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              animation: `rotateHex ${20 + i * 10}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
            }}
          >
            <div className="w-full h-full border-2 border-secondary/20 rounded-lg" style={{ transform: 'rotate(45deg)' }} />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Robot Character */}
        <div
          className={`transition-all duration-700 flex justify-center ${stage >= 1
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-50 translate-y-20'
            }`}
        >
          <div className="relative scale-75 sm:scale-90 md:scale-100">
            {/* Robot Body */}
            <svg width="200" height="220" viewBox="0 0 200 220" className="drop-shadow-2xl">
              {/* Head */}
              <g className={stage >= 1 ? 'animate-bounce-subtle' : ''}>
                {/* Antenna */}
                <line x1="100" y1="20" x2="100" y2="35" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round">
                  <animate attributeName="y1" values="20;15;20" dur="2s" repeatCount="indefinite" />
                </line>
                <circle cx="100" cy="15" r="4" fill="hsl(var(--primary))" className="animate-pulse" />

                {/* Head box */}
                <rect x="70" y="35" width="60" height="50" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />

                {/* Eyes */}
                <circle cx="85" cy="55" r="6" fill="hsl(var(--primary))" className="animate-pulse">
                  <animate attributeName="r" values="6;4;6" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="115" cy="55" r="6" fill="hsl(var(--primary))" className="animate-pulse">
                  <animate attributeName="r" values="6;4;6" dur="3s" repeatCount="indefinite" begin="0.1s" />
                </circle>

                {/* Smile */}
                <path d="M 85 70 Q 100 78 115 70" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Ear details */}
                <circle cx="68" cy="60" r="3" fill="hsl(var(--muted))" />
                <circle cx="132" cy="60" r="3" fill="hsl(var(--muted))" />
              </g>

              {/* Neck */}
              <rect x="90" y="85" width="20" height="10" fill="hsl(var(--muted))" />

              {/* Body */}
              <rect x="60" y="95" width="80" height="70" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />

              {/* Chest display */}
              <rect x="75" y="110" width="50" height="30" rx="4" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />
              <text x="100" y="130" fill="hsl(var(--primary))" fontSize="16" fontFamily="monospace" textAnchor="middle">HI!</text>

              {/* Body lights */}
              <circle cx="72" cy="150" r="3" fill="hsl(var(--secondary))" className="animate-pulse" />
              <circle cx="128" cy="150" r="3" fill="hsl(var(--secondary))" className="animate-pulse" />

              {/* Left Arm - Static */}
              <g>
                <rect x="35" y="100" width="20" height="40" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
                <circle cx="45" cy="145" r="8" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="2" />
              </g>

              {/* Right Arm - Waving upward */}
              <g className={stage >= 2 ? '' : 'opacity-0'}>
                <rect x="145" y="60" width="20" height="40" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2">
                  {stage >= 2 && (
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 155 100; -35 155 100; 0 155 100"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  )}
                </rect>
                <circle cx="155" cy="55" r="8" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="2">
                  {stage >= 2 && (
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 155 100; -35 155 100; 0 155 100"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              </g>

              {/* Legs */}
              <rect x="70" y="165" width="22" height="40" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <rect x="108" y="165" width="22" height="40" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />

              {/* Feet */}
              <ellipse cx="81" cy="210" rx="15" ry="8" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <ellipse cx="119" cy="210" rx="15" ry="8" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="2" />
            </svg>

            {/* Speech bubble */}
            <div
              className={`absolute -right-20 sm:-right-24 top-8 transition-all duration-500 ${stage >= 2
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
                }`}
            >
              <div className="relative bg-card border-2 border-primary rounded-2xl px-4 py-2 sm:px-6 sm:py-3">
                <span className="text-primary font-bold text-xl sm:text-2xl">Hi! 👋</span>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-primary"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <div
          className={`transition-all duration-700 ${stage >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-10'
            }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-text mb-4 px-4">
            Welcome to My Portfolio
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className={`transition-all duration-700 delay-300 ${stage >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
            }`}
        >
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-mono px-4">
            Loading AI Experience...
          </p>
        </div>

        {/* Loading bar */}
        <div
          className={`transition-all duration-700 delay-500 px-4 ${stage >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
        >
          <div className="w-48 sm:w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1500 ease-out"
              style={{
                width: stage >= 4 ? '100%' : '0%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Corner brackets - Smaller on mobile */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-12 h-12 sm:w-20 sm:h-20 border-l-2 border-t-2 border-primary/40 animate-pulse" />
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 sm:w-20 sm:h-20 border-r-2 border-t-2 border-primary/40 animate-pulse" />
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-12 h-12 sm:w-20 sm:h-20 border-l-2 border-b-2 border-primary/40 animate-pulse" />
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-20 sm:h-20 border-r-2 border-b-2 border-primary/40 animate-pulse" />

      {/* Additional corner details - Hidden on mobile */}
      <div className="hidden sm:block absolute top-12 left-12 w-8 h-8 border-l border-t border-secondary/30" />
      <div className="hidden sm:block absolute top-12 right-12 w-8 h-8 border-r border-t border-secondary/30" />
      <div className="hidden sm:block absolute bottom-12 left-12 w-8 h-8 border-l border-b border-secondary/30" />
      <div className="hidden sm:block absolute bottom-12 right-12 w-8 h-8 border-r border-b border-secondary/30" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Flying tech elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Tech plane/drone 1 */}
        <div
          className="absolute"
          style={{
            animation: 'flyAcross1 8s linear infinite',
          }}
        >
          <svg width="80" height="40" viewBox="0 0 80 40" className="opacity-60">
            {/* Main body */}
            <path d="M 10 20 L 50 20 L 55 15 L 60 20 L 55 25 L 50 20 Z" fill="hsl(var(--primary))" opacity="0.6" />
            {/* Wings */}
            <path d="M 25 20 L 15 10 L 20 20 L 15 30 Z" fill="hsl(var(--primary))" opacity="0.4" />
            <path d="M 40 20 L 35 12 L 38 20 L 35 28 Z" fill="hsl(var(--primary))" opacity="0.4" />
            {/* Trail */}
            <line x1="10" y1="20" x2="0" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
            {/* Glow */}
            <circle cx="55" cy="20" r="3" fill="hsl(var(--primary))" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Tech plane/drone 2 */}
        <div
          className="absolute"
          style={{
            animation: 'flyAcross2 12s linear infinite',
            animationDelay: '3s',
          }}
        >
          <svg width="60" height="30" viewBox="0 0 60 30" className="opacity-50">
            {/* Simplified drone shape */}
            <rect x="20" y="12" width="20" height="6" rx="2" fill="hsl(var(--secondary))" opacity="0.6" />
            <circle cx="15" cy="15" r="4" fill="hsl(var(--secondary))" opacity="0.5" />
            <circle cx="45" cy="15" r="4" fill="hsl(var(--secondary))" opacity="0.5" />
            <line x1="15" y1="15" x2="10" y2="10" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.4" />
            <line x1="15" y1="15" x2="10" y2="20" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.4" />
            <line x1="45" y1="15" x2="50" y2="10" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.4" />
            <line x1="45" y1="15" x2="50" y2="20" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.4" />
            {/* Propeller glow */}
            <circle cx="15" cy="15" r="2" fill="hsl(var(--secondary))" opacity="0.8">
              <animate attributeName="r" values="2;4;2" dur="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="45" cy="15" r="2" fill="hsl(var(--secondary))" opacity="0.8">
              <animate attributeName="r" values="2;4;2" dur="0.3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Tech plane/drone 3 - opposite direction */}
        <div
          className="absolute"
          style={{
            animation: 'flyAcross3 10s linear infinite',
            animationDelay: '5s',
          }}
        >
          <svg width="70" height="35" viewBox="0 0 70 35" className="opacity-55" style={{ transform: 'scaleX(-1)' }}>
            {/* Futuristic jet */}
            <path d="M 10 17.5 L 40 17.5 L 50 12 L 55 17.5 L 50 23 L 40 17.5 Z" fill="hsl(var(--primary))" opacity="0.5" />
            <path d="M 20 17.5 L 15 10 L 18 17.5 L 15 25 Z" fill="hsl(var(--primary))" opacity="0.3" />
            <circle cx="50" cy="17.5" r="2" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="1;0.2;1" dur="0.4s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes expandPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes gridSlide {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translate(-10px, -60px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(-30px, -30px) scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(-100%) rotate(-15deg);
          }
          100% {
            transform: translateX(100%) rotate(-15deg);
          }
        }

        @keyframes rotateHex {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes flyAcross1 {
          0% {
            top: 20%;
            left: -10%;
          }
          100% {
            top: 30%;
            left: 110%;
          }
        }

        @keyframes flyAcross2 {
          0% {
            top: 60%;
            left: -8%;
          }
          100% {
            top: 50%;
            left: 108%;
          }
        }

        @keyframes flyAcross3 {
          0% {
            top: 40%;
            right: -10%;
          }
          100% {
            top: 70%;
            right: 110%;
          }
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomeIntro;