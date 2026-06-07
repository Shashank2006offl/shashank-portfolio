import { useRef, useEffect } from 'react';
import gsap from 'gsap';

// Curated images — each ties to a skill in the portfolio
const imgs = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=85',
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=85',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=85',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=85',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=85',
  'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=85',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=85',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=85',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=85',
];

const imageRows = Array.from({ length: 5 }, (_, r) =>
  Array.from({ length: 7 }, (_, c) => imgs[(r * 7 + c) % imgs.length])
);

interface WelcomeIntroProps {
  visible: boolean;
  onExplore: () => void;
}

const WelcomeIntro = ({ visible, onExplore }: WelcomeIntroProps) => {
  const introRef = useRef<HTMLDivElement>(null);
  const rowRefs  = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP mouse parallax on the grid rows
  useEffect(() => {
    if (!visible) return;
    
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    const middleRowIndex = Math.floor(rows.length / 2);
    let winsize = { width: window.innerWidth, height: window.innerHeight };
    let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };

    const handleResize = () => { winsize = { width: window.innerWidth, height: window.innerHeight }; };
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const styles = rows.map((_, i) => ({
      amt: Math.max(0.1 - Math.abs(i - middleRowIndex) * 0.025, 0.04),
      tx: { prev: 0, curr: 0 },
      br: { prev: 100, curr: 100 },
    }));

    let rafId: number;
    const render = () => {
      const tX  = (((mousepos.x / winsize.width) * 2 - 1) * 40 * winsize.width) / 100;
      const tBr = 100 - Math.pow(Math.abs((mousepos.x / winsize.width) * 2 - 1), 2) * 60;
      rows.forEach((row, i) => {
        const s = styles[i];
        const dir = i % 2 === 0 ? 1 : -1;
        s.tx.curr = tX * dir * (1 + Math.abs(i - middleRowIndex) * 0.3);
        s.br.curr = tBr;
        s.tx.prev = lerp(s.tx.prev, s.tx.curr, s.amt);
        s.br.prev = lerp(s.br.prev, s.br.curr, s.amt);
        gsap.set(row, { x: s.tx.prev, filter: `brightness(${s.br.prev}%)` });
      });
      rafId = requestAnimationFrame(render);
    };

    const onMouse = (e: MouseEvent) => { mousepos = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => { mousepos = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('resize', handleResize);
    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('resize', handleResize);
    };
  }, [visible]);

  const handleExplore = () => {
    gsap.to(introRef.current, {
      opacity: 0, duration: 0.9, ease: 'power2.in',
      onComplete: onExplore,
    });
  };

  if (!visible) return null;

  return (
    <div ref={introRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">

      {/* Diagonal image grid */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '200vw', height: '200vh',
          display: 'grid',
          gridTemplateRows: `repeat(${imageRows.length}, 1fr)`,
          gap: '0.6rem',
          transform: 'rotate(-15deg)',
          transformOrigin: 'center center',
          left: '-50%', top: '-50%',
        }}
      >
        {imageRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            ref={(el) => { rowRefs.current[rowIndex] = el; }}
            style={{ display: 'grid', gridTemplateColumns: `repeat(${row.length}, 1fr)`, gap: '0.6rem' }}
          >
            {row.map((img, imgIndex) => (
              <div key={imgIndex} className="relative overflow-hidden rounded-xl">
                <div style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'absolute', inset: 0,
                  borderRadius: 'inherit',
                }} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Center content — clean, no circle */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6">
        <p className="text-white/40 font-mono text-xs tracking-[0.4em] uppercase">
          Welcome to my portfolio
        </p>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white drop-shadow-2xl">
          SHASHANK
        </h1>
        <p className="text-white/55 font-mono text-sm tracking-[0.3em] uppercase">
          AI Engineer · Researcher · Builder
        </p>
        <button
          onClick={handleExplore}
          className="mt-3 px-10 py-3.5 text-white/75 font-semibold uppercase tracking-[0.25em] text-sm rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default WelcomeIntro;