import * as React from 'react';
import { motion } from 'framer-motion';
import { 
  staggerContainer, 
  fadeInHeavy, 
  diagnosticReveal, 
  HEAVY_EASE 
} from '../../lib/motion-presets';

export const ArchitectureVisualization = React.memo(() => {
    return (
        <section className="py-24 bg-black overflow-hidden border-y border-white/5 selection:bg-green-500/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                    
                    {/* Diagnostic Narrative */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: HEAVY_EASE }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                                Visualizing <br/>
                                <span className="text-green-500">The Core.</span>
                            </h2>
                            <p className="mt-8 text-lg text-neutral-400 font-light leading-relaxed">
                                Our abstract representation of the SlavkoKernel architecture. Not just code, but a multi-dimensional lattice of deterministic constraints.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {[
                                "KERNEL_CORE_STABILIZED",
                                "SATELLITE_NODES_ACTIVE",
                                "AUDIT_LAYER_ENFORCED"
                            ].map((status, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.2 }}
                                    className="flex items-center gap-4 text-[11px] font-mono text-neutral-500"
                                >
                                    <div className="w-1 h-3 bg-green-500" />
                                    {status}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* The Visualization (Abstract Diagnostic Map) */}
                    <div className="lg:col-span-3 relative bg-neutral-950/50 rounded-sm border border-white/5 p-8 overflow-hidden aspect-video">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
                        
                        <motion.div 
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            {/* Central Node */}
                            <motion.div 
                                variants={fadeInHeavy}
                                className="z-10 w-24 h-24 rounded-full border border-green-500/50 bg-green-500/10 flex items-center justify-center p-4"
                            >
                                <div className="w-full h-full rounded-full bg-green-500 animate-pulse opacity-50 blur-sm" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[10px] font-mono font-bold text-white">CORE</span>
                                </div>
                            </motion.div>

                            {/* Satellite Nodes & Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <motion.circle cx="30%" cy="30%" r="4" fill="#22c55e" variants={fadeInHeavy} />
                                <motion.path d="M 30% 30% L 50% 50%" stroke="#22c55e" strokeWidth="0.5" variants={diagnosticReveal} />
                                
                                <motion.circle cx="70%" cy="40%" r="4" fill="#22c55e" variants={fadeInHeavy} />
                                <motion.path d="M 70% 40% L 50% 50%" stroke="#22c55e" strokeWidth="0.5" variants={diagnosticReveal} />

                                <motion.circle cx="40%" cy="70%" r="4" fill="#22c55e" variants={fadeInHeavy} />
                                <motion.path d="M 40% 70% L 50% 50%" stroke="#22c55e" strokeWidth="0.5" variants={diagnosticReveal} />

                                <motion.circle cx="60%" cy="20%" r="4" fill="#22c55e" variants={fadeInHeavy} />
                                <motion.path d="M 60% 20% L 50% 50%" stroke="#22c55e" strokeWidth="0.5" variants={diagnosticReveal} />
                            </svg>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
});

ArchitectureVisualization.displayName = 'ArchitectureVisualization';