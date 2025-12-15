import { Brain, Palette, Box, Wrench, Zap, Search, GitBranch } from 'lucide-react';

const decisions = [
    {
        icon: Palette,
        title: 'Minimal but Expressive UI',
        description: 'Clean layout that keeps focus on what matters—your work and capabilities',
        points: [
            'Subtle animations add personality without becoming distractions',
            'No blocking effects or forced interactions that waste recruiter time'
        ]
    },
    {
        icon: Box,
        title: 'Scannable Architecture',
        description: 'Information hierarchy designed for 30-second evaluations',
        points: [
            'Clear sections match how recruiters actually read portfolios',
            'Progressive disclosure—details available on demand, not forced'
        ]
    },
    {
        icon: Wrench,
        title: 'Intentional Tech Stack',
        description: 'Every library chosen for a specific reason, not because it is trendy',
        points: [
            'TypeScript for maintainability and fewer runtime surprises',
            'Three.js for selective interactivity without performance penalties',
            'Tailwind for consistent design language and rapid iteration'
        ]
    },
    {
        icon: Zap,
        title: 'Speed & Accessibility First',
        description: 'Fast load times on any device, accessible to everyone',
        points: [
            'Optimized assets and lazy loading for mobile performance',
            'Responsive design tested across devices and screen readers'
        ]
    },
    {
        icon: Search,
        title: 'Evidence Over Claims',
        description: 'Show, do not just tell—links to actual code and deployed projects',
        points: [
            'GitHub repos for transparency and code review',
            'Real metrics and outcomes instead of buzzwords and badge collections'
        ]
    },
    {
        icon: GitBranch,
        title: 'Production vs Experimentation',
        description: 'This portfolio showcases professional work, not every experiment',
        points: [
            'Experimental features (AI agents, 3D avatars) kept in separate projects',
            'Maintains credibility while showing you understand when to ship and when to explore'
        ]
    }
];

export default function DesignDecisionsSection() {
    return (
        <section id="design" className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-card/50 border border-border/50 mb-6">
                        <Brain className="w-4 h-4 text-primary" />
                        <span className="text-sm font-mono text-muted-foreground">Why This Portfolio Works</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                        Design <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Decisions</span>
                    </h2>

                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        This portfolio is designed as a product, not just a webpage. Every choice focuses on <span className="text-primary font-medium">clarity</span>, <span className="text-secondary font-medium">performance</span>, and <span className="text-primary font-medium">recruiter experience</span>.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
                    {decisions.map((decision, index) => {
                        const Icon = decision.icon;
                        return (
                            <div
                                key={decision.title}
                                className="group relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,204,255,0.15)] relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>

                                        <h3 className="text-lg md:text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                                            {decision.title}
                                        </h3>

                                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                            {decision.description}
                                        </p>

                                        <ul className="space-y-2">
                                            {decision.points.map((point, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}