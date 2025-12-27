import React, { useEffect, useState, useMemo } from 'react';
import { useKernel } from '../../../kernel/KernelProvider';
import { AuditVerifier, AuditVerification } from '../../../kernel/monitoring/AuditVerifier';
import { KernelHealth } from '../../../kernel/monitoring/HealthService';
import { Activity, ShieldAlert, ShieldCheck, Zap, Server, BarChart3, Clock } from 'lucide-react';

export const IntrospectionPanel = () => {
    const { getHealth, audit } = useKernel();
    const [health, setHealth] = useState<KernelHealth | null>(null);
    const [verification, setVerification] = useState<AuditVerification | null>(null);

    useEffect(() => {
        const update = setInterval(() => {
            setHealth(getHealth());
            setVerification(AuditVerifier.verifyChain(audit));
        }, 1000);
        return () => clearInterval(update);
    }, [getHealth, audit]);

    if (!health) return null;

    return (
        <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <BarChart3 size={120} />
            </div>

            <h3 className="text-xs font-extrabold uppercase tracking-[0.3em] text-blue-400 mb-8 flex items-center gap-3 border-b border-white/5 pb-4">
                <Activity size={18} className="animate-pulse" />
                v12.1 Introspection Layer
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vital Signs */}
                <div className="space-y-6">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-1">Vital Signs</div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={14} className="text-yellow-500" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase">Tick Rate</span>
                            </div>
                            <div className="text-lg font-mono font-bold text-white">{health.tickRate}Hz</div>
                            <div className={`text-[9px] uppercase font-mono mt-1 ${Math.abs(health.tickRate - 60) < 2 ? 'text-green-500' : 'text-red-500'}`}>
                                Target: 60Hz
                            </div>
                        </div>

                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock size={14} className="text-blue-500" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase">Drift Loss</span>
                            </div>
                            <div className="text-lg font-mono font-bold text-white">{health.driftMs}ms</div>
                            <div className="text-[9px] text-gray-600 uppercase font-mono mt-1">Per Cycle Avg</div>
                        </div>

                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Server size={14} className="text-purple-500" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase">Mem Usage</span>
                            </div>
                            <div className="text-lg font-mono font-bold text-white">{health.memoryUsage}MB</div>
                            <div className="text-[9px] text-gray-600 uppercase font-mono mt-1">DOM/JS Heap</div>
                        </div>

                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Activity size={14} className="text-emerald-500" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase">Latency</span>
                            </div>
                            <div className="text-lg font-mono font-bold text-white">{health.providerLatency}ms</div>
                            <div className="text-[9px] text-gray-600 uppercase font-mono mt-1">AI Inference</div>
                        </div>
                    </div>
                </div>

                {/* Audit Verification */}
                <div className="space-y-6">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-1">Immutable Verification</div>
                    <div className={`p-5 rounded-xl border ${verification?.isValid ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'} transition-all`}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Hash Integrity</span>
                            {verification?.isValid ? (
                                <ShieldCheck size={20} className="text-emerald-500" />
                            ) : (
                                <ShieldAlert size={20} className="text-red-500 animate-bounce" />
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-white/5 text-[10px]">
                                <span className="text-gray-500">Chain Length</span>
                                <span className="font-mono text-white">{verification?.chainLength} Blocks</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5 text-[10px]">
                                <span className="text-gray-500">State</span>
                                <span className={`font-mono font-bold ${verification?.isValid ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {verification?.isValid ? 'VERIFIED' : 'TAMPERED'}
                                </span>
                            </div>
                            <div className="mt-4">
                                {verification?.violations.length === 0 ? (
                                    <div className="text-[9px] text-emerald-500 italic uppercase">✓ All blocks hashed and sealed correctly.</div>
                                ) : (
                                    <div className="text-[9px] text-red-400 font-mono space-y-1">
                                        {verification?.violations.slice(0, 2).map((v, i) => (
                                            <div key={i}>ERR: {v}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                        <div className="text-[9px] text-gray-600 leading-relaxed uppercase italic">
                            Uptime: {Math.floor(health.uptime / 1000)}s · Audit Frequency: {Math.round(health.auditEvents / (health.uptime / 1000))} ev/s
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
