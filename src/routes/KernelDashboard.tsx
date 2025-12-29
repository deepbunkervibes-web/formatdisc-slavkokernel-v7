import { Cpu, Lock } from 'lucide-react';

import { KernelProvider } from '../kernel/KernelProvider';
import { KernelStatus } from '../components/kernel/KernelStatus';
import { KernelTerminal } from '../components/kernel/KernelTerminal';
import { AuditTrail } from '../components/kernel/AuditTrail';
import { DeploymentControls } from '../components/kernel/DeploymentControls';

export function KernelDashboard() {
    console.log("KernelDashboard: Mounting...");
    return (
        <KernelProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white p-4 md:p-8">
                <header className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#00ff9d] blur-xl opacity-20"></div>
                                <Cpu size={32} className="relative text-[#00ff9d]" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    FORMATDISC <span className="text-[#00ff9d]">×</span> SLAVKOKERNEL
                                </h1>
                                <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                                    <Lock size={12} />
                                    v12 · Deterministic Kernel Architecture
                                </div>
                            </div>
                        </div>

                        <div className="text-xs px-4 py-2 border border-white/10 rounded-full bg-black/40">
                            <span className="text-gray-400">Mode:</span>{' '}
                            <span className="text-[#00ff9d] font-medium">Regulatory Enforced</span>
                        </div>
                    </div>

                    <div className="max-w-4xl text-gray-400 text-sm leading-relaxed">
                        Infrastructure wearing a UI. Every component synchronized to the kernel&apos;s deterministic clock.
                        No rogue timers. No flicker. Append-only audit log with cryptographic sealing.
                    </div>
                </header>

                <main className="max-w-6xl mx-auto">
                    <KernelStatus />

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <KernelTerminal />
                            <AuditTrail />
                        </div>

                        <div className="space-y-8">
                            <DeploymentControls />

                            <div className="glass p-6 rounded-xl">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00ff9d] mb-4">
                                    Kernel Manifest
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-gray-400">Lifecycle</span>
                                        <code className="text-[#00ff9d]">init → ready</code>
                                    </li>
                                    <li className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-gray-400">Clock Resolution</span>
                                        <code className="text-[#00ff9d]">16ms (60Hz)</code>
                                    </li>
                                    <li className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-gray-400">Audit Policy</span>
                                        <code className="text-[#00ff9d]">Append-Only</code>
                                    </li>
                                    <li className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-gray-400">Hash Algorithm</span>
                                        <code className="text-[#00ff9d]">SHA-256</code>
                                    </li>
                                    <li className="flex items-center justify-between py-2">
                                        <span className="text-gray-400">Compliance</span>
                                        <code className="text-[#00ff9d]">EU AI Act §</code>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mt-16 pt-8 border-t border-white/10 text-xs text-gray-500">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                Deterministic Kernel-Driven Architecture · All UI events synchronized to kernel tick
                            </div>
                            <div className="text-[#00ff9d]">
                                FORMATDISC_CLI v12
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </KernelProvider>
    );
}
