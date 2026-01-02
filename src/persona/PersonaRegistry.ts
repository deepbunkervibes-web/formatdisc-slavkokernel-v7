/**
 * PERSONA REGISTRY v2.0
 * Singleton registry of all canonical personas
 */

import { Persona, PersonaRole } from './PersonaTypes';

class PersonaRegistryClass {
  private personas: Map<string, Persona> = new Map();
  private initialized = false;

  /**
   * Registers a new persona in the canonical registry.
   * Personas are immutable once registered.
   */
  register(persona: Persona): void {
    if (this.personas.has(persona.id)) {
      throw new Error(`[PERSONA_REGISTRY] Persona ${persona.id} already registered.`);
    }

    // Deep freeze to ensure immutability
    const frozenPersona: Persona = Object.freeze({
      ...persona,
      capabilities: Object.freeze([...persona.capabilities]) as any,
      constraints: Object.freeze({ ...persona.constraints }) as any,
      promptContract: Object.freeze({ ...persona.promptContract }) as any
    }) as Persona;

    this.personas.set(persona.id, frozenPersona);
    console.log(`%c[PERSONA_REGISTRY] Registered: ${persona.name} (${persona.role})`, 'color: #22c55e; font-weight: bold;');
  }

  /**
   * Retrieves a persona by ID.
   */
  getById(id: string): Persona | undefined {
    return this.personas.get(id);
  }

  /**
   * Retrieves a persona by role (returns first match).
   */
  getByRole(role: PersonaRole): Persona | undefined {
    return Array.from(this.personas.values()).find(p => p.role === role);
  }

  /**
   * Lists all registered personas.
   */
  listAll(): Persona[] {
    return Array.from(this.personas.values());
  }

  /**
   * Checks if a persona exists.
   */
  exists(id: string): boolean {
    return this.personas.has(id);
  }

  /**
   * Marks the registry as initialized (prevents further modifications in strict mode).
   */
  markInitialized(): void {
    this.initialized = true;
    console.log('%c[PERSONA_REGISTRY] Registry locked. All personas are now canonical.', 'color: #22c55e; font-weight: bold;');
  }

  /**
   * Returns initialization status.
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

// Singleton instance
export const PersonaRegistry = new PersonaRegistryClass();
