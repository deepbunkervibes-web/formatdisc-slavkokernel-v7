import React, { useState, useEffect } from 'react';

export const QuantumStateIndicator = React.memo(({ state }: { state: string }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (state === 'COLLAPSED') {
            setIsCollapsed(true);
            const t = setTimeout(() => setIsCollapsed(false), 2000); // 2s shockwave
            return () => clearTimeout(t);
        }
    }, [state]);
    return (
        <div className={`px-4 py-2 bg-black/60 border rounded-full text-cyan-300 font-mono text-xs flex items-center gap-3 backdrop-blur-md transition-all duration-500 ${isCollapsed
            ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.6)] bg-cyan-900/40 scale-105'
            : 'border-purple-500/30 shadow-lg shadow-purple-900/20'
            }`}>
            <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75" />
                <div className="relative w-2 h-2 bg-purple-500 rounded-full" />
            </div>
            <div>
                <span className="opacity-50 mr-2">STATE:</span>
                <span className="font-bold tracking-wider text-purple-200">{state}</span>
            </div>
            {isCollapsed && (
                <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-50" style={{ animationDuration: '1.5s' }} />
            )}
        </div>
    );
});
