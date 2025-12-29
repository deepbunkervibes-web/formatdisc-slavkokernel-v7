import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThoughtStream = React.memo(({ thoughts }: { thoughts: string[] }) => {
    return (
        <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 font-mono text-xs leading-relaxed text-cyan-300 shadow-lg shadow-cyan-900/10 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2 shrink-0">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest opacity-70">Thought Stream</span>
            </div>
            <div className="flex flex-col gap-2 max-h-60 overflow-hidden relative">
                <AnimatePresence initial={false}>
                    {thoughts.slice(-6).map((t, i) => (
                        <motion.div
                            layout
                            key={`${i}-${t}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.8 + (i / 10), x: 0 }}
                            className="flex gap-2"
                        >
                            <span className="opacity-40 select-none">›</span>
                            <span>{t}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {thoughts.length === 0 && (
                    <div className="text-white/20 italic">Waiting for input...</div>
                )}
                {/* Fade out bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
        </div>
    );
});
