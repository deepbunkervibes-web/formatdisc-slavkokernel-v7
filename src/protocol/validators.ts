import { SlavkoMessage } from './types';

export const enforceProtocol = <T>(msg: SlavkoMessage<T>): SlavkoMessage<T> => {
  // STRICT MODE: Reject any non-compliant communication
  if (!msg.intent || !msg.origin) {
    console.warn('[PROTOCOL_VIOLATION] Non-canonical message intercepted:', msg);
    throw new Error('Non-canonical message: missing intent/origin');
  }
  
  // Future: Validate signature here
  
  return msg;
};
