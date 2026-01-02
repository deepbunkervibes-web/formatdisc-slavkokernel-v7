import * as React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { INSTITUTIONAL_TRANSITION, HEAVY_EASE } from '../../lib/motion-presets';

export const ProblemSolutionComparison = React.memo(() => {
    return (
        <section className="py-32 bg-black border-t border-white/5 relative overflow-hidden selection:bg-red-500/20">
             {/* Subtle background division */}
            <div className="absolute inset-0 flex">
                <div className="w-1/2 bg-red-950/5 border-r border-white/5" />
                <div className="w-1/2 bg-green-950/5" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <header className="text-center mb-20 px-4">
                    <p className="text-neutral-500 font-mono text-[10px] mb-4 tracking-[0.4em] uppercase tracking-widest">STATE_CONTRAST_ANALYSIS</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Uncertainty is your biggest risk. <br/>
                        <span className="text-green-500 italic">SlavkoKernel is your containment field.</span>
                    </h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                    {/* The Problem: Chaos */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={INSTITUTIONAL_TRANSITION}
                        viewport={{ once: true }}
                        className="p-10 rounded-sm bg-red-950/10 border border-red-900/10 hover:border-red-900/30 transition-all duration-700 h-full"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-10 h-10 rounded-sm bg-red-900/20 flex items-center justify-center">
                                <AlertTriangle className="text-red-500" size={20} />
                            </div>
                            <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest font-mono">Status: Improvised Chaos</h3>
                        </div>
                        <ul className="space-y-8">
                            {[
                                { title: "Hidden Logic", desc: "Critical business rules buried in unreadable, tribal spaghetti code." },
                                { title: "Architectural Drift", desc: "Understanding of the system lives only in founders' heads." },
                                { title: "Silent Regressions", desc: "Updates break features silently, causing cascading systemic failures." }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 group">
                                     <XCircle className="text-red-900/50 shrink-0 mt-1.5 group-hover:text-red-500 transition-colors duration-500" size={16} />
                                     <div>
                                         <strong className="block text-red-100 text-lg mb-2 font-bold tracking-tight">{item.title}</strong>
                                         <p className="text-red-100/40 text-sm leading-relaxed font-light">{item.desc}</p>
                                     </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* The Solution: Order */}
                     <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={INSTITUTIONAL_TRANSITION}
                        viewport={{ once: true }}
                        className="p-10 rounded-sm bg-green-950/10 border border-green-900/10 hover:border-green-900/30 transition-all duration-700 h-full"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-10 h-10 rounded-sm bg-green-900/20 flex items-center justify-center">
                                <ShieldCheck className="text-green-500" size={20} />
                            </div>
                            <h3 className="text-sm font-bold text-green-500 uppercase tracking-widest font-mono">Status: Kernel Order</h3>
                        </div>
                        <ul className="space-y-8">
                            {[
                                { title: "Explicit Contracts", desc: "Every system behavior is typed, verified, and strictly enforced." },
                                { title: "Code-as-Artifact", desc: "Architecture that documents itself through deterministic execution." },
                                { title: "Kernel-Signed Logs", desc: "State changes are cryptographically signed and audit-ready." }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 group">
                                     <CheckCircle className="text-green-900/50 shrink-0 mt-1.5 group-hover:text-green-500 transition-colors duration-500" size={16} />
                                     <div>
                                         <strong className="block text-green-500 text-lg mb-2 font-bold tracking-tight">{item.title}</strong>
                                         <p className="text-green-100/40 text-sm leading-relaxed font-light">{item.desc}</p>
                                     </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
});

ProblemSolutionComparison.displayName = 'ProblemSolutionComparison';