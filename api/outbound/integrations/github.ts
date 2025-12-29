import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { ideaId, repoUrl } = req.body;

    const artifact = {
        id: `art_gh_${Math.random().toString(36).substr(2, 9)}`,
        ideaProfileId: ideaId,
        type: 'github',
        filePath: repoUrl,
        hash: 'N/A',
        metadata: {
            stars: 12,
            forks: 2,
            lastCommit: new Date().toISOString(),
            complexity: 'High',
            maturity: 'Stable'
        },
        createdAt: new Date().toISOString()
    };

    res.json({
        artifact,
        profile: {
            id: ideaId,
            ideaScore: 9.2,
            readinessFlag: true
        }
    });
}
