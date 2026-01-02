import React from 'react';
import { institutionalBriefing } from '../../data/kernelState';
import { PersonaGate } from '../../components/app/PersonaGate';

export const InstitutionalBriefing: React.FC = () => {
  return (
    <PersonaGate require="investors">
      <div className="max-w-7xl mx-auto px-8 py-20 font-mono text-zinc-300">
        <header className="mb-20 space-y-4">
          <div className="text-terminal-green text-xs uppercase tracking-widest">Target: Institutional Partners</div>
          <h1 className="text-4xl font-bold text-white tracking-tighter uppercase">Apex v7 — Sovereign Briefing</h1>
          <div className="h-px w-full bg-gradient-to-r from-terminal-green/50 to-transparent"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* LEFT: Context */}
          <div className="space-y-12">
            <Section title="Critical Friction (Problem)" items={institutionalBriefing.problem} />
            <Section title="Canonical Stability (Solution)" items={institutionalBriefing.solution} />
          </div>

          {/* RIGHT: Market & Architecture */}
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Strategic Market</h2>
              <div className="p-6 border border-white/5 bg-zinc-900/20 rounded-lg mb-4">
                 <div className="text-2xl font-bold text-terminal-green mb-2">{institutionalBriefing.market.tam}</div>
                 <div className="text-[10px] text-zinc-500 uppercase">Growth Vectors</div>
              </div>
              <ul className="space-y-3">
                {institutionalBriefing.market.drivers.map(d => (
                  <li key={d} className="flex gap-3 text-sm">
                    <span className="text-terminal-green opacity-50">▸</span> {d}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">System Architecture</h2>
              <div className="space-y-4">
                {Object.entries(institutionalBriefing.architecture).map(([key, val]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <span className="text-[10px] text-zinc-500 uppercase">{key}</span>
                    <span className="text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-white/5">
           <Section title="Operational Roadmap" items={institutionalBriefing.roadmap} horizontal />
        </div>
      </div>
    </PersonaGate>
  );
};

const Section: React.FC<{ title: string; items: string[]; horizontal?: boolean }> = ({ title, items, horizontal }) => (
  <div>
    <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">{title}</h2>
    <ul className={horizontal ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
      {items.map(item => (
        <li key={item} className="flex gap-4 group">
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-green mt-1.5 shrink-0 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
          <span className="text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default InstitutionalBriefing;
