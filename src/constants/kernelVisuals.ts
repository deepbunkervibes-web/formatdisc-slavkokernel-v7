// src/constants/kernelVisuals.ts
export type KernelBootPhase = "INIT" | "SYNC" | "SEAL" | "COUNCIL" | "READY" | "IDEA_INPUT" | "EVALUATING" | "MVP_BUILDING" | "RESULT";

export interface PhaseVisuals {
    baseColor: string;
    accentColor: string;
    activityLevel: number;
    connectionDensity: number;
}

export const kernelPhaseVisuals: Record<KernelBootPhase, PhaseVisuals> = {
    INIT: {
        baseColor: "#38bdf8",
        accentColor: "#eab308",
        activityLevel: 0.3,
        connectionDensity: 0.3,
    },
    SYNC: {
        baseColor: "#22c55e",
        accentColor: "#a855f7",
        activityLevel: 0.6,
        connectionDensity: 0.6,
    },
    SEAL: {
        baseColor: "#a855f7",
        accentColor: "#ec4899",
        activityLevel: 0.2,
        connectionDensity: 0.8,
    },
    COUNCIL: {
        baseColor: "#f97316",
        accentColor: "#facc15",
        activityLevel: 0.9,
        connectionDensity: 0.9,
    },
    READY: {
        baseColor: "#38bdf8",
        accentColor: "#22c55e",
        activityLevel: 0.4,
        connectionDensity: 0.5,
    },
    // Mapping MvpStudio phases to visuals
    IDEA_INPUT: {
        baseColor: "#0EA5E9", // Dormant blue
        accentColor: "#0EA5E9",
        activityLevel: 0.2,
        connectionDensity: 0.4,
    },
    EVALUATING: {
        baseColor: "#14F1D9", // Cold Cyan
        accentColor: "#14F1D9",
        activityLevel: 0.8,
        connectionDensity: 0.7,
    },
    MVP_BUILDING: {
        baseColor: "#8B5CF6", // Mythic Purple
        accentColor: "#D8B4FE",
        activityLevel: 0.6,
        connectionDensity: 0.9,
    },
    RESULT: {
        baseColor: "#FCD34D", // Success gold (will be overridden by verdict)
        accentColor: "#FCD34D",
        activityLevel: 0.4,
        connectionDensity: 0.6,
    }
};
