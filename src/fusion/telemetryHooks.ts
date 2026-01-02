
import { useEffect } from 'react';
import { createSlavkoMessage } from '../protocol/slavkoProtocol';
import { dispatchFusionEvent } from './fusionEngine';

/**
 * v1.3.1 Telemetry Hook
 * Dispatches a specialized signal when a sovereign view is established.
 */
export const useSovereignTelemetry = (mode: string, intensity: number) => {
  useEffect(() => {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown';
    
    const msg = createSlavkoMessage('UI', 'SOVEREIGN_VIEW_ACTIVATED', {
      mode,
      hostname,
      intensity,
      browser: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 50) : 'n/a'
    });

    dispatchFusionEvent('UI', msg);
    
    console.log(`%c[TELEMETRY] Sovereign Mode: ${mode} @ ${intensity}`, 'color: #22c55e; font-weight: bold;');
  }, [mode, intensity]);
};
