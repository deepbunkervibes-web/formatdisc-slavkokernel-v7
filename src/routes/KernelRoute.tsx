import * as React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Lock, ShieldCheck } from 'lucide-react';
import { KernelStatus } from '../components/kernel/KernelStatus';
import { AuditTrail } from '../components/kernel/AuditTrail';
import { DeploymentControls } from '../components/kernel/DeploymentControls';
import { Terminal } from '../components/kernel/Terminal';
import { IntrospectionPanel } from '../components/kernel/introspection/IntrospectionPanel';
import { 
    INSTITUTIONAL_TRANSITION, 
    staggerContainer, 
    slideUpHeavy, 
    fadeInHeavy 
} from '../lib/motion-presets';

export function KernelRoute() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/20">
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-32">
                <motion.header 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="mb-20 relative"
                >
                    {/* Minimal aesthetic anchor */}
                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-12">
                        <div className="space-y-8">
                            <motion.div 
                                variants={fadeInHeavy}
                                className="inline-flex items-center gap-3 px-4 py-1.5 border border-green-500/20 bg-green-500/[0.02] text-green-500 text-[10px] font-bold uppercase tracking-[0.4em] rounded-sm"
                            >
                                <ShieldCheck size={14} />
                                Regulatory_Protocol_V7.0.4
                            </motion.div>
                            
                            <div className="flex items-center gap-8">
                                <motion.div 
                                    variants={slideUpHeavy}
                                    className="p-6 bg-neutral-950 border border-white/10 rounded-sm shadow-2xl"
                                >
                                    <Cpu size={48} className="text-green-500" />
                                </motion.div>
                                <div>
                                    <motion.h1 
                                        variants={slideUpHeavy}
                                        className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none text-white italic"
                                    >
                                        Slavko<span className="text-green-500">Kernel.</span>
                                    </motion.h1>
                                    <motion.p 
                                        variants={fadeInHeavy}
                                        className="text-neutral-500 font-mono text-[10px] mt-4 uppercase tracking-[0.3em] flex items-center gap-3"
                                    >
                                        <Lock size={12} className="text-white opacity-40" /> Secure_Deterministic_Execution_Layer
                                    </motion.p>
                                </div>
                            </div>
                        </div>

                        <motion.div 
                            variants={fadeInHeavy}
                            className="flex flex-col items-end gap-3"
                        >
                            <div className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.4em]">System_State</div>
                            <div className="px-8 py-3 bg-neutral-950 border border-green-500/30 rounded-sm flex items-center gap-4 hover:border-green-500 transition-colors duration-700">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e] animate-pulse"></div>
                                <span className="text-[10px] font-mono font-bold text-white tracking-[0.4em]">NODE_OPERATIONAL</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div 
                        variants={slideUpHeavy}
                        className="max-w-4xl text-neutral-400 text-lg leading-relaxed font-light border-l border-green-500/40 pl-10 py-4 bg-gradient-to-r from-green-500/[0.03] to-transparent"
                    >
                        Welcome to the operational core. The SlavkoKernel architecture enforces 100% deterministic outputs 
                        by synchronizing all UI and system events to a single global clock. Every action is cryptographically 
                        verified and sealed in the immutable audit ledger.
                    </motion.div>
                </motion.header>

                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full space-y-12"
                >
                    <motion.div variants={fadeInHeavy}>
                        <KernelStatus />
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-12">
                            <motion.section variants={slideUpHeavy}>
                                <Terminal />
                            </motion.section>
                            <motion.section variants={slideUpHeavy}>
                                <DeploymentControls />
                            </motion.section>
                        </div>

                        <div className="space-y-12">
                            <motion.section variants={slideUpHeavy}>
                                <AuditTrail />
                            </motion.section>

                            <motion.section variants={slideUpHeavy}>
                                <IntrospectionPanel />
                            </motion.section>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>);
}

KernelRoute.displayName = 'KernelRoute';