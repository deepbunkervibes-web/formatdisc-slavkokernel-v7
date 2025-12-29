import { Link } from 'react-router-dom';
import { ExternalLink, Download, Mail, Phone, ArrowRight } from 'lucide-react';

import { MotionLanding, MotionInvestorCard } from '../components/motion/MotionTemplates';

export function InvestorsRoute() {
    return (
        <div className="min-h-screen bg-slate-950 pt-16 uppercase font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Hero */}
                <MotionLanding order={1} className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                        INVESTOR{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            DATA ROOM
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-slate-400 max-w-3xl mx-auto tracking-widest leading-relaxed">
                        TECHNICAL DEEP-DIVE // MARKET ANALYSIS // INVESTMENT MATERIALS
                        FOR FORMATDISC — THE INFRASTRUCTURE LAYER FOR EU AI ACT COMPLIANCE.
                    </p>
                </MotionLanding>

                {/* Data Room Access */}
                <MotionLanding order={2} className="mb-16">
                    <div className="bg-black border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-center relative z-10">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                <Download className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">COMPLETE INVESTMENT PACKAGE [V1.0]</h2>
                            <p className="text-slate-500 mb-8 max-w-2xl mx-auto text-xs tracking-widest leading-loose">
                                DOWNLOAD COMPREHENSIVE MATERIALS INCLUDING TECHNICAL ARCHITECTURE,
                                MARKET ANALYSIS, FINANCIAL PROJECTIONS, AND FOUNDER BACKGROUND.
                            </p>
                            <a
                                href="mailto:mladen@formatdisc.hr?subject=Request%20for%20Investor%20Data%20Room%20Access"
                                className="inline-flex items-center space-x-3 bg-white text-black px-10 py-4 rounded-sm text-sm font-bold hover:bg-cyan-400 transition-all transform hover:-translate-y-1 shadow-[0_5px_15px_rgba(255,255,255,0.1)]"
                            >
                                <span>REQUEST ACCESS</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <p className="text-[10px] text-slate-600 mt-6 tracking-[0.3em]">
                                (PRIVATE REPOSITORY. VERIFICATION REQUIRED.)
                            </p>
                        </div>
                    </div>
                </MotionLanding>

                {/* Key Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        {
                            title: "THE OPPORTUNITY",
                            items: [
                                "MAX FINES: €35M OR 7% GAT",
                                "HIGH-RISK AI SYSTEM SURGE",
                                "EMERGING GOVERNANCE MARKET",
                                "ROLLOUT START: FEB 2025"
                            ]
                        },
                        {
                            title: "OUR SOLUTION",
                            items: [
                                "INFRASTRUCTURE LEVEL",
                                "ZERO MODEL REPLACEMENT",
                                "DETERMINISTIC LAYER",
                                "NATIVE REG-ALIGNMENT"
                            ]
                        },
                        {
                            title: "ASK & ALLOCATION",
                            items: [
                                "€750K SEED // 18-MONTH",
                                "70% ENG & PRODUCT",
                                "20% GTM & PILOTS",
                                "10% OPS & LEGAL"
                            ]
                        }
                    ].map((card, i) => (
                        <MotionLanding key={card.title} order={3 + i * 0.5} className="h-full">
                            <article className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/5 p-8 hover:border-white/20 transition-colors h-full">
                                <h3 className="text-sm font-bold text-cyan-400 mb-6 tracking-[0.2em]">{card.title}</h3>
                                <ul className="text-[11px] text-slate-400 space-y-4 font-mono leading-relaxed">
                                    {card.items.map(item => (
                                        <li key={item} className="flex gap-2">
                                            <span className="text-white/20">/</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </MotionLanding>
                    ))}
                </div>

                {/* Contact */}
                <MotionLanding order={5} className="text-center bg-white/5 rounded-2xl border border-white/5 p-12">
                    <h2 className="text-xl font-bold text-white mb-8 tracking-widest">BUILDING THE FUTURE OF TRUSTED AI</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
                        <a
                            href="mailto:mladen@formatdisc.hr"
                            className="flex items-center space-x-3 text-cyan-400 hover:text-white transition-all group"
                        >
                            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-xs tracking-widest">MLADEN@FORMATDISC.HR</span>
                        </a>
                        <div className="hidden sm:block w-px h-4 bg-white/10" />
                        <a
                            href="tel:+385915421014"
                            className="flex items-center space-x-3 text-white/60 hover:text-white transition-all group"
                        >
                            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-xs tracking-widest">+385 91 542 1014</span>
                        </a>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                        <p className="text-[10px] text-slate-500 tracking-[0.2em]">EXISTING INVESTORS</p>
                        <Link
                            to="/investors/login"
                            className="text-xs text-white/40 hover:text-cyan-400 transition-colors flex items-center gap-2"
                        >
                            <span>SECURE PORTAL LOGIN</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </MotionLanding>
            </div>
        </div>
    );
}
