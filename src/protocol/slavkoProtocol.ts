import { SlavkoMessage, SlavkoModule } from './types';

export const createSlavkoMessage = <T>(
  origin: SlavkoModule,
  intent: string,
  payload: T
): SlavkoMessage<T> => {
  const timestamp = new Date().toISOString();
  const id = crypto.randomUUID(); // Browser native UUID

  return {
    id,
    origin,
    intent,
    payload,
    timestamp,
    audit: {
      signature: '', // Pending cryptographic signature layer
      lineage: [],
    },
  };
};

export const isCanonicalMessage = (msg: any): msg is SlavkoMessage => {
  return (
    typeof msg === 'object' &&
    msg !== null &&
    typeof msg.id === 'string' &&
    typeof msg.origin === 'string' &&
    typeof msg.intent === 'string' &&
    typeof msg.timestamp === 'string' &&
    typeof msg.audit === 'object'
  );
};
