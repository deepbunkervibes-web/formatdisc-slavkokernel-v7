import { LLMProvider, KernelInput, KernelOutput } from '../types';

export class MockProvider implements LLMProvider {
    async execute(input: KernelInput): Promise<KernelOutput> {
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate latency

        return {
            text: `[Mock Kernel Response] I received your prompt: "${input.prompt}". This is a deterministic simulation.`,
            route: 'mock-fallback',
            confidence: 1.0,
            metrics: {
                latencyMs: Date.now() - startTime,
                tokensUsed: 0,
                modelUsed: 'slavko-mock-v1',
                fallbackUsed: true
            },
            audit: {
                decisionId: '',
                manifestVersion: '',
                traceId: ''
            }
        };
    }

    async healthCheck(): Promise<boolean> {
        return true;
    }
}
