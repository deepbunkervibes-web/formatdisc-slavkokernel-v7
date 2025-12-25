import type { VercelRequest, VercelResponse } from '@vercel/node';
import { nanoid } from 'nanoid';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Mock Log Generator
    const generateLogs = (limit = 50) => {
        return Array.from({ length: Number(limit) }).map((_, i) => ({
            id: nanoid(),
            decisionId: nanoid(),
            timestamp: Date.now() - i * 60000 * Math.random() * 10,
            input: {
                prompt: `Sample prompt for testing audit log visualization ${i}`,
                persona: ['direct', 'analytical', 'creative'][Math.floor(Math.random() * 3)],
                sessionId: `sess-${nanoid(8)}`
            },
            output: {
                text: "Generated response content would appear here...",
                route: ['direct', 'analytics', 'technical', 'creative'][Math.floor(Math.random() * 4)],
                confidence: Math.random(),
                metrics: {
                    latencyMs: Math.floor(Math.random() * 800) + 100,
                    tokensUsed: Math.floor(Math.random() * 500),
                    modelUsed: ['gpt-4', 'claude-3', 'mock'][Math.floor(Math.random() * 3)],
                    fallbackUsed: Math.random() > 0.9
                }
            },
            performance: {
                totalLatency: Math.floor(Math.random() * 1000) + 100,
                llmLatency: Math.floor(Math.random() * 800),
                processingLatency: Math.floor(Math.random() * 50)
            },
            trace: [nanoid(), nanoid()]
        }));
    };

    const { action } = req.body || {};

    if (action === 'analytics') {
        return res.status(200).json({
            success: true,
            data: {
                summary: {
                    total: 15420,
                    avgLatency: 340,
                    errorRate: 0.002
                },
                routes: {
                    'direct': 5000,
                    'analytics': 3000,
                    'technical': 7000
                },
                personas: { 'default': 8000, 'expert': 7000 },
                models: { 'gpt-4': 10000, 'claude-3': 5000 },
                confidenceDistribution: { 'high': 0.8, 'medium': 0.15, 'low': 0.05 }
            }
        });
    }

    // Default: Return logs (Search/Filter logic would go here in real DB impl)
    const limit = req.query.limit || 25;

    return res.status(200).json({
        success: true,
        data: {
            logs: generateLogs(Number(limit))
        }
    });
}
