import { useState } from 'react';
import { BookOpen, ExternalLink, Clock3, Award, Search } from 'lucide-react';

type ResearchStatus = 'Scopus' | 'Published' | 'Under review';

interface ResearchItem {
  title: string;
  authors: string;
  venue: string;
  year: string;
  status: ResearchStatus;
  type: string;
  link?: string;
  doi?: string;
  abstract: string;
}

const researchItems: ResearchItem[] = [
  {
    title: 'Self-Supervised Vibration Analytics for Predictive Maintenance of Multistage Compressors',
    authors: 'Rajagopal M., Shashank R., Shreeshanth R.',
    venue: 'Journal of Vibration Engineering & Technologies',
    year: '2026',
    status: 'Scopus',
    type: 'Springer Nature',
    link: 'https://doi.org/10.1007/s42417-026-02455-2',
    doi: '10.1007/s42417-026-02455-2',
    abstract: 'Contrastive Siamese CNN learning and Entropy Divergence Rate for early fault detection.',
  },
  {
    title: 'Adaptive AI Scheduling of Building HVAC to Charge Phase Change Thermal Batteries with Elevator Regenerative Braking Heat',
    authors: 'Rajagopal M., Shashank R., Shreeshanth R.',
    venue: 'Measurement: Energy',
    year: '2026',
    status: 'Scopus',
    type: 'Elsevier',
    link: 'https://doi.org/10.1016/j.meaene.2025.100079',
    doi: '10.1016/j.meaene.2025.100079',
    abstract: 'Adaptive HVAC scheduling combining elevator regenerative heat with phase-change thermal storage.',
  },
  {
    title: 'Industry 5.0: Connecting Humans and Technology for Sustainable Development',
    authors: 'Shashank R.',
    venue: 'Journal of Systems Engineering and Electronics',
    year: '2024',
    status: 'Scopus',
    type: 'Elsevier',
    link: 'https://jseepublisher.com/wp-content/uploads/23-JSEE2719.pdf',
    abstract: 'Human-centred Industry 5.0 models for sustainable technological development.',
  },
  {
    title: 'Tools of Artificial Intelligence for Improving Interpersonal Skills of Higher Education Learners',
    authors: 'Shashank R.',
    venue: 'International Journal of Science, Engineering and Technology',
    year: '2025',
    status: 'Published',
    type: 'IJSET',
    doi: '10.61463/ijset.vol.13.issue1.149',
    link: 'https://www.ijset.in/wp-content/uploads/IJSET_V13_issue1_164.pdf',
    abstract: 'Analysis of AI tools supporting communication and interpersonal skills in higher education.',
  },
  {
    title: 'Machine Learning Algorithm for Optimising Comfort Cooling in Buildings',
    authors: 'Shashank R.',
    venue: 'International Journal of Science, Engineering and Technology',
    year: '2025',
    status: 'Published',
    type: 'IJSET',
    link: 'https://www.ijset.in/wp-content/uploads/IJSET_V13_issue1_165.pdf',
    abstract: 'Machine learning approaches for optimising indoor comfort and cooling efficiency.',
  },
  {
    title: 'GNN-Powered Respiratory Disease Detection',
    authors: 'Shashank R.',
    venue: 'Journal article in preparation',
    year: '2025',
    status: 'Under review',
    type: 'Graph neural networks',
    abstract: 'Graph-based respiratory disease classification using PyTorch Geometric.',
  },
  {
    title: '3D Printer Defect Detection using Vision Transformers',
    authors: 'Shashank R.',
    venue: 'Journal article in preparation',
    year: '2025',
    status: 'Under review',
    type: 'Computer vision',
    abstract: 'Vision Transformer models for automated 3D printer defect detection.',
  },
];

const filters: Array<'All' | ResearchStatus> = ['All', 'Scopus', 'Published', 'Under review'];

const PublicationsSection = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | ResearchStatus>('All');
  const [query, setQuery] = useState('');

  const filteredResearch = researchItems.filter((item) => {
    const matchesFilter = activeFilter === 'All' || item.status === activeFilter;
    const searchable = `${item.title} ${item.authors} ${item.venue} ${item.type}`.toLowerCase();
    return matchesFilter && searchable.includes(query.trim().toLowerCase());
  });

  const scopusCount = researchItems.filter((item) => item.status === 'Scopus').length;

  return (
    <section id="publications" className="relative py-20 md:py-24 px-5 md:px-6 overflow-hidden bg-background">
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <header className="mb-10 md:mb-12">
          <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">
            Research &amp; Publications
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">
              Selected <span className="text-muted-foreground font-light italic">research</span>
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="min-w-24 rounded-xl border border-border/60 bg-card/30 px-4 py-3 text-center">
                <strong className="block text-2xl text-foreground">{researchItems.length}</strong>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</span>
              </div>
              <div className="min-w-24 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-center">
                <strong className="block text-2xl text-primary">{scopusCount}</strong>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Scopus</span>
              </div>
              <div className="min-w-24 rounded-xl border border-border/60 bg-card/30 px-4 py-3 text-center">
                <strong className="block text-2xl text-foreground">{researchItems.filter((item) => item.status !== 'Under review').length}</strong>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Published</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mb-7 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter research">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-xs font-mono transition-colors ${
                  activeFilter === filter
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border/70 bg-card/20 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <label className="relative md:ml-auto block w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search research..."
              className="h-10 w-full rounded-full border border-border/70 bg-card/20 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredResearch.map((item) => (
            <article
              key={item.title}
              className={`group relative flex min-h-64 flex-col rounded-2xl border p-6 transition-colors ${
                item.status === 'Scopus'
                  ? 'border-primary/35 bg-gradient-to-br from-primary/10 via-card/30 to-card/10 hover:border-primary/70'
                  : item.status === 'Under review'
                    ? 'border-amber-500/25 bg-card/20 hover:border-amber-500/50'
                    : 'border-border/60 bg-card/20 hover:border-primary/40'
              }`}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  {item.status === 'Scopus' ? (
                    <Award className="h-5 w-5 text-primary" />
                  ) : item.status === 'Under review' ? (
                    <Clock3 className="h-5 w-5 text-amber-500" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-secondary" />
                  )}
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    {item.type}
                  </span>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider ${
                    item.status === 'Scopus'
                      ? 'bg-primary text-primary-foreground'
                      : item.status === 'Under review'
                        ? 'bg-amber-500/15 text-amber-500'
                        : 'bg-secondary/10 text-secondary'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h3 className="mb-3 text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="mb-2 text-sm text-muted-foreground">{item.authors}</p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.abstract}</p>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-border/40 pt-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.venue}</p>
                  {item.doi ? (
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">DOI: {item.doi}</p>
                  ) : (
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">{item.year}</p>
                  )}
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3.5 py-2 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    View paper <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredResearch.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border/70 py-16 text-center text-muted-foreground">
            No research matches your search.
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationsSection;
