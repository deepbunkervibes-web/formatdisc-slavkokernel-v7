import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
    res.json([
        { service: 'auth-service', severity: 'low', count: 12, avg_confidence: 98 },
        { service: 'payment-gateway', severity: 'high', count: 3, avg_confidence: 85 },
        { service: 'kernel-core', severity: 'medium', count: 7, avg_confidence: 92 },
    ]);
}
