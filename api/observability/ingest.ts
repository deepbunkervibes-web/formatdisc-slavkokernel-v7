import { Request, Response } from 'express';
// We'll stub the redis import for now to avoid resolution errors if files aren't perfectly aligned in dev-server context
// In a real setup we'd import { publishFinding } from '../../src/lib/redisBroadcaster';
// But since we are running with tsx in root, we can try importing.

import { publishFinding } from '../../src/lib/redisBroadcaster';

export default async function handler(req: Request, res: Response) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const findings = req.body;

    if (!findings) {
        return res.status(400).json({ error: 'No data provided' });
    }

    const findingWithId = {
        ...findings,
        id: findings.id || Math.random().toString(36).substring(7),
        timestamp: findings.timestamp || new Date().toISOString()
    };

    try {
        await publishFinding(findingWithId);
        return res.status(200).json({ success: true, data: findingWithId });
    } catch (error) {
        console.error('Ingest error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
