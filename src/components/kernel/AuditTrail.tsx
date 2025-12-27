import React from 'react';
import { useKernel } from '../../kernel/KernelProvider';
import { CheckCircle, Hash, Clock, User } from 'lucide-react';

export const AuditTrail = () => {
    const { audit, resetAudit } = useKernel();

    return (
        <div className="mt-12 border border-white/10 backdrop-blur-xl rounded-xl p-6 bg-gradient-to-br from-black/40 to-gray-900/20 shadow-xl overflow-hidden relative">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00ff9d] flex items-center gap-2">
                    <Hash size={16} />
                    Audit Trail
                    <span className="text-xs text-gray-400">({audit.length} events)</span>
                </h3>
                <button
                    onClick={resetAudit}
                    className="text-xs px-3 py-1 border border-white/10 rounded hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                >
                    Clear
                </button>
            </div>

            <div className="max-h-96 overflow-y-auto custom-scrollbar">
                <ul className="space-y-4">
                    {audit.length === 0 ? (
                        <li className="text-gray-500 text-sm italic py-8 text-center border border-dashed border-white/5 rounded-lg">
                            No audit events recorded. Kernel in stasis.
                        </li>
                    ) : (
                        audit.slice().reverse().map((e) => (
                            <li
                                key={e.id}
                                className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#00ff9d]/20 transition-all group"
                            >
                                <div className="mt-1">
                                    <CheckCircle size={14} className="text-[#00ff9d] flex-shrink-0" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1 uppercase tracking-tighter">
                                            <Clock size={10} />
                                            {new Date(e.ts).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                            })}
                                        </span>

                                        <span className="text-white/70 text-[11px] font-bold flex items-center gap-1 uppercase tracking-widest">
                                            <User size={10} className="text-blue-400" />
                                            {e.actor}
                                        </span>

                                        <span className="text-[#00ff9d] text-[10px] bg-[#00ff9d]/10 px-2 py-0.5 rounded border border-[#00ff9d]/20 font-bold uppercase">
                                            {e.action}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded border border-white/5 group-hover:border-[#00ff9d]/10 transition-colors">
                                        <code className="text-xs text-gray-500 font-mono truncate flex-1 block">
                                            {e.hash}
                                        </code>
                                        <span className="text-[10px] text-gray-600 font-mono shrink-0">
                                            [{e.hash.substring(0, 8)}]
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};
