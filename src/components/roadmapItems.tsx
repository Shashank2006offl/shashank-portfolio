import { Rocket, Sparkles, Cpu, Eye, TrendingUp } from 'lucide-react';

const roadmapItems = [
    {
        icon: Sparkles,
        text: 'Build a conversational AI interface as a standalone experimental project'
    },
    {
        icon: Cpu,
        text: 'Add voice interaction to select demos for multimodal exploration'
    },
    {
        icon: TrendingUp,
        text: 'Explore model quantization and efficient inference for production deployment'
    },
    {
        icon: Eye,
        text: 'Scale computer vision work with real-world datasets and rigorous evaluation'
    },
    {
        icon: Rocket,
        text: 'Iterate on accessibility, performance, and usability based on feedback'
    }
];

export default function RoadmapSection() {
    return (
        <section id="roadmap" className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-card/50 border border-border/50 mb-6">
                        <Rocket className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-mono text-muted-foreground">Future Work</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                        Roadmap & <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">Next Steps</span>
                    </h2>

                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Planned extensions and experiments. Each item reflects learning direction.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-8 md:p-10">
                        <ul className="space-y-5">
                            {roadmapItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <li
                                        key={index}
                                        className="flex items-start gap-4 group"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-5 h-5 text-secondary" />
                                        </div>
                                        <p className="text-foreground leading-relaxed pt-2">{item.text}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}