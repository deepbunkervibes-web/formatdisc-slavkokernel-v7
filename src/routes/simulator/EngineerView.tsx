import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Terminal as TerminalIcon, 
    Zap, 
    RefreshCcw, 
    AlertTriangle, 
    Search, 
    ChevronRight,
    Play,
    Activity
} from 'lucide-react';
import { KernelEvent, simulatorEmitter } from '../../stores/simulatorStore';
import LazyWithRetry from './LazyWithRetry';
import { Terminal } from '../../components/Terminal';

interface EngineerViewProps {
    events: KernelEvent[];
}

const EngineerView: React.FC<EngineerViewProps> = ({ events }) => {
    const [filter, setFilter] = useState<string>('');
    
    const triggerManualFallback = () => {
        simulatorEmitter.emit('fallback:triggered', { 
            reason: 'MANUAL_TEST', 
            origin: 'ENGINEER_VIEW',
            recovery_target: 'OLLAMA_LOCAL' 
        });
    };

    const triggerRegionSync = () => {
        simulatorEmitter.emit('region:validated', { 
            policy: 'eu-only', 
            nodes: ['ZAGREB_NODE_01', 'BERLIN_NODE_02'],
            status: 'CONSENSUS_REACHED'
        });
    };

    return (
        <div className="grid grid-cols-12 gap-6 h-full min-h-[700px]">
            {/* Interactive Terminal */}
            <div className="col-span-12 lg:col-span-7">
                <Terminal />
            </div>

            {/* System Controls & Event Stream */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                {/* Active Terminal Panel */}
                <div className="flex-1 bg-black border border-white/10 rounded-sm flex flex-col font-mono relative overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <TerminalIcon className="w-3 h-3 text-neutral-500" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">System_Event_Stream</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[9px] uppercase tracking-widest text-green-500">Node_Zagreb::Listening</span>
                            </div>
                            <div className="relative group">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-600 group-focus-within:text-white transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="FILTER_LOGS..." 
                                    className="bg-transparent border-none text-[10px] pl-8 focus:ring-0 w-32 uppercase tracking-widest placeholder:text-neutral-700"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
                        <AnimatePresence initial={false}>
                            {events
                                .filter(e => e.type.includes(filter.toLowerCase()) || JSON.stringify(e.payload).includes(filter))
                                .map((event, i) => (
                                <motion.div 
                                    key={event.id}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="group flex items-start gap-4 hover:bg-white/[0.02] py-1 transition-colors px-2 rounded-sm"
                                >
                                    <span className="text-neutral-700 text-[10px] shrink-0 pt-0.5">{event.timestamp.split('T')[1].split('.')[0]}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest shrink-0 pt-0.5 ${
                                        event.type.includes('fallback') ? 'text-yellow-500' : 
                                        event.type.includes('retry') ? 'text-blue-500' : 'text-neutral-500'
                                    }`}>
                                        [{event.type.replace(':', '_')}]
                                    </span>
                                    <span className="text-neutral-400 text-[10px] leading-relaxed break-all">
                                        &gt;&gt; {JSON.stringify(event.payload)}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {events.length === 0 && (
                            <div className="h-full flex items-center justify-center opacity-20 flex-col gap-4 italic uppercase tracking-[0.5em] text-xs">
                                <Activity className="w-8 h-8 animate-pulse" />
                                Waiting_for_events...
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Action Dock */}
                <div className="grid grid-cols-4 gap-4">
                    <button 
                        onClick={triggerManualFallback}
                        className="bg-yellow-500/5 border border-yellow-500/20 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all p-4 rounded-sm flex items-center justify-between group"
                    >
                        <div className="text-left">
                            <div className="text-[8px] text-yellow-500/50 uppercase tracking-widest mb-1">Testing_Protocol</div>
                            <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-[0.2em]">Manual_Fallback</div>
                        </div>
                        <AlertTriangle className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                    </button>

                    <button 
                        onClick={triggerRegionSync}
                        className="bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all p-4 rounded-sm flex items-center justify-between group"
                    >
                        <div className="text-left">
                            <div className="text-[8px] text-blue-500/50 uppercase tracking-widest mb-1">Global_Sync</div>
                            <div className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em]">Region_Consensus</div>
                        </div>
                        <RefreshCcw className="w-4 h-4 text-blue-500 group-hover:rotate-180 transition-transform duration-700" />
                    </button>

                    <button 
                         className="bg-green-500/5 border border-green-500/20 hover:border-green-500/50 hover:bg-green-500/10 transition-all p-4 rounded-sm flex items-center justify-between group col-span-2"
                    >
                        <div className="text-left font-mono">
                            <div className="text-[8px] text-green-500/50 uppercase tracking-widest mb-1">Production_Redeploy</div>
                            <div className="text-[10px] text-green-500 font-bold uppercase tracking-[0.2em]">Wrangler_Pages_Push_dist</div>
                        </div>
                        <Zap className="w-4 h-4 text-green-500 fill-green-500/20 animate-pulse" />
                    </button>
                </div>
            </div>

            {/* Diagnostics Panel */}
            <div className="col-span-12 xl:col-span-4 space-y-6 flex flex-col h-full">
                <div className="bg-white/[0.03] border border-white/5 rounded-sm p-6 flex-1 flex flex-col">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-bold mb-8">Asset_Lifecycle_Diagnostic</h3>
                    
                    <div className="space-y-8 flex-1">
                        <LazyWithRetry />

                        <div className="h-px bg-white/5" />

                        <div className="flex-1 overflow-hidden flex flex-col">
                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest mb-4">Node_Health_Telemetrics</span>
                            <div className="flex-1 space-y-4">
                                {[
                                    { node: 'ZAGREB_NODE_01', health: 100, label: 'Central_Kernel' },
                                    { node: 'BERLIN_NODE_02', health: 100, label: 'Fallback_Edge' },
                                    { node: 'FRANKFURT_NODE_03', health: 98, label: 'Audit_Vault' },
                                ].map((node, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-mono">
                                            <span className="text-neutral-400">{node.node}</span>
                                            <span className={node.health === 100 ? 'text-green-500' : 'text-blue-500'}>{node.health}%</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${node.health}%` }}
                                                className={`h-full ${node.health === 100 ? 'bg-green-500/50' : 'bg-blue-500/50'}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-white/[0.02] border border-white/10 rounded-sm">
                        <div className="flex items-center gap-3 text-[10px] text-neutral-400 uppercase tracking-widest font-mono italic">
                            <RefreshCcw className="w-3 h-3 text-blue-500 animate-spin" />
                            Auto-syncing with Cloudflare_Pages...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EngineerView;
