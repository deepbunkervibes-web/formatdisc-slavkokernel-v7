import { useKernel, useKernelTick } from '../kernel/KernelProvider';

/**
 * useKernelMotion
 * Syncs animations to the deterministic kernel click.
 */
export const useKernelMotion = (phase: number = 0) => {
    const { state } = useKernel();
    const { tick } = useKernelTick();
    if (state !== 'ready') return 0;

    // Calculate motion progress based on global tick
    const progress = Math.max(0, tick - phase);
    const eased = 1 - Math.pow(1 - Math.min(progress / 60, 1), 3);

    return eased;
};
