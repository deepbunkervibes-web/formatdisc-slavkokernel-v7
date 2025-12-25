import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SlavkoKernel } from '../../api/_lib/kernel/kernel';
import { Manifest } from '../../api/_lib/kernel/types';

// Default Manifest
const DEFAULT_MANIFEST: Manifest = {
    version: 'v12.0.0',
    llm: {
        primary: 'openai',
        fallback: ['mock'], // Fallback to mock if openai fails or no key
        timeout: 30000
    },
    audit: {
        enabled: true,
        retentionDays: 30
    }
};

// Initialize Kernel (Singleton-ish pattern for serverless)
const kernel = new SlavkoKernel(DEFAULT_MANIFEST);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt, persona, config } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const output = await kernel.execute({
            prompt,
            persona,
            config
        });

        return res.status(200).json(output);

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: 'Kernel execution failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
