import React from 'react';
import { ThreeTerminal } from './ThreeTerminal';

export const InstitutionalBriefing = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-terminal-green selection:text-black">
      {/* 1. HERO TERMINAL */}
      <div className="relative z-10">
        <ThreeTerminal latestMessage="ESTABLISHING_SECURE_UPLINK_V7..." />
        
        <div className="absolute top-24 left-8 md:left-16 pointer-events-none">
          <div className="text-[10px] font-bold text-terminal-green tracking-[0.3em] uppercase mb-2">
            Institutional Briefing
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white/90">
            SlavkoKernel <br/>
            <span className="text-terminal-green">Apex Protocol</span>
          </h1>
        </div>
      </div>

      {/* 2. MANIFEST DATA */}
      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left Col: Strategy */}
        <div className="space-y-12">
           <div className="border-l-2 border-terminal-green/30 pl-6">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-4 text-terminal-green">The Thesis</h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Software is no longer built; it is orchestrated. SlavkoShell OS is the deterministic substrate for the agentic age, ensuring that AI autonomy does not degrade into entropy.
              </p>
           </div>

           <div className="border-l-2 border-white/10 pl-6">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-4 text-white">The Market</h2>
              <div className="space-y-4">
                <div className="bg-zinc-900/50 p-4 border border-white/5 rounded">
                   <div className="text-[10px] uppercase text-zinc-500 mb-1">Total Addressable Market</div>
                   <div className="text-2xl font-mono text-white">$480B <span className="text-sm text-zinc-600">by 2028</span></div>
                </div>
                <div className="bg-zinc-900/50 p-4 border border-white/5 rounded">
                   <div className="text-[10px] uppercase text-zinc-500 mb-1">Target Segment</div>
                   <div className="text-white font-medium text-sm">Sovereign Enterprise & FinTech</div>
                </div>
              </div>
           </div>
        </div>

        {/* Mid Col: Architecture */}
        <div className="space-y-8 lg:col-span-2">
           <h2 className="text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-4">Core Architecture v7</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'SlavkoKernel v7', desc: 'Managed Llama2:7b Runtime with council voting mechanisms and deterministic output enforcement.' },
                { title: 'Cryptographic Audit', desc: 'SHA-256 signed manifest logs for every agent decision. Tamper-evident and compliance-ready.' },
                { title: 'SlavkoProtocol', desc: 'RFC-1 Standard for zero-drift inter-module communication. JSON/Markdown dual-layer output.' },
                { title: 'Ollama Native', desc: 'Vendor-agnostic infrastructure. Local, portable, and sovereign. Zero data leakage.' }
              ].map(item => (
                <div key={item.title} className="p-6 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors rounded-xl">
                   <h3 className="font-mono text-terminal-green mb-2">{item.title}</h3>
                   <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>

           <div className="mt-12 bg-terminal-green/5 border border-terminal-green/20 p-8 rounded-xl flex items-center justify-between">
              <div>
                 <div className="text-xs text-terminal-green uppercase tracking-widest font-bold mb-2">Investment Opportunity</div>
                 <div className="text-white text-lg font-medium">Series A: The Sovereign Scale-Up</div>
              </div>
              <button disabled className="px-6 py-3 bg-terminal-green text-black font-bold uppercase text-xs tracking-widest opacity-50 cursor-not-allowed">
                 Allocation Full
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
