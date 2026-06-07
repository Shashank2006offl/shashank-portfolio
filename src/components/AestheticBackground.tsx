/**
 * AestheticBackground — dead simple.
 * Just a faint dot grid with radial fade. That's it.
 * The noise grain is already handled by body::after in index.css.
 */
const AestheticBackground = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      opacity: 0.5,
    }}
  />
);

export default AestheticBackground;
