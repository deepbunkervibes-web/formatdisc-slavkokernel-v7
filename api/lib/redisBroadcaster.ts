import { createClient } from 'redis';

const CHANNEL = 'slavkokernel:observability';

let publisher: any, subscriber: any;

// Only initialize Redis if we are in a Node.js environment (backend)
if (typeof process !== 'undefined' && process.env.REDIS_URL) {
    try {
        publisher = createClient({ url: process.env.REDIS_URL });
        subscriber = createClient({ url: process.env.REDIS_URL });

        publisher.on('error', (err: any) => console.error('Redis Publisher Error', err));
        subscriber.on('error', (err: any) => console.error('Redis Subscriber Error', err));

        publisher.connect();
        subscriber.connect();
    } catch (e) {
        console.warn('Failed to connect to Redis', e);
    }
}

export const publishFinding = async (finding: any) => {
    if (publisher?.isOpen) {
        await publisher.publish(CHANNEL, JSON.stringify(finding));
    }
    // fallback for dev/mock
    // @ts-ignore
    globalThis.__OBS_BROADCASTER__?.publish?.([finding]);
};

export const subscribeFindings = (callback: (data: any) => void) => {
    if (subscriber?.isOpen) {
        subscriber.subscribe(CHANNEL, (msg: string) => callback(JSON.parse(msg)));
    }
};
