/**
 * PERSONA CONTEXT v2.0
 * React Context for active persona state management
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Persona, PersonaSession } from './PersonaTypes';
import { PersonaRegistry } from './PersonaRegistry';
import { ARCHITECT_PERSONA } from './PersonaDefinitions';
import { createSlavkoMessage } from '../protocol/slavkoProtocol';
import { dispatchFusionEvent } from '../fusion/fusionEngine';

interface PersonaContextValue {
  activePersona: Persona;
  session: PersonaSession;
  switchPersona: (personaId: string) => void;
  getPersonaCapabilities: () => string[];
  canPerformAction: (action: string) => boolean;
}

const PersonaContext = createContext<PersonaContextValue | undefined>(undefined);

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePersona, setActivePersona] = useState<Persona>(ARCHITECT_PERSONA);
  const [session, setSession] = useState<PersonaSession>({
    personaId: ARCHITECT_PERSONA.id,
    startedAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    actionsPerformed: 0,
  });

  // Emit Fusion event on persona switch
  const switchPersona = useCallback((personaId: string) => {
    const newPersona = PersonaRegistry.getById(personaId);
    
    if (!newPersona) {
      console.error(`[PERSONA_CONTEXT] Persona ${personaId} not found in registry.`);
      return;
    }

    // Create Fusion event for persona switch
    const switchMessage = createSlavkoMessage('UI', 'PERSONA_SWITCH', {
      from: activePersona.id,
      to: newPersona.id,
      timestamp: new Date().toISOString(),
    });

    dispatchFusionEvent('UI', switchMessage);

    // Update state
    setActivePersona(newPersona);
    setSession({
      personaId: newPersona.id,
      startedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      actionsPerformed: 0,
    });

    console.log(`%c[PERSONA_CONTEXT] Switched to: ${newPersona.name} (${newPersona.role})`, 'color: #22c55e; font-weight: bold;');
  }, [activePersona]);

  const getPersonaCapabilities = useCallback(() => {
    return activePersona.capabilities;
  }, [activePersona]);

  const canPerformAction = useCallback((action: string) => {
    return activePersona.capabilities.includes(action as any);
  }, [activePersona]);

  // Update last activity on any interaction
  useEffect(() => {
    const updateActivity = () => {
      setSession(prev => ({
        ...prev,
        lastActivity: new Date().toISOString(),
        actionsPerformed: prev.actionsPerformed + 1,
      }));
    };

    window.addEventListener('click', updateActivity);
    window.addEventListener('keydown', updateActivity);

    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keydown', updateActivity);
    };
  }, []);

  return (
    <PersonaContext.Provider
      value={{
        activePersona,
        session,
        switchPersona,
        getPersonaCapabilities,
        canPerformAction,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within PersonaProvider');
  }
  return context;
};
