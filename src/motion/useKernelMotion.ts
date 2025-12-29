import { useKernel } from '../kernel/KernelProvider';

export const useKernelMotion = (phase: number = 0) => {
    const { tick, state } = useKernel();
    if (state !== 'ready') return 0;

    // Calculate motion with easing
    const progress = Math.max(0, tick - phase);
    const eased = 1 - Math.pow(1 - Math.min(progress / 60, 1), 3);

    return eased;
};
