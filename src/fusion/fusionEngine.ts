import { FusionEvent, FusionChannel } from './fusionTypes';
import { SlavkoMessage } from '../protocol/types';
import { enforceProtocol } from '../protocol/validators';

type FusionHandler = (event: FusionEvent) => void;

// Singleton event bus
const handlers: FusionHandler[] = [];

export const registerFusionHandler = (handler: FusionHandler) => {
  handlers.push(handler);
};

export const dispatchFusionEvent = <T>(
  channel: FusionChannel,
  message: SlavkoMessage<T>
) => {
  try {
    const canonical = enforceProtocol(message);

    const event: FusionEvent<T> = {
      message: canonical,
      route: {
        channel,
        target: canonical.origin,
      },
    };

    // Broadcast to all fusion handlers (e.g. Logger, Simulator, AI)
    handlers.forEach((h) => h(event));
  } catch (err) {
    console.error('[FUSION_ERROR] Dispersion failed:', err);
  }
};
