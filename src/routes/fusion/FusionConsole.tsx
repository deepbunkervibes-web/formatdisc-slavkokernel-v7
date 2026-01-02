import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { registerFusionHandler } from '../../fusion/fusionEngine';
import { FusionEvent } from '../../fusion/fusionTypes';
import { NeuralBus } from '../../kernel/neuralBus'; // Corrected path

// Institutional Component
import { CouncilVotePanel } from '../../components/ui/CouncilVotePanel';
import { LiveRuntimeRenderer } from '../../components/ui/LiveRuntimeRenderer';

const NeuralActivityLog = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
        setLogs(prev => [e.detail, ...prev].slice(0, 20));
    };
    window.addEventListener('NEURAL_SYNAPSE_FIRED', handler);
    return () => window.removeEventListener('NEURAL_SYNAPSE_FIRED', handler);
  }, []);

  if (logs.length === 0) return <div className="text-zinc-600 italic">Network silent. Waiting for synapse...</div>;

  return (
    <>
      {logs.map((log) => (
        <div key={log.id} className="flex gap-2 border-l-2 border-blue-500/30 pl-2">
           <span className="text-blue-400 font-bold w-16">{log.type}</span>
           <span className="text-zinc-500">{log.senderId.split(':')[1]}</span>
           <span className="text-zinc-600">→</span>
           <span className="text-zinc-300">{log.targetId === 'BROADCAST' ? '*' : log.targetId.split(':')[1]}</span>
        </div>
      ))}
    </>
  );
};

export default function FusionConsole() {
  const [events, setEvents] = useState<FusionEvent[]>([]);

  useEffect(() => {
    // Subscribe to the Fusion Bus
    registerFusionHandler((event) => {
      setEvents((prev) => [event, ...prev].slice(0, 50)); // Keep last 50
    });

    // SIMULATION: Igniting the Neural Bus
    setTimeout(() => {
        NeuralBus.dispatch({ type: 'HEARTBEAT', senderId: 'agent:nemotron-3-nano', targetId: 'BROADCAST', payload: { status: 'ONLINE' } });
    }, 1000);

    setTimeout(() => {
        NeuralBus.dispatch({ type: 'QUERY', senderId: 'agent:policy-engine', targetId: 'agent:nemotron-3-nano', payload: { query: 'report_status' } });
    }, 2500);

    setTimeout(() => {
        NeuralBus.dispatch({ type: 'COMMAND', senderId: 'agent:nemotron-3-nano', targetId: 'agent:frontend-generator', payload: { cmd: 'prepare_workspace' } });
    }, 4500);

  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8 pt-24">
      <header className="mb-8 border-b border-green-900 pb-4 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold uppercase tracking-widest">Fusion Layer Console</h1>
           <div className="text-sm opacity-60">Live Nervous System Telemetry • <span className="text-green-400">ONLINE</span></div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Stream & Governance */}
        <div className="md:col-span-2 space-y-8">
           
           {/* Governance Control Plane */}
           <div>
              <h2 className="text-xl border-b border-green-800 mb-4 pb-2">Governance Control Plane (Phase 3)</h2>
              <CouncilVotePanel />
           </div>

           {/* Event Stream */}
           <div>
            <h2 className="text-xl border-b border-green-800 mb-4 pb-2">Event Stream (Real-time)</h2>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
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
        </div>

        {/* Right: Live Preview & Stats */}
        <div className="space-y-8">
          
          {/* Neural Bus Monitor (MCL) */}
          <div className="bg-zinc-900/20 p-4 border border-green-900/30 rounded">
             <h2 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
               Neural Bus Activity (ACL/MCL)
             </h2>
             <div className="h-40 overflow-y-auto font-mono text-[10px] space-y-1">
                <NeuralActivityLog />
             </div>
          </div>

          {/* AI Factory Output */}
          <div className="bg-zinc-900/20 p-4 border border-green-900/30 rounded">
             <h2 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               AI UI Factory Preview
             </h2>
             <LiveRuntimeRenderer />
          </div>

          <div>
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
               <div>
                 <div className="text-xs uppercase opacity-60 mb-1">Council Quorum</div>
                 <div className="h-2 bg-green-900 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 w-[66%]"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
