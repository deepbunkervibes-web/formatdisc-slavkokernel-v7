import React from 'react';
import { NeuralField } from './NeuralField';
import { ThoughtStream } from './ThoughtStream';
import { ConfidenceGauge } from './ConfidenceGauge';
import { DecisionTreeHologram, TreeNode } from './DecisionTreeHologram';
import { QuantumStateIndicator } from './QuantumStateIndicator';
import { PhaseTimeline } from './PhaseTimeline';

// 5. Layout Constants (Enterprise-Grade)
const HUD_LAYOUT = {
    height: '600px',
    decisionTree: {
        width: '340px',
        height: '400px'
    }
} as const;

interface KernelConsciousnessProps {
    phase: string;
    thoughts?: string[];
    decisionTree?: TreeNode[];
    confidence?: number;
    quantumState?: 'SUPERPOSITION' | 'COLLAPSED' | 'DECOHERING';
}

export const KernelConsciousnessDashboard: React.FC<KernelConsciousnessProps> = ({
    phase,
    thoughts = [],
    decisionTree = [],
    confidence = 0.85,
    quantumState = 'SUPERPOSITION',
}) => {
    return (
        <div
            className={`relative w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/80`}
            style={{ height: HUD_LAYOUT.height }}
            role="region"
            aria-label="Kernel Consciousness Dashboard"
        >
            {/* 1. Neural Hologram */}
            <div className="absolute inset-0 z-0">
                <NeuralField phase={phase} confidence={confidence} />
            </div>

            {/* 2. Thought Stream */}
            <div className="absolute top-6 left-6 w-80 z-10">
                <ThoughtStream thoughts={thoughts} />
            </div>

            {/* 3. Confidence Gauge */}
            <div className="absolute bottom-6 left-6 z-10">
                <ConfidenceGauge value={confidence} />
            </div>

            {/* 4. Decision Tree */}
            <div
                className="absolute top-6 right-6 z-10"
                style={{ width: HUD_LAYOUT.decisionTree.width, height: HUD_LAYOUT.decisionTree.height }}
            >
                <DecisionTreeHologram tree={decisionTree} />
            </div>

            {/* 5. Quantum State */}
            <div className="absolute bottom-6 right-6 z-10">
                <QuantumStateIndicator state={quantumState} />
            </div>

            {/* 6. Temporal Timeline (Bottom Center) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                <PhaseTimeline currentPhase={phase} />
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-1" />

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[2] bg-[length:100%_2px,3px_100%]" />
        </div>
    );
};
