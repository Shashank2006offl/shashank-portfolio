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

            // For sticky sections (like #projects), we want a 0px offset so the sticky child begins sticking immediately.
            // For other sections, we offset by 65px to clear the fixed navigation bar.
            const isProjects = href === '#projects';
            const offset = isProjects ? 0 : 65;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
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