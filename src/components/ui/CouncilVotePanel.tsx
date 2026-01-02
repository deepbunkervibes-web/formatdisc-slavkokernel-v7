/**
 * COUNCIL VOTE PANEL — Governance UI v2 (Phase 4)
 * Integrated with Policy Engine and Weighted Voting.
 */
import React, { useState, useEffect } from "react";
import { usePersona } from "../../persona/PersonaContext";
import { getProposals, castVote, submitProposal, Proposal, VoteDecision } from "../../services/councilVoting";
import { runPolicyChecks } from "../../services/policyEngine";

export const CouncilVotePanel: React.FC = () => {
  const { activePersona } = usePersona();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Mock seeding for demo purposes if empty
  useEffect(() => {
    const props = getProposals();
    if (props.length === 0) {
        // Seed a demo proposal
        submitProposal({
            type: 'UI_REGENERATION',
            title: 'Transition to Cyber-Industrial Theme',
            description: 'Update Operator dashboard to use high-contrast industrial colors for better visibility in low-light environments.',
            proposer: 'ARCHITECT',
            payload: { style: 'industrial', accent: 'amber' },
            requiredThreshold: 0.6
        });
    }
    setProposals(getProposals());
  }, [refreshTrigger]);

  const handleVote = (id: string, decision: VoteDecision) => {
    try {
        castVote(id, {
            personaId: activePersona.id || 'anon',
            role: activePersona.role || 'GUEST',
            decision,
            reasoning: 'Manual vote via console'
        });
        setRefreshTrigger(p => p + 1); // Force re-render
    } catch (e: any) {
        alert(e.message);
    }
  };

  const getPolicyStatus = (p: Proposal) => {
      const check = runPolicyChecks(p);
      return check;
  };

  return (
    <div className="w-full bg-black border border-white/10 rounded-lg p-4 font-mono">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <h3 className="text-white text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="text-xl">⚖️</span>
            Governance Control Plane
        </h3>
        <div className="text-[10px] text-zinc-500 text-right">
           <div>AUTHORITY: <span className="text-terminal-green font-bold">{activePersona.role}</span></div>
           <div>QUORUM: <span className="text-zinc-400">ACTIVE</span></div>
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
        {proposals.map(p => {
            const policyResult = getPolicyStatus(p);
            const isPolicyClean = policyResult.passed;

            return (
              <div key={p.id} className={`p-3 bg-zinc-900/40 rounded border transition-all ${
                  p.status === 'APPROVED' ? 'border-green-500/50' : 
                  p.status === 'REJECTED' ? 'border-red-500/50' : 
                  'border-white/5 hover:border-white/20'
              }`}>
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1 rounded">{p.type}</span>
                        <h4 className="text-zinc-200 text-xs font-bold">{p.title}</h4>
                    </div>
                    <p className="text-zinc-500 text-[10px] mt-1 pl-1 border-l-2 border-zinc-700">{p.description}</p>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    p.status === 'APPROVED' ? 'bg-green-900 text-green-400' :
                    p.status === 'REJECTED' ? 'bg-red-900 text-red-400' :
                    'bg-blue-900/30 text-blue-400 animate-pulse'
                  }`}>{p.status}</span>
                </div>

                {/* Policy Gate Visualizer */}
                <div className="mb-3 bg-black/50 p-2 rounded text-[10px]">
                    <div className="flex items-center justify-between mb-1">
                        <span className="opacity-60">POLICY GATES</span>
                        <span className={isPolicyClean ? "text-green-500" : "text-red-500"}>
                            {isPolicyClean ? "PASS" : "VIOLATION DETECTED"}
                        </span>
                    </div>
                    {!isPolicyClean && (
                        <div className="text-red-400 space-y-1">
                            {policyResult.violations.map((v, i) => <div key={i}>• {v}</div>)}
                        </div>
                    )}
                </div>
                
                {/* Votes Visualization */}
                <div className="space-y-1 mb-3">
                    <div className="flex h-1.5 bg-zinc-800 rounded overflow-hidden">
                        {p.votes.map((v, i) => (
                            <div key={i} 
                                className={`h-full ${v.decision === 'APPROVE' ? 'bg-green-500' : v.decision === 'REJECT' ? 'bg-red-500' : 'bg-gray-500'}`}
                                style={{ width: `${100 / (p.votes.length || 1)}%` }} // Simplified width
                            />
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-600">
                        <span>{p.votes.filter(v => v.decision === 'APPROVE').length} FOR</span>
                        <span>{p.votes.filter(v => v.decision === 'REJECT').length} AGAINST</span>
                    </div>
                </div>

                {/* Actions */}
                {p.status === 'PENDING' && (
                  <div className="flex gap-2 justify-end border-t border-white/5 pt-2">
                    <button 
                      onClick={() => handleVote(p.id, 'REJECT')}
                      className="px-3 py-1 text-[10px] bg-red-950/30 border border-red-500/30 text-red-500 hover:bg-red-900/50 transition-colors rounded uppercase"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleVote(p.id, 'APPROVE')}
                      className="px-3 py-1 text-[10px] bg-green-950/30 border border-green-500/30 text-green-500 hover:bg-green-900/50 transition-colors rounded uppercase"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            );
        })}
      </div>
    </div>
  );
};
