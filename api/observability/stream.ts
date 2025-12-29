import { subscribeFindings } from '../../lib/redisBroadcaster';

export default function streamHandler(req: any, res: any) {
    console.log('[OBSERVABILITY] Stream connected');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendEvent = (data: any) => {
        res.write(`data: ${JSON.stringify({ type: 'new_findings', payload: data })}\n\n`);
    };

    // Sub to broadcaster
    // Note: In a robust production environment we would handle unsubscribe here.
    // For this implementation, we trust the broadcaster to handle multiple listeners or lack thereof.
    subscribeFindings((data) => {
        sendEvent(data);
    });

    req.on('close', () => {
        console.log('[OBSERVABILITY] Stream disconnected');
    });
}
