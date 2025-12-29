import * as React from 'react';import { useState } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface DemoModeProps {
  onSelectIdea: (idea: string) => void;
}

const demoIdeas = [
{
  name: "B2B SaaS",
  idea: "A B2B SaaS platform for automating invoicing and payment tracking for small businesses in Croatia, with integration into local accounting systems."
},
{
  name: "P2P Marketplace",
  idea: "An online marketplace connecting local organic farmers with customers in urban areas, focusing on weekly deliveries and subscriptions."
},
{
  name: "AI Tool",
  idea: "An AI tool for e-commerce stores that automatically generates marketing product descriptions based on images and key specifications."
},
{
  name: "FinTech for Students",
  idea: "A mobile app for university students in the EU to manage their budgets, track spending, and get personalized savings tips based on their lifestyle."
},
{
  name: "HealthTech for Seniors",
  idea: "A platform that connects elderly people with certified caregivers for remote health monitoring and companionship, using a simple tablet interface."
},
{
  name: "EdTech for Kids",
  idea: "An interactive EdTech platform that teaches children coding basics through gamified lessons and collaborative projects."
},
{
  name: "AI Financial Advisor",
  idea: "An AI-powered mobile app that provides automated personal financial advice, helping users optimize their investments and savings based on their goals."
},
{
  name: "Telemedicine Platform",
  idea: "A telemedicine platform for monitoring vital signs remotely, connecting patients with doctors for virtual consultations and continuous care."
},
{
  name: "Personalized AI Tutor",
  idea: "A personalized AI tutor platform for university students, offering adaptive learning paths, real-time feedback, and tailored study materials to improve exam performance."
},
{
  name: "Coffee App (Rejected)",
  idea: "A subscription application for specialty coffee with home delivery."
}];


export function DemoMode({ onSelectIdea }: DemoModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => prev === 0 ? demoIdeas.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev === demoIdeas.length - 1 ? 0 : prev + 1);
  };

  const currentIdea = demoIdeas[currentIndex];

  return (
    <div className="text-center space-y-3 pt-4">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-secondaryText">
                <Lightbulb size={16} />
                <span>Or try a demo idea:</span>
            </div>
            <div className="relative max-w-lg mx-auto p-4">
                <div className="bg-white/40 dark:bg-tertiaryBg/40 p-4 rounded-xl backdrop-blur-sm border border-white/30 dark:border-borderColor/30 text-left min-h-[120px] flex flex-col justify-between">
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-primaryText">{currentIdea.name}</h4>
                        <p className="text-xs text-slate-600 dark:text-secondaryText mt-1">{currentIdea.idea.substring(0, 120)}...</p>
                    </div>
                    <button
            onClick={() => onSelectIdea(currentIdea.idea)}
            className="mt-3 inline-flex items-center justify-center gap-1.5 self-start px-3 py-1.5 rounded-full bg-white dark:bg-tertiaryBg border border-slate-300 dark:border-borderColor text-xs text-slate-600 dark:text-secondaryText hover:bg-slate-100 dark:hover:bg-borderColor hover:text-slate-800 dark:hover:text-primaryText transition-colors">

                        <Check size={12} /> Select this idea
                    </button>
                </div>
                
                {/* Controls */}
                <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-tertiaryBg/50 hover:bg-white dark:hover:bg-tertiaryBg transition-colors" aria-label="Previous idea">
                    <ChevronLeft size={16} className="text-slate-600 dark:text-secondaryText" />
                </button>
                <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-tertiaryBg/50 hover:bg-white dark:hover:bg-tertiaryBg transition-colors" aria-label="Next idea">
                    <ChevronRight size={16} className="text-slate-600 dark:text-secondaryText" />
                </button>
            </div>
        </div>);

}