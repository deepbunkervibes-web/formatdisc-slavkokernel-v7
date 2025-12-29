import { createClient } from 'redis';

const CHANNEL = 'slavkokernel:observability';

let publisher: any, subscriber: any;

// Simple in-memory fallback for dev/demo without Redies
const listeners: ((data: any) => void)[] = [];

if (process.env.REDIS_URL) {
    publisher = createClient({ url: process.env.REDIS_URL });
    subscriber = createClient({ url: process.env.REDIS_URL });

    publisher.on('error', (err: any) => console.warn('Redis Publisher Error:', err));
    subscriber.on('error', (err: any) => console.warn('Redis Subscriber Error:', err));

    publisher.connect().catch(() => console.log('Redis Publisher failed to connect (using fallback)'));
    subscriber.connect().catch(() => console.log('Redis Subscriber failed to connect (using fallback)'));
}

export const publishFinding = async (finding: any) => {
    if (publisher?.isOpen) {
        await publisher.publish(CHANNEL, JSON.stringify(finding));
    } else {
        // Fallback: broadcast to local in-memory listeners
        listeners.forEach(l => l(finding));
    }
};

export const subscribeFindings = (callback: (data: any) => void) => {
    if (subscriber?.isOpen) {
        subscriber.subscribe(CHANNEL, (msg: string) => callback(JSON.parse(msg)));
    } else {
        // Fallback: register local listener
        listeners.push(callback);
    }
};
