import React from 'react';
import { Sun, Moon, Wand2 } from 'lucide-react';

interface DarkModeToggleProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  warmMode: boolean;
  onToggleWarmMode: () => void;
}

export function DarkModeToggle({ darkMode, onToggleDarkMode, warmMode, onToggleWarmMode }: DarkModeToggleProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 p-1 rounded-full bg-slate-200/50 dark:bg-tertiaryBg/50 backdrop-blur-sm border border-slate-300/50 dark:border-borderColor/50">
      <button
        onClick={onToggleWarmMode}
        className="p-2 rounded-full text-slate-600 dark:text-secondaryText hover:bg-white/50 dark:hover:bg-black/20 transition-colors"
        aria-label="Toggle warm theme"
      >
        <Wand2 size={18} className={`transition-colors ${warmMode ? 'text-rose-500' : ''}`} />
      </button>
      <div className="w-px h-5 bg-slate-300/50 dark:bg-borderColor/50"></div>
      <button
        onClick={onToggleDarkMode}
        className="p-2 rounded-full text-slate-600 dark:text-secondaryText hover:bg-white/50 dark:hover:bg-black/20 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}