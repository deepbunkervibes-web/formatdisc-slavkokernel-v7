import React from 'react';
import { usePersona } from '../../persona/PersonaContext';

interface PersonaGateProps {
  require: 'investors' | 'fusion' | 'protocol';
  children: React.ReactNode;
}

/**
 * GOVERNANCE GATE — Validates active persona against required resource.
 * Uses existing PersonaContext for live state management.
 */
export const PersonaGate: React.FC<PersonaGateProps> = ({ require, children }) => {
  const { activePersona } = usePersona();

  // Check capabilities from Persona definitions
  // We map the 'require' prop to the dynamic capabilities array or dedicated flags
  const hasAccess = (() => {
    switch (require) {
      case 'investors':
        return activePersona.role === 'INVESTOR' || activePersona.role === 'ARCHITECT';
      case 'fusion':
        return activePersona.role === 'OPERATOR' || activePersona.role === 'ARCHITECT' || activePersona.role === 'ANALYST';
      case 'protocol':
        return true; // Public specification
      default:
        return false;
    }
  })();

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-black border border-red-500/20 rounded-xl">
        <div className="w-12 h-12 mb-4 border-2 border-red-500 rounded-full flex items-center justify-center animate-pulse text-red-500">!</div>
        <h3 className="text-xl font-mono text-red-500 mb-2 uppercase tracking-widest">Protocol Violation</h3>
        <p className="text-zinc-500 text-sm max-w-sm font-mono">
          Your current persona ID <span className="text-white">[{activePersona.name}]</span> is not authorized to access <span className="text-white">[{require.toUpperCase()}]</span> segment.
        </p>
        <p className="mt-8 text-[10px] text-zinc-700 font-mono uppercase">Access governed by council RFC-1</p>
      </div>
    );
  }

  return <>{children}</>;
};
