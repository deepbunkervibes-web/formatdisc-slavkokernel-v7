import * as React from 'react';
import { Check, Loader, X, AlertCircle } from 'lucide-react';

import { MvpStudioPhase, IdeaEvaluation } from '../../types';

interface StatusBarProps {
  phase: MvpStudioPhase;
  evaluation: IdeaEvaluation | null;
}

const getPhaseDescription = (phase: MvpStudioPhase) => {
  switch (phase) {
    case 'IDEA_INPUT':return 'Enter your idea for validation';
    case 'EVALUATING':return 'The Council is evaluating the idea...';
    case 'MVP_BUILDING':return 'The Council is generating the MVP & Pitch Deck...';
    case 'RESULT':return 'Evaluation and generation complete.';
    default:return '';
  }
};

const getVerdictIcon = (verdict: IdeaEvaluation['verdict'] | undefined) => {
  if (!verdict) return null;
  switch (verdict) {
    case 'PROCEED':return <Check size={16} className="text-accentGreen" />;
    case 'REJECT':return <X size={16} className="text-accentRed" />;
    case 'REVISE':return <AlertCircle size={16} className="text-accentYellow" />;
    default:return null;
  }
};

export function StatusBar({ phase, evaluation }: StatusBarProps) {
  const isProcessing = phase === 'EVALUATING' || phase === 'MVP_BUILDING';

  return (
    <div className="bg-white dark:bg-secondaryBg border border-slate-200 dark:border-borderColor rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {isProcessing ?
        <Loader size={16} className="animate-spin text-accentBlue" /> :

        getVerdictIcon(evaluation?.verdict)
        }
        <p className="text-sm text-slate-800 dark:text-primaryText">{getPhaseDescription(phase)}</p>
      </div>
      {evaluation &&
      <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-slate-600 dark:text-secondaryText">Score:</span>
          <span className="font-semibold text-slate-800 dark:text-primaryText">{evaluation.score.toFixed(1)}/10</span>
        </div>
      }
    </div>);

}