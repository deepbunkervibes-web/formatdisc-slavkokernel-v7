import { useEffect, useRef } from 'react';

/**
 * usePrefetchSection
 * Proactively preloads a lazy-loaded component when it's about to enter the viewport.
 */
export function usePrefetchSection(importFn?: () => Promise<any>) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current || !importFn) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Trigger the dynamic import
                        importFn().catch((err) => {
                            console.warn('Prefetch failed:', err);
                        });
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '300px' }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [importFn]);

    return ref;
}
