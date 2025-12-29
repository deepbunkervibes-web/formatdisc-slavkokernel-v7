import { VercelRequest, VercelResponse } from '@vercel/node';

const mockProfiles: Record<string, any> = {
    'founder-confession': {
        id: 'founder-confession',
        founderId: 'user_1',
        confessionText: 'The raw, unarmored truth about the industry...',
        ideaScore: 9.9,
        readinessFlag: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;
    if (typeof id !== 'string') return res.status(400).json({ error: 'Missing ID' });

    const profile = mockProfiles[id] || {
        id,
        founderId: 'user_1',
        confessionText: '',
        ideaScore: 0,
        readinessFlag: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    res.json(profile);
}
