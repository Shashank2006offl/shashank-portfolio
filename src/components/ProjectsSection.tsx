import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Brain, Eye } from 'lucide-react';

const projects = [
  {
    title: 'GNN-Powered Respiratory Disease Detection',
    description: 'Developed a Graph Neural Network (GNN) model for respiratory disease classification using PyTorch Geometric. Applied graph construction and message-passing techniques to improve predictive performance.',
    icon: Brain,
    tags: ['PyTorch Geometric', 'GNN', 'Healthcare AI'],
    gradient: 'from-primary to-cyan-400',
    accentColor: 'primary',
    githubLink: 'https://github.com/Shashank2006offl/AI-Powered-Respiratory-Disease-Detection',
  },
  {
    title: '3D Printer Defect Detection using Vision Transformers',
    description: 'Built a Vision Transformer (ViT)–based model for automated defect detection using PyTorch and OpenCV. Evaluated and compared performance with CNN-based approaches.',
    icon: Eye,
    tags: ['Vision Transformer', 'OpenCV', 'PyTorch'],
    gradient: 'from-secondary to-pink-400',
    accentColor: 'secondary',
    githubLink: 'https://github.com/Shashank2006offl/3D_printer_defect_detection',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef(null);

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

  const handleGithubClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-20 reveal">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Research <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`reveal delay-${(index + 1) * 200}`}
            >
              <div className="group glass rounded-3xl p-8 h-full relative overflow-hidden transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 hover:glow">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${project.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <project.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* GitHub Button */}
                <button
                  onClick={() => handleGithubClick(project.githubLink)}
                  className={`relative z-10 pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${project.gradient} text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 group/btn cursor-pointer`}
                >
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                </button>

                {/* Corner decoration */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;