import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>© Shashank R</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-2xl font-bold gradient-text font-mono">
              SR
            </a>
          </div>
          <div className="text-muted-foreground text-sm font-mono">
            AI & Data Science
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
