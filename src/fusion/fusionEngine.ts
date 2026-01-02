import { FusionEvent, FusionChannel } from './fusionTypes';
import { SlavkoMessage } from '../protocol/types';
import { enforceProtocol } from '../protocol/validators';

type FusionHandler = (event: FusionEvent<any>) => void;

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
    // 1. Pentagon Enforcement - Validation & Hardening
    const canonical = enforceProtocol(message);

    // 2. Fusion Encapsulation
    const event: FusionEvent<T> = {
      message: canonical,
      route: {
        channel,
        target: canonical.origin, // Mapping to SlavkoModule source
      },
    };

    // 3. Dispersion
    handlers.forEach((h) => h(event));
  } catch (err) {
    console.error('[FUSION_ERROR] Signal dispersion failed integrity check:', err);
  }
};
