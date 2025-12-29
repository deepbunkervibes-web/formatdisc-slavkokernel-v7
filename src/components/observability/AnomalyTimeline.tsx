import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { useObsStore } from '@/stores/observabilityStore';

export function AnomalyTimeline() {
    const findings = useObsStore((s) => s.findings);

    // Group findings by minute/hour for visualization
    const timelineData = useMemo(() => {
        return findings.slice(0, 50).map((f, i) => ({
            ...f,
            offset: i * 2, // simple staggered visual
        }));
    }, [findings]);

    return (
        <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-6 border border-gray-800 h-64 overflow-hidden relative">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                TEMPORAL ANOMALY STREAM
            </h3>

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none" />

            <div className="flex gap-2 items-end h-40 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {timelineData.map((item, i) => (
                    <motion.div
                        key={item.id || i}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: `${Math.max(20, item.confidence)}%`, opacity: 1 }}
                        transition={{ type: 'spring', delay: i * 0.02 }}
                        className={`w-4 rounded-t-sm shrink-0 relative group ${item.severity === 'critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                item.severity === 'high' ? 'bg-orange-500' :
                                    item.severity === 'medium' ? 'bg-yellow-500' : 'bg-cyan-600'
                            }`}
                    >
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] p-2 rounded w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-white/10">
                            <div className="font-bold text-cyan-400">{item.service}</div>
                            {item.message}
                        </div>
                    </motion.div>
                ))}
                {findings.length === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-sm">
                        INITIALIZING TEMPORAL SCANNERS...
                    </div>
                )}
            </div>
        </div>
    );
}
