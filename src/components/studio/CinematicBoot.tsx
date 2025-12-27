import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicBootProps {
    onComplete: () => void;
    onPhaseChange?: (phase: string) => void;
}

const BOOT_STAGES = [
    { id: 'INIT', label: 'INITIALIZING_SLAVKO_KERNEL_V7', delay: 800 },
    { id: 'SYNC', label: 'SYNCHRONIZING_TRUTH_PROTOCOLS', delay: 1200 },
    { id: 'SEAL', label: 'ESTABLISHING_CRYPTOGRAPHIC_SEAL', delay: 1000 },
    { id: 'COUNCIL', label: 'SUMMONING_THE_COUNCIL', delay: 1500 },
    { id: 'READY', label: 'CHANNEL_READY: CONFESSION_OPEN', delay: 500 },
];

export const CinematicBoot: React.FC<CinematicBootProps> = ({ onComplete, onPhaseChange }) => {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (currentStageIndex < BOOT_STAGES.length) {
            const stage = BOOT_STAGES[currentStageIndex];
            onPhaseChange?.(stage.id);

            const timer = setTimeout(() => {
                setLogs(prev => [...prev, `> ${stage.label}... [OK]`]);
                if (currentStageIndex === BOOT_STAGES.length - 1) {
                    setIsFinished(true);
                    setTimeout(onComplete, 1000);
                } else {
                    setCurrentStageIndex(prev => prev + 1);
                }
            }, stage.delay);

            return () => clearTimeout(timer);
        }
    }, [currentStageIndex, onComplete]);

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center font-mono overflow-hidden">
            {/* Background Pulse */}
            <motion.div
                animate={{
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-t from-accent-cyan/10 to-transparent pointer-events-none"
            />

            <div className="max-w-md w-full px-6 space-y-8 relative">
                {/* Central Logo/Seal */}
                <div className="flex justify-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="w-24 h-24 border-2 border-accent-cyan/20 rounded-full flex items-center justify-center">
                            <div className="w-16 h-16 border border-white/10 rounded-full animate-spin-slow"></div>
                            <span className="absolute text-[10px] font-bold text-accent-cyan tracking-[0.5em] uppercase">V7</span>
                        </div>
                        {/* Pulsing Core */}
                        <motion.div
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-accent-cyan/5 blur-xl rounded-full"
                        />
                    </motion.div>
                </div>

                {/* Boot Logs */}
                <div className="space-y-2 min-h-[200px]">
                    <AnimatePresence>
                        {logs.map((log, idx) => (
                            <motion.p
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[10px] md:text-xs text-emerald-500/80 tracking-widest uppercase"
                            >
                                {log}
                            </motion.p>
                        ))}
                    </AnimatePresence>
                    {!isFinished && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-4 bg-accent-cyan ml-1 align-middle"
                        />
                    )}
                </div>

                {/* Institutional Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-12 border-t border-white/5 text-center"
                >
                    <p className="text-[10px] text-neutral-600 uppercase tracking-[0.3em]">
                        FormatDisc™ Sovereign Infrastructure
                    </p>
                    <p className="text-[8px] text-neutral-800 mt-2 font-mono">
                        HASH_KEY: {Math.random().toString(16).substring(2, 10).toUpperCase()} · UTC: {new Date().toISOString()}
                    </p>
                </motion.div>
            </div>

            {/* Cinematic Overlays */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60" />
        </div>
    );
};
