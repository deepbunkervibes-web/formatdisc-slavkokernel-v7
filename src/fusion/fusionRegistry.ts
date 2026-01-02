import { registerFusionHandler } from './fusionEngine';
import { FusionEvent } from './fusionTypes';

let initialized = false;

export const initFusionRegistry = () => {
  if (initialized) return;
  
  console.log('[FUSION] Initializing Convergence Layer...');

  // Primary Audit Logger
  registerFusionHandler((event: FusionEvent) => {
    // In v1.1, this will pipe to the Simulator terminal
    console.debug(
      `%c[FUSION]`, 'color: #00ff41; font-weight: bold;',
      event.route.channel, 
      '->', 
      event.message.intent, 
      event.message.payload
    );
  });

  initialized = true;
  console.log('[FUSION] Layer Active. Zero Drift Enforced.');
};
