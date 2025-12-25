import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInvestorAuth } from '../context/InvestorAuthContext';
import { useNavigate } from 'react-router-dom';
import { OrchestrationWall } from '../components/investors/OrchestrationWall';
import { LineageMap } from '../components/investors/LineageMap';
import { Download, ExternalLink, Lock, FileText, ChevronRight } from 'lucide-react';
import { Navigation } from '../components/ui/Navigation';

export function InvestorPortal() {
    const { isAuthenticated, logout } = useInvestorAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('vision');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/investors');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-accent-cyan/30 selection:text-white">
            <Navigation />

            <div className="pt-24 pb-20">
                {/* Header */}
                <header className="max-w-7xl mx-auto px-6 mb-16">
                    <div className="flex justify-between items-end border-b border-neutral-800 pb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan text-[10px] font-bold tracking-wide uppercase border border-accent-cyan/20">
                                    <Lock className="w-3 h-3" />
                                    Confidential
                                </span>
                                <span className="text-neutral-500 text-xs tracking-widest uppercase">Series Seed Portal</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                                FormatDisc Data Room
                            </h1>
                        </div>
                        <button
                            onClick={logout}
                            className="text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
                        >
                            Log Out
                        </button>
                    </div>
                </header>

                {/* Main Content Grid */}
                <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Left Sidebar Navigation */}
                    <aside className="lg:col-span-1 space-y-8">
                        <nav className="space-y-1">
                            {[
                                { id: 'vision', label: 'Vision & Why Now' },
                                { id: 'market', label: 'Market & Problem' },
                                { id: 'traction', label: 'Validation ' },
                                { id: 'roadmap', label: 'Execution ' },
                                { id: 'ask', label: 'The Ask' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${activeTab === item.id
                                        ? 'bg-neutral-900 text-white border border-neutral-800 shadow-inner'
                                        : 'text-neutral-500 hover:text-white hover:bg-neutral-900/50'
                                        }`}
                                >
                                    {item.label}
                                    {activeTab === item.id && <ChevronRight className="w-4 h-4 text-accent-cyan" />}
                                </button>
                            ))}
                        </nav>

                        {/* Documents Box */}
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FileText className="w-3 h-3" />
                                Documents
                            </h3>
                            <div className="space-y-3">
                                <a href="#" className="flex items-center gap-3 group">
                                    <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors">
                                        <Download className="w-4 h-4 text-neutral-400 group-hover:text-accent-purple" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-neutral-200 group-hover:underline">Pitch Deck (Dec 2025)</div>
                                        <div className="text-[10px] text-neutral-500">PDF • 2.4 MB</div>
                                    </div>
                                </a>
                                <a href="#" className="flex items-center gap-3 group">
                                    <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors">
                                        <Download className="w-4 h-4 text-neutral-400 group-hover:text-accent-cyan" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-neutral-200 group-hover:underline">Technical Whitepaper</div>
                                        <div className="text-[10px] text-neutral-500">PDF • 1.8 MB</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="p-6 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800">
                            <h4 className="text-sm font-semibold text-white mb-2">Direct Founder Access</h4>
                            <p className="text-xs text-neutral-400 mb-4">
                                Skip the calendar. Call or WhatsApp me directly.
                            </p>
                            <a href="tel:+385916336010" className="block text-sm text-accent-cyan font-mono hover:underline mb-1">+385 91 633 6010</a>
                            <a href="mailto:mladen@formatdisc.hr" className="block text-sm text-neutral-300 font-mono hover:text-white transition-colors">mladen@formatdisc.hr</a>
                        </div>
                    </aside>

                    {/* Right Content Area */}
                    <div className="lg:col-span-3 min-h-[600px]">

                        {/* VISION TAB */}
                        {activeTab === 'vision' && (
                            <motion.section
                                key="vision"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-2xl font-semibold mb-6 text-white">Founder Statement</h2>
                                <blockquote className="border-l-2 border-accent-cyan pl-6 italic text-neutral-300 text-lg leading-relaxed mb-8">
                                    "FormatDisc nije projekt. FormatDisc je 3.000 sati sustavne, solo, neprekidne orkestracije.
                                    Nije nastao na hackathonu. Nastao je iz opsesivne potrebe da se kaos AI razvoja pretvori u deterministički inženjerski proces."
                                </blockquote>
                                <div className="prose prose-invert prose-sm text-neutral-400 leading-relaxed mb-12 max-w-none">
                                    <p>
                                        The EU AI Act is not just a regulation; it is the biggest market opportunity in enterprise software since GDPR.
                                        Companies are paralyzed by the black-box nature of LLMs. They need certainty. They need audit trails.
                                        They need <span className="text-white font-medium">SlavkoKernel</span>.
                                    </p>
                                </div>
                                <OrchestrationWall />
                                <div className="h-12" />
                                <LineageMap />
                            </motion.section>
                        )}

                        {/* MARKET TAB */}
                        {activeTab === 'market' && (
                            <motion.section
                                key="market"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-2xl font-semibold mb-8 text-white">Market & Problem: The Black Box Dilemma</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    <div className="bg-neutral-900/30 p-8 rounded-2xl border border-neutral-800">
                                        <h3 className="text-xl font-semibold text-white mb-4">The Liability</h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                                            Enterprise AI is fundamentally unauditable. Inputs vary, outputs hallucinate, and lineage is lost.
                                            Under the EU AI Act, this is a distinct liability with fines up to €35M.
                                        </p>
                                        <ul className="space-y-3 mt-6">
                                            <li className="text-sm text-red-400 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                Non-deterministic outputs
                                            </li>
                                            <li className="text-sm text-red-400 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                Wait-and-see strategy failure
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-neutral-900/30 p-8 rounded-2xl border border-neutral-800">
                                        <h3 className="text-xl font-semibold text-white mb-4">The Solution</h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                                            An infrastructure layer that wraps existing AI models to enforce determinism and capture cryptographic lineage logs.
                                        </p>
                                        <ul className="space-y-3 mt-6">
                                            <li className="text-sm text-accent-cyan flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full" />
                                                Guaranteed reproducibility
                                            </li>
                                            <li className="text-sm text-accent-cyan flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full" />
                                                Day-1 Audit Readiness
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="p-8 bg-neutral-900/20 border border-neutral-800 rounded-2xl">
                                    <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-widest mb-4">Target Market</h3>
                                    <p className="text-neutral-300 text-lg">EU-based Enterprises in Finance & Insurance (Algorithmic Trading, Claims Processing) where compliance is non-negotiable.</p>
                                </div>
                            </motion.section>
                        )}

                        {/* TRACTION TAB */}
                        {activeTab === 'traction' && (
                            <motion.section
                                key="traction"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-2xl font-semibold mb-8 text-white">Founder-Stage Validation</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl">
                                        <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center shrink-0 text-accent-purple font-bold">1</div>
                                        <div>
                                            <h3 className="text-white font-medium mb-1">3,000+ Hours Solo Engineering</h3>
                                            <p className="text-neutral-400 text-sm">The core SlavkoKernel architecture is built. Not a wrapper, but a deep infrastructure layer.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl">
                                        <div className="w-10 h-10 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0 text-accent-cyan font-bold">2</div>
                                        <div>
                                            <h3 className="text-white font-medium mb-1">Open-Source Proof of Concept</h3>
                                            <p className="text-neutral-400 text-sm">Key concepts publicly validated. Technical discussions with leaders in EU finance/insurance confirm the specific pain point.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white font-bold">3</div>
                                        <div>
                                            <h3 className="text-white font-medium mb-1">Market Signal</h3>
                                            <p className="text-neutral-400 text-sm">Positive feedback from compliance officers on the "Deterministic Execution" approach as a viable EU AI Act solution.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {/* ROADMAP TAB */}
                        {activeTab === 'roadmap' && (
                            <motion.section
                                key="roadmap"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-2xl font-semibold mb-8 text-white">18-Month Execution Plan</h2>
                                <div className="relative border-l border-neutral-800 ml-3 space-y-12 py-4">
                                    <div className="relative pl-8">
                                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent-cyan ring-4 ring-neutral-950" />
                                        <div className="text-xs font-mono text-accent-cyan mb-1">Q1-Q2 (Next 6 Months)</div>
                                        <h3 className="text-white font-medium text-lg mb-2">Harden & Pilot</h3>
                                        <p className="text-neutral-400 text-sm">Release SlavkoKernel v1.0 Production. Onboard 2-3 design partners (Paid Pilots). Finalize API docs.</p>
                                    </div>
                                    <div className="relative pl-8">
                                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-neutral-700 ring-4 ring-neutral-950" />
                                        <div className="text-xs font-mono text-neutral-500 mb-1">Q3-Q4 (6-12 Months)</div>
                                        <h3 className="text-white font-medium text-lg mb-2">Self-Hosted Enterprise</h3>
                                        <p className="text-neutral-400 text-sm">Kubernetes/Docker deployment packages. Closed beta for enterprise stability.</p>
                                    </div>
                                    <div className="relative pl-8">
                                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-neutral-700 ring-4 ring-neutral-950" />
                                        <div className="text-xs font-mono text-neutral-500 mb-1">Year 2 (12-18 Months)</div>
                                        <h3 className="text-white font-medium text-lg mb-2">Managed Cloud & Certification</h3>
                                        <p className="text-neutral-400 text-sm">SaaS MVP launch. ISO 27001 process. Automated Regulatory Reporting Dashboard.</p>
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {/* ASK TAB */}
                        {activeTab === 'ask' && (
                            <motion.section
                                key="ask"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-2xl font-semibold mb-8 text-white">The Ask: Seed Round</h2>
                                <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-accent-purple/10 p-10 rounded-2xl border border-neutral-800 text-center mb-10">
                                    <div className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-4">Capital Requirement</div>
                                    <div className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">€750,000</div>
                                    <p className="text-neutral-400">for 18-24 months of runway</p>
                                </div>

                                <h3 className="text-lg font-semibold text-white mb-6">Use of Funds</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-neutral-900/30 rounded-xl border border-neutral-800">
                                        <div className="text-3xl font-bold text-white mb-2">70%</div>
                                        <div className="text-sm font-medium text-accent-cyan uppercase tracking-wide mb-2">Engineering</div>
                                        <p className="text-xs text-neutral-400">Core Team (Rust/Go + AI/ML) to execute product roadmap.</p>
                                    </div>
                                    <div className="p-6 bg-neutral-900/30 rounded-xl border border-neutral-800">
                                        <div className="text-3xl font-bold text-white mb-2">20%</div>
                                        <div className="text-sm font-medium text-white uppercase tracking-wide mb-2">Go-to-Market</div>
                                        <p className="text-xs text-neutral-400">Dedicated resources for Pilot Partner success.</p>
                                    </div>
                                    <div className="p-6 bg-neutral-900/30 rounded-xl border border-neutral-800">
                                        <div className="text-3xl font-bold text-white mb-2">10%</div>
                                        <div className="text-sm font-medium text-neutral-400 uppercase tracking-wide mb-2">Ops & Legal</div>
                                        <p className="text-xs text-neutral-400">IP frameworks, cloud infra, company setup.</p>
                                    </div>
                                </div>
                            </motion.section>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
}
