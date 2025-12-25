import OpenAI from 'openai';
import { LLMProvider, KernelInput, KernelOutput } from '../types';

export class OpenAIProvider implements LLMProvider {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
        });
    }

    async execute(input: KernelInput): Promise<KernelOutput> {
        const startTime = Date.now();

        // Simulate API call for now if no key is present (or use real call)
        if (!process.env.OPENAI_API_KEY) {
            // Allow "demo mode" fallback if key is missing
            return this.mockExecute(input);
        }

        try {
            const response = await this.client.chat.completions.create({
                model: input.config?.model || 'gpt-4-turbo-preview',
                messages: [
                    { role: 'system', content: input.persona || 'You are a helpful assistant.' },
                    { role: 'user', content: input.prompt }
                ],
                temperature: input.config?.temperature || 0.7,
                max_tokens: input.config?.maxTokens || 1000,
            });

            const text = response.choices[0]?.message?.content || '';
            const endTime = Date.now();

            return {
                text,
                route: 'openai-primary',
                confidence: 0.95,
                metrics: {
                    latencyMs: endTime - startTime,
                    tokensUsed: response.usage?.total_tokens || 0,
                    modelUsed: response.model,
                    fallbackUsed: false
                },
                audit: {
                    decisionId: '', // Will be filled by kernel
                    manifestVersion: '', // Will be filled by kernel
                    traceId: '' // Will be filled by kernel
                }
            };
        } catch (error) {
            console.error("OpenAI execution failed", error);
            throw error;
        }
    }

    // Fallback for demo purposes when no key is provided
    private async mockExecute(input: KernelInput): Promise<KernelOutput> {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate latency
        return {
            text: `[OpenAI Mock] Use your API key for real responses. Echo: ${input.prompt}`,
            route: 'openai-mock',
            confidence: 0.8,
            metrics: {
                latencyMs: 800,
                tokensUsed: 0,
                modelUsed: 'mock-gpt',
                fallbackUsed: false
            },
            audit: {
                decisionId: '',
                manifestVersion: '',
                traceId: ''
            }
        };
    }

    async healthCheck(): Promise<boolean> {
        return true; // Simple check for now
    }
}
