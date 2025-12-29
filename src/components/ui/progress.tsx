import * as React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => {
  const progress = Math.max(0, Math.min(100, value || 0));
  return (
    <div className={`relative w-full h-2 bg-slate-200/80 dark:bg-tertiaryBg/80 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-accentBlue rounded-full transition-all duration-500 ease-out shimmer"
        style={{ width: `${progress}%` }} />

    </div>);

};