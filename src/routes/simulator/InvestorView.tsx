import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComplianceBadge } from '../../components/ui/ComplianceBadge';
import { KernelStatusIndicator } from '../../components/ui/KernelStatusIndicator';
import { MilestoneTimeline } from '../../components/ui/MilestoneTimeline';
import { AuditLedgerSummary } from '../../components/ui/AuditLedgerSummary';
import { RegionPolicyIndicator } from '../../components/ui/RegionPolicyIndicator';
import { H100OptimizationIndicator } from '../../components/ui/H100OptimizationIndicator';
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

export const InvestorView: React.FC<InvestorViewProps> = ({ metrics }) => {
    const [kernelMetrics, setKernelMetrics] = useState({
        version: 'v7.0.4r',
        uptime: metrics.uptime,
        decisionsProcessed: 1287,
        auditLogs: 42,
        complianceScore: 100,
        region: metrics.region,
        h100Optimized: true,
        lastUpdated: new Date().toISOString(),
    });

    useEffect(() => {
        // Simulate real-time metric updates
        const interval = setInterval(() => {
            setKernelMetrics(prev => ({
                ...prev,
                decisionsProcessed: prev.decisionsProcessed + Math.floor(Math.random() * 3),
                auditLogs: prev.auditLogs + (Math.random() > 0.7 ? 1 : 0),
                lastUpdated: new Date().toISOString(),
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString('hr-HR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-black uppercase tracking-tight"
                >
                    🏛️ <span className="text-green-500">Institutional</span> Overview
                </motion.h2>
                <KernelStatusIndicator status="STABLE" />
            </div>

            {/* Kernel Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-bold mb-6">Kernel_Engine</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Version</span>
                            <span className="text-sm font-mono font-bold">{kernelMetrics.version}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Uptime</span>
                            <span className="text-sm font-mono font-bold text-green-500">{kernelMetrics.uptime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Decisions_Processed</span>
                            <span className="text-sm font-mono font-bold">{kernelMetrics.decisionsProcessed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Last_Updated</span>
                            <span className="text-[10px] font-mono text-blue-500">{formatDate(kernelMetrics.lastUpdated)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-bold mb-6">Compliance_Status</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">EU_AI_Act</span>
                            <ComplianceBadge status="VERIFIED" />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Region_Policy</span>
                            <RegionPolicyIndicator region={kernelMetrics.region} />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">H100_Optimization</span>
                            <H100OptimizationIndicator optimized={kernelMetrics.h100Optimized} />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Compliance_Score</span>
                            <span className="text-sm font-mono font-bold text-green-500">{kernelMetrics.complianceScore}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Milestone Timeline */}
            <MilestoneTimeline />

            {/* Audit Ledger Summary */}
            <AuditLedgerSummary
                logsCount={kernelMetrics.auditLogs}
                decisionsProcessed={kernelMetrics.decisionsProcessed}
            />

            {/* Institutional Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <AnimatePresence>
                    {[
                        { icon: '✓', label: 'EU AI Act', sublabel: 'Verified', color: 'green' },
                        { icon: '🌍', label: 'EU-Only', sublabel: 'Enforced', color: 'blue' },
                        { icon: '⚡', label: 'H100', sublabel: 'Optimized', color: 'purple' },
                        { icon: '🔒', label: 'Audit', sublabel: 'Proof', color: 'green' },
                    ].map((badge, index) => (
                        <motion.div
                            key={badge.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/[0.02] border border-white/5 p-4 rounded-sm flex flex-col items-center hover:bg-white/[0.04] transition-colors"
                        >
                            <div className={`w-12 h-12 bg-${badge.color}-500/10 border border-${badge.color}-500/20 rounded-full flex items-center justify-center mb-3`}>
                                <span className={`text-${badge.color}-500 text-xl`}>{badge.icon}</span>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-center">{badge.label}</span>
                            <span className={`text-[10px] text-${badge.color}-500 text-center uppercase tracking-wider mt-1`}>{badge.sublabel}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InvestorView;
