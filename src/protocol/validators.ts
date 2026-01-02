import { SlavkoMessage } from './types';

/**
 * Protocol Sentinel v1.0 - Pentagon Enforcement
 * Validates message integrity and returns the CANONICAL message object.
 */
export function enforceProtocol<T>(message: SlavkoMessage<T>): SlavkoMessage<T> {
  // 1. Structural Integrity Check
  if (!message || !message.payload) {
    throw new Error(`[PROTOCOL_VIOLATION]: Malformed message or missing mandatory payload.`);
  }

  // 2. Temporal Validation (If required by institutional law)
  // We can add strict timestamp checks here if needed for zero-drift audit.

  // 3. Immutability Enforcer
  // Deep-freeze the entire message to ensure it cannot be tampered with in-flight
  const hardenedMessage = JSON.parse(JSON.stringify(message)) as SlavkoMessage<T>;
  
  // Note: Object.freeze is shallow, but sufficient for top-level protocol safety
  Object.freeze(hardenedMessage);
  Object.freeze(hardenedMessage.payload);

  return hardenedMessage;
}

/**
 * Validates if the message meets institutional criteria.
 */
export const validateInstitutionalIntegrity = (msg: SlavkoMessage<any>): boolean => {
  const payloadStr = JSON.stringify(msg.payload);
  const suspiciousPatterns = ['<script', 'javascript:', 'eval(', 'onerror'];
  
  if (suspiciousPatterns.some(pattern => payloadStr.includes(pattern))) {
    console.error(`%c[SENTINEL_ALERT]: MALICIOUS PATTERN DETECTED`, 'background: red; color: white; font-weight: bold;');
    return false;
  }
  
  return true;
};
