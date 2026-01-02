import React, { useState } from 'react';
import { executeReplication } from '../../services/replication';
import { ReplicationReport } from '../../kernel/selfReplicator';

export const ReplicationPanel = () => {
  const [isSpawning, setIsSpawning] = useState(false);
  const [lastReport, setLastReport] = useState<ReplicationReport | null>(null);

  const handleSpawn = async () => {
    setIsSpawning(true);
    try {
        const report = await executeReplication({
            parentCitizenshipId: 'agent:nemotron-v3', // Architect Default
            offspringDomain: 'ui',
            rightsRequest: ['propose-ui-change', 'execute-kernel-task'],
            metadata: {
                name: 'Alpha-Fork-1',
                description: 'Autonomous UI maintenance shard'
            }
        });
        setLastReport(report);
    } catch (e: any) {
        alert(`Replication Failed: ${e.message}`);
    } finally {
        setIsSpawning(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 p-4 border border-blue-900/30 rounded text-xs">
      <h3 className="text-blue-400 font-bold uppercase mb-4 flex items-center justify-between">
        <span>SRO Replication Chamber (Phase 10)</span>
        {isSpawning && <span className="animate-spin text-lg">⚙️</span>}
      </h3>

      <div className="space-y-4">
          <p className="text-zinc-500 italic">
              Proposed Fork: <strong>Alpha-Fork-1</strong><br/>
              Target Domain: UI_FACTORY<br/>
              Consensus Status: <span className="text-green-500">QUORUM_MET (6/6)</span>
          </p>

          <button
            onClick={handleSpawn}
            disabled={isSpawning}
            className={`w-full py-2 px-4 rounded font-bold uppercase tracking-wider transition-all ${
                isSpawning 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isSpawning ? 'Initializing Ancestry...' : 'Execute Replication Pulse'}
          </button>

          {lastReport && (
              <div className="mt-4 p-2 bg-black/40 border-l-2 border-green-500 space-y-1">
                  <div className="text-green-400 font-bold">REPLICATION SUCCESS!</div>
                  <div className="text-[10px] text-zinc-400">
                    CID: {lastReport.childCitizenshipId}<br/>
                    Root: {lastReport.auditEntryId.slice(0, 32)}...
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};
