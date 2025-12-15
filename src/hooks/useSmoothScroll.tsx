import { useEffect } from 'react';

const useSmoothScroll = () => {
    useEffect(() => {
        // Enhanced smooth scroll with easing
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');

            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            // Add loading effect
            document.body.style.cursor = 'wait';

            // Smooth scroll with custom easing
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1200; // Longer duration for dramatic effect
            let start: number | null = null;

            const easeInOutCubic = (t: number): number => {
                return t < 0.5
                    ? 4 * t * t * t
                    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            };

            const animation = (currentTime: number) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutCubic(progress);

                window.scrollTo(0, startPosition + distance * ease);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    // Reset cursor
                    document.body.style.cursor = '';

                    // Add focus effect
                    targetElement.classList.add('section-focus');
                    setTimeout(() => {
                        targetElement.classList.remove('section-focus');
                    }, 2000);
                }
            };

            requestAnimationFrame(animation);
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);
};

export default useSmoothScroll;