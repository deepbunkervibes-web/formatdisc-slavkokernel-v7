import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { simulatorEmitter } from '../../stores/simulatorStore';

export default function LazyWithRetry() {
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed' | 'success'>('idle');

  useEffect(() => {
    const unsubscribe = simulatorEmitter.subscribe((event) => {
      if (event.type === 'retry:attempted') {
        setRetryAttempts(prev => prev + 1);
        setStatus('failed');
        setTimeout(() => setStatus('idle'), 1500);
      }
    });
    return unsubscribe;
  }, []);

  const simulateLazyLoad = () => {
    setIsLoading(true);
    setStatus('loading');

    // Simulate async operation with possible failure (30% chance)
    setTimeout(() => {
      if (Math.random() > 0.7) {
        simulatorEmitter.emit('retry:attempted', {
          attempt: retryAttempts + 1,
          module: 'SimulationWorkspace.js',
          error: 'CHUNK_LOAD_FAILED'
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      }
    }, 2000);
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
      <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-bold mb-6">Import_Resilience_Monitor</h3>
      
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={simulateLazyLoad}
          disabled={isLoading}
          className={`flex items-center gap-3 px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
            isLoading ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500 hover:text-white'
          }`}
        >
          {isLoading ? (
            <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            'Trigger_Lazy_Load'
          )}
        </button>
        
        <div className="text-right">
          <div className="text-[8px] text-neutral-600 uppercase tracking-widest mb-1">Total_Retry_Events</div>
          <div className="text-2xl font-mono font-bold text-blue-500">{retryAttempts.toString().padStart(2, '0')}</div>
        </div>
      </div>

      <div className="h-12 flex items-center justify-center border border-dashed border-white/5 rounded-sm bg-black/20">
        <AnimatePresence mode="wait">
          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                />
              ))}
              <span className="text-[9px] uppercase tracking-[0.3em] ml-2 text-blue-500 font-bold">Fetching_Chunk...</span>
            </motion.div>
          )}

          {status === 'failed' && (
            <motion.div
              key="failed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 text-yellow-500"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Network_Error :: Retrying_v2</span>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 text-green-500"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Module_Loaded :: Synchronized</span>
            </motion.div>
          )}

          {status === 'idle' && (
            <div className="text-[9px] uppercase tracking-[0.3em] text-neutral-700 font-mono italic">System_Ready</div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
