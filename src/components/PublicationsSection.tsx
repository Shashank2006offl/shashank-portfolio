import { useEffect, useRef } from 'react';
import { FileText, Clock, CheckCircle, ExternalLink } from 'lucide-react';

const publications = {
  published: [
    {
      authors: 'Rajagopal M., Shashank R.',
      title: 'Adaptive AI Scheduling of Building HVAC to Charge Phase Change Thermal Batteries with Elevator Regenerative Braking Heat',
      journal: 'Measurement: Energy (Elsevier)',
      year: '2026',
      link: 'https://www.sciencedirect.com/science/article/pii/S2950345025000466',
    },
    {
      authors: 'Shashank R.',
      title: 'Tools of Artificial Intelligence for Improving Interpersonal Skills of Higher Education Learners',
      journal: 'International Journal of Science, Engineering and Technology (IJSET)',
      year: '2025',
      link: 'https://www.ijset.in/wp-content/uploads/IJSET_V13_issue1_164.pdf',
    },
    {
      authors: 'Shashank R.',
      title: 'Machine Learning Algorithm for Optimising Comfort Cooling in Buildings',
      journal: 'nternational Journal of Science, Engineering and Technology (IJSET)',
      year: '2025',
      link: 'https://www.ijset.in/wp-content/uploads/IJSET_V13_issue1_165.pdf',
    },
    {
      authors: 'Shashank R.',
      title: 'Industry 5.0: Connecting Humans and Technology for Sustainable Development',
      journal: 'Journal of Systems Engineering and Electronics (Elsevier)',
      year: '2024',
      link: 'https://jseepublisher.com/wp-content/uploads/23-JSEE2719.pdf',
    },
  ],
  inPreparation: [
    {
      authors: 'Shashank R.',
      title: 'GNN-Powered Respiratory Disease Detection',
      year: '2025',
    },
    {
      authors: 'Shashank R.',
      title: '3D Printer Defect Detection using Vision Transformers',
      year: '2025',
    },
  ],
};

const PublicationsSection = () => {
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
    <section id="publications" ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 reveal">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            Research Output
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Academic <span className="gradient-text">Publications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Published */}
        <div className="mb-12 sm:mb-16 reveal">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">Published</h3>
          </div>

          <div className="space-y-4">
            {publications.published.map((pub, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-5 sm:p-6 group hover:border-primary/30 transition-all duration-500 hover:glow"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary shrink-0 self-start">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 w-full min-w-0">
                    <h4 className="font-semibold text-base sm:text-lg mb-3 group-hover:text-primary transition-colors leading-snug">
                      {pub.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">{pub.authors}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <span className="text-secondary font-medium">{pub.journal}</span>
                      <span className="text-muted-foreground font-mono">{pub.year}</span>
                    </div>
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all font-medium text-sm w-full justify-center mt-4"
                      >
                        View Publication
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all opacity-0 group-hover:opacity-100 shrink-0 self-start sm:self-center font-medium text-sm"
                    >
                      View
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Preparation */}
        <div className="reveal delay-200">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">In Preparation</h3>
          </div>

          <div className="space-y-4">
            {publications.inPreparation.map((pub, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-5 sm:p-6 group hover:border-secondary/30 transition-all duration-500"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 rounded-xl bg-muted text-muted-foreground shrink-0 self-start">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="w-full min-w-0">
                    <h4 className="font-semibold text-base sm:text-lg mb-3 leading-snug">{pub.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{pub.authors}</p>
                    <span className="text-muted-foreground font-mono text-sm">{pub.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;