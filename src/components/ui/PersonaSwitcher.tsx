/**
 * PERSONA SWITCHER v2.0
 * UI component for switching between personas
 */

import React, { useState } from 'react';
import { usePersona } from '../../persona/PersonaContext';
import { PersonaRegistry } from '../../persona/PersonaRegistry';
import { User, ChevronDown } from 'lucide-react';

export const PersonaSwitcher: React.FC = () => {
  const { activePersona, switchPersona } = usePersona();
  const [isOpen, setIsOpen] = useState(false);

  const allPersonas = PersonaRegistry.listAll();

  return (
    <div className="relative">
      {/* Active Persona Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 rounded hover:border-terminal-green/50 transition-colors"
      >
        <User size={16} className="text-terminal-green" />
        <span className="font-mono text-xs uppercase tracking-widest text-white">
          {activePersona.name}
        </span>
        <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-black border border-white/10 rounded shadow-2xl z-50">
          <div className="p-2 border-b border-white/5">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Active Persona</div>
            <div className="text-sm font-bold text-terminal-green">{activePersona.name}</div>
            <div className="text-[10px] text-zinc-600 mt-1">
              {activePersona.capabilities.join(', ')}
            </div>
          </div>

          <div className="p-2">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Switch To</div>
            {allPersonas
              .filter(p => p.id !== activePersona.id)
              .map(persona => (
                <button
                  key={persona.id}
                  onClick={() => {
                    switchPersona(persona.id);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-zinc-900 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-terminal-green transition-colors">
                        {persona.name}
                      </div>
                      <div className="text-[10px] text-zinc-600 mt-0.5">
                        {persona.role}
                      </div>
                    </div>
                    {persona.constraints.readonly && (
                      <div className="text-[9px] px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded uppercase tracking-wider">
                        Read-Only
                      </div>
                    )}
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Click Outside to Close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
