import React, { useMemo } from 'react';
import { Progress } from '../ui/progress';
import { StatusBar } from '../ui/StatusBar';
import { MvpStudioState, IdeaEvaluation } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface PhaseHeaderProps {
    phase: MvpStudioState['phase'];
    progress: number;
    evaluation: IdeaEvaluation | null;
    ollamaStatus: 'checking' | 'connected' | 'disconnected';
}

export const PhaseHeader = React.memo(({ phase, progress, evaluation, ollamaStatus }: PhaseHeaderProps) => {
    const { t } = useLanguage();

    const phaseTitle = useMemo(() => {
        switch (phase) {
            case 'EVALUATING': return t.studio?.evaluating || '> AGENT_SWARM: ASSESSING_FEASIBILITY...';
            case 'MVP_BUILDING': return t.studio?.building || '> KERNEL: COMPILING_BLUEPRINT...';
            case 'RESULT': return t.studio?.result || '> MISSION_COMPLETE: ARTIFACTS_GENERATED';
            default: return '';
        }
    }, [phase, t]);

    return (
        <div className="space-y-4 transition-opacity duration-500">
            <div className="flex justify-between items-end mb-2">
                <h2 className="text-xl font-mono text-white tracking-tight">
                    {phaseTitle}
                </h2>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono transition-colors ${ollamaStatus === 'connected'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : ollamaStatus === 'checking'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}>
                        <div className={`w-1 h-1 rounded-full ${ollamaStatus === 'connected' ? 'bg-emerald-400 animate-pulse' :
                            ollamaStatus === 'checking' ? 'bg-amber-400' : 'bg-rose-400'
                            }`} />
                        OLLAMA: {ollamaStatus.toUpperCase()}
                    </div>
                    <span className="text-xs font-mono text-accent-cyan animate-pulse">
                        {phase === 'RESULT' ? 'DONE' : 'PROCESSING'}
                    </span>
                </div>
            </div>
            <Progress value={progress} className="w-full h-1 bg-neutral-800" />
            <StatusBar phase={phase} evaluation={evaluation} />
        </div>
    );
});

PhaseHeader.displayName = 'PhaseHeader';
