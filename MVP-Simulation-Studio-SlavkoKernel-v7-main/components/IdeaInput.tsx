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
    return 'MVP Simulation Studio';
  }
  if (lowerIdea.includes('b2b saas')) {
    return 'Building your B2B SaaS MVP in seconds...';
  }
  if (lowerIdea.includes('marketplace')) {
    return 'Crafting your Marketplace MVP...';
  }
  if (lowerIdea.includes('ai tool')) {
    return 'Assembling your AI Tool MVP...';
  }
  if (lowerIdea.includes('mobile app')) {
    return 'Simulating your Mobile App MVP...';
  }
  if (lowerIdea.includes('e-commerce') || lowerIdea.includes('ecommerce')) {
    return 'Designing your E-commerce MVP...';
  }
  if (lowerIdea.includes('fintech')) {
    return 'Securing your FinTech MVP...';
  }
  if (lowerIdea.includes('healthtech')) {
    return 'Innovating your HealthTech MVP...';
  }
  if (lowerIdea.includes('edtech')) {
    return 'Educating with your EdTech MVP...';
  }
  if (lowerIdea.includes('social network')) {
    return 'Connecting your Social Network MVP...';
  }
  if (lowerIdea.includes('platform')) {
    return 'Architecting your Platform MVP...';
  }
  return 'Analyzing your brilliant idea...';
};


export function IdeaInput({ initialIdea, onSubmit, error, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState(initialIdea);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [heroText, setHeroText] = useState('MVP Simulation Studio');
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
    
    // Analytics: Track demo selection
    trackEvent('demo_idea_selected', { idea_snippet: demoIdea.substring(0, 30) });

    toast({
      title: 'Demo Idea Loaded!',
      description: 'The idea has been loaded. You can now submit it for evaluation.',
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 w-full">
      <div className="max-w-3xl w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="min-h-[60px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={heroText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-5xl font-semibold tracking-tight text-slate-900 dark:text-primaryText"
              >
                {heroText}
              </motion.h1>
            </AnimatePresence>
          </div>
          <div className="h-12 flex items-center justify-center">
            <p key={subtitleIndex} className="text-sm text-slate-600 dark:text-secondaryText max-w-xl mx-auto animate-fade-in-out">
                {subtitles[subtitleIndex]}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="E.g., I want to modernize an on-prem ERP system for manufacturing companies in the region, reduce downtime and licenses by 30%, target investment 500k EUR..."
            rows={8}
            className="w-full rounded-xl bg-white/60 dark:bg-tertiaryBg/60 backdrop-blur-md border border-white/50 dark:border-borderColor/50 px-5 py-4 text-base text-slate-900 dark:text-primaryText placeholder:text-slate-400 dark:placeholder:text-secondaryText focus:outline-none focus:ring-2 focus:ring-accentBlue dark:focus:border-accentBlue resize-none disabled:opacity-50 transition-all"
            disabled={isLoading}
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-secondaryText">{idea.length} characters</span>

            <button
              type="submit"
              disabled={!idea.trim() || isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-accentBlue text-white text-sm font-semibold tracking-tight hover:bg-blue-600 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:hover:bg-accentBlue disabled:cursor-not-allowed min-w-[160px]"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Check Idea
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {error && <div className="rounded-lg bg-red-100 dark:bg-accentRed/20 border border-red-300 dark:border-accentRed px-4 py-3 text-sm text-red-700 dark:text-accentRed">{error}</div>}
        </form>
        
        <DemoMode onSelectIdea={handleSelectDemo} />

        <p className="text-xs text-slate-500 dark:text-secondaryText text-center">No registration. No auth. A pure AI-driven MVP process.</p>
      </div>
    </div>
  );
}