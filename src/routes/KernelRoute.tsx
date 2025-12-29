import * as React from 'react';
import { Cpu, Lock, ShieldCheck } from 'lucide-react';



import { KernelStatus } from '../components/kernel/KernelStatus';
import { AuditTrail } from '../components/kernel/AuditTrail';
import { DeploymentControls } from '../components/kernel/DeploymentControls';
import { Terminal } from '../components/kernel/Terminal';
import { IntrospectionPanel } from '../components/kernel/introspection/IntrospectionPanel';
import { Navigation } from '../components/ui/Navigation';
import { Footer } from '../components/ui/Footer';

export function KernelRoute() {
    return (
        <div className="min-h-screen bg-[#020202] text-white flex flex-col">
            <Navigation />

            <main className="flex-1 pt-32 pb-24 container mx-auto px-4 md:px-8">
                <header className="mb-16 relative">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <ShieldCheck size={12} />
                                Regulatory Protocol v12.1
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

                            <section>
                                <IntrospectionPanel />
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>);

}