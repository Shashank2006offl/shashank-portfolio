import { useRef } from 'react';
import { FileText, Clock, CheckCircle, ExternalLink } from 'lucide-react';

import bgSpringer from '../assets/research/vanya-smythe-CH7kRmyBQ4I-unsplash.webp';
import bgOther from '../assets/research/annie-spratt-U_Ff4ohzLSw-unsplash.jpg';
import bgReview from '../assets/research/bg-review.png';

const publications = {
  springerElsevier: [
    {
      authors: 'Rajagopal M., Shashank R.',
      title: 'Self-Supervised Vibration Analytics for Predictive Maintenance of Multistage Compressors',
      journal: 'Journal of Vibration Engineering & Technologies (Springer Nature)',
      year: '2026',
      link: '#',
      highlights: [
        'Developed a contrastive Siamese CNN framework for feature learning',
        'Introduced Entropy Divergence Rate (EDR) for detecting anomalies',
        'Achieved an F1-score of 0.93 with a 28% improvement in early fault detection'
      ]
    },
    {
      authors: 'Rajagopal M., Shashank R.',
      title: 'Adaptive AI Scheduling of Building HVAC to Charge Phase Change Thermal Batteries with Elevator Regenerative Braking Heat',
      journal: 'Measurement: Energy (Elsevier)',
      year: '2026',
      link: 'https://www.sciencedirect.com/science/article/pii/S2950345025000466',
    },
    {
      authors: 'Shashank R.',
      title: 'Industry 5.0: Connecting Humans and Technology for Sustainable Development',
      journal: 'Journal of Systems Engineering and Electronics (Elsevier)',
      year: '2024',
      link: 'https://jseepublisher.com/wp-content/uploads/23-JSEE2719.pdf',
    },
  ],
  otherJournals: [
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
      journal: 'International Journal of Science, Engineering and Technology (IJSET)',
      year: '2025',
      link: 'https://www.ijset.in/wp-content/uploads/IJSET_V13_issue1_165.pdf',
    },
  ],
  underReview: [
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

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="w-full bg-background"
    >

      {/* Introduction Header */}
      <div className="flex flex-col justify-center text-center pt-12 pb-4 px-4 relative">
        <span className="text-primary font-mono text-xs tracking-widest uppercase">
          Research Output
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-3">
          Academic <span className="gradient-text">Publications</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4" />
        <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-4">
          Explore my published research and ongoing works.
        </p>
      </div>

      {/* Slide 1: Springer & Elsevier */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-8 py-20 border-b border-white/5">
        {/* Native CSS Fixed Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url(${bgSpringer})` }}
        />
        <div className="absolute inset-0 bg-background/0 z-0" />

        <div className="container max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center relative z-10">
          <div className="lg:w-1/3 text-center lg:text-right">
            <h1 className="text-4xl sm:text-6xl font-bold leading-none mb-4" style={{ fontFamily: 'var(--font-display)' }}><span className="text-foreground dark:text-yellow-500">Springer</span> &amp;<br /><span className="text-primary">Elsevier</span></h1>
            <p className="text-zinc-950 dark:text-zinc-50 text-lg font-semibold">Top-tier peer-reviewed journals focusing on AI, HVAC scheduling, and Predictive Maintenance.</p>
          </div>

          <div className="lg:w-2/3 space-y-6 w-full">
            {publications.springerElsevier.map((pub, index) => (
              <div key={index} className="bg-background/90 backdrop-blur-md border border-border/40 rounded-2xl p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 shadow-lg">
                <h4 className="font-bold text-xl mb-2 text-foreground">{pub.title}</h4>
                <p className="text-muted-foreground mb-4">{pub.authors}</p>
                {pub.highlights && (
                  <ul className="mb-4 space-y-1 text-sm text-foreground/80 list-none pl-0">
                    {pub.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span><span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-4 items-center text-sm">
                  <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-semibold">{pub.journal}</span>
                  <span className="text-muted-foreground font-mono font-bold">{pub.year}</span>
                  {pub.link && pub.link !== '#' && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="ml-auto text-primary hover:underline flex items-center gap-1 font-bold">
                      View <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide 2: Other Journals */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-8 py-20 border-b border-white/5">
        {/* Native CSS Fixed Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url(${bgOther})` }}
        />
        <div className="absolute inset-0 bg-background/0 z-0" />

        <div className="container max-w-5xl mx-auto flex flex-col lg:flex-row-reverse gap-12 items-center relative z-10">
          <div className="lg:w-1/3 text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl font-bold leading-none mb-4" style={{ fontFamily: 'var(--font-display)' }}>Other<br /><span className="text-secondary">Journals</span></h1>
            <p className="text-zinc-950 dark:text-zinc-50 text-lg font-semibold">Publications focusing on applied AI in education and building optimization.</p>
          </div>

          <div className="lg:w-2/3 space-y-6 w-full">
            {publications.otherJournals.map((pub, index) => (
              <div key={index} className="bg-background/90 backdrop-blur-md border border-border/40 rounded-2xl p-6 sm:p-8 hover:border-secondary/40 transition-all duration-300 shadow-lg">
                <h4 className="font-bold text-xl mb-2 text-foreground">{pub.title}</h4>
                <p className="text-muted-foreground mb-4">{pub.authors}</p>
                <div className="flex flex-wrap gap-4 items-center text-sm">
                  <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-semibold">{pub.journal}</span>
                  <span className="text-muted-foreground font-mono font-bold">{pub.year}</span>
                  {pub.link && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="ml-auto text-secondary hover:underline flex items-center gap-1 font-bold">
                      View <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide 3: Under Review */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-8 py-20">
        {/* Native CSS Fixed Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url(${bgReview})` }}
        />
        <div className="absolute inset-0 bg-background/0 z-0" />

        <div className="container max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold leading-none mb-4" style={{ fontFamily: 'var(--font-display)' }}>Under<br /><span className="text-yellow-500">Review</span></h1>
            <p className="text-zinc-950 dark:text-zinc-50 text-lg font-semibold">Upcoming research works currently in preparation or under peer review.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {publications.underReview.map((pub, index) => (
              <div key={index} className="bg-background/90 backdrop-blur-md border border-border/40 rounded-2xl p-6 sm:p-8 hover:border-yellow-500/40 transition-all duration-300 flex flex-col h-full justify-center text-left shadow-lg">
                <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500 w-max mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xl mb-2 text-foreground">{pub.title}</h4>
                <p className="text-muted-foreground mb-4">{pub.authors}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-muted font-mono text-sm tracking-widest w-max mt-auto">{pub.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default PublicationsSection;