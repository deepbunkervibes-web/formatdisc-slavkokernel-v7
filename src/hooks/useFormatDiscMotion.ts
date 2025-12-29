import { Variants } from "framer-motion";

import { variants, microReactions } from "@/lib/motionTokens";

export function useFadeInUp(order?: number) {
    const baseDelay = 0.08;
    const delay = order && order > 0 ? order * baseDelay : 0;

    return {
        variants: variants.fadeInUp,
        initial: "initial",
        animate: "animate",
        transition: { ...variants.fadeInUp.animate?.transition, delay },
        className: "will-change-transform will-change-opacity"
    };
}

export function useStagger(staggerDelay = 0.05) {
    return {
        variants: variants.staggerContainer(staggerDelay),
        initial: "initial",
        animate: "animate"
    };
}

export function useMicroButton() {
    return {
        whileHover: microReactions.buttonHover,
        whileTap: microReactions.buttonTap,
        className: "transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
    };
}

export function useMicroCard() {
    return {
        whileHover: microReactions.cardHover,
        variants: variants.fadeInUp,
        initial: "initial",
        animate: "animate",
        className: "transition-colors"
    };
}
