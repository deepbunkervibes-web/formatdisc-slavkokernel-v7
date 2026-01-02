/**
 * COUNCIL VOTE PANEL — Governance UI
 * Allows authorized personas to vote on UI proposals.
 */
import React, { useState, useEffect } from "react";
import { usePersona } from "../../persona/PersonaContext";

interface Proposal {
  id: number;
  title: string;
  description: string;
  votes: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export const CouncilVotePanel: React.FC = () => {
  const { activePersona } = usePersona();
  const [proposals, setProposals] = useState<Proposal[]>([
    { id: 101, title: "Dark Mode Contrast Update", description: "Increase accessibility contrast ratios in Tailwind config.", votes: 2, status: 'PENDING' },
    { id: 102, title: "New Investor Dashboard Layout", description: "Switch to grid-based layout for KPI cards.", votes: 0, status: 'PENDING' }
  ]);

  const canVote = activePersona.role === 'ARCHITECT' || activePersona.role === 'INVESTOR';

  const handleVote = (id: number, vote: 'yes' | 'no') => {
    if (!canVote) return;
    
    setProposals(prev => prev.map(p => {
      if (p.id !== id) return p;
      const newVotes = vote === 'yes' ? p.votes + 1 : p.votes - 1;
      // Simple majority logic for demo
      const status = newVotes >= 3 ? 'APPROVED' : (newVotes <= -3 ? 'REJECTED' : 'PENDING');
      return { ...p, votes: newVotes, status };
    }));
  };

  return (
    <div className="w-full bg-black border border-white/10 rounded-lg p-4 font-mono">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <h3 className="text-white text-sm uppercase tracking-widest">Governance Council</h3>
        <div className="text-[10px] text-zinc-500">
           active_persona: <span className="text-terminal-green">{activePersona.role}</span>
        </div>
      </div>

      <div className="space-y-4">
        {proposals.map(p => (
          <div key={p.id} className="p-3 bg-zinc-900/40 rounded border border-white/5 hover:border-white/20 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-zinc-200 text-xs font-bold">{p.title}</h4>
                <p className="text-zinc-500 text-[10px] mt-1">{p.description}</p>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                p.status === 'APPROVED' ? 'bg-green-900 text-green-400' :
                p.status === 'REJECTED' ? 'bg-red-900 text-red-400' :
                'bg-yellow-900/50 text-yellow-400'
              }`}>{p.status}</span>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="text-[10px] text-zinc-400">Votes: <span className="text-white">{p.votes}</span></div>
              
              {p.status === 'PENDING' && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleVote(p.id, 'no')}
                    disabled={!canVote}
                    className="px-2 py-1 text-[10px] border border-red-500/30 text-red-500 hover:bg-red-900/20 disabled:opacity-30 rounded"
                  >
                    REJECT
                  </button>
                  <button 
                    onClick={() => handleVote(p.id, 'yes')}
                     disabled={!canVote}
                    className="px-2 py-1 text-[10px] border border-green-500/30 text-green-500 hover:bg-green-900/20 disabled:opacity-30 rounded"
                  >
                    APPROVE
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
