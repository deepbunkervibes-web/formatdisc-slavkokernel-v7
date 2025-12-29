import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Rocket,
    Shield,
    Zap,
    Github,
    Database,
    Upload,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Search,
    Mail,
    Lock
} from 'lucide-react';
import { useOutboundStore } from '../stores/outboundStore';
import { useKernel } from '../kernel/KernelProvider';

export function LaunchpadRoute() {
    const {
        currentProfile,
        artifacts,
        investors,
        logs,
        isLoading,
        fetchProfile,
        uploadArtifact,
        connectIntegration,
        fetchInvestors,
        triggerOutbound,
        fetchLogs
    } = useOutboundStore();

    const { state: kernelState } = useKernel();
    const ideaId = 'founder-confession'; // Default for demo

    const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProfile(ideaId);
        fetchInvestors();
        fetchLogs(ideaId);
    }, []);

    const handleZipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) uploadArtifact(ideaId, 'zip', file);
    };

    const handleOutbound = async () => {
        if (selectedInvestors.length === 0) return;
        await triggerOutbound(ideaId, selectedInvestors);
        setSelectedInvestors([]);
    };

    const filteredInvestors = investors.filter(inv =>
        inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.focusSectors.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
                                Outbound Engine v1.0
                            </div>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <div className="text-[10px] text-white/40 font-mono tracking-widest uppercase">
                                Governed Deployment
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">MISSION <span className="text-cyan-400 font-mono">LAUNCHPAD</span></h1>
                        <p className="text-white/40 text-sm mt-2 max-w-xl">
                            The infrastructure layer for high-quality idea deployment. Verify signals, match with capital, and initiate secure outbound.
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className={`px-6 py-3 rounded-xl border transition-all ${currentProfile?.readinessFlag
                                ? 'bg-emerald-500/10 border-emerald-500/20'
                                : 'bg-white/5 border-white/10'
                            }`}>
                            <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${currentProfile?.readinessFlag ? 'bg-emerald-400' : 'bg-white/20'
                                    }`} />
                                <div>
                                    <div className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Kernel Readiness</div>
                                    <div className={`text-lg font-bold font-mono ${currentProfile?.readinessFlag ? 'text-emerald-400' : 'text-white/60'
                                        }`}>
                                        {currentProfile?.ideaScore ? (currentProfile.ideaScore * 10).toFixed(0) : '00'}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Artifacts & Integrations */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Artifact Management */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xs font-mono font-bold tracking-widest uppercase mb-6 flex items-center">
                                <Shield className="w-3 h-3 mr-2 text-cyan-400" />
                                Artifact Integration
                            </h3>

                            <div className="space-y-4">
                                {/* ZIP Upload */}
                                <label className="block">
                                    <div className="group relative bg-[#0a0a0a] border border-dashed border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer overflow-hidden">
                                        <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative flex flex-col items-center text-center">
                                            <Upload className="w-6 h-6 text-white/40 mb-2 group-hover:text-cyan-400 transition-colors" />
                                            <span className="text-xs font-medium">Upload Source ZIP</span>
                                            <span className="text-[10px] text-white/40 font-mono mt-1">FOR SIGNAL EXTRACTION</span>
                                        </div>
                                        <input type="file" className="hidden" accept=".zip" onChange={handleZipUpload} />
                                    </div>
                                </label>

                                {/* Integrations Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => connectIntegration(ideaId, 'github', { repoUrl: 'https://github.com/example/kernel-v7' })}
                                        className="flex flex-col items-center justify-center p-4 bg-[#0a0a0a] border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all"
                                    >
                                        <Github className="w-5 h-5 text-white/60 mb-2" />
                                        <span className="text-[10px] font-mono tracking-widest uppercase">Connect GitHub</span>
                                    </button>
                                    <button
                                        onClick={() => connectIntegration(ideaId, 'supabase', {})}
                                        className="flex flex-col items-center justify-center p-4 bg-[#0a0a0a] border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all"
                                    >
                                        <Database className="w-5 h-5 text-emerald-400/60 mb-2" />
                                        <span className="text-[10px] font-mono tracking-widest uppercase">Connect Supabase</span>
                                    </button>
                                </div>
                            </div>

                            {/* Artifact List */}
                            <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
                                <h4 className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Synced Artifacts</h4>
                                {artifacts.length === 0 && (
                                    <div className="text-[10px] text-white/20 italic">No artifacts uploaded.</div>
                                )}
                                {artifacts.map((art) => (
                                    <div key={art.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded bg-[#0a0a0a] flex items-center justify-center">
                                                {art.type === 'zip' ? <Zap className="w-4 h-4 text-amber-400" /> : <Github className="w-4 h-4 text-white" />}
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-medium uppercase font-mono">{art.type} Artifact</div>
                                                <div className="text-[9px] text-white/40 font-mono truncate max-w-[120px]">{art.filePath}</div>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Outbound Logs */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xs font-mono font-bold tracking-widest uppercase mb-6 flex items-center">
                                <Lock className="w-3 h-3 mr-2 text-white/40" />
                                Immutable Audit Trail
                            </h3>
                            <div className="space-y-4">
                                {logs.length === 0 && (
                                    <div className="text-xs text-white/20 text-center py-4 italic">No outbound logs.</div>
                                )}
                                {logs.map((log) => (
                                    <div key={log.id} className="space-y-2">
                                        <div className="flex items-center justify-between text-[9px] font-mono">
                                            <span className="text-white/40">{new Date(log.sentAt).toLocaleTimeString()}</span>
                                            <span className="text-emerald-400 uppercase tracking-tighter">Verified</span>
                                        </div>
                                        <div className="p-2 rounded bg-black/40 border-l border-emerald-500/50">
                                            <div className="text-[10px] text-white/80 font-mono uppercase">
                                                Outbound to {investors.find(i => i.id === log.investorId)?.name || 'Investor'}
                                            </div>
                                            <div className="text-[8px] text-white/20 font-mono truncate mt-1">
                                                HASH: {log.immutableHash}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Investor Matching & Launch */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div>
                                    <h2 className="text-xl font-bold">Investor <span className="text-white/40">Matching</span></h2>
                                    <p className="text-sm text-white/40 mt-1">Selecting strategic partners based on Kernel evaluation.</p>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        type="text"
                                        placeholder="Filter by sector or name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors w-64"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredInvestors.map((investor) => (
                                    <motion.div
                                        key={investor.id}
                                        whileHover={{ y: -2 }}
                                        onClick={() => {
                                            setSelectedInvestors(prev =>
                                                prev.includes(investor.id)
                                                    ? prev.filter(id => id !== investor.id)
                                                    : [...prev, investor.id]
                                            )
                                        }}
                                        className={`p-5 rounded-xl border transition-all cursor-pointer ${selectedInvestors.includes(investor.id)
                                                ? 'bg-cyan-500/10 border-cyan-500/50 ring-1 ring-cyan-500/50'
                                                : 'bg-[#0a0a0a] border-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="font-bold tracking-tight">{investor.name}</h4>
                                                <div className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-1">
                                                    {investor.investmentStage} // {investor.geographicScope}
                                                </div>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selectedInvestors.includes(investor.id)
                                                    ? 'bg-cyan-500 border-cyan-500'
                                                    : 'border-white/10'
                                                }`}>
                                                {selectedInvestors.includes(investor.id) && <CheckCircle2 className="w-3 h-3 text-black" />}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {investor.focusSectors.map(sector => (
                                                <span key={sector} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-white/60 font-mono uppercase">
                                                    {sector}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Launch Action */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center space-x-4">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                    <div className="text-xs text-white/40 max-w-sm">
                                        By clicking Launch, you authorize the secure transmission of pitch artifacts and founder confession data to the selected recipients.
                                    </div>
                                </div>

                                <button
                                    disabled={selectedInvestors.length === 0 || isLoading || !currentProfile?.readinessFlag}
                                    onClick={handleOutbound}
                                    className={`group relative flex items-center space-x-3 px-8 py-4 rounded-xl font-bold transition-all overflow-hidden ${selectedInvestors.length > 0 && currentProfile?.readinessFlag && !isLoading
                                            ? 'bg-cyan-500 text-black hover:scale-105 active:scale-95'
                                            : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                                        }`}
                                >
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20" />
                                    <Rocket className={`w-5 h-5 ${selectedInvestors.length > 0 ? 'animate-bounce' : ''}`} />
                                    <span className="tracking-widest uppercase">Initiate Outbound</span>
                                    {selectedInvestors.length > 0 && (
                                        <span className="ml-2 px-2 py-0.5 rounded bg-black/10 text-[10px]">{selectedInvestors.length}</span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Readiness Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <Shield className="w-4 h-4 text-emerald-400" />
                                    <h3 className="text-xs font-mono font-bold tracking-widest uppercase">Verified Readiness</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40">Founder Logic Integrity</span>
                                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40">Technical Signal Mapping</span>
                                        {artifacts.length > 0 ? (
                                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                        ) : (
                                            <div className="w-3 h-3 rounded-full border border-white/10" />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40">Market Alignment Score</span>
                                        <span className="text-[10px] font-mono text-emerald-400">OPTIMAL</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <Zap className="w-4 h-4 text-cyan-400" />
                                    <h3 className="text-xs font-mono font-bold tracking-widest uppercase">Outbound Velocity</h3>
                                </div>
                                <div className="flex items-end justify-between h-16">
                                    {[20, 45, 30, 80, 50, 90, 100].map((h, i) => (
                                        <div key={i} className="w-4 bg-cyan-500/20 rounded-t overflow-hidden">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                className="w-full bg-cyan-400"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-[10px] text-white/20 font-mono mt-4 flex justify-between">
                                    <span>T-7D</span>
                                    <span>LIVE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center"
                    >
                        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-6" />
                        <h2 className="text-xl font-mono font-bold tracking-[0.2em] uppercase transition-all animate-pulse">
                            Processing Signals...
                        </h2>
                        <p className="text-white/40 font-mono text-xs mt-2 uppercase tracking-widest">
                            Encrypting Handshakes // Verifying Hash Integrity
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
