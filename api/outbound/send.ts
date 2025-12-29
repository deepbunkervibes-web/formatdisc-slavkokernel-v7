import { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { ideaId, investorIds } = req.body;

    const logs = investorIds.map((invId: string) => {
        const logId = `log_${Math.random().toString(36).substr(2, 9)}`;
        const content = JSON.stringify({ ideaId, invId, sentAt: new Date().toISOString() });
        const hash = crypto.createHash('sha256').update(content).digest('hex');

        return {
            id: logId,
            ideaProfileId: ideaId,
            investorId: invId,
            initiatedBy: 'founder',
            sentAt: new Date().toISOString(),
            method: 'email',
            status: 'sent',
            details: { subject: 'Project Submission: SlavkoKernel' },
            immutableHash: hash
        };
    });

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    res.json({ success: true, logs });
}
