import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { registerFusionHandler } from '../../fusion/fusionEngine';
import { FusionEvent } from '../../fusion/fusionTypes';

// Institutional Component
export default function FusionConsole() {
  const [events, setEvents] = useState<FusionEvent[]>([]);

  useEffect(() => {
    // Subscribe to the Fusion Bus
    registerFusionHandler((event) => {
      setEvents((prev) => [event, ...prev].slice(0, 50)); // Keep last 50
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8 pt-24">
      <header className="mb-8 border-b border-green-900 pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-widest">Fusion Layer Console</h1>
        <div className="text-sm opacity-60">Live Nervous System Telemetry • <span className="text-green-400">ONLINE</span></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Stream */}
        <div className="md:col-span-2">
          <h2 className="text-xl border-b border-green-800 mb-4 pb-2">Event Stream (Real-time)</h2>
          <div className="space-y-2">
            {events.length === 0 && (
              <div className="opacity-40 italic">Waiting for signal...</div>
            )}
            {events.map((evt) => (
              <motion.div 
                key={evt.message.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-green-950/20 border border-green-900/50 p-3 rounded text-xs flex items-start gap-3 hover:bg-green-900/20 transition-colors"
              >
                <div className="bg-green-900 text-green-100 px-1 rounded uppercase text-[10px] w-16 text-center shrink-0">
                  {evt.route.channel}
                </div>
                <div className="flex-1">
                  <div className="font-bold flex justify-between">
                    <span>{evt.message.intent}</span>
                    <span className="opacity-40">{evt.message.timestamp.split('T')[1].replace('Z','')}</span>
                  </div>
                  <div className="opacity-70 mt-1 break-all">
                    ID: {evt.message.id.slice(0, 8)}... | Payload: {JSON.stringify(evt.message.payload).slice(0, 80)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Stats / Heatmap Placeholder */}
        <div>
          <h2 className="text-xl border-b border-green-800 mb-4 pb-2">Channel Heatmap</h2>
          <div className="bg-green-950/10 border border-green-900/30 p-4 rounded h-64 flex items-center justify-center">
            <div className="text-center opacity-50">
              <div className="text-4xl mb-2">📡</div>
              <div>Signal Analysis Module</div>
              <div className="text-[10px] mt-2">v1.1 Placeholder</div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl border-b border-green-800 mb-4 pb-2">System Health</h2>
             <div className="space-y-4">
               <div>
                 <div className="text-xs uppercase opacity-60 mb-1">Fusion Engine</div>
                 <div className="h-2 bg-green-900 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 w-full animate-pulse"></div>
                 </div>
               </div>
               <div>
                 <div className="text-xs uppercase opacity-60 mb-1">Zero Drift Enforcement</div>
                 <div className="h-2 bg-green-900 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 w-full"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
