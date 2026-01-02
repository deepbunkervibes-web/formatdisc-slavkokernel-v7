import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Zap } from 'lucide-react';
import { INSTITUTIONAL_TRANSITION, HEAVY_EASE } from '../../lib/motion-presets';

export const OrchestrationTeaser = React.memo(() => {
    const [activeState, setActiveState] = useState<'improvised' | 'orchestrated'>('orchestrated');

    return (
        <section className="py-24 bg-black border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Text Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={INSTITUTIONAL_TRANSITION}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                            Your system deserves <br/>
                            orchestration, <span className="text-green-500">not improvisation.</span>
                        </h2>
                        <p className="mt-8 text-lg text-neutral-400 font-light leading-relaxed max-w-xl">
                            FormatDisc enforces deterministic behavior across your entire stack. We replace tribal knowledge and shell-script hope with verifiable, kernel-governed reality.
                        </p>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="flex items-center gap-2 group text-sm font-bold text-white uppercase tracking-widest px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            Initialize Protocol <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Interactive Visualization */}
                <div className="relative aspect-square md:aspect-video rounded-sm border border-white/5 bg-neutral-900/50 p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05),transparent)] pointer-events-none" />
                    
                    <div className="grid grid-cols-2 gap-8 w-full max-w-md relative z-10">
                        {/* Improvised State */}
                        <motion.div 
                            onClick={() => setActiveState('improvised')}
                            className={`p-6 border cursor-pointer transition-all duration-700 ${activeState === 'improvised' ? 'bg-red-500/10 border-red-500/50' : 'bg-black/20 border-white/5 opacity-40 hover:opacity-100'}`}
                            animate={{ 
                                scale: activeState === 'improvised' ? 1.02 : 1,
                                filter: activeState === 'improvised' ? 'grayscale(0%)' : 'grayscale(100%)'
                            }}
                            transition={INSTITUTIONAL_TRANSITION}
                        >
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                                <Zap size={20} className="text-red-500" />
                            </div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Improvised State</h3>
                            <p className="text-[10px] text-neutral-500 font-mono leading-tight">
                                UNSTABLE_DEPS<br/>
                                SILENT_DRIFT<br/>
                                MANUAL_FIXES
                            </p>
                        </motion.div>

                        {/* Orchestrated State */}
                        <motion.div 
                            onClick={() => setActiveState('orchestrated')}
                            className={`p-6 border cursor-pointer transition-all duration-700 ${activeState === 'orchestrated' ? 'bg-green-500/10 border-green-500/50' : 'bg-black/20 border-white/5 opacity-40 hover:opacity-100'}`}
                            animate={{ 
                                scale: activeState === 'orchestrated' ? 1.02 : 1,
                                filter: activeState === 'orchestrated' ? 'grayscale(0%)' : 'grayscale(100%)'
                            }}
                            transition={INSTITUTIONAL_TRANSITION}
                        >
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                                <Shield size={20} className="text-green-500" />
                            </div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Orchestrated State</h3>
                            <p className="text-[10px] text-neutral-500 font-mono leading-tight">
                                DETERMINISTIC_FLOW<br/>
                                KERNEL_ENFORCED<br/>
                                AUDIT_READY
                            </p>
                        </motion.div>
                    </div>

                    {/* Connection Lines (Simulated Mechanical Logic) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                        <motion.path 
                            d="M 50,50 L 150,150" 
                            stroke="#ffffff"
                            strokeWidth="1"
                            fill="none"
                            animate={{ pathLength: activeState === 'orchestrated' ? 1 : 0.2 }}
                            transition={{ duration: 1.5, ease: HEAVY_EASE }}
                        />
                    </svg>
                </div>

            </div>
        </section>
    );
});

OrchestrationTeaser.displayName = 'OrchestrationTeaser';
