import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useObsStore } from '../../stores/observabilityStore';
import { Severity } from '../../types/observability';

const severityWeight: Record<Severity, number> = { low: 1, medium: 3, high: 6, critical: 10 };

export function ServiceHealthHeatmap() {
    const findings = useObsStore((s) => s.findings);

    const scores = useMemo(() => {
        const map = new Map<string, { score: number; count: number }>();
        findings.forEach(f => {
            const w = severityWeight[f.severity];
            const val = map.get(f.service) || { score: 0, count: 0 };
            val.score += w * (f.confidence / 100);
            val.count += 1;
            map.set(f.service, val);
        });
        return Array.from(map.entries())
            .sort((a, b) => b[1].score - a[1].score);
    }, [findings]);

    const getColor = (score: number) => {
        if (score > 25) return 'bg-red-600 animate-pulse';
        if (score > 10) return 'bg-orange-500';
        if (score > 3) return 'bg-yellow-500';
        return 'bg-emerald-600';
    };

    return (
        <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-6">SERVICE HEALTH MATRIX</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {scores.length === 0 && <div className="text-gray-500 col-span-4 text-center py-4">NO SIGNAL DATA</div>}
                {scores.map(([service, { score }], i) => (
                    <motion.div
                        key={service}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`aspect-square rounded-2xl ${getColor(score)} flex flex-col items-center justify-center text-white shadow-2xl hover:scale-110 transition-all cursor-pointer border-2 border-white/20`}
                    >
                        <div className="text-xs font-mono opacity-80">{service}</div>
                        <div className="text-2xl font-bold">{score.toFixed(1)}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
