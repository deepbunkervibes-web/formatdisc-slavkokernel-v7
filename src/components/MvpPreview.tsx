import React from 'react';
import { MvpBlueprint } from '../types';
import { Loader2 } from 'lucide-react';

interface MvpPreviewProps {
  blueprint: MvpBlueprint | null;
}

export function MvpPreview({ blueprint }: MvpPreviewProps) {
  if (!blueprint) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fade-in">
        <Loader2 size={24} className="animate-spin text-accentBlue mb-4" />
        <h4 className="font-semibold text-slate-700 dark:text-primaryText">Generating MVP Blueprint...</h4>
        <p className="text-sm text-slate-500 dark:text-secondaryText max-w-sm">
          The council's agents are assembling the core flows, UI sections, and tech stack recommendations.
        </p>
      </div>
    );
  }

  const handleCtaClick = (ctaText: string) => {
    alert(`Simulating user action for: "${ctaText}"`);
  };

  const getButtonClass = (ctaText: string): string => {
    // Base classes for all buttons including hover animations
    const baseClasses = "mt-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5 active:scale-95";
    
    switch (ctaText) {
      case 'Learn More':
        // Secondary action: Outline style
        return `${baseClasses} bg-transparent text-accentBlue border border-accentBlue hover:bg-accentBlue hover:text-white dark:text-primaryText dark:hover:text-primaryText`;
      case 'Choose a Plan':
        // Primary conversion action: Green, stands out
        return `${baseClasses} bg-accentGreen text-white hover:bg-green-600`;
      default: // for 'Get Started', 'Register', etc.
        // Default primary action: Blue
        return `${baseClasses} bg-accentBlue text-white hover:bg-blue-600`;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-primaryText">{blueprint.project_name}</h3>
        <p className="text-sm text-slate-600 dark:text-secondaryText">{blueprint.value_proposition}</p>
      </div>

      <div className="space-y-4">
        {blueprint.ui_sections.map((section, i) => (
          <div key={i} className="rounded-lg bg-slate-50/50 dark:bg-tertiaryBg/50 border border-slate-200/50 dark:border-borderColor/50 p-4 space-y-2 transition-all duration-300 hover:border-accentBlue/50 hover:shadow-lg hover:scale-[1.02]">
            <div className="text-xs text-slate-500 dark:text-secondaryText uppercase tracking-wide">{section.type}</div>
            <h4 className="text-base font-semibold text-slate-800 dark:text-primaryText">{section.heading}</h4>
            <p className="text-sm text-slate-600 dark:text-secondaryText">{section.copy}</p>
            {section.cta_text && (
              <button
                onClick={() => handleCtaClick(section.cta_text!)}
                className={getButtonClass(section.cta_text)}
              >
                {section.cta_text}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-primaryText">Core Flows:</h4>
        {blueprint.core_flows.map((flow, i) => (
          <details key={i} className="rounded-lg bg-slate-50/50 dark:bg-tertiaryBg/50 border border-slate-200/50 dark:border-borderColor/50 p-3 cursor-pointer">
            <summary className="font-medium text-slate-800 dark:text-primaryText text-sm list-none">{flow.name}</summary>
            <ul className="mt-2 ml-4 space-y-1 text-xs text-slate-500 dark:text-secondaryText list-disc">
              {flow.steps.map((step, j) => (
                <li key={j}>{step}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      {blueprint.tech_stack && blueprint.tech_stack.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <strong className="text-xs text-slate-500 dark:text-secondaryText">Tech Stack:</strong>
          {blueprint.tech_stack.map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-borderColor text-xs text-slate-700 dark:text-primaryText font-medium">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}