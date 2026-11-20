import { ExternalLink, Github, Brain, Eye, FileSearch } from 'lucide-react';

const projects = [
  {
    title: 'GNN-Powered Respiratory Disease Detection',
    description: 'Graph Neural Network model for respiratory disease classification using PyTorch Geometric.',
    icon: Brain,
    tags: ['PyTorch Geometric', 'GNN', 'Healthcare AI'],
    githubLink: 'https://github.com/Shashank2006offl/AI-Powered-Respiratory-Disease-Detection',
    img: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&h=600&fit=crop&fm=webp&q=72',
  },
  {
    title: '3D Printer Defect Detection using Vision Transformers',
    description: 'Automated defect detection using Vision Transformers, PyTorch and OpenCV.',
    icon: Eye,
    tags: ['Vision Transformer', 'OpenCV', 'PyTorch'],
    githubLink: 'https://github.com/Shashank2006offl/3D_printer_defect_detection',
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&fm=webp&q=72',
  },
  {
    title: 'LuminaRole.ai — ML-Powered ATS & Career Coach',
    description: 'AI-powered resume scoring, salary prediction and personalised career coaching.',
    icon: FileSearch,
    tags: ['React', 'Flask', 'scikit-learn', 'Firebase', 'Generative AI'],
    githubLink: 'https://github.com/Shashank2006offl/ATS-SYS',
    liveLink: 'https://ats-sys.vercel.app/',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&fm=webp&q=72',
  },
];

const ProjectsSection = () => (
  <section
    id="projects"
    className="relative px-5 md:px-6 py-20 md:py-24 bg-background"
  >
    <div className="container mx-auto max-w-6xl">
      <header className="mb-10">
        <p className="mb-3 text-primary font-mono text-xs tracking-[0.3em] uppercase">
          03 — Featured Work
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Projects <span className="text-muted-foreground font-light italic">&amp; Research</span>
        </h2>
      </header>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <article
              key={project.title}
              className="group flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/30 transition-colors hover:border-primary/50"
            >
              <div className="relative h-48 shrink-0 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/70">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 px-2 py-1 text-[9px] font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-3">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[10px] font-mono tracking-wider transition-colors hover:border-primary hover:text-primary"
                  >
                    <Github className="h-3.5 w-3.5" />
                    SOURCE
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[10px] font-mono tracking-wider text-primary-foreground"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      LIVE
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
