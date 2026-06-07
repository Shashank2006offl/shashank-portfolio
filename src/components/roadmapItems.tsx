import { useEffect, useRef } from 'react';
import { Rocket, Sparkles, Cpu, Eye, TrendingUp, ArrowRight, Terminal } from 'lucide-react';

const roadmapItems = [
  {
    id: '01',
    icon: Sparkles,
    title: 'Conversational AI Interface',
    text: 'Build a conversational AI interface as a standalone experimental project.',
    status: 'planned',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.4)',
  },
  {
    id: '02',
    icon: Cpu,
    title: 'Voice-Multimodal Demos',
    text: 'Add voice interaction to select demos for multimodal exploration.',
    status: 'planned',
    color: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.4)',
  },
  {
    id: '03',
    icon: TrendingUp,
    title: 'Model Quantization & Inference',
    text: 'Explore model quantization and efficient inference for production deployment.',
    status: 'research',
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    id: '04',
    icon: Eye,
    title: 'Computer Vision at Scale',
    text: 'Scale computer vision work with real-world datasets and rigorous evaluation.',
    status: 'research',
    color: 'from-orange-500 to-amber-600',
    glow: 'rgba(245,158,11,0.4)',
  },
  {
    id: '05',
    icon: Rocket,
    title: 'Accessibility & Performance',
    text: 'Iterate on accessibility, performance, and usability based on feedback.',
    status: 'ongoing',
    color: 'from-rose-500 to-pink-600',
    glow: 'rgba(244,63,94,0.4)',
  },
];

const statusLabel: Record<string, string> = {
  planned: 'Planned',
  research: 'In Research',
  ongoing: 'Ongoing',
};

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-reveal for timeline cards
  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.timeline-card');
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateX(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 mb-6 backdrop-blur-sm">
            <Rocket className="w-4 h-4 text-secondary" />
            <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase">Future Work</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Roadmap &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              Next Steps
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Planned extensions and experiments — each reflecting a deliberate learning direction.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">

          {/* Vertical spine */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          <div className="space-y-6">
            {roadmapItems.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className="timeline-card relative flex items-start gap-6 group"
                  style={{
                    opacity: 0,
                    transform: isLeft ? 'translateX(-24px)' : 'translateX(24px)',
                    transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
                  }}
                >
                  {/* Node */}
                  <div className="relative flex-shrink-0 z-10">
                    {/* Glow ring */}
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: item.glow }}
                    />
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Index badge */}
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-background border border-border text-[10px] font-mono font-bold flex items-center justify-center text-muted-foreground">
                      {item.id}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl p-5 hover:border-border/80 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-0.5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-lg text-foreground leading-tight">{item.title}</h3>
                      <span
                        className={`flex-shrink-0 text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}
                      >
                        {statusLabel[item.status]}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground/60 font-mono">
                      <ArrowRight className="w-3 h-3" />
                      <span>step_{item.id}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal footer card */}
          <div className="mt-10 ml-[5.5rem] bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-secondary" />
              <span className="text-secondary font-bold">~/shashank</span>
              <span className="text-muted-foreground">— bash</span>
            </div>
            <div className="space-y-1 text-muted-foreground">
              <p><span className="text-primary">$</span> git log --oneline --future</p>
              <p className="text-foreground/70 pl-4">→ building in public, one commit at a time.</p>
              <p><span className="text-primary">$</span> <span className="animate-pulse">▌</span></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}