import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Terminal, 
    ShieldCheck, 
    Activity, 
    Globe, 
    Lock,
    Cpu
} from 'lucide-react';
import { simulatorEmitter, KernelEvent, SimulatorMode } from '../stores/simulatorStore';
import { KERNEL_VERSION, REGION_POLICY } from '../protocol/slavkoProtocol';

// Placeholder sub-components (to be implemented next)
const InvestorView = React.lazy(() => import('./simulator/InvestorView'));
const EngineerView = React.lazy(() => import('./simulator/EngineerView'));
const AuditorView = React.lazy(() => import('./simulator/AuditorView'));

const InstitutionalSimulator: React.FC = () => {
    const [mode, setMode] = useState<SimulatorMode>('INVESTOR');
    const [events, setEvents] = useState<KernelEvent[]>([]);
    const [systemStatus, setSystemStatus] = useState<'NOMINAL' | 'SYNCING'>('NOMINAL');

    useEffect(() => {
        const unsubscribe = simulatorEmitter.subscribe((event) => {
            setEvents(prev => [event, ...prev].slice(0, 100));
            setSystemStatus('SYNCING');
            setTimeout(() => setSystemStatus('NOMINAL'), 1000);
        });

        // Emit boot event
        simulatorEmitter.emit('identity:verified', { user: 'ADMIN_INSTITUTIONAL', access: 'FULL_L7' });

        return unsubscribe;
    }, []);

    const metrics = useMemo(() => ({
        eventCount: events.length,
        lastEvent: events[0]?.type || 'WAITING_FOR_INPUT',
        uptime: '99.99%',
        region: REGION_POLICY
    }), [events]);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-green-500/20 overflow-hidden flex flex-col">
            {/* Top Navigation Bar - Institutional Protocol */}
            <header className="border-b border-white/5 bg-black/50 backdrop-blur-md z-50">
                <div className="max-w-[1800px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500/10 border border-green-500/20 rounded-sm flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                                <h1 className="text-xs font-bold uppercase tracking-[0.3em]">Institutional_Simulator</h1>
                                <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Kernel_v7_Bridge :: {KERNEL_VERSION}</p>
                            </div>
                        </div>

                        <nav className="flex items-center gap-1 bg-white/[0.02] p-1 border border-white/5 rounded-sm ml-8">
                            <button 
                                onClick={() => setMode('INVESTOR')}
                                className={`px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'INVESTOR' ? 'bg-green-500/10 text-green-500' : 'text-neutral-500 hover:text-white'}`}
                            >
                                <LayoutDashboard className="w-3 h-3" /> Investor
                            </button>
                            <button 
                                onClick={() => setMode('ENGINEER')}
                                className={`px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'ENGINEER' ? 'bg-blue-500/10 text-blue-500' : 'text-neutral-500 hover:text-white'}`}
                            >
                                <Terminal className="w-3 h-3" /> Engineer
                            </button>
                            <button 
                                onClick={() => setMode('AUDITOR')}
                                className={`px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'AUDITOR' ? 'bg-purple-500/10 text-purple-500' : 'text-neutral-500 hover:text-white'}`}
                            >
                                <Activity className="w-3 h-3" /> Auditor
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 text-[9px] font-mono border-r border-white/10 pr-6 uppercase tracking-widest overflow-hidden max-w-[300px]">
                            <span className="text-neutral-500">Live_Feed:</span>
                            <span className="text-green-500 animate-pulse">{systemStatus}</span>
                            <span className="text-neutral-600 truncate">{metrics.lastEvent}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-3 h-3 text-neutral-500" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{REGION_POLICY}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-auto pt-8 px-8 pb-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="max-w-[1700px] mx-auto w-full h-full"
                    >
                        <React.Suspense fallback={
                            <div className="h-full flex items-center justify-center">
                                <div className="text-green-500 font-mono text-[10px] tracking-[0.5em] animate-pulse uppercase">Syncing_Partition...</div>
                            </div>
                        }>
                            {mode === 'INVESTOR' && <InvestorView metrics={metrics} events={events} />}
                            {mode === 'ENGINEER' && <EngineerView events={events} />}
                            {mode === 'AUDITOR' && <AuditorView events={events} />}
                        </React.Suspense>
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer - Determinism Proof */}
            <footer className="h-10 border-t border-white/5 bg-black/80 flex items-center px-6 justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-green-500/50" />
                        <span className="text-[9px] text-neutral-600 font-mono uppercase tracking-widest">L7_Identity_Boundary::ACTIVE</span>
                    </div>
                    <div className="w-px h-3 bg-white/10" />
                    <div className="flex items-center gap-2">
                        <Cpu className="w-3 h-3 text-blue-500/50" />
                        <span className="text-[9px] text-neutral-600 font-mono uppercase tracking-widest">H100_Latency_Simulation::STABLE</span>
                    </div>
                </div>
                <div className="text-[9px] text-neutral-700 font-mono uppercase tracking-widest">
                    SYSTEM_STABILITY_INDEX: 99.98% // NO_DRIFT_DETECTED
                </div>
            </footer>
        </div>
    );
};

export default InstitutionalSimulator;
