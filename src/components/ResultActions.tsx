import React from 'react';
import { MvpBlueprint, PitchDeck, InvestorSummary, IdeaEvaluation } from '../types';
import { Download, RefreshCw, AlertTriangle, ArrowRight, Sparkles, FileText, BookOpen, Mail } from 'lucide-react';
import { trackEvent } from '../utils/posthog';
import { motion } from 'framer-motion';

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
    if (!content) return;
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

  // REJECTED STATE
  if (evaluation?.verdict !== 'PROCEED' && !mvpBlueprint) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono mb-1">
                Final Consensus · SlavkoKernel™ v7
              </p>
              <h3 className="text-xl font-bold text-white">The Council sees a path – but not like this.</h3>
              <p className="text-neutral-400 text-sm max-w-md">
                If you proceed this way, you work against your own years. You can ignore the Kernel, but not the consequences.
              </p>
              <p className="text-[11px] text-neutral-500 italic mt-2">
                The Council has spoken. What you do next defines you.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 bg-neutral-800 border border-neutral-700 text-sm text-white hover:bg-neutral-700 transition-colors"
            >
              <RefreshCw size={14} /> New Idea
            </button>
            <button
              onClick={onProceedAnyway}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
            >
              Override & Build <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  // SUCCESS STATE
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Success Header */}
      <div className="rounded-2xl border border-accent-cyan/30 bg-gradient-to-br from-accent-cyan/5 to-transparent p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0 ring-2 ring-accent-cyan/20">
              <Sparkles className="w-6 h-6 text-accent-cyan" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono mb-1">
                Final Consensus · SlavkoKernel™ v7
              </p>
              <h3 className="text-xl font-bold text-white">The Council grants permission to build.</h3>
              <p className="text-neutral-400 text-sm max-w-md">
                The Consensus stands. This does not guarantee success. But it means the structure is sound enough to merit further investment.
              </p>
              <p className="text-[11px] text-neutral-500 italic mt-2">
                The Council has spoken. What you do next defines you.
              </p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <RefreshCw size={14} /> Start New Simulation
          </button>
        </div>
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleDownload(mvpBlueprint!, 'mvp_blueprint.json')}
          disabled={!mvpBlueprint}
          className="group p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-accent-cyan/50 transition-all text-left disabled:opacity-50"
        >
          <FileText className="w-8 h-8 text-accent-cyan mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-white font-medium mb-1">MVP Blueprint</h4>
          <p className="text-neutral-500 text-xs mb-4">Architecture, flows, UI sections, tech stack.</p>
          <span className="inline-flex items-center gap-1 text-xs text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">
            <Download size={12} /> Download JSON
          </span>
        </button>

        <button
          onClick={() => handleDownload(pitchDeck!, 'pitch_deck.json')}
          disabled={!pitchDeck}
          className="group p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-accent-purple/50 transition-all text-left disabled:opacity-50"
        >
          <BookOpen className="w-8 h-8 text-accent-purple mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-white font-medium mb-1">Pitch Deck</h4>
          <p className="text-neutral-500 text-xs mb-4">5-slide investor presentation structure.</p>
          <span className="inline-flex items-center gap-1 text-xs text-accent-purple opacity-0 group-hover:opacity-100 transition-opacity">
            <Download size={12} /> Download JSON
          </span>
        </button>

        <button
          onClick={() => handleDownload(investorSummary!, 'investor_summary.json')}
          disabled={!investorSummary}
          className="group p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-white/30 transition-all text-left disabled:opacity-50"
        >
          <Mail className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-white font-medium mb-1">Investor Summary</h4>
          <p className="text-neutral-500 text-xs mb-4">Cold email template, ask, use of funds.</p>
          <span className="inline-flex items-center gap-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Download size={12} /> Download JSON
          </span>
        </button>
      </div>

      {/* What's Next Section */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6">
        <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-4">&gt; What's Next?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-1">
            <span className="text-accent-cyan font-semibold">1. Review Artifacts</span>
            <p className="text-neutral-500">Download and inspect the generated files for accuracy.</p>
          </div>
          <div className="space-y-1">
            <span className="text-accent-purple font-semibold">2. Share with Team</span>
            <p className="text-neutral-500">Use the pitch deck structure for internal alignment.</p>
          </div>
          <div className="space-y-1">
            <span className="text-white font-semibold">3. Book a Call</span>
            <p className="text-neutral-500">Want us to build this? <a href="https://cal.com/formatdisc" className="text-accent-cyan hover:underline">Schedule a session</a>.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ResultActions;