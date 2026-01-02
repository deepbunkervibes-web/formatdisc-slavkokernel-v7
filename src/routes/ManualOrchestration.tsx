import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeadingBlock, SectionDivider } from '../components/orchestration/OrchestrationHelpers';
import { QuantumPreview } from '../components/orchestration/QuantumPreview';
import { Clock, Binary, Zap, ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { 
    INSTITUTIONAL_TRANSITION, 
    HEAVY_EASE, 
    staggerContainer, 
    slideUpHeavy, 
    fadeInHeavy 
} from '../lib/motion-presets';

const ManualOrchestration: React.FC = () => {
    const navigate = useNavigate();
    const [hours, setHours] = useState(0);
    const [projects, setProjects] = useState(0);

    useEffect(() => {
        const hInterval = setInterval(() => {
            setHours(prev => (prev < 3000 ? prev + 83 : 3000));
        }, 30);
        const pInterval = setInterval(() => {
            setProjects(prev => (prev < 300 ? prev + 11 : 300));
        }, 50);
        return () => { clearInterval(hInterval); clearInterval(pInterval); };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/20 pt-32 pb-32">
            {/* Nav Back */}
            <div className="max-w-4xl mx-auto px-6 mb-20">
                <button
                    onClick={() => navigate('/orchestration')}
                    className="flex items-center gap-3 text-neutral-600 hover:text-green-500 transition-all duration-500 uppercase text-[9px] font-bold tracking-[0.4em] group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform duration-500" /> 
                    <span>Back_to_Operational_Hub</span>
                </button>
            </div>

            <main className="max-w-4xl mx-auto px-6">
                {/* Hero Section */}
                <motion.section
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="mb-40"
                >
                    <motion.div 
                        variants={fadeInHeavy}
                        className="inline-flex items-center gap-3 px-4 py-1.5 bg-green-500/[0.03] border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-12 rounded-sm"
                    >
                        <ShieldCheck size={14} /> Sovereign_Intent_Boundary
                    </motion.div>
                    
                    <motion.h1 
                        variants={slideUpHeavy}
                        className="text-5xl md:text-9xl font-bold uppercase tracking-tighter mb-16 leading-[0.8] text-white"
                    >
                        Manual <br />
                        <span className="text-green-500 italic lowercase tracking-tight">Orchestration.</span>
                    </motion.h1>
                    
                    <motion.p 
                        variants={fadeInHeavy}
                        className="text-2xl text-neutral-400 leading-relaxed max-w-2xl mb-20 font-light"
                    >
                        The discipline of creating AI sovereignty through 3,000 hours of manual labor. 
                        No hidden teams. No proxies. No shortcuts.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <motion.div
                            variants={slideUpHeavy}
                            className="p-12 bg-neutral-950/50 border border-white/5 rounded-sm group hover:border-green-500/20 transition-all duration-700"
                        >
                            <Clock className="text-neutral-500 group-hover:text-green-500 mb-8 w-10 h-10 transition-colors duration-700" />
                            <div className="text-7xl font-bold text-white mb-3 tracking-tighter tabular-nums">{hours.toLocaleString()}</div>
                            <div className="text-[10px] text-neutral-600 uppercase tracking-[0.4em] font-bold">Labor_Hours_Verified</div>
                        </motion.div>
                        <motion.div
                            variants={slideUpHeavy}
                            className="p-12 bg-neutral-950/50 border border-white/5 rounded-sm group hover:border-green-500/20 transition-all duration-700"
                        >
                            <Binary className="text-neutral-500 group-hover:text-green-500 mb-8 w-10 h-10 transition-colors duration-700" />
                            <div className="text-7xl font-bold text-white mb-3 tracking-tighter tabular-nums">{projects}</div>
                            <div className="text-[10px] text-neutral-600 uppercase tracking-[0.4em] font-bold">Sovereign_State_Projects</div>
                        </motion.div>
                    </div>
                </motion.section>

                <SectionDivider />

                {/* Narrative */}
                <motion.section 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-40"
                >
                    <motion.div variants={fadeInHeavy}>
                        <HeadingBlock title="Credibility" subtitle="The artisan architect protocol." />
                    </motion.div>
                    
                    <div className="space-y-12 text-neutral-400 text-xl leading-relaxed font-light mt-12">
                        <motion.p variants={fadeInHeavy}>
                            Manual orchestration in the SlavkoKernel world means there is <strong className="text-white font-medium">no hidden team</strong>. 
                            Every commit, every deployment, every incident — carries a single, verifiable signature. 
                            This is not a tale of "AI magic," but of rigorous engineering and forensic discipline.
                        </motion.p>
                        
                        <div className="space-y-8 pt-6">
                            {[
                                "No Black Boxes: Every AI flow has a dedicated audit layer and cryptographic hash.",
                                "No Post-Documentation: Strategy, Kernel, and Audit are born synchronously.",
                                "Full Forensic Accountability for every single line of code in production."
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInHeavy}
                                    className="flex gap-6 items-start group"
                                >
                                    <div className="w-6 h-6 rounded-sm bg-green-500/10 flex items-center justify-center shrink-0 mt-1">
                                        <Zap className="text-green-500" size={12} />
                                    </div>
                                    <span className="font-bold uppercase tracking-tight text-white/90 text-lg group-hover:text-green-500 transition-colors duration-500">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Quantum TV Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mb-40"
                >
                    <div className="mb-16">
                        <HeadingBlock title="The Lens" subtitle="Holographic System Overview" />
                        <p className="text-neutral-500 max-w-xl text-lg italic uppercase tracking-widest mt-6">
                            Imagine a screen that displays not just the UI, but the entire lifecycle of a single decision.
                        </p>
                    </div>
                    
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-green-500/5 blur-2xl group-hover:opacity-100 opacity-20 transition-opacity duration-1000" />
                        <QuantumPreview mode="manual" />
                    </div>

                    <div className="mt-12 p-10 bg-neutral-950 border border-white/5 rounded-sm">
                        <h4 className="text-green-500 font-bold uppercase text-[10px] mb-6 tracking-[0.4em]">Audit_Readout:</h4>
                        <p className="text-neutral-500 text-lg leading-relaxed font-light">
                            This is not a "pretty animation." Every line represents a decision-flow through the SlavkoKernel: 
                            <span className="text-white"> Input_Signal {"->"} Council_Verification {"->"} Hash-Linked_Artifact</span>. 
                            Manual orchestration ensures that every flow has a name, a commit, and an accountable owner.
                        </p>
                    </div>
                </motion.section>

                <SectionDivider />

                {/* CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={INSTITUTIONAL_TRANSITION}
                    viewport={{ once: true }}
                    className="p-20 bg-green-600 text-white text-center relative overflow-hidden rounded-sm"
                >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20" />
                    <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 tracking-tighter leading-none">Schedule a <br/> Governance Audit</h2>
                    <p className="text-xl font-medium mb-12 opacity-80 uppercase tracking-tight max-w-xl mx-auto leading-relaxed">
                        Show your team what a manually orchestrated AI system looks like — without filters, without marketing.
                    </p>
                    <a
                        href="mailto:mladen@formatdisc.hr?subject=Predavanje - Ručna Orkestracija"
                        className="inline-flex items-center gap-4 px-12 py-5 bg-black text-green-500 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-900 transition-all duration-500 shadow-2xl"
                    >
                        <Mail size={18} /> Establish Contact
                    </a>

                    {/* Subtle aesthetic lines */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/10" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/10" />
                </motion.section>
            </main>

            {/* Ambient Background Elements - Institutional Scanning Line */}
            <motion.div 
                className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
                animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #22c55e, transparent)', backgroundSize: '100% 200px' }}
            />
        </div>
    );
};

export default memo(ManualOrchestration);
