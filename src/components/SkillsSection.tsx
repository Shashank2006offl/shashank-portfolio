import { useEffect, useRef } from 'react';

const skills = {
  Programming: ['Python'],
  'Machine Learning': ['Machine Learning', 'Deep Learning'],
  Models: ['Graph Neural Networks', 'Vision Transformers', 'CNN'],
  'Libraries & Tools': ['PyTorch', 'PyTorch Geometric', 'Pandas', 'NumPy', 'OpenCV'],
  'Data Analytics': ['Data Cleaning', 'EDA', 'Visualization'],
  Development: ['Git', 'Jupyter Notebook'],
};

const coreCompetencies = [
  'Python & PyTorch',
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'Data Analytics',
];

const SkillsSection = () => {
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

  return (
    <section id="skills" ref={sectionRef} className="pt-24 pb-32 px-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 reveal">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            Skills & Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <div
              key={category}
              className={`reveal delay-${(categoryIndex + 1) * 100}`}
            >
              <div className="glass rounded-2xl p-6 h-full group hover:border-primary/30 transition-all duration-500 hover:glow">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="relative px-4 py-2 rounded-lg text-sm font-medium bg-muted/50 text-muted-foreground group-hover:text-foreground transition-all duration-300 overflow-hidden"
                      style={{ animationDelay: `${skillIndex * 100}ms` }}
                    >
                      <span className="relative z-10">{skill}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core Competencies (NO BARS, NO %s) */}
        <div className="mt-16 reveal">
          <div className="glass rounded-2xl p-8">
            <h3 className="font-semibold text-xl mb-6 text-center">
              Core Competencies
            </h3>

            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {coreCompetencies.map((competency, index) => (
                <span
                  key={competency}
                  className="px-5 py-3 rounded-xl text-sm font-medium bg-muted/50 text-foreground transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {competency}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;