import { BriefcaseBusiness, MapPin, ArrowUpRight } from "lucide-react";

type ExperienceItem = {
  role: string;
  org: string;
  type: string;
  period: string;
  location: string;
  current: boolean;
  summary: string;
  tags: string[];
};

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "AI Engineer Intern",
    org: "Nexa Mobility",
    type: "Internship",
    period: "Jul 2027 — Oct 2027",
    location: "Bangalore, Karnataka",
    current: true,
    summary:
      "Built an AI-powered workflow that converts release requirements and software-change evidence into explainable, validated test selections.",
    tags: ["LangGraph", "FastAPI", "pgvector", "React + TypeScript"],
  },
  {
    role: "Web Development Intern",
    org: "Connect Infosystems",
    type: "Internship",
    period: "Jun 2024 — Jul 2024",
    location: "Chennai, Tamil Nadu",
    current: false,
    summary:
      "Developed responsive web interfaces and gained hands-on experience with frontend workflows.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="relative px-5 md:px-6 py-20 md:py-24 overflow-hidden bg-background">
    <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="container mx-auto max-w-6xl relative z-10">
      <header className="mb-12 md:mb-16">
        <p className="mb-3 text-primary font-mono text-xs tracking-[0.3em] uppercase">
          04 — Career
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Professional <span className="text-muted-foreground font-light italic">experience</span>
        </h2>
      </header>

      <div className="relative">
        <div className="absolute left-[27px] top-8 bottom-8 hidden w-px bg-gradient-to-b from-primary via-border to-transparent md:block lg:left-1/2 lg:-translate-x-1/2" />

        <div className="space-y-7 md:space-y-12">
          {EXPERIENCE.map((item, index) => (
            <article
              key={`${item.org}-${item.role}`}
              className={`relative grid items-start gap-5 md:grid-cols-[54px_1fr] lg:grid-cols-[1fr_54px_1fr] ${
                index % 2 === 1 ? "lg:[&_.experience-card]:col-start-3" : ""
              }`}
            >
              <div
                className={`experience-card group ml-12 rounded-3xl border p-6 md:ml-0 md:p-8 transition-colors ${
                  item.current
                    ? "border-primary/45 bg-gradient-to-br from-primary/10 via-card/35 to-card/15 hover:border-primary/70"
                    : "border-border/60 bg-card/25 hover:border-secondary/50"
                } ${
                  index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-3"
                }`}
              >
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                        item.current
                          ? "border-primary/40 bg-primary/12 text-primary"
                          : "border-secondary/30 bg-secondary/10 text-secondary"
                      }`}
                    >
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {item.type}
                      </p>
                      <p className="mt-1 font-bold text-foreground">{item.org}</p>
                    </div>
                  </div>

                  {item.current && (
                    <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-primary-foreground">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="mb-3 text-2xl md:text-3xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                  {item.role}
                </h3>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/70 bg-background/30 px-3 py-1 text-[10px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-end justify-between gap-3 border-t border-border/50 pt-5">
                  <div>
                    <p className="font-mono text-sm font-bold text-foreground">{item.period}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 transition-colors group-hover:text-primary" />
                </div>
              </div>

              <div className="absolute left-[15px] top-7 z-10 flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-primary md:left-[15px] lg:left-1/2 lg:top-8 lg:-translate-x-1/2">
                {item.current && <span className="absolute h-8 w-8 rounded-full border border-primary/40 animate-ping" />}
              </div>

              {index % 2 === 1 && item.current && (
                <div className="hidden lg:col-start-1 lg:block" aria-hidden="true" />
              )}

              {item.current && (
                <div className="hidden lg:col-start-3 lg:flex lg:min-h-[280px] lg:flex-col lg:justify-center lg:px-8">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    Current focus
                  </p>
                  <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
                    <li>• Multi-agent LangGraph workflow for release analysis, ranking, gap suggestions and reporting.</li>
                    <li>• Semantic retrieval with Sentence Transformers and pgvector/HNSW.</li>
                    <li>• Evidence-linked test traceability, bounded retries and validation/approval states.</li>
                  </ul>
                </div>
              )}

              {!item.current && (
                <div className="hidden lg:col-start-1 lg:flex lg:min-h-[220px] lg:flex-col lg:justify-center lg:px-8">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-secondary">
                    Frontend work
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Built frontend websites using HTML, CSS, and JavaScript.
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
