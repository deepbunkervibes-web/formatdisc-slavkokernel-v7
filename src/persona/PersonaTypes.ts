/**
 * PERSONA ENGINE v2.0 — CANONICAL TYPE DEFINITIONS
 * Deterministic identity system for AI-native agents
 */

export type PersonaRole = 
  | 'ARCHITECT'
  | 'ANALYST'
  | 'OPERATOR'
  | 'AUDITOR'
  | 'INVESTOR';

export type PersonaCapability =
  | 'DEPLOY'
  | 'CONFIGURE'
  | 'AUDIT'
  | 'GOVERN'
  | 'QUERY'
  | 'ANALYZE'
  | 'REPORT'
  | 'MONITOR'
  | 'RESTART'
  | 'SCALE'
  | 'INSPECT'
  | 'VERIFY';

export interface PersonaConstraints {
  readonly: boolean;
  canMutateState: boolean;
  canDeploy: boolean;
  canAccessSensitiveData: boolean;
  maxSessionDuration?: number; // in milliseconds
}

export interface PersonaPromptContract {
  version: string;
  hash: string;
  template: string;
  lastUpdated: string; // ISO-8601
}

export interface Persona {
  readonly id: string; // UUIDv7
  readonly name: string;
  readonly role: PersonaRole;
  readonly capabilities: PersonaCapability[];
  readonly constraints: PersonaConstraints;
  readonly promptContract: PersonaPromptContract;
  readonly createdAt: string; // ISO-8601
}

export interface PersonaSession {
  personaId: string;
  startedAt: string; // ISO-8601
  lastActivity: string; // ISO-8601
  actionsPerformed: number;
}
