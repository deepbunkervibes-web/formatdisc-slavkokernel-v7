import React, { useState, useCallback, useEffect } from 'react';
import { MvpStudioState } from '../types';
import { mvpStudioService } from '../services/geminiService';
import { IdeaInput } from './IdeaInput';
import { EvaluationView } from './EvaluationView';
import { MvpPreview } from './MvpPreview';
import { PitchDeckView } from './PitchDeckView';
import { ResultActions } from './ResultActions';
import { StatusBar } from './ui/StatusBar';
import { Tabs } from './ui/Tabs';
import { Terminal } from './ui/Terminal';
import { Progress } from './ui/progress';
import { Toaster } from './ui/toaster';
import { useToast } from '../hooks/use-toast';
import { PulsatingBackground } from './PulsatingBackground';
import { GlassCard } from './GlassCard';
import { markPerformance, measurePerformancePoint } from '../utils/performance';
import { trackEvent } from '../utils/posthog';

export function MvpStudio() {
  const [state, setState] = useState<MvpStudioState>({
    phase: 'IDEA_INPUT',
    idea: '',
    evaluation: null,
    mvpBlueprint: null,
    pitchDeck: null,
    investorSummary: null,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'council' | 'mvp' | 'deck'>('council');
  const { toast } = useToast();

  // Enforce dark mode on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    // Optional: cleanup if the component were to unmount
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const getProgressValue = () => {
    switch (state.phase) {
      case 'IDEA_INPUT': return 10;
      case 'EVALUATING': return 40;
      case 'MVP_BUILDING': return 75;
      case 'RESULT': return 100;
      default: return 0;
    }
  };

  const handleSubmitIdea = useCallback(async (idea: string) => {
    setIsLoading(true);
    setState((prev) => ({ ...prev, phase: 'EVALUATING', idea, error: null }));
    setActiveTab('council');

    // Analytics: Track idea submission
    trackEvent('idea_submitted', { length: idea.length });

    // Start performance measurement for evaluation
    markPerformance('eval-start');

    try {
      const evaluation = await mvpStudioService.evaluateIdea(idea);

      // End performance measurement for evaluation
      measurePerformancePoint('idea_evaluation_duration', 'eval-start');

      setState((prev) => ({ ...prev, evaluation }));

      // Analytics: Track evaluation result
      trackEvent('evaluation_completed', {
        verdict: evaluation.verdict,
        score: evaluation.score
      });

      if (evaluation.verdict === 'PROCEED') {
        await handleGenerateMvp(idea, evaluation);
      } else {
        setState((prev) => ({ ...prev, phase: 'RESULT' }));
        toast({
          title: 'Evaluation Complete',
          description: `The Council suggests revising the idea.`,
          variant: evaluation.verdict === 'REJECT' ? 'destructive' : 'default',
        });
        setIsLoading(false);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'An unknown error occurred during evaluation.';

      // Analytics: Track error
      trackEvent('error_occurred', { phase: 'EVALUATING', message: msg });

      setState((prev) => ({ ...prev, error: msg, phase: 'IDEA_INPUT' }));
      toast({
        title: 'Error',
        description: msg,
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  }, [toast]);

  const handleGenerateMvp = useCallback(
    async (idea: string, evaluation: MvpStudioState['evaluation']) => {
      if (!evaluation) return;
      setIsLoading(true); // Ensure loading state is active
      setState((prev) => ({ ...prev, phase: 'MVP_BUILDING' }));
      setActiveTab('mvp');

      // Analytics: Track MVP generation start
      trackEvent('mvp_generation_started');

      toast({
        title: 'Building MVP...',
        description: 'The Council is generating the MVP blueprint and pitch deck.',
      });

      // Start performance measurement for build
      markPerformance('build-start');

      try {
        const mvpBlueprint = await mvpStudioService.generateMvp(idea, evaluation);
        const pitchDeck = await mvpStudioService.generatePitchDeck(idea, evaluation, mvpBlueprint);
        const investorSummary = await mvpStudioService.generateInvestorSummary(idea, evaluation, mvpBlueprint, pitchDeck);

        // End performance measurement for build
        measurePerformancePoint('mvp_generation_duration', 'build-start');

        setState((prev) => ({
          ...prev,
          phase: 'RESULT',
          mvpBlueprint,
          pitchDeck,
          investorSummary,
        }));

        // Analytics: Track successful generation
        trackEvent('mvp_generation_completed');

        toast({
          title: 'Generation Complete!',
          description: 'All artifacts have been successfully generated.',
        });

      } catch (error) {
        const msg = error instanceof Error ? error.message : 'An unknown error occurred during MVP generation.';

        // Analytics: Track error
        trackEvent('error_occurred', { phase: 'MVP_BUILDING', message: msg });

        setState((prev) => ({ ...prev, error: msg, phase: 'EVALUATING' }));
        toast({
          title: 'Error',
          description: msg,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const handleReset = useCallback(() => {
    // Analytics: Track reset
    trackEvent('session_reset');

    setState({
      phase: 'IDEA_INPUT',
      idea: '',
      evaluation: null,
      mvpBlueprint: null,
      pitchDeck: null,
      investorSummary: null,
      error: null,
    });
    setActiveTab('council');
  }, []);

  const renderPhase = () => {
    const { phase, idea, evaluation, mvpBlueprint, pitchDeck, investorSummary, error } = state;

    switch (phase) {
      case 'IDEA_INPUT':
        return <IdeaInput initialIdea={idea} onSubmit={handleSubmitIdea} error={error} isLoading={isLoading} />;

      case 'EVALUATING':
      case 'MVP_BUILDING':
      case 'RESULT':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 w-full">
            {/* Narrative Progress Bar */}
            <div className={`space-y-4 transition-opacity duration-500 ${phase !== 'RESULT' ? 'opacity-100' : 'opacity-100'}`}>
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-xl font-mono text-white tracking-tight">
                  {phase === 'EVALUATING' && '> AGENT_SWARM: ASSESSING_FEASIBILITY...'}
                  {phase === 'MVP_BUILDING' && '> KERNEL: COMPILING_BLUEPRINT...'}
                  {phase === 'RESULT' && '> MISSION_COMPLETE: ARTIFACTS_GENERATED'}
                </h2>
                <span className="text-xs font-mono text-accent-cyan animate-pulse">
                  {state.phase === 'RESULT' ? 'DONE' : 'PROCESSING'}
                </span>
              </div>
              <Progress value={getProgressValue()} className="w-full h-1 bg-neutral-800" />
              <StatusBar phase={phase} evaluation={evaluation} />
            </div>

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
                </GlassCard>
              </div>
            </div>

            {phase === 'RESULT' && (
              <ResultActions
                evaluation={evaluation}
                mvpBlueprint={mvpBlueprint}
                pitchDeck={pitchDeck}
                investorSummary={investorSummary}
                onReset={handleReset}
                onProceedAnyway={() => handleGenerateMvp(idea, evaluation)}
              />
            )}

            {error && (
              <div className="rounded-lg bg-red-100 dark:bg-accentRed/20 border border-red-300 dark:border-accentRed p-4 text-sm text-red-700 dark:text-accentRed">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <PulsatingBackground />
      <div className="min-h-screen flex items-center justify-center w-full relative z-10">{renderPhase()}</div>
      <Toaster />
    </>
  );
}