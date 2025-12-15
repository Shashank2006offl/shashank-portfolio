import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [mouseTrail, setMouseTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      // Reduce particles on mobile
      const particleCount = isMobile ? 30 : 80;
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 25 + 15,
          delay: Math.random() * 10,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [isMobile]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });

      // Add to mouse trail
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setMouseTrail((prev) => {
        const updated = [...prev, newTrail];
        // Keep only last 15 trail points
        return updated.slice(-15);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated lines canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const lines: Array<{ x: number; y: number; speedX: number; speedY: number }> = [];
    for (let i = 0; i < 5; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw lines
      ctx.strokeStyle = 'rgba(8, 145, 178, 0.1)';
      ctx.lineWidth = 1;

      lines.forEach((line, i) => {
        line.x += line.speedX;
        line.y += line.speedY;

        if (line.x < 0 || line.x > canvas.width) line.speedX *= -1;
        if (line.y < 0 || line.y > canvas.height) line.speedY *= -1;

        // Draw connections
        for (let j = i + 1; j < lines.length; j++) {
          const dx = lines[j].x - line.x;
          const dy = lines[j].y - line.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 300) {
            ctx.beginPath();
            ctx.moveTo(line.x, line.y);
            ctx.lineTo(lines[j].x, lines[j].y);
            ctx.globalAlpha = 1 - distance / 300;
            ctx.stroke();
          }
        }

        // Draw dots
        ctx.beginPath();
        ctx.arc(line.x, line.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.globalAlpha = 1;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Dynamic grid around mouse cursor
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let currentMouseX = window.innerWidth / 2;
    let currentMouseY = window.innerHeight / 2;
    let gridPoints: Array<{ x: number; y: number; baseX: number; baseY: number; angle: number; speed: number }> = [];

    // Create grid points around cursor - random distribution
    const createGridPoints = () => {
      gridPoints = [];
      const radius = 180;
      const numPoints = 60;

      for (let i = 0; i < numPoints; i++) {
        const randomAngle = Math.random() * Math.PI * 2;
        const randomRadius = Math.random() * radius + 30;
        const x = Math.cos(randomAngle) * randomRadius;
        const y = Math.sin(randomAngle) * randomRadius;

        gridPoints.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.03 + 0.005,
        });
      }
    };

    createGridPoints();

    const handleMouseMove = (e: MouseEvent) => {
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update grid points with wave motion
      gridPoints.forEach(point => {
        point.angle += point.speed;
        point.x = point.baseX + Math.sin(point.angle) * 5;
        point.y = point.baseY + Math.cos(point.angle) * 5;
      });

      // Draw connections between nearby points
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 0.8;

      gridPoints.forEach((point, i) => {
        const screenX = currentMouseX + point.x;
        const screenY = currentMouseY + point.y;
        const distance = Math.sqrt(point.x * point.x + point.y * point.y);
        const opacity = (1 - distance / 180) * 0.5;

        // Draw connections to nearby points
        for (let j = i + 1; j < gridPoints.length; j++) {
          const other = gridPoints[j];
          const dx = other.x - point.x;
          const dy = other.y - point.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45) {
            ctx.globalAlpha = opacity * (1 - dist / 45) * 0.6;
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(currentMouseX + other.x, currentMouseY + other.y);
            ctx.stroke();
          }
        }

        // Draw point - smaller size
        ctx.globalAlpha = opacity * 0.8;
        ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
        ctx.beginPath();
        ctx.arc(screenX, screenY, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw cursor glow - smaller and subtler
      const gradient = ctx.createRadialGradient(
        currentMouseX, currentMouseY, 0,
        currentMouseX, currentMouseY, 120
      );
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.1)');
      gradient.addColorStop(0.6, 'rgba(6, 182, 212, 0.03)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

      ctx.globalAlpha = 1;
      ctx.fillStyle = gradient;
      ctx.fillRect(currentMouseX - 120, currentMouseY - 120, 240, 240);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor - Hidden on mobile - MOVED OUTSIDE main container */}
      {!isMobile && (
        <div
          className="cursor-ring fixed w-8 h-8 border-2 border-primary/60 rounded-full pointer-events-none mix-blend-difference transition-transform duration-100"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          <div className="absolute inset-0 border border-primary/30 rounded-full animate-ping" />
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Dynamic grid canvas around cursor - Desktop only */}
        {!isMobile && (
          <canvas
            ref={gridCanvasRef}
            className="absolute inset-0 opacity-100"
            style={{ background: 'transparent' }}
          />
        )}

        {/* Animated canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-100"
          style={{ background: 'transparent' }}
        />

        {/* Mouse trail effects */}
        {mouseTrail.map((point, index) => (
          <div
            key={point.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/30 animate-ping"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              animationDuration: '0.8s',
              opacity: (index / mouseTrail.length) * 0.4,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Dynamic gradient orbs that follow mouse */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full bg-primary/8 blur-[150px] transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Static gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-secondary/8 to-transparent blur-[100px] animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/3 blur-[150px]" />

        {/* Floating particles with varied opacity */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(6, 182, 212, ${particle.opacity}) 0%, transparent 70%)`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(6, 182, 212, ${particle.opacity * 0.5})`,
            }}
          />
        ))}

        {/* Subtle grid overlay with fade effect */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          }}
        />

        {/* Accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
        <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/20" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20" />
      </div>
    </>
  );
};

export default ParticleBackground;