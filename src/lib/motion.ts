export const motion = {
    durations: {
        fast: 90,
        medium: 150,
        slow: 200,
    },
    easing: {
        standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
    classes: {
        fadeInUp: 'animate-fd-fade-in-up',
        fadeInDown: 'animate-fd-fade-in-down',
        fadeIn: 'animate-fd-fade-in',
        scaleIn: 'animate-fd-scale-in',

        // Transitions
        transitionStandard: 'transition-all duration-fd_medium ease-fd_standard',
        transitionFast: 'transition-all duration-fd_fast ease-fd_standard',
    },
} as const;
