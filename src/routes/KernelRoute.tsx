import React from 'react';
import { KernelProvider } from '../kernel/KernelProvider';
import { KernelStatus } from '../components/kernel/KernelStatus';
import { AuditTrail } from '../components/kernel/AuditTrail';
import { DeploymentControls } from '../components/kernel/DeploymentControls';
import { Terminal } from '../components/kernel/Terminal';
import { Cpu, Lock, ShieldCheck } from 'lucide-react';
import { Navigation } from '../components/ui/Navigation';
import { Footer } from '../components/ui/Footer';

export function KernelRoute() {
    return (
        <KernelProvider>
            <div className="min-h-screen bg-[#020202] text-white flex flex-col">
                <Navigation />

                <main className="flex-1 pt-32 pb-24 container mx-auto px-4 md:px-8">
                    <header className="mb-16 relative">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#00ff9d] text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <ShieldCheck size={12} />
                                    Regulatory Protocol v12.0
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-emerald-500/5 shadow-2xl">
                                        <Cpu size={40} className="text-[#00ff9d]" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
                                            Slavko<span className="text-[#00ff9d]">Kernel</span>
                                        </h1>
                                        <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-widest flex items-center gap-2">
                                            <Lock size={12} className="text-blue-500" /> Secure Deterministic Execution Layer
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">System Integrity</div>
                                <div className="px-6 py-2 bg-black border border-[#00ff9d]/30 rounded-xl flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#00ff9d] shadow-[0_0_10px_#00ff9d]"></div>
                                    <span className="text-xs font-mono font-bold text-white tracking-[0.3em]">OLLAMA_ACTIVE</span>
                                </div>
                            </div>
                        </div>

                        <p className="max-w-3xl text-gray-400 text-sm leading-relaxed font-light border-l-2 border-[#00ff9d]/30 pl-6 py-2 bg-gradient-to-r from-emerald-500/5 to-transparent">
                            Welcome to the core of the FormatDisc ecosystem. The SlavkoKernel v12 architecture ensures 100% deterministic outputs
                            by synchronizing all UI and system events to a single global clock. Every action is cryptographically sealed in the
                            immutable audit trail, providing a regulator-ready proof of operation.
                        </p>
                    </header>

                    <div className="w-full">
                        <KernelStatus />

                        <div className="grid lg:grid-cols-2 gap-12 mt-12">
                            <div className="space-y-12">
                                <section>
                                    <Terminal />
                                </section>
                                <section>
                                    <DeploymentControls />
                                </section>
                            </div>

                            <div className="space-y-12">
                                <section>
                                    <AuditTrail />
                                </section>

                                <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-2xl shadow-xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-50" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#00ff9d] mb-6 flex items-center gap-3 relative z-10">
                                        <ShieldCheck size={16} />
                                        Kernel Security Policy
                                    </h3>
                                    <ul className="space-y-4 text-xs relative z-10">
                                        {[
                                            { l: 'Lifecycle', v: 'Stateful Determinism' },
                                            { l: 'Clocking', v: 'Synchronous 60Hz Vector' },
                                            { l: 'Auditing', v: 'Append-Only / Hash-Sealed' },
                                            { l: 'Auth', v: 'Kernel-Level Protocol' },
                                            { l: 'EU AI Act', v: 'Article 22 Compliant' }
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group-hover:border-white/10 transition-colors">
                                                <span className="text-gray-500 uppercase tracking-widest font-medium">{item.l}</span>
                                                <code className="text-blue-400 bg-blue-400/5 px-2 py-1 rounded border border-blue-400/10 font-bold">{item.v}</code>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 pt-6 border-t border-white/5 text-[9px] text-gray-600 uppercase tracking-widest leading-relaxed">
                                        This interface communicates directly with the local LLM inference router.
                                        Integrity is maintained via per-tick state snapshots.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </KernelProvider>
    );
}
