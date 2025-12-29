import { ExternalLink, Download, Mail, Phone, Lock } from 'lucide-react';
import { MotionLanding } from '../components/motion/MotionTemplates';
import { StatusBadge } from '../components/ui/StatusBadge';

export function InvestorsRoute() {
    return (
        <div className="min-h-screen bg-surface-primary pt-16 uppercase font-mono selection:bg-signal-active selection:text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* Header: Pure Identification */}
                <MotionLanding order={1} className="text-center mb-20 border-b border-border-strong pb-12">
                    <div className="flex justify-center mb-8">
                        <StatusBadge status="CONFIDENTIAL // SEED STAGE" variant="locked" />
                    </div>

                    <h1 className="font-brand text-4xl md:text-5xl lg:text-7xl tracking-widest text-text-primary mb-6">
                        FORMATDISC<span className="text-text-muted mx-4">×</span>SLAVKOKERNEL
                    </h1>

                    <p className="text-xs md:text-sm text-text-secondary tracking-[0.2em] max-w-3xl mx-auto">
                        DETERMINISTIC AI INFRASTRUCTURE V12.1 <br className="hidden md:block" />
                        SEED ROUND: €2.5M [OPEN] // 18-MONTH RUNWAY
                    </p>
                </MotionLanding>

                {/* Data Room Status Card - Cold Execution */}
                <MotionLanding order={2} className="mb-20">
                    <div className="bg-surface-elevated border border-border-subtle rounded-sm p-1 hover:border-border-strong transition-colors group">
                        <div className="bg-surface-primary border border-white/5 p-8 md:p-12 relative overflow-hidden">
                            {/* Decorative technical grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                                        <Lock className="w-5 h-5 text-signal-verified" />
                                        <h2 className="text-lg font-brand tracking-widest text-text-primary">INVESTOR DATA ROOM</h2>
                                    </div>
                                    <div className="font-mono text-[10px] text-text-muted tracking-wider space-y-1">
                                        <p>PACKAGE VERSION: 2.1.0-RC</p>
                                        <p>CONTENTS: ARCHITECTURE, FINANCIALS, TEAM_BIOS</p>
                                        <p>ACCESS LEVEL: NDA_REQUIRED</p>
                                    </div>
                                </div>

                                <a
                                    href="mailto:mladen@formatdisc.hr?subject=Data%20Room%20Access%20Request"
                                    className="px-8 py-3 bg-text-primary text-surface-primary font-mono text-xs font-bold tracking-[0.15em] hover:bg-signal-active transition-colors flex items-center gap-3"
                                >
                                    <span>REQUEST CERTIFICATE</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </MotionLanding>

                {/* System Capabilities - Reduced Narrative */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 mb-20">
                    {[
                        {
                            title: "COMPLIANCE ENGINE",
                            metrics: ["EU AI ACT ENFORCED", "ARTICLE 13 READY", "LIABILITY SHIELD"]
                        },
                        {
                            title: "CORE ARCHITECTURE",
                            metrics: ["INFERENCE LOCKING", "MONOTONIC HASH-CHAIN", "MULTI-AGENT CONSENSUS"]
                        },
                        {
                            title: "MARKET TELEMETRY",
                            metrics: ["€450K ARR (PILOTS)", "10+ ENTERPRISE NODES", "€12.3B TAM (2026)"]
                        }
                    ].map((card) => (
                        <div key={card.title} className="bg-surface-primary p-8 hover:bg-surface-elevated transition-colors group">
                            <h3 className="text-xs font-bold text-signal-active tracking-[0.2em] mb-6 flex items-center gap-2">
                                <div className="w-1 h-1 bg-signal-active rounded-full" />
                                {card.title}
                            </h3>
                            <ul className="space-y-3">
                                {card.metrics.map(item => (
                                    <li key={item} className="font-mono text-[10px] text-text-secondary tracking-wider flex items-center gap-3 border-l border-white/5 pl-3 group-hover:border-white/10 transition-colors">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Allocation Structure - Grid Layout */}
                <MotionLanding order={3} className="text-center mb-20">
                    <h3 className="text-[10px] text-text-muted tracking-[0.3em] mb-8">CAPITAL ALLOCATION VECTOR</h3>
                    <div className="grid grid-cols-3 gap-4 font-mono">
                        <div className="p-6 border border-border-subtle hover:border-border-strong transition-colors">
                            <div className="text-2xl text-text-primary font-light mb-2">60%</div>
                            <div className="text-[9px] text-text-muted tracking-widest">R&D / HARDENING</div>
                        </div>
                        <div className="p-6 border border-border-subtle hover:border-border-strong transition-colors">
                            <div className="text-2xl text-text-primary font-light mb-2">25%</div>
                            <div className="text-[9px] text-text-muted tracking-widest">BIZ DEV / SALES</div>
                        </div>
                        <div className="p-6 border border-border-subtle hover:border-border-strong transition-colors">
                            <div className="text-2xl text-text-primary font-light mb-2">15%</div>
                            <div className="text-[9px] text-text-muted tracking-widest">POLICY / STANDARD</div>
                        </div>
                    </div>
                </MotionLanding>

                {/* Contact Protocol */}
                <MotionLanding order={4} className="border-t border-border-subtle pt-12 flex flex-col items-center">
                    <p className="text-[10px] text-text-muted tracking-[0.2em] mb-8">COMMUNICATION CHANNELS</p>

                    <div className="flex flex-col md:flex-row items-center gap-12 font-mono text-xs tracking-widest">
                        <a href="mailto:mladen@formatdisc.hr" className="flex items-center gap-3 text-text-secondary hover:text-signal-active transition-colors">
                            <Mail className="w-4 h-4" />
                            MLADEN@FORMATDISC.HR
                        </a>
                        <span className="hidden md:inline text-white/5">|</span>
                        <a href="tel:+385915421014" className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors">
                            <Phone className="w-4 h-4" />
                            +385 91 542 1014
                        </a>
                    </div>
                </MotionLanding>
            </div>
        </div>
    );
}
