import * as React from 'react';
import { motion } from 'framer-motion';
export const HeroSection: React.FC = () => {
    const subtitle = "SOVEREIGN ORCHESTRATION KERNEL v7.0";

    return (
        <React.Fragment>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-green-900 selection:text-white"
            >
                {/* Background Noise/Grid */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
                
                {/* Central Monolith */}
                <div className="z-10 flex flex-col items-center text-center space-y-12 max-w-4xl px-6">
                    
                    {/* Identifier Block */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-white/5 rounded-sm backdrop-blur-sm"
                    >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                        <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-neutral-400">NODE: ZAGREB-01</span>
                    </motion.div>

                    {/* Main Title */}
                    <div className="space-y-4">
                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 1 }}
                            className="text-6xl md:text-9xl font-bold tracking-tighter leading-none text-white"
                        >
                            FORMAT<span className="text-neutral-600">DISC</span>
                            <sup className="text-lg md:text-2xl text-neutral-700 ml-2 align-top">TM</sup>
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-sm md:text-xl text-neutral-500 font-mono tracking-[0.2em] uppercase"
                        >
                            {subtitle}
                        </motion.p>
                    </div>

                    {/* Single Deterministic Action */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        onClick={() => window.location.href = '/hub'}
                        className="group relative px-12 py-5 bg-white text-black font-mono font-bold tracking-[0.2em] text-xs hover:bg-neutral-200 transition-all duration-500"
                    >
                        <span className="relative z-10 flex items-center gap-4">
                            INITIALIZE_SESSION
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                        </span>
                        
                        {/* Hover Glitch Effect Element */}
                        <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-100" />
                    </motion.button>

                </div>

                {/* Footer Meta */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 text-[10px] text-neutral-600 font-mono tracking-widest uppercase text-center"
                >
                    <p>FormatDisc™ · SlavkoShell™ · SlavkoKernel™</p>
                    <p className="mt-2">Operating System for Institutional Governance</p>
                </motion.div>

            </motion.div>
        </React.Fragment>
    );
};