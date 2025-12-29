export type ArtifactType = 'zip' | 'pitch_deck' | 'github' | 'supabase';

export interface IdeaProfile {
    id: string;
    founderId: string;
    confessionText: string;
    ideaScore: number;
    readinessFlag: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Artifact {
    id: string;
    ideaProfileId: string;
    type: ArtifactType;
    filePath: string;
    hash: string;
    metadata: Record<string, any>;
    createdAt: string;
}

export interface Investor {
    id: string;
    name: string;
    focusSectors: string[];
    investmentStage: string;
    geographicScope: string;
    contactEmail?: string;
    uploadUrl?: string;
    preferredFormat: string;
    createdAt: string;
}

export interface OutboundLog {
    id: string;
    ideaProfileId: string;
    investorId: string;
    initiatedBy: 'founder' | 'auto';
    sentAt: string;
    method: 'email' | 'form_submit';
    status: 'sent' | 'failed' | 'delivered';
    details: Record<string, any>;
    immutableHash: string;
}
