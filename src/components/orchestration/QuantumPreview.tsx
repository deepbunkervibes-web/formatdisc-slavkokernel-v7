import React from 'react';
import { motion } from 'framer-motion';
import { INSTITUTIONAL_TRANSITION, HEAVY_EASE } from '../../lib/motion-presets';

interface QuantumPreviewProps {
    mode?: 'hub' | 'manual' | 'automated';
}

export const QuantumPreview: React.FC<QuantumPreviewProps> = ({ mode = 'hub' }) => {
    const isManual = mode === 'manual';
    const isAutomated = mode === 'automated';

    const gridOpacity = isManual ? 0.4 : 0.2;
    const pulseDuration = isManual ? 8 : isAutomated ? 3 : 5;
    const streamCount = isAutomated ? 12 : isManual ? 6 : 8;

    return (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-black border border-white/5 shadow-2xl selection:bg-green-500/20">
            {/* Grid background */}
            <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: gridOpacity }}>
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>

            {/* Central “kernel core” */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={INSTITUTIONAL_TRANSITION}
            >
                <div className="relative group">
                    <motion.div
                        className="relative w-40 h-40 md:w-48 md:h-48 rounded-sm border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
                        animate={{
                            boxShadow: [
                                "0 0 40px rgba(34,197,94,0.05)",
                                "0 0 100px rgba(34,197,94,0.15)",
                                "0 0 40px rgba(34,197,94,0.05)",
                            ],
                        }}
                        transition={{
                            duration: pulseDuration,
                            repeat: Infinity,
                            ease: "linear" 
                        }}
                    >
                        {/* Scanning Effect */}
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent h-1/2 w-full"
                            animate={{ top: ['-100%', '200%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: HEAVY_EASE }}
                        />

                        <div className="relative z-10 flex flex-col items-center">
                            <span className="font-mono text-[9px] text-green-500 tracking-[0.4em] uppercase mb-3 opacity-60">
                                Kernel_Core_V7
                            </span>
                            <span className="font-mono text-sm text-white font-bold tracking-[0.2em] uppercase">
                                {isManual ? 'SOVEREIGN' : isAutomated ? 'KINETIC' : 'OPERATIONAL'}
                            </span>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500/40" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-500/40" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500/40" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500/40" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Streams in/out (Mechanical Flow) */}
            <QuantumStreams count={streamCount} speed={isAutomated ? 1.5 : 3} />

            {/* Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Caption */}
            <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between text-[9px] font-mono text-neutral-500 uppercase tracking-[0.3em]">
                <div className="flex items-center gap-4">
                    <span>Field_Density: 0.94</span>
                    <span className="text-white/20">|</span>
                    <span>State: Synced</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
                    <span className="text-white">Live_Sync_Active</span>
                </div>
            </div>
        </div>
    );
};

function QuantumStreams({ count, speed }: { count: number; speed: number }) {
    const streams = React.useMemo(() => Array.from({ length: count }).map((_, i) => ({
        x: `${(100 / (count + 1)) * (i + 1)}%`,
        delay: i * (speed / count)
    })), [count, speed]);

    return (
        <>
            {streams.map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-y-0"
                    style={{ left: s.x }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0.03, 0.15, 0.03], scaleY: [0.2, 0.8, 0.2], y: ['-20%', '20%'] }}
                    transition={{
                        duration: speed,
                        delay: s.delay,
                        repeat: Infinity,
                        ease: HEAVY_EASE,
                    }}
                >
                    <div className="w-[0.5px] h-full bg-gradient-to-b from-transparent via-green-500/30 to-transparent" />
                </motion.div>
            ))}
        </>
    );
}

QuantumPreview.displayName = 'QuantumPreview';
