import * as React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Lock, Mail, Phone, Shield } from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
    INSTITUTIONAL_TRANSITION, 
    HEAVY_EASE, 
    staggerContainer, 
    slideUpHeavy, 
    fadeInHeavy 
} from '../lib/motion-presets';

export function InvestorsRoute() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/20 pt-40 pb-32">
            {/* Hard architecture line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/[0.02] pointer-events-none" />
            
            <div className="relative max-w-7xl mx-auto px-6">

                {/* Header: Pure Identification */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-32 border-b border-white/5 pb-20"
                >
                    <motion.div variants={fadeInHeavy} className="flex justify-center mb-10">
                        <StatusBadge active>Confidential // Seed_Stage</StatusBadge>
                    </motion.div>

                    <motion.h1 
                        variants={slideUpHeavy}
                        className="text-4xl md:text-7xl lg:text-[100px] font-bold tracking-tight text-white mb-10 uppercase leading-[0.85]"
                    >
                        FormatDisc <br/>
                        <span className="text-neutral-500 italic lowercase tracking-tight">Investment_Room.</span>
                    </motion.h1>

                    <motion.p 
                        variants={fadeInHeavy}
                        className="text-[10px] md:text-xs text-neutral-500 tracking-[0.4em] max-w-3xl mx-auto uppercase font-mono"
                    >
                        DETERMINISTIC_AI_INFRASTRUCTURE_V7.0 <br className="hidden md:block" />
                        <span className="text-green-500">SEED_ROUND: €2.5M [OPEN]</span> // 18-MONTH_RUNWAY_PROJECTED
                    </motion.p>
                </motion.div>

                {/* Data Room Status Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={INSTITUTIONAL_TRANSITION}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="bg-neutral-950 border border-white/5 p-12 md:p-20 rounded-sm relative overflow-hidden group hover:border-white/10 transition-colors duration-1000">
                        {/* Scanning technical grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="text-center md:text-left">
                                <div className="flex items-center gap-4 mb-6 justify-center md:justify-start text-green-500">
                                    <Lock className="w-6 h-6" />
                                    <h2 className="text-xl font-bold tracking-[0.2em] uppercase">INVESTOR DATA ROOM</h2>
                                </div>
                                <div className="font-mono text-[9px] text-neutral-600 tracking-[0.3em] space-y-3 uppercase">
                                    <p>DOCUMENT_PACKAGE: V7.0.4-SIGNED</p>
                                    <p>CONTENTS: ARCHITECTURE, AUDIT_FINANCIALS, CORE_TEAM</p>
                                    <p>GOVERNANCE: NDA_REQUIRED_L7</p>
                                </div>
                            </div>

                            <a
                                href="mailto:mladen@formatdisc.hr?subject=Data%20Room%20Access%20Request"
                                className="px-12 py-5 bg-white text-black font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-green-500 hover:text-white transition-all duration-500 flex items-center gap-4 shadow-2xl"
                            >
                                <span>REQUEST_CERTIFICATE</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* System Capabilities */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 mb-32"
                >
                    {[
                        {
                            title: "COMPLIANCE_ENGINE",
                            metrics: ["EU_AI_ACT_ENFORCED", "ARTICLE_13_DETERMINISM", "LIABILITY_SHIELD_PROTOCOL"]
                        },
                        {
                            title: "CORE_ARCHITECTURE",
                            metrics: ["INFERENCE_LOCKING_V7", "MONOTONIC_HASH_LEDGER", "MULTI-AGENT_PROOFS"]
                        },
                        {
                            title: "MARKET_TELEMETRY",
                            metrics: ["€450K_ARR_COMMITTED", "10+_ENTERPRISE_NODES", "€12.3B_TOTAL_TAM_2026"]
                        }
                    ].map((card) => (
                        <motion.div key={card.title} variants={fadeInHeavy} className="bg-black p-12 hover:bg-neutral-950 transition-colors group">
                            <h3 className="text-[10px] font-bold text-green-500 tracking-[0.4em] mb-8 flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
                                {card.title}
                            </h3>
                            <ul className="space-y-4">
                                {card.metrics.map(item => (
                                    <li key={item} className="font-mono text-[9px] text-neutral-500 tracking-[0.15em] flex items-center gap-4 border-l border-white/5 pl-4 group-hover:border-green-500/20 transition-all duration-700 uppercase">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Allocation Structure */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-40"
                >
                    <motion.h3 variants={fadeInHeavy} className="text-[9px] text-neutral-700 tracking-[0.5em] mb-12 uppercase font-mono">CAPITAL_ALLOCATION_STRATEGY</motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono max-w-4xl mx-auto">
                        <motion.div variants={slideUpHeavy} className="p-10 border border-white/5 hover:border-white/20 transition-all duration-700 rounded-sm">
                            <div className="text-3xl text-white font-bold mb-3">60%</div>
                            <div className="text-[9px] text-neutral-600 tracking-[0.3em] uppercase">R&D // CORE_HARDENING</div>
                        </motion.div>
                        <motion.div variants={slideUpHeavy} className="p-10 border border-white/5 hover:border-white/20 transition-all duration-700 rounded-sm">
                            <div className="text-3xl text-white font-bold mb-3">25%</div>
                            <div className="text-[9px] text-neutral-600 tracking-[0.3em] uppercase">INSTITUTIONAL_SALES</div>
                        </motion.div>
                        <motion.div variants={slideUpHeavy} className="p-10 border border-white/5 hover:border-white/20 transition-all duration-700 rounded-sm">
                            <div className="text-3xl text-white font-bold mb-3">15%</div>
                            <div className="text-[9px] text-neutral-600 tracking-[0.3em] uppercase">REGULATORY_POLICY</div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Contact Protocol */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                    className="border-t border-white/5 pt-20 flex flex-col items-center"
                >
                    <p className="text-[9px] text-neutral-700 tracking-[0.5em] mb-12 uppercase font-mono">ESTABLISH_COMMUNICATION</p>

                    <div className="flex flex-col md:flex-row items-center gap-16 font-mono text-[10px] tracking-[0.3em] uppercase">
                        <a href="mailto:mladen@formatdisc.hr" className="flex items-center gap-4 text-neutral-500 hover:text-green-500 transition-colors duration-500 group">
                            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span>MLADEN@FORMATDISC.HR</span>
                        </a>
                        <div className="hidden md:block w-px h-8 bg-white/5" />
                        <a href="tel:+385915421014" className="flex items-center gap-4 text-neutral-500 hover:text-white transition-colors duration-500 group">
                            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span>+385 91 542 1014</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

InvestorsRoute.displayName = 'InvestorsRoute';
