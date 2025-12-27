import React from 'react';
import { MvpBlueprint, PitchDeck, InvestorSummary, IdeaEvaluation } from '../types';
import { Download, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/posthog';

interface ResultActionsProps {
  evaluation: IdeaEvaluation | null;
  mvpBlueprint: MvpBlueprint | null;
  pitchDeck: PitchDeck | null;
  investorSummary: InvestorSummary | null;
  onReset: () => void;
  onProceedAnyway: () => void;
}

export function ResultActions({ evaluation, mvpBlueprint, pitchDeck, investorSummary, onReset, onProceedAnyway }: ResultActionsProps) {
  const handleDownload = (content: object, filename: string) => {
    if(!content) return;
    
    // Analytics: Track download
    trackEvent('artifact_downloaded', { filename, type: filename.split('.')[0] });

    const json = JSON.stringify(content, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  if (evaluation?.verdict !== 'PROCEED' && !mvpBlueprint) {
    return (
       <div className="bg-red-100 dark:bg-accentRed/10 border border-red-300 dark:border-accentRed/50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-500 dark:text-accentRed" size={24} />
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-lg text-red-900 dark:text-primaryText">Idea Rejected</h3>
            <p className="text-sm text-red-700 dark:text-secondaryText">The Council recommends revising the idea before proceeding.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white dark:bg-tertiaryBg border border-slate-300 dark:border-borderColor text-sm text-slate-700 dark:text-primaryText hover:bg-slate-100 dark:hover:bg-borderColor transition-colors"
          >
            <RefreshCw size={14} /> New Idea
          </button>
           <button
            onClick={onProceedAnyway}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-accentYellow text-yellow-900 dark:text-primaryBg text-sm font-semibold hover:bg-yellow-400 transition-colors"
          >
            Proceed Anyway <ArrowRight size={14} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-100 dark:bg-secondaryBg border border-slate-200 dark:border-borderColor rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-center sm:text-left">
        <h3 className="font-semibold text-lg text-slate-900 dark:text-primaryText">Generation Complete</h3>
        <p className="text-sm text-slate-600 dark:text-secondaryText">Download the artifacts or start a new evaluation.</p>
      </div>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={() => handleDownload(mvpBlueprint!, 'mvp_blueprint.json')}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white dark:bg-tertiaryBg border border-slate-300 dark:border-borderColor text-sm text-slate-700 dark:text-primaryText hover:bg-slate-100 dark:hover:bg-borderColor transition-colors"
          disabled={!mvpBlueprint}
        >
          <Download size={14} /> MVP Blueprint
        </button>
        <button
          onClick={() => handleDownload(pitchDeck!, 'pitch_deck.json')}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white dark:bg-tertiaryBg border border-slate-300 dark:border-borderColor text-sm text-slate-700 dark:text-primaryText hover:bg-slate-100 dark:hover:bg-borderColor transition-colors"
          disabled={!pitchDeck}
        >
          <Download size={14} /> Pitch Deck
        </button>
         <button
          onClick={() => handleDownload(investorSummary!, 'investor_summary.json')}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white dark:bg-tertiaryBg border border-slate-300 dark:border-borderColor text-sm text-slate-700 dark:text-primaryText hover:bg-slate-100 dark:hover:bg-borderColor transition-colors"
          disabled={!investorSummary}
        >
          <Download size={14} /> Investor Summary
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-accentBlue text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          <RefreshCw size={14} /> New Idea
        </button>
      </div>
    </div>
  );
}