import React, { useState, useCallback, useEffect, useMemo, Suspense } from 'react';
import { MvpStudioState, IdeaEvaluation } from '../types';
import { mvpStudioService } from '../services/geminiService';
import { IdeaInput } from './IdeaInput';
import { CinematicBoot } from './studio/CinematicBoot';
import { QuantumCanvas } from './studio/QuantumCanvas';
import { useKernel } from '../kernel/KernelProvider';
import { KernelBootPhase } from '../constants/kernelVisuals';

import { Toaster } from './ui/toaster';
import { useToast } from '../hooks/use-toast';
import { markPerformance, measurePerformancePoint } from '../utils/performance';
import { trackEvent } from '../utils/posthog';

// Modular components
import { PhaseHeader } from './studio/PhaseHeader';
import { SimulationWorkspace } from './studio/SimulationWorkspace';

// Lazy-loaded high-weight components
const ResultActions = React.lazy(() => import('./ResultActions').then(mod => ({ default: mod.ResultActions })));

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
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [isLoading, setIsLoading] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [visualPhase, setVisualPhase] = useState<KernelBootPhase>('INIT');
  const [activeTab, setActiveTab] = useState<'council' | 'mvp' | 'deck'>('council');
  const { toast } = useToast();
  const { startNewSession, currentSessionId } = useKernel();

  // Enforce dark mode on component mount & check Ollama
  useEffect(() => {
    document.documentElement.classList.add('dark');

    const checkStatus = async () => {
      try {
        const { checkOllamaHealth } = await import('../services/ollamaService');
        const health = await checkOllamaHealth();
        setOllamaStatus(health.available ? 'connected' : 'disconnected');
      } catch {
        setOllamaStatus('disconnected');
      }
    };
    checkStatus();

    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const progressValue = useMemo(() => {
    switch (state.phase) {
      case 'IDEA_INPUT': return 10;
      case 'EVALUATING': return 40;
      case 'MVP_BUILDING': return 75;
      case 'RESULT': return 100;
      default: return 0;
    }
  }, [state.phase]);

  const handleGenerateMvp = useCallback(
    async (idea: string, evaluation: IdeaEvaluation) => {
      if (!evaluation) return;
      setIsLoading(true);
      setState((prev) => ({ ...prev, phase: 'MVP_BUILDING' }));
      setActiveTab('mvp');
      trackEvent('mvp_generation_started');

      toast({
        title: 'Building MVP...',
        description: 'The Council is generating the MVP blueprint and pitch deck.',
      });

      markPerformance('build-start');

      try {
        const mvpBlueprint = await mvpStudioService.generateMvp(idea, evaluation);
        const pitchDeck = await mvpStudioService.generatePitchDeck(idea, evaluation, mvpBlueprint);
        const investorSummary = await mvpStudioService.generateInvestorSummary(idea, evaluation, mvpBlueprint, pitchDeck);

        measurePerformancePoint('mvp_generation_duration', 'build-start');

        setState((prev) => ({
          ...prev,
          phase: 'RESULT',
          mvpBlueprint,
          pitchDeck,
          investorSummary,
        }));

        trackEvent('mvp_generation_completed');

        toast({
          title: 'Generation Complete!',
          description: 'All artifacts have been successfully generated.',
        });

      } catch (error) {
        const msg = error instanceof Error ? error.message : 'An unknown error occurred during MVP generation.';
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

  const handleSubmitIdea = useCallback(async (idea: string) => {
    setIsLoading(true);
    startNewSession(); // Start a fresh audit session
    setState((prev) => ({ ...prev, phase: 'EVALUATING', idea, error: null }));
    setActiveTab('council');
    trackEvent('idea_submitted', { length: idea.length });
    markPerformance('eval-start');

    try {
      const evaluation = await mvpStudioService.evaluateIdea(idea);
      measurePerformancePoint('idea_evaluation_duration', 'eval-start');
      setState((prev) => ({ ...prev, evaluation }));
      trackEvent('evaluation_completed', { verdict: evaluation.verdict, score: evaluation.score });

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
      trackEvent('error_occurred', { phase: 'EVALUATING', message: msg });
      setState((prev) => ({ ...prev, error: msg, phase: 'IDEA_INPUT' }));
      toast({
        title: 'Error',
        description: msg,
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  }, [handleGenerateMvp, toast]);

  // Sync visual phase with simulation phase
  useEffect(() => {
    if (hasBooted) {
      setVisualPhase(state.phase as KernelBootPhase);
    }
  }, [state.phase, hasBooted]);

  // Memoize boot callbacks to prevent infinite re-render
  const handleBootComplete = useCallback(() => {
    setHasBooted(true);
  }, []);

  const handlePhaseChange = useCallback((phase: string) => {
    setVisualPhase(phase as KernelBootPhase);
  }, []);

  const handleReset = useCallback(() => {
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

  return (
    <>
      <QuantumCanvas
        phase={visualPhase}
        verdict={state.evaluation?.verdict}
        sessionHash={currentSessionId || undefined}
      />

      {!hasBooted ? (
        <CinematicBoot
          onComplete={handleBootComplete}
          onPhaseChange={handlePhaseChange}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center w-full relative z-10 pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 w-full">
            {state.phase === 'IDEA_INPUT' ? (
              <IdeaInput initialIdea={state.idea} onSubmit={handleSubmitIdea} error={state.error} isLoading={isLoading} ollamaStatus={ollamaStatus} />
            ) : (
              <div className="space-y-6">
                <PhaseHeader
                  phase={state.phase}
                  progress={progressValue}
                  evaluation={state.evaluation}
                  ollamaStatus={ollamaStatus}
                />

                <SimulationWorkspace
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  state={state}
                />

                {state.phase === 'RESULT' && (
                  <Suspense fallback={<div className="h-20 animate-pulse bg-neutral-800/20 rounded-xl" />}>
                    <ResultActions
                      evaluation={state.evaluation}
                      mvpBlueprint={state.mvpBlueprint}
                      pitchDeck={state.pitchDeck}
                      investorSummary={state.investorSummary}
                      onReset={handleReset}
                      onProceedAnyway={() => handleGenerateMvp(state.idea, state.evaluation!)}
                    />
                  </Suspense>
                )}

                {state.error && (
                  <div className="rounded-lg bg-red-100 dark:bg-accentRed/20 border border-red-300 dark:border-accentRed p-4 text-sm text-red-700 dark:text-accentRed">
                    <strong>Error:</strong> {state.error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}