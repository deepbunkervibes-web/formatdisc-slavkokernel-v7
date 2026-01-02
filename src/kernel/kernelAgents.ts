/**
 * KERNEL AGENT REGISTRY — SlavkoKernel v7
 */

import { nemotronAdapter } from "./adapters/nemotronAdapter";

// Whitelist of allowed agents
export const allowedAgents = ["llama2", "gemini", "grok", "nemotron"] as const;

export const kernelAgents = {
  // Other adapters would be imported here
  nemotron: nemotronAdapter
};
