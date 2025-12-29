import * as React from 'react';import { useState } from 'react';
import { CheckCircle, Hash, Clock, User, AlignLeft, Activity, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useKernel, AuditEntry } from '../../kernel/KernelProvider';

export const AuditTrail = () => {
  const { audit, resetAudit } = useKernel();
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAudit = audit.filter((e) =>
  searchQuery === '' ||
  e.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
  e.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
  e.hash.includes(searchQuery) ||
  e.metadata?.prompt && e.metadata.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-12 border border-white/10 backdrop-blur-xl rounded-xl p-6 bg-gradient-to-br from-black/40 to-gray-900/20 shadow-xl overflow-hidden relative">

            {/* Action Details Modal */}
            <AnimatePresence>
                {selectedEntry &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedEntry(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          
                        <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
                            <div className="p-6 border-b border-neutral-800 flex items-center justify-between sticky top-0 bg-neutral-900/95 backdrop-blur z-10">
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Hash className="text-accent-cyan" size={20} />
                                        Audit Record
                                    </h3>
                                    <p className="text-xs font-mono text-neutral-500 mt-1 uppercase tracking-wider">{selectedEntry.id}</p>
                                </div>
                                <button
                onClick={() => setSelectedEntry(null)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-neutral-400 hover:text-white">
                
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
                                {/* Core Metadata Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Actor</p>
                                        <p className="text-white font-mono font-medium">{selectedEntry.actor}</p>
                                    </div>
                                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Action</p>
                                        <p className="text-accent-cyan font-mono font-medium">{selectedEntry.action}</p>
                                    </div>
                                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Timestamp</p>
                                        <p className="text-neutral-300 font-mono text-sm">
                                            {new Date(selectedEntry.ts).toISOString()}
                                        </p>
                                    </div>
                                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Hash</p>
                                        <p className="text-neutral-400 font-mono text-[10px] break-all leading-tight">
                                            {selectedEntry.hash}
                                        </p>
                                    </div>
                                </div>

                                {/* Custom Metadata (if any) */}
                                {selectedEntry.metadata &&
              <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-2">Operational Metadata</h4>

                                        {selectedEntry.metadata.model &&
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                                                <span className="text-neutral-500">Model:</span>
                                                <code className="bg-white/10 px-2 py-0.5 rounded text-xs">{selectedEntry.metadata.model}</code>
                                            </div>
                }

                                        {selectedEntry.metadata.latency !== undefined &&
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                                                <span className="text-neutral-500">Latency:</span>
                                                <code className="text-accent-cyan">{selectedEntry.metadata.latency}ms</code>
                                            </div>
                }

                                        {selectedEntry.metadata.prompt &&
                <div className="bg-black/50 rounded-lg p-4 border border-white/5">
                                                <p className="text-[10px] uppercase text-neutral-500 mb-2 flex items-center gap-2">
                                                    <AlignLeft size={10} />
                                                    Prompt
                                                </p>
                                                <pre className="text-xs text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed">
                                                    {selectedEntry.metadata.prompt}
                                                </pre>
                                            </div>
                }

                                        {selectedEntry.metadata.response &&
                <div className="bg-black/50 rounded-lg p-4 border border-white/5">
                                                <p className="text-[10px] uppercase text-neutral-500 mb-2 flex items-center gap-2">
                                                    <Activity size={10} />
                                                    Response
                                                </p>
                                                <pre className="text-xs text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed">
                                                    {selectedEntry.metadata.response}
                                                </pre>
                                            </div>
                }
                                    </div>
              }
                            </div>
                        </motion.div>
                    </motion.div>
        }
            </AnimatePresence>

            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00ff9d] flex items-center gap-2">
                    <Hash size={16} />
                    Audit Trail
                    <span className="text-xs text-gray-400">({audit.length} events)</span>
                    <span className="flex h-2 w-2 relative ml-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] text-red-500 tracking-widest animate-pulse">LIVE</span>
                </h3>
                <div className="flex gap-2 items-center">
                    <input
            type="text"
            placeholder="Search ledger..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent-cyan/50 w-32 focus:w-48 transition-all" />
          
                    <button
            onClick={() => {
              const headers = ['ID', 'Timestamp', 'Actor', 'Action', 'Hash', 'Metadata'];
              const rows = audit.map((e) => [
              e.id,
              new Date(e.ts).toISOString(),
              e.actor,
              e.action,
              e.hash,
              JSON.stringify(e.metadata || {})].
              map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','));

              const csv = [headers.join(','), ...rows].join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `slavkokernel_audit_${Date.now()}.csv`;
              a.click();
              window.URL.revokeObjectURL(url);
            }}
            className="text-xs px-3 py-1 border border-white/10 rounded hover:bg-white/5 transition-colors text-accent-cyan hover:text-[#00ff9d] font-mono uppercase tracking-wider flex items-center gap-1">
            
                        <AlignLeft size={10} /> Export CSV
                    </button>
                    <button
            onClick={resetAudit}

            className="text-xs px-3 py-1 border border-white/10 rounded hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
            
                        Clear Ledger
                    </button>
                </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                <ul className="space-y-3">
                    {filteredAudit.length === 0 ?
          <li className="text-gray-500 text-sm italic py-8 text-center border border-dashed border-white/5 rounded-lg">
                            {searchQuery ? 'No matching events found.' : 'No audit events recorded. Kernel in stasis.'}
                        </li> :

          filteredAudit.slice().reverse().map((e, index, arr) => {
            // Check if session ID changed relative to the next item (since we are reversed)
            const nextItem = arr[index + 1];
            const isNewSession = e.sessionId && (!nextItem || nextItem.sessionId !== e.sessionId);

            return (
              <React.Fragment key={e.id}>
                                    {isNewSession &&
                <li className="flex items-center gap-4 py-2">
                                            <div className="h-px bg-white/10 flex-1"></div>
                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full bg-white/5">
                                                Session: {e.sessionId?.substring(0, 8)}...
                                            </span>
                                            <div className="h-px bg-white/10 flex-1"></div>
                                        </li>
                }
                                    <li
                  onClick={() => setSelectedEntry(e)}
                  className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#00ff9d]/30 hover:bg-white/[0.04] transition-all group cursor-pointer">
                  
                                        <div className="mt-1">
                                            <CheckCircle size={14} className="text-[#00ff9d] flex-shrink-0" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1 uppercase tracking-tighter" title={new Date(e.ts).toISOString()}>
                                                    <Clock size={10} />
                                                    {new Date(e.ts).toLocaleTimeString()}
                                                </span>

                                                <span className="text-white/70 text-[11px] font-bold flex items-center gap-1 uppercase tracking-widest">
                                                    <User size={10} className="text-blue-400" />
                                                    {e.actor}
                                                </span>

                                                <span className="text-[#00ff9d] text-[10px] bg-[#00ff9d]/10 px-2 py-0.5 rounded border border-[#00ff9d]/20 font-bold uppercase">
                                                    {e.action}
                                                </span>

                                                {e.metadata?.latency &&
                      <span className="text-[9px] text-neutral-500 font-mono border border-neutral-800 px-1 rounded">
                                                        {e.metadata.latency}ms
                                                    </span>
                      }
                                            </div>

                                            <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded border border-white/5 group-hover:border-[#00ff9d]/10 transition-colors">
                                                <code className="text-[10px] text-gray-500 font-mono truncate flex-1 block">
                                                    {e.hash}
                                                </code>
                                                <Info size={12} className="text-neutral-600 group-hover:text-[#00ff9d] transition-colors" />
                                            </div>

                                            {/* Prompt Preview Snippet */}
                                            {e.metadata?.prompt &&
                    <div className="mt-2 text-[10px] text-neutral-500 font-mono truncate opacity-60 group-hover:opacity-100 transition-opacity">
                                                    &gt; {e.metadata.prompt.substring(0, 60)}...
                                                </div>
                    }
                                        </div>
                                    </li>
                                </React.Fragment>);

          })
          }
                </ul>
            </div>
        </div>);

};