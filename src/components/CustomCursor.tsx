import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('a, button, [role="button"], .cursor-pointer, input, select, textarea, h1, h2, h3, .title');
        if (isInteractive) {
          cursor.style.transform = 'scale(1.5)';
        } else {
          cursor.style.transform = 'scale(1)';
        }
      }
    };

    // Smooth lerp function for fluid, premium tracking
    let rafId: number;
    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;

      // Center the 24px cursor container
      cursor.style.left = `${currentX - 12}px`;
      cursor.style.top = `${currentY - 12}px`;

      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(updatePosition);

    // Hide default cursor globally
    const style = document.createElement('style');
    style.id = 'hide-default-cursor';
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      const cursorStyle = document.getElementById('hide-default-cursor');
      if (cursorStyle) cursorStyle.remove();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        width: '24px',
        height: '24px',
        background: '#ffffff',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'difference',
        boxShadow: '2px -3px 25px -1px rgba(250,250,250,0.4)',
        transition: 'transform 0.15s ease-out',
        willChange: 'left, top, transform',
      }}
    />
  );
};

export default CustomCursor;
