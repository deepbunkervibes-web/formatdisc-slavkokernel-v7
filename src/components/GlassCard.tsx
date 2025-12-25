import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        bg-white/60 
        backdrop-blur-xl 
        border border-white/50 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] 
        rounded-2xl 
        ${className}
      `}
    >
      {children}
    </div>
  );
};