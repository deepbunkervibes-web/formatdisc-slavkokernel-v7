import { INSTITUTIONAL_TRANSITION, HEAVY_EASE } from "@/lib/motion-presets";

/**
 * useFadeInUp
 * Global hook for section entry, now governed by Institutional Motion LAW.
 */
export function useFadeInUp(order?: number) {
    const baseDelay = 0.15; // More deliberate spacing between sections
    const delay = order && order > 0 ? order * baseDelay : 0;

    return {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { 
            ...INSTITUTIONAL_TRANSITION, 
            delay,
            ease: HEAVY_EASE 
        },
        className: "will-change-transform will-change-opacity"
    };
}

export function useStagger(staggerDelay = 0.1) {
    return {
        variants: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerDelay,
                    delayChildren: 0.2
                }
            }
        },
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true }
    };
}

export function useMicroButton() {
    return {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: INSTITUTIONAL_TRANSITION,
        className: "transition-all duration-300"
    };
}

export function useMicroCard() {
    return {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        whileHover: { y: -5, transition: { duration: 0.4, ease: HEAVY_EASE } },
        viewport: { once: true },
        className: "transition-all"
    };
}
