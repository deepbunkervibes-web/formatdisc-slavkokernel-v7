import React from 'react';
import { motion } from 'framer-motion';
import { motionTokens } from '../../constants/motionTokens';

interface QuantumPreviewProps {
    mode?: 'hub' | 'manual' | 'automated';
}

export const QuantumPreview: React.FC<QuantumPreviewProps> = ({ mode = 'hub' }) => {
    const isManual = mode === 'manual';
    const isAutomated = mode === 'automated';

    const gridOpacity = isManual ? 0.6 : 0.4;
    const pulseDuration = isManual ? 6 : isAutomated ? 2.5 : 4;
    const streamCount = isAutomated ? 8 : isManual ? 3 : 4;

    return (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-black border border-cyan-400/40 shadow-[0_0_60px_rgba(0,255,157,0.15)]">
            {/* Grid background */}
            <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: gridOpacity }}>
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.25),transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            {/* Central “kernel core” */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: motionTokens.ease.audit }}
            >
                <motion.div
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl border border-cyan-300/70 bg-black/80 backdrop-blur-md"
                    animate={{
                        boxShadow: [
                            "0 0 20px rgba(0,255,255,0.2)",
                            "0 0 50px rgba(0,255,255,0.5)",
                            "0 0 20px rgba(0,255,255,0.2)",
                        ],
                        rotate: isAutomated ? [0, 90, 180, 270, 360] : 0
                    }}
                    transition={{
                        boxShadow: { duration: pulseDuration, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                >
                    <div className="absolute inset-3 rounded-2xl border border-cyan-200/20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <span className="font-mono text-[10px] text-cyan-500/50 tracking-[0.2em] uppercase mb-1">
                            Kernel
                        </span>
                        <span className="font-mono text-xs text-white font-black tracking-widest uppercase">
                            {isManual ? 'SUVEREIGN' : isAutomated ? 'KINETIC' : 'SLAVKO'}
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Streams in/out (4D feeling) */}
            <QuantumStreams count={streamCount} speed={isAutomated ? 2 : 4} />

            {/* Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Caption */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest">
                <span>Quantum Surface v1.0.0</span>
                <span>{mode} mode active</span>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-white">Live Audit</span>
                </div>
            </div>
        </div>
    );
};

function QuantumStreams({ count, speed }: { count: number; speed: number }) {
    const streams = Array.from({ length: count }).map((_, i) => ({
        x: `${(100 / (count + 1)) * (i + 1)}%`,
        delay: i * 0.4
    }));

    return (
        <>
            {streams.map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-y-0"
                    style={{ left: s.x }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0.05, 0.4, 0.05], scaleY: [0.1, 1, 0.1] }}
                    transition={{
                        duration: speed,
                        delay: s.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div className="w-px h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
                </motion.div>
            ))}
        </>
    );
}
