import React from 'react';

const PHASES = ['IDEA_INPUT', 'EVALUATING', 'MVP_BUILDING', 'RESULT'];

export const PhaseTimeline = React.memo(({ currentPhase }: { currentPhase: string }) => {
    const currentIndex = PHASES.indexOf(currentPhase);

    return (
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg shadow-cyan-900/10">
            {PHASES.map((phase, idx) => {
                const isActive = idx === currentIndex;
                const isPast = idx < currentIndex;

                return (
                    <div key={phase} className="flex items-center">
                        {/* Node */}
                        <div className={`relative w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(34,211,238,0.8)]' :
                                isPast ? 'bg-cyan-700' : 'bg-white/10'
                            }`}>
                            {isActive && <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50" />}
                        </div>

                        {/* Line */}
                        {idx < PHASES.length - 1 && (
                            <div className={`w-6 h-[1px] mx-1 transition-colors duration-500 ${isPast ? 'bg-cyan-700' : 'bg-white/10'
                                }`} />
                        )}
                    </div>
                );
            })}
            <div className="ml-3 font-mono text-[10px] text-cyan-300 opacity-80 min-w-[40px]">
                {currentPhase.replace('_', ' ')}
            </div>
        </div>
    );
});
