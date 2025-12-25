import React, { useState, useEffect } from 'react';
import {
    Search, Filter, Download, RefreshCw, Eye, Calendar,
    Loader2, Clock, CheckCircle, XCircle, Shield
} from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { motion, AnimatePresence } from 'framer-motion';

// Types (Mirrored from API)
interface AuditLog {
    id: string;
    decisionId: string;
    timestamp: number;
    input: {
        prompt: string;
        persona: string;
        sessionId: string;
    };
    output: {
        text: string;
        route: string;
        metrics: {
            latencyMs: number;
            modelUsed: string;
        };
    };
    performance: {
        totalLatency: number;
    };
}

export function AuditRoute() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/kernel/audit');
            const data = await res.json();
            if (data.success) {
                setLogs(data.data.logs);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredLogs = logs.filter(l =>
        l.input.prompt.toLowerCase().includes(search.toLowerCase()) ||
        l.decisionId.includes(search)
    );

    return (
        <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-accentPrimary/30">
            <Navigation />

            <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                <Shield className="w-5 h-5 text-orange-400" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
                        </div>
                        <p className="text-muted-foreground max-w-2xl">
                            Immutable ledger of every kernel decision, prompt injection attempt, and model fallback.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={loadLogs}
                            disabled={loading}
                            className="flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition-colors text-sm"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh Ledger
                        </button>
                        <button className="flex items-center px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 text-neutral-300 transition-colors text-sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-8 relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-neutral-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Decision ID, Prompt content or Session..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>

                {/* Logs Table */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/5 text-neutral-500">
                                    <th className="px-6 py-4 font-medium">Timestamp</th>
                                    <th className="px-6 py-4 font-medium">Decision ID</th>
                                    <th className="px-6 py-4 font-medium">Prompt Sample</th>
                                    <th className="px-6 py-4 font-medium">Route</th>
                                    <th className="px-6 py-4 font-medium">Model</th>
                                    <th className="px-6 py-4 font-medium text-right">Latency</th>
                                    <th className="px-6 py-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4 text-neutral-400 whitespace-nowrap">
                                            {new Date(log.timestamp).toLocaleTimeString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="bg-white/5 px-2 py-1 rounded text-xs text-neutral-300 font-mono">
                                                {log.decisionId.substring(0, 8)}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-300 max-w-xs truncate">
                                            {log.input.prompt}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${log.output.route === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                {log.output.route}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-400">
                                            {log.output.metrics.modelUsed}
                                        </td>
                                        <td className="px-6 py-4 text-right text-neutral-400 font-mono">
                                            {log.performance.totalLatency}ms
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedLog(log)}
                                                className="text-neutral-500 hover:text-white transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredLogs.length === 0 && (
                        <div className="p-12 text-center text-neutral-500">
                            No logs found matching your criteria.
                        </div>
                    )}
                </div>

            </div>

            {/* Detail Modal (Simple Overlay) */}
            <AnimatePresence>
                {selectedLog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedLog(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold">Log Details</h2>
                                <button onClick={() => setSelectedLog(null)} className="text-neutral-500 hover:text-white">
                                    <XCircle className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-neutral-500 mb-2 block">System Prompt</label>
                                    <div className="p-4 bg-black rounded-xl border border-white/5 text-sm font-mono text-neutral-300 whitespace-pre-wrap">
                                        {selectedLog.input.prompt}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-wider text-neutral-500 mb-2 block">Kernel Response</label>
                                    <div className="p-4 bg-black rounded-xl border border-white/5 text-sm font-mono text-green-400/80 whitespace-pre-wrap">
                                        {selectedLog.output.text}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <DetailItem label="Session ID" value={selectedLog.input.sessionId || 'N/A'} />
                                    <DetailItem label="Persona" value={selectedLog.input.persona} />
                                    <DetailItem label="Timestamp" value={new Date(selectedLog.timestamp).toISOString()} />
                                </div>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-xs text-neutral-500 mb-1">{label}</div>
            <div className="text-sm font-medium text-neutral-200 truncate" title={value}>{value}</div>
        </div>
    )
}
