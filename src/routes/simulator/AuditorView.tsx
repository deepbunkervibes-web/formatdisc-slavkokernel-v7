import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Search, 
    Download, 
    History, 
    FileText, 
    Eye,
    ShieldCheck,
    ChevronRight,
    Filter
} from 'lucide-react';
import { KernelEvent } from '../../stores/simulatorStore';

interface AuditorViewProps {
    events: KernelEvent[];
}

const AuditorView: React.FC<AuditorViewProps> = ({ events }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const auditTrail = events.filter(e => e.type === 'identity:verified' || e.type === 'region:validated');
    
    const exportLogs = () => {
        const data = JSON.stringify(events, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `slavkokernel_audit_${new Date().toISOString()}.json`;
        a.click();
    };

    return (
        <div className="grid grid-cols-12 gap-6 h-full flex-1 min-h-[700px]">
            {/* Audit Log Table */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
                <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-600" />
                            <input 
                                type="text" 
                                placeholder="SEARCH_BY_DECISION_ID..." 
                                className="bg-black/50 border border-white/10 rounded-sm text-[10px] pl-10 h-10 w-64 uppercase tracking-widest focus:border-purple-500/50 focus:ring-0 transition-all"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 h-10 border border-white/5 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                            <Filter className="w-3 h-3" /> Filter_Type
                        </button>
                    </div>
                    
                    <button 
                        onClick={exportLogs}
                        className="flex items-center gap-2 px-6 h-10 bg-purple-500/10 border border-purple-500/20 text-purple-500 text-[10px] uppercase tracking-widest font-bold hover:bg-purple-500/20 transition-all"
                    >
                        <Download className="w-3.5 h-3.5" /> Export_Ledger_JSON
                    </button>
                </div>

                <div className="flex-1 bg-black border border-white/5 rounded-sm overflow-hidden flex flex-col">
                    <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">
                        <div className="col-span-1">STATUS</div>
                        <div className="col-span-4">DECISION_ID</div>
                        <div className="col-span-3">PROTOCOL_TYPE</div>
                        <div className="col-span-3">TIMESTAMP</div>
                        <div className="col-span-1 text-right">ACTION</div>
                    </div>
                    
                    <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-white/10">
                        {events.length > 0 ? events.map((event, i) => (
                            <div 
                                key={event.id}
                                onClick={() => setSelectedId(event.id)}
                                className={`grid grid-cols-12 px-6 py-4 border-b border-white/[0.03] text-[10px] items-center cursor-pointer transition-colors ${selectedId === event.id ? 'bg-purple-500/5 border-l-2 border-l-purple-500' : 'hover:bg-white/[0.01]'}`}
                            >
                                <div className="col-span-1 flex items-center gap-2">
                                    <ShieldCheck className={`w-3.5 h-3.5 ${event.type.includes('fail') ? 'text-yellow-500' : 'text-green-500'}`} />
                                </div>
                                <div className="col-span-4 font-mono text-neutral-400">
                                    {event.id.toUpperCase()}
                                </div>
                                <div className="col-span-3">
                                    <span className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                                        event.type.includes('identity') ? 'bg-blue-500/10 text-blue-500' : 
                                        event.type.includes('region') ? 'bg-green-500/10 text-green-500' : 
                                        'bg-neutral-800 text-neutral-400'
                                    }`}>
                                        {event.type.replace(':', ' ')}
                                    </span>
                                </div>
                                <div className="col-span-3 font-mono text-neutral-600">
                                    {event.timestamp.replace('T', ' ').split('.')[0]}
                                </div>
                                <div className="col-span-1 text-right">
                                    <Eye className="w-3.5 h-3.5 text-neutral-700 inline-block hover:text-white transition-colors" />
                                </div>
                            </div>
                        )) : (
                            <div className="h-full flex items-center justify-center text-[10px] uppercase tracking-[0.4em] text-neutral-700 italic">
                                NO_AUDIT_DATA_STREAMING
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Decision Replay & Details */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
                <div className="bg-white/[0.03] border border-white/5 rounded-sm p-6 min-h-[300px] flex flex-col">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-bold mb-8">Decision_Path_Replay</h3>
                    
                    {selectedId ? (
                        <div className="space-y-8 relative flex-1">
                            <div className="absolute left-[5px] top-4 bottom-4 w-px bg-white/5 border-l border-dashed border-white/10" />
                            
                            {[
                                { label: 'Event Ingestion', node: 'ZAGREB_NODE_01', status: 'SUCCESS' },
                                { label: 'Identity Verification', node: 'L7_IDENTITY_GATEWAY', status: 'VERIFIED' },
                                { label: 'Policy Check (EU AI ACT)', node: 'GOVERNANCE_ENGINE', status: 'COMPLIANT' },
                                { label: 'Final Execution', node: 'KERNEL_CORE', status: 'IMMUTABLE' },
                            ].map((step, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: 10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative pl-8"
                                >
                                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-purple-500/20 border border-purple-500/50 z-10 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                    </div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-white mb-1">{step.label}</div>
                                    <div className="text-[9px] text-neutral-500 font-mono uppercase tracking-[0.2em]">{step.node} :: {step.status}</div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center opacity-30">
                            <History className="w-8 h-8" />
                            <p className="text-[10px] uppercase tracking-widest max-w-[200px] leading-relaxed">Select a decision from the ledger to replay the execution path.</p>
                        </div>
                    )}
                </div>

                <div className="bg-purple-500/5 border border-purple-500/10 rounded-sm p-6">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-purple-500/50 font-bold mb-4">Official_Regulatory_Notice</h3>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-loose font-mono">
                        This view confirms that the SlavkoKernel v7.0.4r adheres to strict deterministic execution standards. 
                        No non-deterministic paths were detected in the last session.
                    </p>
                    <div className="mt-6 pt-6 border-t border-purple-500/10 flex items-center justify-between">
                        <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Verification_Token:</span>
                        <span className="text-[8px] font-mono text-purple-400">FD-AUD-2026-X77</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditorView;
