import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { useObsStore } from '@/stores/observabilityStore';

export function CorrelationGraph() {
    const findings = useObsStore((s) => s.findings);

    // Simple simulated force graph nodes based on active services
    const nodes = useMemo(() => {
        const services = Array.from(new Set(findings.map(f => f.service)));
        return services.map((s, i) => ({
            id: s,
            x: 50 + Math.cos(i) * 30, // Mock layout
            y: 50 + Math.sin(i) * 30,
            active: findings.filter(f => f.service === s).length
        }));
    }, [findings]);

    return (
        <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-6 border border-gray-800 h-96 relative overflow-hidden group">
            <h3 className="text-lg font-bold text-white mb-4">NEURAL CORRELATION NET</h3>

            <div className="absolute inset-0 flex items-center justify-center">
                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,217,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,217,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Radar Sweep Effect */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(20,241,217,0.1)_360deg)] opacity-20"
                />

                {/* Nodes */}
                <div className="relative z-10 w-full h-full">
                    {nodes.map((node, i) => (
                        <motion.div
                            key={node.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute w-16 h-16 -ml-8 -mt-8 flex items-center justify-center"
                            style={{ left: `${50 + (i % 3 === 0 ? 20 : -20)}%`, top: `${50 + (i % 2 === 0 ? 20 : -20)}%` }} // Very rough static positioning for demo
                        >
                            <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-ping" />
                            <div className="relative bg-black/80 border border-cyan-500/50 rounded-full w-12 h-12 flex items-center justify-center text-[10px] font-mono text-cyan-300 shadow-[0_0_15px_rgba(20,241,217,0.3)]">
                                {node.id.substring(0, 3).toUpperCase()}
                            </div>
                            {/* Connections (Mock) */}
                            <svg className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                <line x1="50%" y1="50%" x2="100%" y2="0%" stroke="currentColor" className="text-cyan-500" strokeWidth="1" />
                            </svg>
                        </motion.div>
                    ))}

                    {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-cyan-500/40 text-sm font-mono tracking-widest">
                            WAITING FOR NEURAL HANDSHAKE...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
