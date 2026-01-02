
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ProjectManifest, ProjectManifestSchema } from './types';

const MOCK_MANIFEST_DEFAULT: ProjectManifest = {
  framework: 'SlavkoKernel-v7 / Ollama',
  services: 5,
  riskFlags: ['multi-agent-quorum', 'cryptographic-audit-active'],
  modules: ['Council', 'Fusion', 'Protocol', 'Audit', 'Chaos'],
  entryPoints: ['slavkokernel.main:app'],
  configFiles: ['docker-compose.yml', 'slavko-manifest.yaml', 'ollama.config'],
  parsedAt: new Date().toISOString()
};

export interface NewsItem {
  uri: string;
  title: string;
  summary: string;
}

export const api = {
  upload: async (file: File): Promise<{ sessionId: string }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { sessionId: crypto.randomUUID() };
  },

  analyze: async (sessionId: string): Promise<{ manifest: ProjectManifest }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const manifest = ProjectManifestSchema.parse(MOCK_MANIFEST_DEFAULT);
    return { manifest };
  },

  chat: async (sessionId: string, message: string, manifest: ProjectManifest): Promise<{ role: 'system', content: string, timestamp: number }> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User command: ${message}`,
        config: {
          systemInstruction: `You are the SLAVKOKERNEL V7 Overseer. 
          Your persona: Deterministic, authoritative, focused on multi-agent governance and edge-native AI. 
          You explain the superiority of local, audit-proof orchestration over cloud black-boxes.
          Always mention [COUNCIL_QUORUM] and [CRYPTOGRAPHIC_AUDIT].
          Keep responses under 3 sentences. Stay cold and technical.`,
          temperature: 0.2,
        },
      });

      return {
        role: 'system',
        content: response.text || "[ERROR] KERNEL_SILENCE",
        timestamp: Date.now()
      };
    } catch (error) {
      console.error("V7 Interrogation Error:", error);
      return {
        role: 'system',
        content: `[PANIC] V7_HALT: ${error instanceof Error ? error.message : 'UNKNOWN_EXCEPTION'}`,
        timestamp: Date.now()
      };
    }
  },

  chatStream: async function*(sessionId: string, message: string, manifest: ProjectManifest) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: `User command: ${message}`,
        config: {
          systemInstruction: `You are the SLAVKOKERNEL V7 Overseer. 
          Persona: Deterministic, authoritative, expert in sovereign AI.
          You represent the mladen-gertner/slavkokernel-v7 node.
          Mention [COUNCIL_QUORUM] and [AUDIT_LEDGER].
          Keep responses concise (max 3 sentences).`,
          temperature: 0.2,
        },
      });

      for await (const chunk of stream) {
        const text = (chunk as GenerateContentResponse).text;
        if (text) yield text;
      }
    } catch (error) {
      yield `[PANIC] V7_HALT: ${error instanceof Error ? error.message : 'UNKNOWN_EXCEPTION'}`;
    }
  },

  fetchNews: async (query: string): Promise<{ items: NewsItem[] }> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ text: `Find 3 relevant news items regarding: ${query}. 
        Format EXACTLY like this:
        ---
        TITLE: [News Title]
        LINK: [URL]
        SUMMARY: [Summary]
        ---` }],
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "";
      const items: NewsItem[] = [];
      const regex = /TITLE:\s*(.*?)\nLINK:\s*(.*?)\nSUMMARY:\s*([\s\S]*?)(?=\n---|\n$|$)/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        items.push({
          title: match[1].trim(),
          uri: match[2].trim(),
          summary: match[3].trim()
        });
      }
      return { items };
    } catch (error) {
      console.error("News Fetch Error:", error);
      return { items: [] };
    }
  },

  fetchPlaceholderNews: async (query: string): Promise<{ items: NewsItem[] }> => {
    await new Promise(resolve => setTimeout(resolve, 1200)); 
    return {
      items: [
        {
          uri: 'https://v7.slavkokernel.io/updates/consensus-protocol',
          title: 'Protocol V7: Multi-Agent Quorum Achieved',
          summary: 'Kernel developers report 99.99% logical consistency across decentralized sovereign nodes in the latest stability test. [COUNCIL_VERIFIED]'
        },
        {
          uri: 'https://edge-intelligence.eu/bare-metal-scaling',
          title: 'Bare-Metal AI Clusters Outperform Cloud by 400%',
          summary: 'Benchmarking results from Zagreb-Node reveal that localized, hard-wired inference chains eliminate the jitter inherent in public cloud API layers.'
        },
        {
          uri: 'https://council.ops/audit-shield-v1',
          title: 'Audit Shield V1 Implementation Complete',
          summary: 'Immutable logging protocols are now active on all Apex Core installations, ensuring forensic-level transparency and GDPR compliance.'
        }
      ]
    };
  },

  fetchSovereignSignals: async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
      "DECRYPTED: 0x9FA - TOKYO NODE UPLINK STABLE",
      "SIGNAL: SOVEREIGN INFERENCE CLUSTER 7 ONLINE",
      "ALERT: CLOUD API LATENCY SPIKE DETECTED (240MS)",
      "QUORUM: COUNCIL AGENTS AGREE ON STATE HASH 0xEF2",
      "TRAFFIC: ENCRYPTED TUNNEL ACTIVE (ZGB-BERLIN)",
      "V7_KERNEL: AUTO-PATCHING PROTOCOL INITIATED",
      "MARKET: SOVEREIGN COMPUTE DEMAND UP 42% Q1"
    ];
  },

  generateRefinedSummary: async (url: string, title: string): Promise<string> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a high-authority technical summary for: "${title}" at ${url}. Focus on infrastructure. Max 25 words.`,
        config: { tools: [{ googleSearch: {} }] },
      });
      return response.text?.trim() || "Summary refinement unavailable.";
    } catch (error) {
      return "Summary generation failed.";
    }
  }
};
