/**
 * PERSONA AUTO-GENERATOR HOOK
 * Listens to persona changes and triggers UI regeneration automatically.
 */
import { useEffect, useState } from 'react';
import { usePersona } from '../persona/PersonaContext';
import { uiProfiles, PersonaProfileKey } from '../data/uiProfiles';
import { frontendGenerator } from '../kernel/adapters/frontendGenerator';
import { KernelTask } from '../infrastructure/types';
import { loadUIArtifact } from '../services/uiArtifactStore';

export function usePersonaAutoGenerator() {
  const { activePersona } = usePersona();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [lastGeneratedPersona, setLastGeneratedPersona] = useState<string | null>(null);

  useEffect(() => {
    const triggerRegeneration = async () => {
      // Don't regenerate if we just did for this persona
      if (lastGeneratedPersona === activePersona.role) return;
      
      // Guest/Default handling - maybe skip or use default
      if (!activePersona.role) return;

      setIsRegenerating(true);
      console.log(`[AUTO-GEN] Detected Persona Switch to [${activePersona.role}]. Initiating UI Fabrication...`);

      try {
        const profileKey = activePersona.role as PersonaProfileKey;
        const profile = uiProfiles[profileKey] || uiProfiles['GUEST'];

        const task: KernelTask = {
          agent: 'frontend-generator',
          action: 'generate-ui',
          mode: 'deterministic',
          budget: 'local',
          payload: {
            spec: profile.spec,
            framework: 'react',
            style: 'tailwind',
            generatedBy: 'system-auto-adapt'
          }
        };

        // Invoke the generator directly
        // In a full backend setup, this would be a fetch call to /v7/ui/regenerate
        await frontendGenerator(task);
        
        setLastGeneratedPersona(activePersona.role);
        console.log(`[AUTO-GEN] UI Fabrication Complete for [${activePersona.role}]`);
      } catch (error) {
        console.error("[AUTO-GEN] Fabrication Failed:", error);
      } finally {
        setIsRegenerating(false);
      }
    };

    triggerRegeneration();
  }, [activePersona.role, lastGeneratedPersona]);

  return { isRegenerating };
}
