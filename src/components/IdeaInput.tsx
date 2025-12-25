import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { DemoMode } from './ui/DemoMode';
import { useToast } from '../hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/posthog';

interface IdeaInputProps {
  initialIdea: string;
  onSubmit: (idea: string) => void;
  error: string | null;
  isLoading: boolean;
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


export function IdeaInput({ initialIdea, onSubmit, error, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState(initialIdea);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [heroText, setHeroText] = useState('SlavkoKernel v7 Initialized.');
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

        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-[10px] font-mono tracking-widest uppercase mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
            </span>
            System Online
          </div>

          <div className="min-h-[60px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={heroText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-white font-mono"
              >
                {heroText}
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="text-neutral-400 max-w-xl mx-auto text-lg leading-relaxed">
            Welcome to the <span className="text-white font-medium">Simulation Studio</span>.
            Describe your product idea below, and the <span className="text-accent-cyan">AI Council</span>
            will generate a complete logical blueprint, including an audit trail and functional roadmap.
          </p>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Ex: A decentralized platform for freelance architects to validte blueprints..."
              rows={6}
              className="relative w-full rounded-xl bg-neutral-900 border border-neutral-800 px-6 py-5 text-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-accent-cyan/50 resize-none transition-all shadow-2xl font-sans leading-relaxed"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-500 font-mono flex items-center gap-2">
              <span className="text-accent-cyan">ℹ</span>
              <span>Be specific. The Simulation loves details.</span>
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