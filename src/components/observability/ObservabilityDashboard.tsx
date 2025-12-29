import { Activity, ShieldCheck, Zap } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useObservabilitySSE } from '../../lib/sseClient';
import { useObsStore } from '../../stores/observabilityStore';
import { StatusBadge } from '../ui/StatusBadge';
import { AnomalyTimeline } from './AnomalyTimeline';
import { CorrelationGraph } from './CorrelationGraph';
import { LiveAlertsTicker } from './LiveAlertsTicker';
import { ServiceHealthHeatmap } from './ServiceHealthHeatmap';

// Static seed data moved outside to satisfy purity constraints
const STATIC_THROUGHPUT_SEED = Array.from({ length: 40 }).map(() => Math.floor(Math.random() * 100));

export default function ObservabilityDashboard() {
    // Connect to stream
    useObservabilitySSE();

    const addFindings = useObsStore(s => s.addFindings);

    // Mock Data Injector for Demo (if no backend stream)
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const services = ['auth-layer', 'kernel-core', 'inference-engine', 'audit-ledger', 'payment-gateway', 'outbound-bot'];
                const severities = ['low', 'medium', 'high', 'critical'] as const;

                const service = services[Math.floor(Math.random() * services.length)];
                const severity = severities[Math.floor(Math.random() * severities.length)];

                addFindings({
                    id: Math.random().toString(36),
                    service,
                    severity,
                    message: `Anomaly detected in ${service} latency`,
                    confidence: Math.floor(Math.random() * 50) + 50,
                    timestamp: new Date().toISOString()
                });
            }
        }, 2000); // Inject every 2s

        return () => clearInterval(interval);
    }, [addFindings]);


    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-cyan-500/30">
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <ShieldCheck className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-3xl font-black tracking-tight font-mono">SIGNAL PRIMITIV</h1>
                    </div>
                    <p className="text-gray-400 max-w-lg">
                        Real-time forensic observability and monotonic audit stream for SlavkoKernel&trade; infrastructure.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <StatusBadge status="SYSTEM ONLINE" variant="active" animate />
                    <div className="text-right">
                        <div className="text-xs text-gray-500 font-mono">UPTIME</div>
                        <div className="text-xl font-bold font-mono">99.998%</div>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Ticker - Full Width */}
                <div className="lg:col-span-12">
                    <LiveAlertsTicker />
                </div>

                {/* Left Column - Health & Graph */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ServiceHealthHeatmap />
                        <CorrelationGraph />
                    </div>

                    <div className="bg-gray-900/40 rounded-2xl p-6 border border-gray-800 mt-2">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold flex items-center gap-2">
                                <Activity className="w-4 h-4 text-cyan-400" />
                                SYSTEM THROUGHPUT
                            </h3>
                            <div className="text-xs text-cyan-500 px-2 py-1 bg-cyan-950/30 rounded border border-cyan-500/20">LIVE</div>
                        </div>
                        {/* Mock Chart Area */}
                        <div className="h-32 flex items-end space-x-1">
                            {STATIC_THROUGHPUT_SEED.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-cyan-700/50 hover:bg-cyan-400 transition-colors rounded-t-sm"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Timeline */}
                <div className="lg:col-span-4">
                    <AnomalyTimeline />

                    <div className="mt-6 bg-yellow-900/10 border border-yellow-700/30 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-yellow-500 mb-2 font-bold text-sm">
                            <Zap className="w-4 h-4" />
                            RECOMMENDED ACTIONS
                        </div>
                        <ul className="space-y-2 text-xs text-yellow-200/80">
                            <li>&bull; Scale &quot;inference-engine&quot; replicas (load &gt; 85%)</li>
                            <li>&bull; Verify &quot;auth-layer&quot; rate limits</li>
                            <li>&bull; Rotate JWT keys (scheduled: 2h)</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
