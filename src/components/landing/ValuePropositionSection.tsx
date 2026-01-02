import * as React from 'react';
import { Shield, Lock, LayoutGrid, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUpHeavy } from '../../lib/motion-presets';

export const ValuePropositionSection = React.memo(() => {
    const pillars = [
        {
            icon: Shield,
            title: "Kernel-Governed Architecture",
            desc: "Every architectural decision is verified against established constraints before execution.",
            points: ["Conflict avoidance", "Dependency integrity", "Systemic stability"]
        },
        {
            icon: Lock,
            title: "Audit-Safe Execution",
            desc: "Operational history is recorded in an immutable ledger, ensuring zero-drift compliance.",
            points: ["Change signatures", "Historical playback", "Regulatory readiness"]
        },
        {
            icon: LayoutGrid,
            title: "Institutional Governance",
            desc: "Moving from tribal knowledge to a formal system of record for all infrastructure.",
            points: ["Token-gated access", "Role-based control", "Automated oversight"]
        }
    ];

    return (
        <section className="py-32 bg-black border-t border-white/5 selection:bg-green-500/30">
            <div className="max-w-7xl mx-auto px-6">
                <motion.header 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mb-24"
                >
                    <p className="text-green-500 font-mono text-xs mb-4 tracking-[0.3em] uppercase">THE DOCTRINE</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                        A deterministic execution environment for high-stakes startups.
                    </h2>
                </motion.header>

                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {pillars.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div 
                                key={i}
                                variants={slideUpHeavy}
                                className="group p-10 bg-white/[0.02] border border-white/5 rounded-sm hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="w-12 h-12 rounded-sm bg-neutral-900 border border-white/10 flex items-center justify-center mb-8 group-hover:border-green-500/50 transition-colors duration-500">
                                    <Icon size={24} className="text-neutral-400 group-hover:text-green-500 transition-colors duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                                <p className="text-neutral-500 text-sm font-light leading-relaxed mb-8 flex-grow">
                                    {pillar.desc}
                                </p>
                                <ul className="space-y-3 pt-8 border-t border-white/5">
                                    {pillar.points.map((point, j) => (
                                        <li key={j} className="flex items-center gap-3 text-[10px] text-neutral-400 font-mono uppercase tracking-widest">
                                            <div className="w-1 h-1 bg-green-500/50 rounded-full" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
});

ValuePropositionSection.displayName = 'ValuePropositionSection';