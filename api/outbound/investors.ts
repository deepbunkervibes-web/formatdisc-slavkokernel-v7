import { VercelRequest, VercelResponse } from '@vercel/node';

const mockInvestors = [
    {
        id: 'inv_1',
        name: 'Slavko Ventures',
        focusSectors: ['AI', 'Compliance', 'Enterprise'],
        investmentStage: 'Seed',
        geographicScope: 'EU',
        contactEmail: 'dealflow@slavko.vc',
        preferredFormat: 'PDF',
        createdAt: new Date().toISOString()
    },
    {
        id: 'inv_2',
        name: 'Truth Capital',
        focusSectors: ['Deep Tech', 'AI', 'Ethics'],
        investmentStage: 'Series A',
        geographicScope: 'Global',
        contactEmail: 'pitch@truth.cap',
        preferredFormat: 'PDF',
        createdAt: new Date().toISOString()
    },
    {
        id: 'inv_3',
        name: 'Nexus Alpha',
        focusSectors: ['SaaS', 'B2B', 'AI'],
        investmentStage: 'Pre-seed',
        geographicScope: 'EU',
        contactEmail: 'inbound@nexus.alpha',
        preferredFormat: 'PDF',
        createdAt: new Date().toISOString()
    }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.json(mockInvestors);
}
