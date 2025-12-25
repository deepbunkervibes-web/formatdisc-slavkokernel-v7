import { KernelInput, KernelOutput, Decision, Manifest, LLMProvider, AuditLog } from './types';
import { OpenAIProvider } from './providers/openai';
import { MockProvider } from './providers/mock';
import { nanoid } from 'nanoid';

// Simple in-memory audit logger for now (replace with DB later)
class AuditLogger {
    async log(entry: AuditLog) {
        console.log('[AUDIT]', JSON.stringify(entry, null, 2));
    }
}

export class SlavkoKernel {
    private manifest: Manifest;
    private providers: Map<string, LLMProvider>;
    private auditLogger: AuditLogger;
    private decisionCache: Map<string, Decision>;

    constructor(manifest: Manifest) {
        this.manifest = manifest;
        this.providers = new Map();
        this.auditLogger = new AuditLogger();
        this.decisionCache = new Map();

        this.initializeProviders();
    }

    private initializeProviders(): void {
        // Initialize primary provider
        const primaryProvider = this.createProvider(this.manifest.llm.primary);
        this.providers.set(this.manifest.llm.primary, primaryProvider);

        // Initialize fallback providers
        this.manifest.llm.fallback.forEach(providerName => {
            const provider = this.createProvider(providerName);
            this.providers.set(providerName, provider);
        });
    }

    private createProvider(providerName: string): LLMProvider {
        switch (providerName) {
            case 'openai':
                return new OpenAIProvider();
            case 'mock':
                return new MockProvider();
            default:
                console.warn(`Unknown provider ${providerName}, defaulting to mock`);
                return new MockProvider();
        }
    }

    async execute(input: KernelInput): Promise<KernelOutput> {
        const startTime = Date.now();
        const decisionId = nanoid();
        const traceId = nanoid();

        try {
            // Execute with fallback logic
            const output = await this.executeWithFallback(input, decisionId, traceId);

            // Cache the result
            const decision: Decision = {
                id: decisionId,
                input,
                output,
                timestamp: startTime,
                status: 'completed'
            };
            // this.decisionCache.set(cacheKey, decision); // Disabled simple cache for now

            // Log to audit
            await this.auditLogger.log({
                id: nanoid(),
                decisionId,
                timestamp: startTime,
                input,
                output,
                trace: [traceId],
                performance: {
                    totalLatency: Date.now() - startTime,
                    llmLatency: output.metrics.latencyMs,
                    processingLatency: 0
                }
            });

            return output;

        } catch (error) {
            console.error("Kernel Execution Error", error);
            throw error;
        }
    }

    private async executeWithFallback(
        input: KernelInput,
        decisionId: string,
        traceId: string
    ): Promise<KernelOutput> {
        const providers = [this.manifest.llm.primary, ...this.manifest.llm.fallback];
        let lastError: Error | null = null;

        for (const providerName of providers) {
            const provider = this.providers.get(providerName);
            if (!provider) continue;

            try {
                const isHealthy = await provider.healthCheck();
                if (!isHealthy) continue;

                const output = await provider.execute(input);

                return {
                    ...output,
                    audit: {
                        decisionId,
                        manifestVersion: this.manifest.version,
                        traceId
                    },
                    metrics: {
                        ...output.metrics,
                        fallbackUsed: providerName !== this.manifest.llm.primary
                    }
                };

            } catch (error) {
                lastError = error instanceof Error ? error : new Error('Unknown error');
                console.warn(`Provider ${providerName} failed:`, lastError.message);
                continue;
            }
        }

        throw lastError || new Error('All providers failed');
    }
}
