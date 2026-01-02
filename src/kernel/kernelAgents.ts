/**
 * KERNEL AGENT REGISTRY — SlavkoKernel v7
 */

import { adapters } from "./adapters";

// Unified registry of all available adapters
export const kernelAgents = adapters;

// Whitelist of allowed agents for quick validation
export const allowedAgents = Object.keys(adapters) as (keyof typeof adapters)[];
