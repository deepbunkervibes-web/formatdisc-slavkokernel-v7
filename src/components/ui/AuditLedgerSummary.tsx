import { motion } from 'framer-motion';

type AuditLedgerSummaryProps = {
  logsCount: number;
  decisionsProcessed: number;
};

export const AuditLedgerSummary = ({ logsCount, decisionsProcessed }: AuditLedgerSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.02] border border-white/5 p-6 rounded-sm"
    >
      <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-bold mb-6">Audit_Ledger_Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 border border-white/5 p-4 rounded-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-neutral-500 uppercase tracking-widest">Immutable_Logs</span>
            <span className="text-lg font-bold font-mono text-green-500">{logsCount}</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-green-500/50 h-2 rounded-full"
              style={{ width: `${Math.min((logsCount / 100) * 100, 100)}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((logsCount / 100) * 100, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="bg-black/40 border border-white/5 p-4 rounded-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-neutral-500 uppercase tracking-widest">Decisions_Executed</span>
            <span className="text-lg font-bold font-mono text-blue-500">{decisionsProcessed}</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-blue-500/50 h-2 rounded-full"
              style={{ width: `${Math.min((decisionsProcessed / 5000) * 100, 100)}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((decisionsProcessed / 5000) * 100, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
