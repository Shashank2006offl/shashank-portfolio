import { useEffect, useRef } from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

/* Hidden SVG filter for chromatic aberration on hover */
const SvgFilter = () => (
  <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
    <defs>
      <filter id="aberration">
        <feColorMatrix type="matrix" in="SourceGraphic" result="red_"
          values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        <feOffset in="red_" dx="3" dy="0" result="red" />
        <feColorMatrix type="matrix" in="SourceGraphic" result="blue_"
          values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        <feOffset in="blue_" dx="-3" dy="0" result="blue" />
        <feBlend mode="screen" in="red" in2="blue" />
      </filter>
    </defs>
  </svg>
);

const expertise = [
  {
    num: '01',
    label: 'Machine Learning',
    desc: 'Supervised, unsupervised, and reinforcement learning pipelines.',
    level: 85,
  },
  {
    num: '02',
    label: 'Deep Learning',
    desc: 'CNNs, Vision Transformers, GNNs with PyTorch & Keras.',
    level: 80,
  },
  {
    num: '03',
    label: 'Computer Vision',
    desc: 'Object detection, defect analysis, image segmentation.',
    level: 75,
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
      },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      <SvgFilter />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      {/* ── 2-col sticky layout ── */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">

          {/* ── LEFT: sticky bio ── */}
          <div className="lg:sticky lg:top-24 space-y-8 reveal-left">
            {/* Section label */}
            <p className="inline-flex items-center gap-3 text-primary font-mono text-xs tracking-[0.3em] uppercase">
              <span className="w-5 h-px bg-primary/60" />
              01 — About Me
              <span className="w-5 h-px bg-primary/60" />
            </p>

            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
              Crafting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Intelligence
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a <span className="text-foreground font-medium">III year B.Tech student</span> majoring in{' '}
                <span className="text-primary font-medium">AI & Data Science</span> at Saveetha Engineering College.
              </p>
              <p>
                I build intelligent systems end-to-end — defect detection with{' '}
                <span className="text-primary font-medium">Vision Transformers</span> and respiratory disease
                classification using <span className="text-secondary font-medium">Graph Neural Networks</span>.
              </p>
              <p>
                Currently seeking <span className="text-foreground font-medium">AI/ML internship</span> or
                Data Analytics opportunities.
              </p>
            </div>

            {/* Education card */}
            <div className="border border-border/40 rounded-2xl p-5 bg-card/20 backdrop-blur-sm group hover:border-primary/30 transition-all duration-300">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground/50 flex justify-between mb-4 border-b border-border/30 pb-3">
                <span>Education</span><span>// B.Tech</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">AI & Data Science</h3>
                  <p className="text-muted-foreground text-sm">Saveetha Engineering College</p>
                  <div className="flex items-center gap-4 mt-2 text-xs font-mono">
                    <span className="flex items-center gap-1 text-primary"><Calendar className="w-3 h-3" />2023–2027</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-3 h-3" />Chennai</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coursework */}
            <div>
              <p className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-3">Coursework</p>
              <div className="flex flex-wrap gap-2">
                {['Machine Learning', 'Deep Learning', 'Computer Vision', 'GNNs', 'Data Analytics', 'Statistics', 'NLP', 'PyTorch'].map((c) => (
                  <span key={c}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-muted/40 text-muted-foreground border border-border/30 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                  >{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: expertise cards (Light mode) OR code block (Dark mode) ── */}
          <div className="space-y-5 w-full">
            {/* Light Theme: expertise cards */}
            <div className="dark:hidden space-y-5">
              {expertise.map((item, i) => (
                <div
                  key={i}
                  className="reveal border border-border/40 rounded-2xl bg-card/20 backdrop-blur-sm overflow-hidden group hover:border-primary/30 transition-all duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* card-header — LUMEN × chromatic style */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/40">// {item.num}</span>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{item.desc}</p>
                    {/* Skill bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground shrink-0">{item.level}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dark Theme: Code Block */}
            <div className="hidden dark:block reveal" style={{ transitionDelay: '80ms' }}>
              <div className="code-block">
                <div className="code-line">
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">developer</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-brace">{'{'}</span>
                </div>
                <div className="code-line indent">
                  <span className="code-property">name</span>
                  <span className="code-operator">:</span>{' '}
                  <span className="code-string">'Shashank R'</span>
                  <span className="code-comma">,</span>
                </div>
                <div className="code-line indent">
                  <span className="code-property">role</span>
                  <span className="code-operator">:</span>{' '}
                  <span className="code-string">'AI Engineer & Researcher'</span>
                  <span className="code-comma">,</span>
                </div>
                <div className="code-line indent">
                  <span className="code-property">skills</span>
                  <span className="code-operator">:</span>{' '}
                  <span className="code-bracket">[</span>
                  <span className="code-string">'PyTorch'</span>
                  <span className="code-comma">,</span>{' '}
                  <span className="code-string">'Transformers'</span>
                  <span className="code-comma">,</span>{' '}
                  <span className="code-string">'GNNs'</span>
                  <span className="code-bracket">]</span>
                  <span className="code-comma">,</span>
                </div>
                <div className="code-line indent">
                  <span className="code-property">passion</span>
                  <span className="code-operator">:</span>{' '}
                  <span className="code-string">'Building Intelligent Systems'</span>
                </div>
                <div className="code-line">
                  <span className="code-brace">{'}'}</span>
                  <span className="code-semicolon">;</span>
                </div>
              </div>
            </div>

            {/* Open to work badge */}
            <div className="reveal border border-primary/20 rounded-2xl bg-primary/5 p-5 flex items-center gap-4"
              style={{ transitionDelay: '280ms' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />
              <div>
                <p className="text-sm font-semibold">Open to Opportunities</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">AI/ML Internship · Data Analytics · Research</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
