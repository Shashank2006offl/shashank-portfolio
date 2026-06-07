import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#publications', label: 'Publications' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  { icon: Github, href: 'https://github.com/Shashank2006offl', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:r8013938@gmail.com', label: 'Email' },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-primary/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <a href="#" className="text-3xl font-extrabold gradient-text font-mono tracking-tight">SR</a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI Engineer & Data Science researcher building intelligent systems with PyTorch, GNNs, and Vision Transformers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 glass rounded-xl text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 group transition-colors duration-200 w-fit"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-5">Get In Touch</p>
            <div className="space-y-3">
              <a
                href="mailto:r8013938@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                r8013938@gmail.com
              </a>
              <a
                href="tel:+917603945397"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                +91 76039 45397
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group"
              >
                Open to Work
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Shashank R. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Built with React · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
