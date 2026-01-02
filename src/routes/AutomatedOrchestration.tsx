import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeadingBlock, SectionDivider } from '../components/orchestration/OrchestrationHelpers';
import { QuantumPreview } from '../components/orchestration/QuantumPreview';
import { Cpu, Repeat, Activity, FileCode, ArrowLeft, Mail, Network } from 'lucide-react';
import { 
    INSTITUTIONAL_TRANSITION, 
    HEAVY_EASE, 
    staggerContainer, 
    slideUpHeavy, 
    fadeInHeavy 
} from '../lib/motion-presets';

const AutomatedOrchestration: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/20 pt-32 pb-32">
            {/* Nav Back */}
            <div className="max-w-4xl mx-auto px-6 mb-20">
                <button
                    onClick={() => navigate('/orchestration')}
                    className="flex items-center gap-3 text-neutral-600 hover:text-white transition-all duration-500 uppercase text-[9px] font-bold tracking-[0.4em] group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform duration-500" /> 
                    <span>Restore_Orchestration_Hub</span>
                </button>
            </div>

            <main className="max-w-4xl mx-auto px-6">
                {/* Hero section */}
                <motion.section
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="mb-40"
                >
                    <motion.div 
                        variants={fadeInHeavy}
                        className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/[0.03] border border-white/10 text-neutral-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-12 rounded-sm"
                    >
                        <Network size={14} /> System_Kinetic_Execution
                    </motion.div>
                    
                    <motion.h1 
                        variants={slideUpHeavy}
                        className="text-5xl md:text-9xl font-bold uppercase tracking-tighter mb-16 leading-[0.8] text-white"
                    >
                        Kinetic <br />
                        <span className="text-neutral-500 italic lowercase tracking-tight">Execution.</span>
                    </motion.h1>
                    
                    <motion.p 
                        variants={fadeInHeavy}
                        className="text-2xl text-neutral-400 leading-relaxed max-w-2xl mb-20 font-light"
                    >
                        When the Kernel takes the load, but not the responsibility. 
                        Scalability without the surrender of sovereignty.
                    </motion.p>

                    <motion.div 
                        variants={slideUpHeavy}
                        className="p-12 bg-neutral-950 border border-white/5 rounded-sm flex items-center justify-between group overflow-hidden relative"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500 opacity-20 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div>
                            <div className="text-[10px] text-neutral-600 uppercase tracking-[0.4em] font-bold mb-4">Pipeline_Status</div>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_#22c55e]" />
                                <div className="text-2xl font-bold uppercase tracking-[0.1em] text-white">Active_Audit_Ledger</div>
                            </div>
                        </div>
                        <Cpu className="text-neutral-800 group-hover:text-white/20 w-12 h-12 transition-colors duration-1000" />
                    </motion.div>
                </motion.section>

                <SectionDivider />

                {/* Definition */}
                <motion.section 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-40"
                >
                    <motion.div variants={fadeInHeavy}>
                        <HeadingBlock title="Implementation" subtitle="The mechanics of autonomous law." />
                    </motion.div>
                    
                    <div className="space-y-12 text-neutral-400 text-xl leading-relaxed font-light mt-12">
                        <motion.p variants={fadeInHeavy}>
                            Automated orchestration means that HPA, CI/CD, monitoring, and audit operate without manual supervision—but strictly based on manually defined protocols and forensically verified paths.
                        </motion.p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            {[
                                { icon: Repeat, title: "Regulatory Context", desc: "The EU AI Act demands provable flows, not just 'it works in production.'" },
                                { icon: Activity, title: "Operational Reality", desc: "Manual labor doesn't scale—but automation without manual foundations is a hazard." },
                                { icon: FileCode, title: "FormatDisc Approach", desc: "Manual first, forensic, provable. Then automated, scalable, reproducible." },
                                { icon: Cpu, title: "Code-as-Law", desc: "AI systems that are deterministic and auditable by design, not by accident." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    variants={slideUpHeavy}
                                    className="p-10 border border-white/5 bg-neutral-950/50 group hover:border-white/20 transition-all duration-700 rounded-sm"
                                >
                                    <div className="flex gap-5 items-center mb-8">
                                        <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-700">
                                            {item.icon && <item.icon className="text-neutral-500 group-hover:text-white w-5 h-5 transition-colors duration-700" />}
                                        </div>
                                        <div className="text-white font-bold uppercase tracking-widest text-sm">{item.title}</div>
                                    </div>
                                    <p className="text-sm leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors duration-700">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Themes Section */}
                <motion.section 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-40"
                >
                    <motion.div variants={fadeInHeavy} className="mb-16">
                        <HeadingBlock title="Curriculum 2026" subtitle="The Architecture of Autonomy." />
                    </motion.div>
                    
                    <ul className="grid grid-cols-1 gap-4 mb-32">
                        {[
                            "From Manual to Kinetic: The Sovereign Transition",
                            "Anatomy of SlavkoKernel Infrastructure",
                            "SlavkoAuditKit: Production-Grade Forensics",
                            "Zero-Touch Deploy, Full-Touch Audit",
                            "EU AI Act as a CI/CD Constraint"
                        ].map((theme, i) => (
                            <motion.li 
                                key={i} 
                                variants={slideUpHeavy}
                                className="flex gap-6 items-center p-6 bg-neutral-950/30 text-neutral-400 border border-white/5 hover:border-green-500/20 transition-all duration-700 rounded-sm group"
                            >
                                <span className="text-green-500 font-mono text-[10px] tabular-nums opacity-40 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                <span className="font-bold uppercase tracking-[0.2em] text-sm text-white/80 group-hover:text-white transition-colors">{theme}</span>
                            </motion.li>
                        ))}
                    </ul>

                    <motion.div variants={fadeInHeavy} className="mb-16">
                        <HeadingBlock title="The Lens" subtitle="Autonomous Infrastructure Overview." />
                        <p className="text-neutral-500 max-w-xl text-lg italic uppercase tracking-widest mt-6">
                            We don't just talk about YAML and logs—we witness the system's behavior through time.
                        </p>
                    </motion.div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-white/5 blur-2xl group-hover:opacity-100 opacity-10 transition-opacity duration-1000" />
                        <QuantumPreview mode="automated" />
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 p-10 bg-neutral-950 border border-white/5 rounded-sm"
                    >
                        <h4 className="text-white font-bold uppercase text-[10px] mb-6 tracking-[0.4em]">System_Readout:</h4>
                        <p className="text-neutral-500 text-lg leading-relaxed font-light">
                            Visualizing <span className="text-white">CI/CD Pipelines</span>, <span className="text-white">Active_Scaling</span>, and <span className="text-white">Audit_Ledgers</span>. 
                            This is a real-time render of your AI state under load, under failure, and under regulatory pressure.
                        </p>
                    </motion.div>
                </motion.section>

                <SectionDivider />

                {/* CTA */}
                <motion.section
                     initial={{ opacity: 0, scale: 0.98 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={INSTITUTIONAL_TRANSITION}
                     viewport={{ once: true }}
                    className="p-20 border border-green-500/20 text-white text-center rounded-sm bg-green-500/[0.02] relative overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500/0 group-hover:bg-green-500/40 transition-all duration-1000" />
                    <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 tracking-tighter leading-none text-white">Technical <br/> Workshop</h2>
                    <p className="text-xl font-medium mb-12 text-neutral-400 uppercase tracking-tight max-w-xl mx-auto leading-relaxed">
                        Request a session: “Kinetic Orchestration of Autonomous Systems.”
                    </p>
                    <a
                        href="mailto:mladen@formatdisc.hr?subject=Radionica - Automatizirana Orkestracija"
                        className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-green-500 hover:text-white transition-all duration-500 shadow-2xl"
                    >
                        <Mail size={18} /> Deploy Session
                    </a>
                </motion.section>
            </main>

            {/* Kinetic Background elements - Sharp Grid */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[size:48px_48px] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]" />
        </div>
    );
};

export default memo(AutomatedOrchestration);
