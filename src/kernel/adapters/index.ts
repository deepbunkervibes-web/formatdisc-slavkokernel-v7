/**
 * ADAPTER ROUTER — Single Source of Truth for Kernel Agents
 */
import { nemotronAdapter } from "./nemotronAdapter";
import { frontendGenerator } from "./frontendGenerator";

export { nemotronAdapter, frontendGenerator };

// Mock adapters for demo (replace with real one as needed)
export const llamaAdapter = async () => ({ agent: 'llama2', output: 'Mock Llama Output', timestamp: Date.now(), audit: { model: 'llama2', reasoning: 'internal', mode: 'deterministic' } });
export const geminiAdapter = async () => ({ agent: 'gemini', output: 'Mock Gemini Output', timestamp: Date.now(), audit: { model: 'gemini', reasoning: 'internal', mode: 'deterministic' } });
export const grokAdapter = async () => ({ agent: 'grok', output: 'Mock Grok Output', timestamp: Date.now(), audit: { model: 'grok', reasoning: 'internal', mode: 'deterministic' } });

export const adapters = {
  nemotron: nemotronAdapter,
  "frontend-generator": frontendGenerator,
  llama2: llamaAdapter,
  gemini: geminiAdapter,
  grok: grokAdapter
} as const;
