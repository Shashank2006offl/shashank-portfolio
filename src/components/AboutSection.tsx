import { useEffect, useRef } from 'react';
import { GraduationCap, Brain, Code2, Sparkles } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const highlights = [
    { icon: Brain, label: 'Machine Learning', value: 'Expert' },
    { icon: Code2, label: 'Deep Learning', value: 'Advanced' },
    { icon: Sparkles, label: 'Computer Vision', value: 'Research' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-20 reveal">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Crafting <span className="gradient-text">Intelligence</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8 reveal">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a III year student majoring in Artificial Intelligence and Data Science
              with practical knowledge in the field of machine learning, data analytics,
              and deep learning.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I conducted project work that is end-to-end, such as defects detection
              with the help of <span className="text-primary font-medium">Vision Transformers</span> and
              respiratory disease detection with the assistance of <span className="text-secondary font-medium">Graph Neural Networks</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently seeking opportunities to apply my analytical, modeling, and
              research skills in AI/ML or Data Analytics roles.
            </p>

            {/* Education Card */}
            <div className="glass rounded-2xl p-6 mt-8 group hover:border-primary/30 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">B.Tech in AI & Data Science</h3>
                  <p className="text-muted-foreground">Saveetha Engineering College</p>
                  <p className="text-primary font-mono text-sm mt-2">2023 - 2027</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Stats Cards */}
          <div className="space-y-6 reveal delay-200">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 group hover:border-primary/30 hover:glow transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.label}</h3>
                      <p className="text-muted-foreground text-sm">{item.value}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse-glow" />
                  </div>
                </div>
              </div>
            ))}

            {/* Coursework Tags */}
            <div className="glass rounded-2xl p-6">
              <h4 className="font-mono text-sm text-primary mb-4 uppercase tracking-wider">
                Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Machine Learning', 'Deep Learning', 'Computer Vision', 'Neural Networks', 'Data Analytics', 'Statistics'].map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
