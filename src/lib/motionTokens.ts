import { Variants, Transition } from "framer-motion";

/**
 * FORMATDISC MOTION MANIFEST v1.0
 *
 * Core Principles:
 * 1. Fast, but not jittery (90–200ms)
 * 2. Deterministic — no randomness
 * 3. Consistent easing: cubic-bezier(0.16, 1, 0.3, 1)
 * 4. Subtle movements: translateY(2–4px), scale(0.96–1)
 * 5. Motion is functional, not decorative
 */

export const EASE = {
    standard: [0.16, 1, 0.3, 1],
    out: [0.21, 0, 0.36, 1],
    in: [0.32, 0, 0.67, 0],
} as const;

export const DURATION = {
    fast: 0.15,
    medium: 0.25,
    slow: 0.4,
} as const;

export const transitions = {
    spring: {
        fast: { type: "spring", stiffness: 260, damping: 26, mass: 0.8 } as Transition,
        medium: { type: "spring", stiffness: 200, damping: 24, mass: 1.0 } as Transition,
        slow: { type: "spring", stiffness: 150, damping: 22, mass: 1.2 } as Transition,
    },
    tween: {
        standard: { duration: DURATION.medium, ease: EASE.standard } as Transition,
        fast: { duration: DURATION.fast, ease: EASE.standard } as Transition,
    },
} as const;

export const variants = {
    fadeInUp: {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: transitions.spring.medium,
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: DURATION.fast, ease: EASE.in },
        },
    } satisfies Variants,

    fadeInScale: {
        initial: { opacity: 0, scale: 0.96 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: transitions.spring.fast,
        },
        exit: {
            opacity: 0,
            scale: 0.96,
            transition: { duration: 0.1, ease: EASE.in },
        },
    } satisfies Variants,

    sectionEnter: {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: EASE.standard,
            },
        },
    } satisfies Variants,

    staggerContainer: (staggerDelay = 0.05): Variants => ({
        animate: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    }),
} as const;

export const microReactions = {
    buttonHover: {
        scale: 1.02,
        y: -1,
        transition: { duration: DURATION.fast, ease: EASE.standard },
    },
    buttonTap: {
        scale: 0.98,
        y: 0,
        transition: { duration: DURATION.fast, ease: EASE.standard },
    },
    cardHover: {
        y: -4,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
        transition: transitions.spring.fast,
    },
} as const;

export const motionTokens = {
    EASE,
    DURATION,
    transitions,
    variants,
    microReactions
} as const;
