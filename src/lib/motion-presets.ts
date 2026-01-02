import { Variants, Transition } from "framer-motion";

/**
 * Canonical Motion Governance Layer for SlavkoKernel v7
 * Establishes the 'Swiss Bank' institutional aesthetic.
 */

export const INSTITUTIONAL_TRANSITION: Transition = {
  type: "spring",
  damping: 30,     // Removes bounce entirely
  stiffness: 100,  // Heavy, deliberate acceleration
  mass: 1,
};

// Casting to any for ease because framer-motion v12 Easing type is very strict with array definitions
export const HEAVY_EASE: any = [0.2, 0.65, 0.3, 0.9]; 

export const fadeInHeavy: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: HEAVY_EASE,
    },
  },
};

export const slideUpHeavy: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...(INSTITUTIONAL_TRANSITION as any),
      duration: 0.8,
    },
  },
};

export const slideInLeftHeavy: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ...(INSTITUTIONAL_TRANSITION as any),
      duration: 0.8,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Specifically for system-like diagnostic reveals in 
 * ArchitectureVisualization.
 */
export const diagnosticReveal: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: HEAVY_EASE,
    },
  },
};

export const GROK_SLIDE: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export const GROK_FADE: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};
