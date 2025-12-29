import { create } from 'zustand';
import { IdeaProfile, Artifact, Investor, OutboundLog } from '../types/outbound';

interface OutboundState {
    currentProfile: IdeaProfile | null;
    artifacts: Artifact[];
    investors: Investor[];
    logs: OutboundLog[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchProfile: (ideaId: string) => Promise<void>;
    uploadArtifact: (ideaId: string, type: string, file: File) => Promise<void>;
    connectIntegration: (ideaId: string, platform: 'github' | 'supabase', config: any) => Promise<void>;
    fetchInvestors: () => Promise<void>;
    triggerOutbound: (ideaId: string, investorIds: string[]) => Promise<void>;
    fetchLogs: (ideaId: string) => Promise<void>;
}

export const useOutboundStore = create<OutboundState>((set, get) => ({
    currentProfile: null,
    artifacts: [],
    investors: [],
    logs: [],
    isLoading: false,
    error: null,

    fetchProfile: async (ideaId) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`/api/outbound/profiles?id=${ideaId}`);
            const data = await response.json();
            set({ currentProfile: data, isLoading: false });
        } catch (err) {
            set({ error: 'Failed to fetch profile', isLoading: false });
        }
    },

    uploadArtifact: async (ideaId, type, file) => {
        set({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append('ideaId', ideaId);
            formData.append('type', type);
            formData.append('file', file);

            const response = await fetch('/api/outbound/artifacts', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            set(state => ({
                artifacts: [...state.artifacts, data.artifact],
                currentProfile: data.profile,
                isLoading: false
            }));
        } catch (err) {
            set({ error: 'Upload failed', isLoading: false });
        }
    },

    connectIntegration: async (ideaId, platform, config) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`/api/outbound/integrations/${platform}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ideaId, ...config }),
            });
            const data = await response.json();

            set(state => ({
                artifacts: [...state.artifacts, data.artifact],
                currentProfile: data.profile,
                isLoading: false
            }));
        } catch (err) {
            set({ error: `Failed to connect ${platform}`, isLoading: false });
        }
    },

    fetchInvestors: async () => {
        try {
            const response = await fetch('/api/outbound/investors');
            const data = await response.json();
            set({ investors: data });
        } catch (err) {
            set({ error: 'Failed to fetch investors' });
        }
    },

    triggerOutbound: async (ideaId, investorIds) => {
        set({ isLoading: true });
        try {
            const response = await fetch('/api/outbound/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ideaId, investorIds }),
            });
            const data = await response.json();
            set(state => ({
                logs: [...data.logs, ...state.logs],
                isLoading: false
            }));
        } catch (err) {
            set({ error: 'Outbound trigger failed', isLoading: false });
        }
    },

    fetchLogs: async (ideaId) => {
        try {
            const response = await fetch(`/api/outbound/logs?ideaId=${ideaId}`);
            const data = await response.json();
            set({ logs: data });
        } catch (err) {
            set({ error: 'Failed to fetch logs' });
        }
    }
}));
