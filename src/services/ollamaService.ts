/**
 * Ollama Service - SlavkoKernel v7 Integration
 * 
 * Connects frontend to local Ollama instance running SlavkoKernel model
 * for real AI-powered evaluation and generation.
 */

const OLLAMA_HOST = import.meta.env.VITE_OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'mladen-gertner/slavkokernel-v7';

interface OllamaResponse {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
    context?: number[];
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    eval_count?: number;
}

const OLLAMA_TIMEOUT = parseInt(import.meta.env.VITE_OLLAMA_TIMEOUT || '30000', 10);

/**
 * Generate a response from the local Ollama model with timeout
 */
export async function generateWithOllama(prompt: string, systemPrompt?: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT);

    try {
        const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                prompt: prompt,
                system: systemPrompt || 'You are SlavkoKernel v7, a multi-agent orchestration system. Respond with structured, deterministic outputs.',
                stream: false,
                options: {
                    temperature: 0.3,
                    top_p: 0.9,
                }
            })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
        }

        const data: OllamaResponse = await response.json();
        return data.response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
            console.error(`Ollama request timed out after ${OLLAMA_TIMEOUT}ms`);
            throw new Error('Ollama service high latency: Simulation paused to prevent cache poisoning.');
        }
        console.error('Ollama generation failed:', error);
        throw error;
    }
}

/**
 * Check if Ollama is available and model is loaded
 */
export async function checkOllamaHealth(): Promise<{ available: boolean; model: string | null }> {
    try {
        const response = await fetch(`${OLLAMA_HOST}/api/tags`);
        if (!response.ok) {
            return { available: false, model: null };
        }

        const data = await response.json();
        const models = data.models || [];
        const hasModel = models.some((m: { name: string }) =>
            m.name.includes('slavkokernel') || m.name.includes('mladen-gertner')
        );

        return {
            available: true,
            model: hasModel ? OLLAMA_MODEL : null
        };
    } catch {
        return { available: false, model: null };
    }
}

/**
 * Generate structured JSON response from Ollama
 */
export async function generateStructuredResponse<T>(prompt: string, systemPrompt: string): Promise<T> {
    const response = await generateWithOllama(prompt, systemPrompt);

    // Try to extract JSON from response
    const jsonMatch = response.match(/```json\n?([\s\S]*?)\n?```/) ||
        response.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
        try {
            return JSON.parse(jsonMatch[1] || jsonMatch[0]);
        } catch {
            console.warn('Failed to parse JSON from response, returning raw text');
        }
    }

    // If no valid JSON, return the raw response wrapped
    return { raw: response } as T;
}

export const ollamaConfig = {
    host: OLLAMA_HOST,
    model: OLLAMA_MODEL,
};
