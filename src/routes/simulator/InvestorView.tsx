import React from 'react';
import { motion } from 'framer-motion';
import { 
    TrendingUp, 
    ShieldCheck, 
    Zap, 
    FileJson, 
    CheckCircle2,
    Lock
} from 'lucide-react';
import { KernelEvent } from '../../stores/simulatorStore';

interface InvestorViewProps {
    metrics: {
        eventCount: number;
        lastEvent: string;
        uptime: string;
        region: string;
    };
    events: KernelEvent[];
}

const InvestorView: React.FC<InvestorViewProps> = ({ metrics }) => {
    return (
        <div className="grid grid-cols-12 gap-6 h-full content-start">
            {/* Value Proposition & Compliance Header */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-32 h-32" />
                    </div>
                    <h2 className="text-3xl font-bold uppercase tracking-tight mb-4 leading-none">
                        Kernel_Engine <span className="text-green-500">v7.0.4r</span>
                    </h2>
                    <p className="text-neutral-400 text-lg font-light max-w-2xl leading-relaxed">
                        Deterministic AI orchestration for institutional-grade reliability. 
                        Zero visual drift, immutable audit trails, and L7 identity boundaries verified.
                    </p>
                    
                    <div className="grid grid-cols-4 gap-4 mt-12">
                        {[
                            { label: 'Uptime', value: metrics.uptime, icon: Zap, color: 'text-yellow-500' },
                            { label: 'Compliance', value: 'EU AI ACT', icon: ShieldCheck, color: 'text-green-500' },
                            { label: 'Security', value: 'L7 BOUNDARY', icon: Lock, color: 'text-blue-500' },
                            { label: 'Throughput', value: 'H100_OPT', icon: FileJson, color: 'text-purple-500' },
                        ].map((stat, i) => (
                            <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <stat.icon className={`w-3 h-3 ${stat.color}`} />
                                    <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">{stat.label}</span>
                                </div>
                                <div className="text-sm font-bold uppercase tracking-wider">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance History Grid */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-white/[0.01] border border-white/5 rounded-sm">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            Operational_Stability_Metrics
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Inference Consistency', value: '99.99%', trend: '+0.01%' },
                                { label: 'Cross-Region Latency', value: '42ms', trend: '-2ms' },
                                { label: 'L7 Verification Speed', value: '0.8ms', trend: 'OPTIMAL' },
                            ].map((m, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-sm border border-white/[0.03]">
                                    <span className="text-xs text-neutral-400 uppercase tracking-wider">{m.label}</span>
                                    <div className="text-right underline decoration-green-500/30 underline-offset-4 decoration-2">
                                        <div className="text-sm font-bold text-white">{m.value}</div>
                                        <div className="text-[8px] text-green-500 font-mono">{m.trend}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-white/[0.01] border border-white/5 rounded-sm">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold mb-6 flex items-center gap-3">
                            Official_Certification_Badges
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {[
                                'EU_AI_ACT_V1', 'ISO_27001_L7', 'DETERMINISTIC_V7', 'H100_NATIVE', 'OIB_VERIFIED'
                            ].map((badge, i) => (
                                <div key={i} className="px-3 py-2 bg-green-500/5 border border-green-500/20 text-green-500 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3" /> {badge}
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-green-500/[0.02] border border-dashed border-green-500/10 rounded-sm text-center">
                            <p className="text-[10px] italic text-neutral-500 uppercase tracking-widest">Digital certification verified by Zagreb_Node_01</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar - Quick Recap */}
            <div className="col-span-12 lg:col-span-4 h-full">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-sm h-full sticky top-0">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-bold mb-8">Institutional_Recap</h3>
                    <div className="space-y-8">
                        <div>
                            <div className="text-[8px] text-neutral-600 uppercase tracking-widest mb-4">Foundation_Date</div>
                            <div className="text-xl font-bold uppercase tracking-widest">2026.01.15</div>
                        </div>
                        <div className="h-px bg-white/5 w-full" />
                        <div>
                            <div className="text-[8px] text-neutral-600 uppercase tracking-widest mb-4">Sovereignty_Index</div>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-black text-green-500 tracking-tighter leading-none">100</span>
                                <span className="text-neutral-500 text-xs font-bold mb-1 uppercase tracking-widest">/ PERCENT</span>
                            </div>
                        </div>
                        <div className="h-px bg-white/5 w-full" />
                        <div>
                            <div className="text-[8px] text-neutral-600 uppercase tracking-widest mb-4">Asset_Health</div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
                                    <span className="text-neutral-400">Main_Bundle</span>
                                    <span className="text-green-500">42KB</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[42%]" />
                                </div>
                                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest pt-2">
                                    <span className="text-neutral-400">Hydration_Target</span>
                                    <span className="text-blue-500">380ms</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[75%]" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-12 bg-black border border-white/10 p-4 rounded-sm text-center">
                            <button className="w-full py-4 px-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-neutral-200 transition-colors">
                            Request_Audit_Token
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorView;
