/**
 * SOVEREIGN LAYOUT HOOK
 * Pure utility that returns sovereign mode detection
 */

import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface SovereignMode {
  active: boolean;
  hideShellUI: boolean;
  intensity: number;
  name: 'FUSION' | 'PROTOCOL' | 'INVESTORS' | 'SIMULATOR' | 'SHELL';
}

export const useSovereignLayout = (): SovereignMode => {
  const location = useLocation();
  const hostname = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';

  return useMemo<SovereignMode>(() => {
    const isFusion = hostname.startsWith('slavkofusion.') || 
                     hostname.startsWith('fusion.') || 
                     location.pathname.startsWith('/fusion');
    const isProtocol = hostname.startsWith('slavkoprotocol.') || 
                       hostname.startsWith('protocol.') || 
                       location.pathname.startsWith('/protocol');
    const isInvestors = hostname.startsWith('investitors.') || 
                        hostname.startsWith('investors.') || 
                        location.pathname.startsWith('/investors');
    const isSimulator = location.pathname.startsWith('/simulator');

    const activeMode = isFusion ? 'FUSION' :
      isProtocol ? 'PROTOCOL' :
      isInvestors ? 'INVESTORS' :
      isSimulator ? 'SIMULATOR' : 'SHELL';

    return {
      active: isFusion || isProtocol || isInvestors || isSimulator,
      hideShellUI: isFusion || isProtocol || isInvestors || isSimulator,
      intensity: isFusion ? 0.5 : isProtocol ? 0.2 : 0.3,
      name: activeMode,
    };
  }, [hostname, location.pathname]);
};
