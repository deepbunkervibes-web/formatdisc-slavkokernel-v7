import { CheckCircle, Hash, Clock, User } from 'lucide-react';

import { useKernel } from '../../kernel/KernelProvider';

export const AuditTrail = () => {
    const { audit, resetAudit } = useKernel();

    return (
        <div className="mt-12 border border-white/10 backdrop-blur-xl rounded-xl p-6 bg-gradient-to-br from-black/40 to-gray-900/20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00ff9d] flex items-center gap-2">
                    <Hash size={16} />
                    Audit Trail
                    <span className="text-xs text-gray-400">({audit.length} events)</span>
                </h3>
                <button
                    onClick={resetAudit}
                    className="text-xs px-3 py-1 border border-white/10 rounded hover:bg-white/5 transition-colors"
                >
                    Clear
                </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
                <ul className="space-y-2">
                    {audit.length === 0 ? (
                        <li className="text-gray-500 text-sm italic py-4 text-center">
                            No audit events recorded
                        </li>
                    ) : (
                        audit.slice().reverse().map((e) => (
                            <li
                                key={e.id}
                                className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <CheckCircle size={14} className="text-[#00ff9d] flex-shrink-0 mt-0.5" />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(e.ts).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                            })}
                                        </span>

                                        <span className="text-white/90 text-sm font-medium flex items-center gap-1">
                                            <User size={12} />
                                            {e.actor}
                                        </span>

                                        <span className="text-[#00ff9d]/80 text-sm bg-[#00ff9d]/10 px-2 py-0.5 rounded">
                                            {e.action}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <code className="text-xs text-gray-500 font-mono truncate flex-1">
                                            {e.hash}
                                        </code>
                                        <span className="text-xs text-gray-600">
                                            {e.hash.substring(0, 8)}...
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