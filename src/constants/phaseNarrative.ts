// src/constants/phaseNarrative.ts

export type SimulationPhase =
    | "IDEA_INPUT"
    | "EVALUATING"
    | "MVP_BUILDING"
    | "RESULT";

export const phaseTitles: Record<SimulationPhase, string> = {
    IDEA_INPUT: "Confession",
    EVALUATING: "Interrogation",
    MVP_BUILDING: "Reconstruction",
    RESULT: "Verdict",
};

export const phaseNarrative: Record<SimulationPhase, string> = {
    IDEA_INPUT: "Every truth begins with a confession. This is where you first speak the idea without filters.",
    EVALUATING:
        "The Council is dissecting your idea. No mercy, no ego, only cold analysis against the real world.",
    MVP_BUILDING:
        "If the idea survives the fire, it earns the right to be built. The Kernel is now turning the remaining truth into a plan.",
    RESULT:
        "The verdict has been rendered. No maybes. Only what is strong enough to survive – and what is not.",
};

export const phaseMicrocopy: Record<SimulationPhase, string> = {
    IDEA_INPUT: "The more honest the input, the more useful the output.",
    EVALUATING: "Dissecting assumptions, distribution, markets, and illusions.",
    MVP_BUILDING: "Cutting excess, focusing on what the market can actually validate.",
    RESULT: "What you do with the truth is your choice. But you can no longer pretend you don't know it.",
};
