import React, { useState, useEffect } from 'react';
import { MAX_IDEA_LENGTH } from '../utils/inputSanitizer';
import { ArrowRight, Loader2, Shield, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useToast } from '../hooks/use-toast';
import { trackEvent } from '../utils/posthog';

import { DemoMode } from './ui/DemoMode';
import { Tooltip } from './ui/Tooltip';

interface IdeaInputProps {
  initialIdea: string;
  onSubmit: (idea: string) => void;
  error: string | null;
  isLoading: boolean;
  ollamaStatus?: 'checking' | 'connected' | 'disconnected';
}

const subtitles = [
  "Enter your idea. The Council will evaluate it, then automatically assemble an MVP simulation and pitch deck.",
  "From a spark of genius to a full-fledged pitch, all in one seamless flow.",
  "Validating startup dreams with the power of AI.",
  "Turn your next big idea into a tangible blueprint in minutes."
];

const getHeroTextForIdea = (idea: string): string => {
  const lowerIdea = idea.toLowerCase();
  if (!lowerIdea.trim()) {
    return 'SlavkoKernel v7 Initialized.';
  }
  if (lowerIdea.length < 10) {
    return 'Listening...';
  }
  if (lowerIdea.includes('b2b saas')) return 'Detecting B2B SaaS Protocol...';
  if (lowerIdea.includes('marketplace')) return 'Loading Marketplace Schematics...';
  if (lowerIdea.includes('platform')) return 'Initializing Platform Governance...';

  return 'Analysing Input Vector...';
};


export function IdeaInput({ initialIdea, onSubmit, error, isLoading, ollamaStatus = 'checking' }: IdeaInputProps) {
  const [idea, setIdea] = useState(initialIdea);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [heroText, setHeroText] = useState('SlavkoKernel v7 Initialized.');
  const [showRegulatorInfo, setShowRegulatorInfo] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex(prev => (prev + 1) % subtitles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHeroText(getHeroTextForIdea(idea));
  }, [idea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || isLoading) return;

    if (idea.length > MAX_IDEA_LENGTH) {
      toast({
        title: 'Input too long',
        description: `Please keep your idea under ${MAX_IDEA_LENGTH} characters.`,
        variant: 'destructive',
      });
      return;
    }

    onSubmit(idea);
  };

  const handleSelectDemo = (demoIdea: string) => {
    setIdea(demoIdea);
    trackEvent('demo_idea_selected', { idea_snippet: demoIdea.substring(0, 30) });
    toast({
      title: 'Scenario Loaded',
      description: 'System locked on demo parameters. Ready to engage.',
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 w-full relative">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-3xl w-full space-y-8 relative z-10">

        {/* Regulator Info Modal */}
        <AnimatePresence>
          {showRegulatorInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRegulatorInfo(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md w-full shadow-2xl relative"
              >
                <div className="flex items-center gap-3 mb-4 text-accent-cyan">
                  <Shield className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Regulatory Compliance</h3>
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                  This simulation generates a functional plan with a complete audit trail.
                  Every AI decision is:
                </p>
                <ul className="space-y-2 text-sm text-neutral-400 mb-6 font-mono">
                  <li className="flex items-center gap-2">✓ Timestamped (UTC)</li>
                  <li className="flex items-center gap-2">✓ Cryptographically Hashed</li>
                  <li className="flex items-center gap-2">✓ Traceable to Model ID</li>
                </ul>
                <button
                  onClick={() => setShowRegulatorInfo(false)}
                  className="w-full py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors"
                >
                  Acknowledge Compliance
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4 mb-2">
            <Tooltip content="Kernel is ready. All actions are cryptographically logged.">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 cursor-help
            ${ollamaStatus === 'connected' ? 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan' :
                  ollamaStatus === 'disconnected' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                    'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
                ${ollamaStatus === 'connected' ? 'bg-accent-cyan' :
                      ollamaStatus === 'disconnected' ? 'bg-red-500' :
                        'bg-amber-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2
                ${ollamaStatus === 'connected' ? 'bg-accent-cyan' :
                      ollamaStatus === 'disconnected' ? 'bg-red-500' :
                        'bg-amber-500'}`}></span>
                </span>
                {ollamaStatus === 'connected' ? 'System Online' :
                  ollamaStatus === 'disconnected' ? 'System Offline' :
                    'Initializing...'}
              </div>
            </Tooltip>

            <button
              onClick={() => setShowRegulatorInfo(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-[10px] text-neutral-400 font-mono uppercase hover:border-neutral-700 hover:text-neutral-300 transition-colors"
            >
              <Shield size={10} />
              Explain to Regulator
            </button>
          </div>

          <div className="min-h-[60px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={heroText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-white font-mono uppercase"
              >
                {heroText}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-mono">
              Input Channel · Founder Confession
            </p>
            <p className="text-neutral-300 text-lg leading-relaxed">
              Enter your idea exactly as you would tell it to someone you trust.
              <span className="text-white font-medium"> No selling. No pitching. Just the truth.</span>
            </p>
            <p className="text-xs text-neutral-500 italic max-w-md mx-auto">
              The Kernel doesn't seek perfection. It seeks truth. The more honest you are about your weaknesses, the more useful the simulation will be.
            </p>
          </div>
        </div>

        {/* Operational Flow Indicators */}
        <div className="flex justify-between items-center px-4 md:px-12 text-[10px] font-mono text-neutral-500 uppercase tracking-widest opacity-60">
          <div className="flex flex-col items-center gap-1 text-accent-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
            Input
          </div>
          <div className="h-px bg-neutral-800 flex-1 mx-2"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
            Simulation
          </div>
          <div className="h-px bg-neutral-800 flex-1 mx-2"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
            Audit
          </div>
          <div className="h-px bg-neutral-800 flex-1 mx-2"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
            Export
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Example: I'm building a tool that... I'm targeting people who... Today they solve it by... The biggest risk I see is..."
              rows={6}
              className="relative w-full rounded-xl bg-neutral-900 border border-neutral-800 px-6 py-5 text-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-accent-cyan/50 resize-none transition-all shadow-2xl font-sans leading-relaxed"
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-between items-center px-2">
            <p className="text-[11px] text-neutral-600 italic">
              Be honest. The Kernel can smell fear and bullshit.
            </p>
            <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-[0.1em]">
              Savvy: Include what you already know doesn't work.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Dynamic Hints */}
            <div className="flex-1">
              {!idea.trim() ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2 items-center text-xs text-neutral-500 font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-accent-cyan">ℹ</span>
                    <span>Be specific. The Simulation loves details.</span>
                  </div>
                  <span className="animate-pulse hidden md:inline">Waiting for input... (Try: 'Architectural Audit Platform')</span>
                </motion.div>
              ) : (
                idea.trim().length < 20 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-amber-500/80 font-mono"
                  >
                    ⚠ Add details: user goal, data type, expected outcome.
                  </motion.div>
                )
              )}
            </div>

            <button
              type="submit"
              disabled={!idea.trim() || isLoading}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 bg-white text-black font-bold tracking-tight hover:bg-neutral-200 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Engaging Agents...</span>
                </>
              ) : (
                <>
                  <span>Initialize Simulation</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              {error}
            </div>
          )}
        </form>

        {/* Quick Start / Demo Scenarios */}
        <div className="pt-8 border-t border-neutral-800">
          <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4 text-center">Or load a simulation scenario:</h3>
          <DemoMode onSelectIdea={handleSelectDemo} />
        </div>

      </div>
    </div>
  );
}