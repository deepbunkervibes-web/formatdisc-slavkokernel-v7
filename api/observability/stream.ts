import { Request, Response } from 'express';
import { subscribeFindings } from '../../src/lib/redisBroadcaster';

export default async function handler(req: Request, res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendUpdate = (data: any) => {
        res.write(`data: ${JSON.stringify({ type: 'new_findings', payload: data })}\n\n`);
    };

    // Send connected message
    res.write(`: connected\n\n`);

    // Subscribe
    subscribeFindings((data) => {
        sendUpdate(data);
    });

    // Mock keep-alive or heartbeats could be added here
    const heartbeat = setInterval(() => {
        res.write(': heartbeat\n\n');
    }, 15000);

    req.on('close', () => {
        clearInterval(heartbeat);
    });
}
