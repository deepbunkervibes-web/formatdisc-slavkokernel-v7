import { publishFinding } from '../../lib/redisBroadcaster';

export default async function ingestHandler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const finding = req.body;

    // Basic validation
    if (!finding || !finding.service || !finding.severity) {
        return res.status(400).json({ error: 'Invalid finding format' });
    }

    try {
        await publishFinding(finding);
        console.log(`[OBSERVABILITY] Ingested: ${finding.service} [${finding.severity}]`);
        return res.json({ success: true });
    } catch (e) {
        console.error('Ingest error:', e);
        return res.status(500).json({ error: 'Ingest failed' });
    }
}
