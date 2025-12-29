import * as React from 'react';
import { motion } from 'framer-motion';

import { useObservabilitySSE } from '@/lib/sseClient';
import { ServiceHealthHeatmap } from '@/components/observability/ServiceHealthHeatmap';
import { AnomalyTimeline } from '@/components/observability/AnomalyTimeline';
import { CorrelationGraph } from '@/components/observability/CorrelationGraph';
import { LiveAlertsTicker } from '@/components/observability/LiveAlertsTicker';

export function ObservabilityRoute() {
  // Connect to SSE stream
  useObservabilitySSE();

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,241,217,0.1)_0%,transparent_70%)] pointer-events-none" />

            <header className="flex flex-col gap-4 relative z-10">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 tracking-tight">
                        SLAVKOKERNEL™ OBSERVER
                    </h1>
                    <p className="text-cyan-500/80 font-mono text-xs md:text-sm tracking-[0.2em] uppercase mt-2">
                        Live Neural Monitoring System v1.0
                    </p>
                </div>
                <LiveAlertsTicker />
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6">
          
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-white/90 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-cyan-500 rounded-sm"></span>
                            ANOMALY STREAM
                        </h2>
                        <AnomalyTimeline />
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 text-white/90 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-purple-500 rounded-sm"></span>
                            CORRELATION MATRIX
                        </h2>
                        <CorrelationGraph />
                    </section>
                </motion.div>

                <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6">
          
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-white/90 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-sm"></span>
                            HEALTH STATUS
                        </h2>
                        <ServiceHealthHeatmap />
                    </section>

                    {/* Placeholder for future module */}
                    <div className="bg-gray-900/40 border border-white/5 rounded-2xl p-6 h-64 flex items-center justify-center text-center">
                        <div className="space-y-2 opacity-50">
                            <div className="text-4xl">🔮</div>
                            <div className="text-sm font-mono text-cyan-300">PREDICTIVE ENGINE<br />OFFLINE</div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>);

}