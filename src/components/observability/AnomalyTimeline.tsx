import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useObsStore } from '../../stores/observabilityStore';
import { Severity } from '../../types/observability';

export function AnomalyTimeline() {
    const findings = useObsStore((s) => s.findings);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to right when new items arrive
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
    }, [findings]);

    const getColor = (sev: Severity) => {
        switch (sev) {
            case 'critical': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-blue-500';
        }
    };

    const getHeight = (sev: Severity) => {
        switch (sev) {
            case 'critical': return 'h-16';
            case 'high': return 'h-12';
            case 'medium': return 'h-8';
            case 'low': return 'h-4';
        }
    };

    return (
        <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">ANOMALY TIMELINE</h3>
            <div ref={containerRef} className="flex items-end space-x-1 overflow-x-auto h-32 pb-2 scrollbar-hide snap-x">
                {findings.length === 0 && (
                    <div className="w-full text-center text-gray-600 text-sm mt-8">WAITING FOR EVENTS...</div>
                )}
                {findings.map((finding) => (
                    <motion.div
                        key={finding.id}
                        layoutId={finding.id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="flex flex-col items-center group cursor-pointer min-w-[12px]"
                    >
                        <div
                            className={`w-2 rounded-t-sm ${getColor(finding.severity)} ${getHeight(finding.severity)} opacity-60 group-hover:opacity-100 transition-opacity`}
                        />
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-12 bg-black/90 p-2 rounded border border-gray-700 text-xs text-white z-50 whitespace-nowrap pointer-events-none">
                            <div className="font-bold">{finding.service}</div>
                            <div>{finding.message}</div>
                            <div className="text-gray-400 text-[10px]">{new Date(finding.timestamp).toLocaleTimeString()}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Time Axis (Simplistic) */}
            <div className="h-[1px] w-full bg-gray-800 mt-0" />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                <span>START</span>
                <span>NOW</span>
            </div>
        </div>
    );
}
