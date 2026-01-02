import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, Loader2 } from 'lucide-react';
import { INSTITUTIONAL_TRANSITION, HEAVY_EASE } from '../../lib/motion-presets';

export const TryItNowSection = memo(() => {
    const [status, setStatus] = useState<'idle' | 'booting' | 'active'>('idle');
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        if (status === 'booting') {
            const bootSequence = [
                "Initializing Kernel v7.0.4...",
                "Verifying cryptographic signatures...",
                "Loading system constraints...",
                "Mounting immutable store...",
                "Kernel ACTIVE. Waiting for input..."
            ];
            
            let i = 0;
            const interval = setInterval(() => {
                setLogs(prev => [...prev, bootSequence[i]]);
                i++;
                if (i >= bootSequence.length) {
                    clearInterval(interval);
                    setStatus('active');
                }
            }, 800); // Slower, more deliberate boot
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleStart = () => {
        setStatus('booting');
        setLogs([]);
    };

    return (
        <section id="simulation-mode" className="py-32 bg-black border-t border-white/5 selection:bg-green-500/20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <header className="mb-16">
                     <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="text-green-500 font-mono text-xs mb-4 tracking-[0.4em] uppercase">
                        LIVE_SIMULATION_ENVIRONMENT
                    </motion.p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Experience deterministic execution <br/> in a sandbox kernel.
                    </h2>
                    <p className="mt-8 text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
                        Launch a live kernel instance and establish a system law. <br/> 
                        Observe the <span className="text-white italic">FormatDisc enforcement layer</span> in real-time.
                    </p>
                </header>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={INSTITUTIONAL_TRANSITION}
                    viewport={{ once: true }}
                    className="relative rounded-sm bg-[#050505] border border-white/5 shadow-2xl text-left overflow-hidden font-mono text-sm group"
                >
                    {/* Terminal Header */}
                    <div className="bg-white/[0.03] px-5 py-3 border-b border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-3 text-neutral-500">
                             <Terminal size={14} className="text-green-500" />
                             <span className="text-[10px] uppercase tracking-widest">K_SHELL_SIMULATOR</span>
                         </div>
                         <div className="flex gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                             <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                             <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                         </div>
                    </div>

                    {/* Terminal Window */}
                    <div className="p-8 h-[300px] overflow-y-auto flex flex-col justify-between relative bg-black/40">
                        <div>
                            <div className="text-neutral-600 mb-4 italic">Welcome to FormatDisc Interactive Shell. Authenticating...</div>
                            <AnimatePresence>
                                {logs.map((log, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, ease: HEAVY_EASE }}
                                        className="text-green-500 mb-2 flex items-start gap-3"
                                    >
                                        <span className="text-neutral-700 font-bold">{`>`}</span>
                                        <span className="tracking-wide">{log}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {status === 'active' && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-white flex items-center gap-3 mt-4"
                                >
                                    <span className="text-green-500 font-bold">{`$`}</span>
                                    <motion.span 
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="w-2 h-4 bg-white inline-block shadow-[0_0_10px_white]"
                                    />
                                </motion.div>
                            )}
                        </div>

                        {status === 'idle' && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center transition-all duration-700">
                                <button
                                    onClick={handleStart}
                                    className="bg-green-600 text-white px-10 py-4 rounded-sm font-bold flex items-center gap-3 hover:bg-green-500 transition-all duration-300 uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-green-900/40"
                                >
                                    <Play size={12} className="fill-current" />
                                    Initialize Protocol
                                </button>
                            </div>
                        )}
                        
                        {status === 'booting' && (
                             <div className="absolute bottom-6 right-8 text-green-500 flex items-center gap-3 text-[10px] uppercase tracking-widest">
                                <Loader2 size={14} className="animate-spin" />
                                <span className="animate-pulse">Kernel_Boot_Seq_Active</span>
                             </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

TryItNowSection.displayName = 'TryItNowSection';