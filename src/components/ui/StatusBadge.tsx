import React from 'react';

interface StatusBadgeProps {
    status?: string | boolean;
    active?: boolean;
    children?: React.ReactNode;
}

export function StatusBadge({ status, active = false, children }: StatusBadgeProps) {
    // Handling both legacy and new props
    const label = status === true || active ? "Active" : 
                 status === false ? "Offline" : 
                 typeof status === 'string' ? status : 
                 children;

    const isActive = active || status === true || status === "Active" || status === "VERIFIED" || status === "OPERATIONAL";

    return (
        <div className={`
            inline-flex items-center gap-3 px-4 py-1.5 rounded-sm border 
            font-mono text-[9px] font-bold tracking-[0.3em] uppercase select-none transition-all duration-700
            ${isActive ? 'text-green-500 border-green-500/20 bg-green-500/[0.03]' : 'text-neutral-600 border-white/5 bg-neutral-900/40'}
        `}>
            {/* Institutional signal dot */}
            <span className="relative flex h-1.5 w-1.5">
                {isActive && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 bg-green-500"></span>
                )}
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isActive ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-neutral-800'}`}></span>
            </span>

            <span className="flex items-center">
                <span className="opacity-30 mr-2 font-light">::</span>
                {label}
            </span>
        </div>
    );
}

StatusBadge.displayName = 'StatusBadge';
