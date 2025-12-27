import React, { Suspense } from 'react';
import { EvaluationView } from '../EvaluationView';
import { Tabs } from '../ui/Tabs';
import { GlassCard } from '../GlassCard';
import { Terminal } from '../ui/Terminal';
import { MvpStudioState } from '../../types';
import { ViewSkeleton, TerminalSkeleton } from './Skeletons';
import { useLanguage } from '../../context/LanguageContext';

// Lazy-loaded artifact components
const MvpPreview = React.lazy(() => import('../MvpPreview').then(mod => ({ default: mod.MvpPreview })));
const PitchDeckView = React.lazy(() => import('../PitchDeckView').then(mod => ({ default: mod.PitchDeckView })));

interface SimulationWorkspaceProps {
    activeTab: 'council' | 'mvp' | 'deck';
    setActiveTab: (tab: 'council' | 'mvp' | 'deck') => void;
    state: MvpStudioState;
}

export const SimulationWorkspace = React.memo(({ activeTab, setActiveTab, state }: SimulationWorkspaceProps) => {
    const { phase, evaluation, mvpBlueprint, pitchDeck } = state;
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Evaluation & Analysis */}
            <div className="space-y-6">
                <EvaluationView evaluation={evaluation} phase={phase} />

                {phase === 'EVALUATING' && (
                    <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-sm text-neutral-400 font-mono">
                        <p className="mb-2 text-white">&gt; System Broadcast:</p>
                        <p className="typing-effect">Analysing competitive landscape...</p>
                        <p className="typing-effect delay-1000">Checking regulatory constraints...</p>
                        <p className="typing-effect delay-2000">Simulating 1,000 user sessions...</p>
                    </div>
                )}
            </div>

            {/* Right Column: Artifacts & Terminal */}
            <div className="space-y-4">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} mvpBlueprint={mvpBlueprint} pitchDeck={pitchDeck} />
                <GlassCard className="min-h-[600px] max-h-[800px] p-0 overflow-hidden flex flex-col bg-[#0d1117] border-neutral-800">
                    <Suspense fallback={<TerminalSkeleton />}>
                        {activeTab === 'council' && evaluation && (
                            <Terminal
                                logs={evaluation.logs}
                                isProcessing={phase === 'EVALUATING' || phase === 'MVP_BUILDING'}
                            />
                        )}
                        {activeTab === 'mvp' && (
                            <div className="h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                                <MvpPreview blueprint={mvpBlueprint} />
                            </div>
                        )}
                        {activeTab === 'deck' && (
                            <div className="h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                                {pitchDeck ? <PitchDeckView deck={pitchDeck} /> : (
                                    <div className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-4">
                                        <div className="w-12 h-12 border-2 border-neutral-800 border-t-accent-cyan rounded-full animate-spin"></div>
                                        <p className="font-mono text-xs uppercase tracking-widest">Generating Deck...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </Suspense>
                </GlassCard>
            </div>
        </div>
    );
});

SimulationWorkspace.displayName = 'SimulationWorkspace';
