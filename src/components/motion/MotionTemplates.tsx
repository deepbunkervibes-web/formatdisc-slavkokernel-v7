import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

import { variants } from "@/lib/motionTokens";
import { useFadeInUp, useMicroButton, useMicroCard } from "@/hooks/useFormatDiscMotion";

type MotionSectionProps = {
    children: ReactNode;
    order?: number;
    className?: string;
};

// We use the hook for consistent delay calculation and props
export function MotionLanding({ children, order, className }: MotionSectionProps) {
    const motionProps = useFadeInUp(order);
    return (
        <motion.section
            {...motionProps}
            className={`${motionProps.className} ${className || ''}`}
        >
            {children}
        </motion.section>
    );
}

// StudioBoot uses specific scale animation, so strictly speaking useFadeInUp isn't perfect,
// but for now we keep it explicit or create a new hook if needed. 
// The user plan didn't explicitly ask for useFadeInScale hook, but we can implement it inline or add it.
// The manifest has variants.fadeInScale.
// Let's stick to the previous implementation for StudioBoot but use the principles.
const baseDelay = 0.08;
const computeDelay = (order?: number) => order && order > 0 ? order * baseDelay : 0;

export function MotionStudioBoot({ children, order, className }: MotionSectionProps) {
    return (
        <motion.section
            variants={variants.fadeInScale}
            initial="initial"
            animate="animate"
            transition={{ ...variants.fadeInScale.animate?.transition, delay: computeDelay(order) }}
            className={`will-change-transform will-change-opacity ${className || ''}`}
        >
            {children}
        </motion.section>
    );
}

export function MotionKernelContainer({ children, order, className }: MotionSectionProps) {
    const motionProps = useFadeInUp(order);
    return (
        <motion.section
            {...motionProps}
            className={`${motionProps.className} ${className || ''}`}
        >
            {children}
        </motion.section>
    );
}

type MotionInvestorCardProps = {
    children: ReactNode;
};

export function MotionInvestorCard({ children }: MotionInvestorCardProps) {
    const motionProps = useMicroCard();
    return (
        <motion.article
            {...motionProps}
            className={`rounded-xl border border-neutral-800/60 bg-neutral-950/60 ${motionProps.className}`}
        >
            {children}
        </motion.article>
    );
}

type MotionButtonProps = HTMLMotionProps<"button"> & {
    children: ReactNode;
    className?: string;
};

export function MotionButton({ children, className = "", ...rest }: MotionButtonProps) {
    const motionProps = useMicroButton();
    return (
        <motion.button
            whileHover={motionProps.whileHover}
            whileTap={motionProps.whileTap}
            className={`${motionProps.className} inline-flex items-center justify-center px-4 py-2 rounded-md ${className}`}
            {...rest}
        >
            {children}
        </motion.button>
    );
}
