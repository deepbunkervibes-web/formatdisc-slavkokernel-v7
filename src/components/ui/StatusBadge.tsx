import React from 'react';
import { cn } from '../../lib/utils'; // Assuming there is a utils for clsx/twMerge, adhering to common patterns or I'll check/create if needed.
// Actually, I'll stick to a simpler implementation to avoid depending on specific utils if not confirmed.

interface StatusBadgeProps {
    status: string;
    variant?: 'verified' | 'active' | 'locked' | 'critical' | 'alert';
    animate?: boolean;
}

export function StatusBadge({ status, variant = 'locked', animate = false }: StatusBadgeProps) {

    const colors = {
        verified: 'text-emerald-500 border-emerald-900/30 bg-emerald-900/10',
        active: 'text-cyan-400 border-cyan-900/30 bg-cyan-900/10',
        locked: 'text-neutral-500 border-neutral-800 bg-neutral-900/50',
        critical: 'text-red-500 border-red-900/30 bg-red-900/10',
        alert: 'text-amber-500 border-amber-900/30 bg-amber-900/10',
    };

    const signalColors = {
        verified: 'bg-emerald-500',
        active: 'bg-cyan-400',
        locked: 'bg-neutral-500',
        critical: 'bg-red-500',
        alert: 'bg-amber-500',
    };

    return (
        <div className={`
      inline-flex items-center gap-3 px-3 py-1.5 rounded-sm border 
      font-mono text-[10px] tracking-widest uppercase select-none
      ${colors[variant]}
    `}>
            {/* Signal Dot */}
            <span className="relative flex h-1.5 w-1.5">
                {animate && (
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${signalColors[variant]}`}></span>
                )}
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${signalColors[variant]}`}></span>
            </span>

            {/* Bracketed Status */}
            <span>
                <span className="opacity-50 mr-1">[</span>
                {status}
                <span className="opacity-50 ml-1">]</span>
            </span>
        </div>
    );
}
