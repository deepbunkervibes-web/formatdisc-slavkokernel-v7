import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Terminal } from 'lucide-react';

import { useObsStore } from '@/stores/observabilityStore';

export function LiveAlertsTicker() {
    const findings = useObsStore((s) => s.findings);
    const criticalFindings = findings.filter(f => f.severity === 'high' || f.severity === 'critical');

    return (
        <div className="bg-black/80 border-y border-red-900/50 h-10 flex items-center overflow-hidden relative">
            <div className="bg-red-900/20 h-full px-4 flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest border-r border-red-900/50 shrink-0 z-10 backdrop-blur-sm">
                <AlertTriangle className="w-4 h-4" />
                Live Alerts
            </div>

            <div className="flex-1 overflow-hidden relative flex items-center">
                <motion.div
                    className="flex gap-12 items-center whitespace-nowrap pl-4"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {criticalFindings.length > 0 ? criticalFindings.map((alert, i) => (
                        <div key={`${alert.id}-${i}`} className="flex items-center gap-3 text-sm text-red-200">
                            <span className="text-xs bg-red-900/40 px-2 py-0.5 rounded border border-red-800 text-red-400 font-mono">
                                {alert.service.toUpperCase()}
                            </span>
                            <span>{alert.message}</span>
                            <span className="text-red-700 mx-2 text-xs">●</span>
                        </div>
                    )) : (
                        <div className="flex items-center gap-3 text-sm text-emerald-400/50 italic">
                            <Terminal className="w-3 h-3" />
                            NO CRITICAL ANOMALIES DETECTED. SYSTEM NOMINAL.
                        </div>
                    )}
                    {/* Duplicate for seamless loop if enough items */}
                    {criticalFindings.map((alert, i) => (
                        <div key={`dup-${alert.id}-${i}`} className="flex items-center gap-3 text-sm text-red-200">
                            <span className="text-xs bg-red-900/40 px-2 py-0.5 rounded border border-red-800 text-red-400 font-mono">
                                {alert.service.toUpperCase()}
                            </span>
                            <span>{alert.message}</span>
                            <span className="text-red-700 mx-2 text-xs">●</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
        </div>
    );
}
