import { useEffect } from 'react';

const useSmoothScroll = () => {
    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');

            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            // Use native smooth scroll - much faster and hardware accelerated
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            // Optional: Add focus effect after scroll
            setTimeout(() => {
                targetElement.classList.add('section-focus');
                setTimeout(() => {
                    targetElement.classList.remove('section-focus');
                }, 2000);
            }, 500);
        };

        // Use passive listener for better performance
        document.addEventListener('click', handleAnchorClick, { passive: false });

        return () => {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);
};

export default useSmoothScroll;