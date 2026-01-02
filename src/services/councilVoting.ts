/**
 * COUNCIL VOTING ENGINE - Phase 4 Governance
 */

export type VoteDecision = 'APPROVE' | 'REJECT' | 'ABSTAIN';

export interface CouncilVote {
  personaId: string;
  role: string;
  decision: VoteDecision;
  reasoning?: string;
  timestamp: number;
}

export interface Proposal {
  id: string;
  type: 'UI_REGENERATION' | 'SYSTEM_CONFIG' | 'POLICY_UPDATE';
  title: string;
  description: string;
  payload: any; // The diff or new config
  proposer: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'BLOCKED';
  createdAt: number;
  votes: CouncilVote[];
  requiredThreshold: number; // e.g., 0.66 for supermajority
}

const COUNCIL_WEIGHTS = {
  ARCHITECT: 5,
  INVESTOR: 3,
  OPERATOR: 2,
  ANALYST: 1,
  AUDITOR: 0, // Auditors observe, don't vote
  GUEST: 0
};

// In-memory store for demo (replace with KV in prod)
let proposals: Proposal[] = [];

export function submitProposal(proposal: Omit<Proposal, 'id' | 'status' | 'createdAt' | 'votes'>): Proposal {
  const newProposal: Proposal = {
    ...proposal,
    id: `prop_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    status: 'PENDING',
    createdAt: Date.now(),
    votes: []
  };
  
  proposals.unshift(newProposal);
  return newProposal;
}

export function castVote(proposalId: string, vote: Omit<CouncilVote, 'timestamp'>): Proposal {
  const prop = proposals.find(p => p.id === proposalId);
  if (!prop) throw new Error("Proposal not found");
  if (prop.status !== 'PENDING') throw new Error("Proposal is closed");

  // Prevent double voting
  const existingVoteIndex = prop.votes.findIndex(v => v.personaId === vote.personaId);
  if (existingVoteIndex !== -1) {
    prop.votes[existingVoteIndex] = { ...vote, timestamp: Date.now() }; // Update vote
  } else {
    prop.votes.push({ ...vote, timestamp: Date.now() });
  }

  evaluateProposalStatus(prop);
  return prop;
}

function evaluateProposalStatus(proposal: Proposal) {
  const totalWeight = Object.values(COUNCIL_WEIGHTS).reduce((a, b) => a + b, 0); // Theoretical max unused for now
  
  // Calculate current votes
  let approveWeight = 0;
  let rejectWeight = 0;

  proposal.votes.forEach(v => {
    // @ts-ignore
    const weight = COUNCIL_WEIGHTS[v.role] || 0;
    if (v.decision === 'APPROVE') approveWeight += weight;
    if (v.decision === 'REJECT') rejectWeight += weight;
  });

  const activeWeight = approveWeight + rejectWeight;
  if (activeWeight === 0) return;

  const approvalRatio = approveWeight / activeWeight;

  // Simple logic: if > threshold approving among active voters
  if (activeWeight > 5 && approvalRatio >= proposal.requiredThreshold) {
      proposal.status = 'APPROVED';
      // Trigger execution hook here
  } else if (activeWeight > 5 && approvalRatio < 0.3) {
      proposal.status = 'REJECTED';
  }
}

export function getProposals() {
    return proposals;
}
