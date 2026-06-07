import { useEffect, useRef } from 'react';

const COLS = 64;
const ROWS = 20;
const DOT  = 6;
const GAP  = 3;

const FRAMES = ['SHASHANK', 'AI · ML', 'B.TECH', 'AI DS', 'DATA'];

const DotMatrix = () => {
  // Pre-create stable dot refs array
  const dotRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef  = useRef<ReturnType<typeof setInterval>>();
  const frameIdx  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width  = COLS;
    canvas.height = ROWS;
    const ctx = canvas.getContext('2d')!;

    const render = (text: string) => {
      ctx.clearRect(0, 0, COLS, ROWS);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, COLS, ROWS);

      // Pick font size that fits — smaller for longer strings to avoid antialiasing bleed
      const fontSize = text.length >= 7 ? 6 : text.length >= 5 ? 8 : 11;
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.fillStyle = '#fff';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, COLS / 2, ROWS / 2);

      const { data } = ctx.getImageData(0, 0, COLS, ROWS);

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const o   = i * 4;
        const on  = (data[o] + data[o + 1] + data[o + 2]) / 3 > 100;
        dot.style.background = on
          ? 'hsl(var(--primary))'
          : 'rgba(255,255,255,0.07)';
        dot.style.boxShadow  = on
          ? '0 0 5px hsl(var(--primary) / 0.55)'
          : 'none';
      });
    };

    render(FRAMES[0]);

    timerRef.current = setInterval(() => {
      frameIdx.current = (frameIdx.current + 1) % FRAMES.length;
      render(FRAMES[frameIdx.current]);
    }, 900);

    return () => clearInterval(timerRef.current);
  }, []);

  const totalDots = COLS * ROWS;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Panel */}
      <div
        style={{
          position: 'relative',
          padding: '12px 14px 14px',
          borderRadius: '14px',
          background: 'linear-gradient(180deg, #1c1d1f 0%, #212224 87%, #2d2e31 100%)',
          boxShadow: `
            inset 0 -3px 0 rgba(0,0,0,0.7),
            0 2px 0 rgba(0,0,0,0.3),
            0 18px 48px rgba(0,0,0,0.55)
          `,
        }}
      >
        {/* Gradient border ring */}
        <div style={{
          position: 'absolute', inset: '-1.5px',
          borderRadius: '15.5px',
          background: 'linear-gradient(180deg, #3e3e3f 0%, #0c0c0c 100%)',
          zIndex: -1,
        }} />

        {/* Dot grid — rendered in JSX, updated imperatively */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, ${DOT}px)`,
            gap: `${GAP}px`,
          }}
        >
          {Array.from({ length: totalDots }, (_, i) => (
            <span
              key={i}
              ref={el => { dotRefs.current[i] = el; }}
              style={{
                display: 'block',
                width: `${DOT}px`,
                height: `${DOT}px`,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)',
                transition: 'background 0.09s, box-shadow 0.09s',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase' as const,
        color: 'hsl(var(--muted-foreground))',
        opacity: 0.45,
      }}>
        {COLS}×{ROWS} · LED Matrix
      </p>
    </div>
  );
};

export default DotMatrix;
