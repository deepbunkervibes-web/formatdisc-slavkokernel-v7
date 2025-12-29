import * as React from 'react';import { useMemo } from 'react';

import { Progress } from '../ui/progress';
import { StatusBar } from '../ui/StatusBar';
import { MvpStudioState, IdeaEvaluation } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { phaseTitles, phaseNarrative, phaseMicrocopy, SimulationPhase } from '../../constants/phaseNarrative';

interface PhaseHeaderProps {
  phase: MvpStudioState['phase'];
  progress: number;
  evaluation: IdeaEvaluation | null;
  ollamaStatus: 'checking' | 'connected' | 'disconnected';
}

export const PhaseHeader = React.memo(({ phase, progress, evaluation, ollamaStatus }: PhaseHeaderProps) => {
  const { t } = useLanguage();

  const phaseTitle = useMemo(() => {
    return phaseTitles[phase as SimulationPhase] || phase;
  }, [phase]);

  const narrative = useMemo(() => {
    return phaseNarrative[phase as SimulationPhase] || '';
  }, [phase]);

  const microcopy = useMemo(() => {
    return phaseMicrocopy[phase as SimulationPhase] || '';
  }, [phase]);

  return (
    <div className="space-y-4 transition-opacity duration-500">
            <div className="flex justify-between items-end mb-2">
                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">
                        SlavkoKernel™ v7 · Simulation Phase
                    </p>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        {phaseTitle}
                    </h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono transition-colors ${ollamaStatus === 'connected' ?
          'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
          ollamaStatus === 'checking' ?
          'bg-amber-500/10 border-amber-500/20 text-amber-400' :
          'bg-rose-500/10 border-rose-500/20 text-rose-400'}`
          }>
                        <div className={`w-1 h-1 rounded-full ${ollamaStatus === 'connected' ? 'bg-emerald-400 animate-pulse' :
            ollamaStatus === 'checking' ? 'bg-amber-400' : 'bg-rose-400'}`
            } />
                        OLLAMA: {ollamaStatus.toUpperCase()}
                    </div>
                    <span className="text-xs font-mono text-accent-cyan animate-pulse">
                        {phase === 'RESULT' ? 'DONE' : 'PROCESSING'}
                    </span>
                </div>
            </div>
            <Progress value={progress} className="w-full h-1 bg-neutral-800" />
            <div className="space-y-1 pt-2">
                <p className="text-sm text-neutral-300 leading-relaxed">
                    {narrative}
                </p>
                <p className="text-xs text-neutral-500 italic">
                    {microcopy}
                </p>
            </div>
            <StatusBar phase={phase} evaluation={evaluation} />
        </div>);

});

PhaseHeader.displayName = 'PhaseHeader';