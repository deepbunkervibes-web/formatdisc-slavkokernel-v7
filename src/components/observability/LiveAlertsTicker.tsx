import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useObsStore } from '../../stores/observabilityStore';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

export function LiveAlertsTicker() {
    const findings = useObsStore((s) => s.findings);
    const [criticals, setCriticals] = useState(findings);

    // Filter for high/critical findings only
    useEffect(() => {
        setCriticals(
            findings
                .filter(f => f.severity === 'high' || f.severity === 'critical')
                .slice(0, 10) // Show last 10 relevant
        );
    }, [findings]);

    if (criticals.length === 0) {
        return (
            <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/30 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/20">
                <CheckCircle className="w-3 h-3" />
                <span>SYSTEM NOMINAL</span>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden h-8 flex items-center bg-red-950/40 border border-red-500/20 rounded-lg">
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-black to-transparent" />

            <motion.div
                className="flex items-center space-x-8 whitespace-nowrap pl-8"
                animate={{ x: [0, -100 * criticals.length] }}
                transition={{
                    repeat: Infinity,
                    duration: Math.max(10, criticals.length * 5),
                    ease: "linear"
                }}
            >
                {criticals.map((finding) => (
                    <div key={finding.id} className="flex items-center space-x-2">
                        {finding.severity === 'critical' ? (
                            <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
                        ) : (
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                        <span className="text-red-200 font-bold text-xs font-mono">
                            [{finding.service.toUpperCase()}]
                        </span>
                        <span className="text-red-100/80 text-xs">
                            {finding.message}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
