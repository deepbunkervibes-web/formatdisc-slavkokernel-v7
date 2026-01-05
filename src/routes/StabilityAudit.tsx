import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Radio, Zap } from 'lucide-react';
import { useKernel } from '../kernel/KernelProvider';
import { logger } from '../utils/logger';

export function StabilityAudit() {
  const { getHealth, emit } = useKernel();
  const [panicMode, setPanicMode] = useState(false);
  const [mockError, setMockError] = useState<string | null>(null);

  const simulateLatency = () => {
    emit('audit', 'stability:latency_test');
    logger.warn('Stability: Latency simulation initiated.');
  };

  const simulatePanic = () => {
    setPanicMode(true);
    setMockError('SYSTEM_PANIC: Kernel heap overflow in thread 0x4f2');
    emit('kernel', 'stability:panic_simulation');
  };

  const resetAudit = () => {
    setPanicMode(false);
    setMockError(null);
    emit('kernel', 'stability:recovery_complete');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-4 mb-4">
            <Radio className="text-green-500 animate-pulse" />
            <h1 className="text-2xl font-bold tracking-tighter uppercase">Stability Audit & Panic Laboratory</h1>
          </div>
          <p className="text-neutral-500 text-sm">
            Simulate "Sovereign Kernel" failure states to verify UI resilience and audit integrity.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Simulation Controls</h2>
            <div className="space-y-3">
              <button 
                onClick={simulateLatency}
                className="w-full flex items-center justify-between p-4 bg-neutral-900 border border-white/5 hover:border-green-500/50 transition-colors group"
              >
                <span className="text-sm">Trigger Latency Spike</span>
                <Zap className="w-4 h-4 text-neutral-600 group-hover:text-green-500" />
              </button>
              
              <button 
                onClick={simulatePanic}
                className="w-full flex items-center justify-between p-4 bg-red-950/20 border border-red-900/10 hover:border-red-500/50 transition-colors group"
              >
                <span className="text-sm text-red-500">Inject Kernel Panic</span>
                <AlertCircle className="w-4 h-4 text-red-900 group-hover:text-red-500" />
              </button>

              <button 
                onClick={resetAudit}
                className="w-full flex items-center justify-between p-4 bg-neutral-900 border border-white/5 hover:border-blue-500/50 transition-colors group"
              >
                <span className="text-sm">Clear Audit Logs & Recovery</span>
                <RefreshCw className="w-4 h-4 text-neutral-600 group-hover:text-blue-500" />
              </button>
            </div>
          </section>

          {/* Real-time Health */}
          <section className="bg-neutral-900/30 border border-white/5 p-6 rounded-sm">
            <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Kernel Telemetry</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500">Node Status:</span>
                <span className={panicMode ? 'text-red-500' : 'text-green-500'}>{panicMode ? 'PANIC' : 'HEALTHY'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500">Clock Drift:</span>
                <span>{(getHealth().driftMs ?? 0).toFixed(3)}ms</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500">Event Throughput:</span>
                <span>{getHealth().auditEvents ?? 0} tx/session</span>
              </div>
            </div>

            {mockError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px]"
              >
                <div className="font-bold mb-1 uppercase tracking-tighter">Diagnostic Data:</div>
                {mockError}
              </motion.div>
            )}
          </section>
        </div>

        {/* Audit Wall */}
        <section>
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Audit Stream</h2>
          <div className="h-64 overflow-y-auto bg-black border border-white/5 p-4 space-y-2 text-[10px] font-mono">
             <div className="text-neutral-700 italic">// Awaiting telemetry stream...</div>
             {/* This would ideally hook into real audit state displayed in AuditTrail */}
             <div className="text-green-500/50">SYSTEM_READY: Stability protocol active.</div>
          </div>
        </section>
      </div>
    </div>
  );
}
