import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Brain, Eye, FileSearch } from 'lucide-react';

const projects = [
  {
    title: 'GNN-Powered Respiratory Disease Detection',
    description: 'Graph Neural Network model for respiratory disease classification using PyTorch Geometric. Applies graph construction and message-passing techniques.',
    icon: Brain,
    tags: ['PyTorch Geometric', 'GNN', 'Healthcare AI'],
    gradient: 'from-primary to-cyan-400',
    githubLink: 'https://github.com/Shashank2006offl/AI-Powered-Respiratory-Disease-Detection',
    img: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&q=80',
    accent: 'hsl(var(--primary))',
    accentRgb: '6,182,212',
  },
  {
    title: '3D Printer Defect Detection using Vision Transformers',
    description: 'Vision Transformer (ViT) model for automated defect detection using PyTorch and OpenCV. Benchmarked against CNN-based baselines.',
    icon: Eye,
    tags: ['Vision Transformer', 'OpenCV', 'PyTorch'],
    gradient: 'from-secondary to-pink-400',
    githubLink: 'https://github.com/Shashank2006offl/3D_printer_defect_detection',
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    accent: 'hsl(var(--secondary))',
    accentRgb: '168,85,247',
  },
  {
    title: 'LuminaRole.ai — ML-Powered ATS & Career Coach',
    description: 'Full-stack AI platform scoring resumes against JDs, predicting salaries via RandomForestRegressor, and generating AI coaching on strengths and gaps.',
    icon: FileSearch,
    tags: ['React', 'Flask', 'scikit-learn', 'Firebase', 'Generative AI'],
    gradient: 'from-emerald-400 to-cyan-500',
    githubLink: 'https://github.com/Shashank2006offl',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    accent: '#34d399',
    accentRgb: '52,211,153',
  },
];

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const ProjectsSection = () => {
  const outerRef   = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef     = useRef<number>(0);
  const progress   = useRef(0);   // lerp current
  const target     = useRef(0);   // lerp target

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    let cachedTop = 0;
    let cachedHeight = 0;
    
    const updateCache = () => {
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      cachedTop = rect.top + window.scrollY;
      cachedHeight = outer.offsetHeight;
    };
    
    updateCache();
    window.addEventListener('resize', updateCache);

    const computeTarget = () => {
      const viewH      = window.innerHeight;
      const scrollDist = cachedHeight - viewH;
      // Avoid division by zero
      if (scrollDist <= 0) return;
      const scrolled   = window.scrollY - cachedTop;
      const p = clamp(scrolled / scrollDist, 0, 1);
      target.current = p * (projects.length - 1);
    };

    const tick = () => {
      computeTarget();

      // Lerp — 0.08 feels snappy but not instant
      progress.current += (target.current - progress.current) * 0.08;
      const prog = progress.current;
      const activeIndex = Math.round(prog);

      // ── Directly mutate card DOM styles — no React re-render ──
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const offset    = index - prog;
        const absOffset = Math.abs(offset);

        const isMobile    = window.innerWidth < 1024;
        const translateX  = isMobile ? offset * 100 : offset * 33;   // vw
        const scale       = 1 - clamp(absOffset, 0, 2) * 0.11;
        const rotateY     = isMobile ? 0 : -offset * 14;
        const brightness  = 1 - clamp(absOffset, 0, 1) * 0.55;
        const saturation  = 1 - clamp(absOffset, 0, 1) * 0.85;
        const opacity     = isMobile ? (absOffset > 0.5 ? 0 : 1) : (absOffset > 2.2 ? 0 : 1);
        const zIndex      = Math.round(20 - absOffset * 5);
        const isActive    = index === activeIndex;

        // Active card moves forward in Z-space, inactive cards move backward
        const translateZ  = isMobile ? 0 : (isActive ? 100 : -absOffset * 150); // px

        // Use translate3d for hardware acceleration and depth sorting
        card.style.transform  = `translate3d(-50%,-50%,${translateZ}px) translateX(${translateX}vw) scale(${scale}) rotateY(${rotateY}deg)`;
        card.style.opacity    = String(opacity);
        card.style.zIndex     = String(zIndex);

        // Border, shadow & filter updates on the inner wrapper (first child)
        // We apply filter here to prevent flattening of the parent 3D context
        const inner = card.firstElementChild as HTMLElement | null;
        if (inner) {
          const p = projects[index];
          inner.style.filter      = `brightness(${brightness}) saturate(${saturation})`;
          inner.style.borderColor = isActive ? `rgba(${p.accentRgb},0.35)` : 'rgba(255,255,255,0.06)';
          inner.style.boxShadow   = isActive
            ? `0 32px 80px -12px rgba(${p.accentRgb},0.25), 0 0 0 1px rgba(${p.accentRgb},0.15)`
            : '0 20px 40px -10px rgba(0,0,0,0.4)';
        }
      });

      // Dot indicators
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const isActive = i === activeIndex;
        dot.style.width      = isActive ? '24px' : '6px';
        dot.style.background = isActive ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.2)';
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', updateCache);
    };
  }, []);

  const handleGithubClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="projects"
      ref={outerRef}
      style={{ height: `${projects.length * 110 + 60}vh`, position: 'relative' }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: 'hsl(var(--background))',
          paddingTop: '100px',
          perspective: '1200px',
        }}
      >
        {/* Section header */}
        <div className="text-center mb-8 z-30 relative pointer-events-none" style={{ flexShrink: 0 }}>
          <p className="inline-flex items-center gap-3 text-primary font-mono text-xs tracking-[0.3em] uppercase mb-3">
            <span className="w-5 h-px bg-primary/60" />
            03 — Featured Work
            <span className="w-5 h-px bg-primary/60" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projects <span className="text-muted-foreground font-light italic">&</span> Research
          </h2>
        </div>

        {/* 3D Stage for cards */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '85vw',
                  maxWidth: '560px',
                  height: '420px',
                  willChange: 'transform, filter, opacity',
                  transformOrigin: 'center center',
                  transition: 'opacity 0.2s',
                }}
              >
                {/* Inner Card wrapper for borders/shadows (mutated by JS) */}
                <div
                  className="w-full h-full rounded-2xl glass overflow-hidden relative group transition-colors duration-300"
                  style={{
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Background Image & Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                    <img 
                      src={project.img} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 z-30 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center glass"
                        style={{ background: `linear-gradient(135deg, rgba(${project.accentRgb}, 0.2), transparent)` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: project.accent }} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider border border-white/10 bg-white/5 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-[13px] text-muted-foreground mb-5 leading-relaxed max-w-md">
                      {project.description}
                    </p>

                    <div className="flex gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleGithubClick(project.githubLink); }}
                        className="px-5 py-1.5 rounded-full text-[11px] font-mono tracking-widest border border-white/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-1.5 pointer-events-auto"
                      >
                        <Github className="w-3.5 h-3.5" />
                        SOURCE
                      </button>
                      <button 
                        className="px-5 py-1.5 rounded-full text-[11px] font-mono tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        LIVE
                      </button>
                    </div>
                  </div>

                  {/* Top glowing accent line */}
                  <div 
                    className="absolute top-0 left-0 w-full h-px opacity-50"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Paginator Dots */}
        <div className="flex items-center justify-center gap-2 -mt-4 z-30">
          {projects.map((_, i) => (
            <div
              key={i}
              ref={(el) => (dotRefs.current[i] = el)}
              style={{
                height: '6px',
                borderRadius: '3px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectsSection;