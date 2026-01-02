import React from 'react';
import { Shield, Lock, Terminal, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * FormatDisc Hub — Institutional Gateway (Option C)
 * "Ultra-serious, governance-first"
 */
export default function FormatDiscHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-green-900 selection:text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Grid / Noise */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      {/* Main Container */}
      <div className="z-10 w-full max-w-5xl px-6 grid gap-16 animate-fade-in-up">
        
        {/* Header Block */}
        <header className="flex flex-col items-center text-center space-y-6">
           <div className="inline-flex items-center gap-3 px-3 py-1 border border-white/10 bg-white/5 rounded-sm">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
              <span className="text-[10px] tracking-[0.3em] font-bold text-gray-400">NODE: ZAGREB-01</span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
             FORMAT<span className="text-gray-500">DISC</span>
             <sup className="text-sm text-gray-600 align-super ml-2">TM</sup>
           </h1>
           
           <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto tracking-widest uppercase leading-relaxed">
             Sovereign Operating Systems <br/> 
             Deterministic Orchestration Kernel v7.0
           </p>
        </header>

        {/* Access Matrix (Monolithic Buttons) */}
        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            <AccessModule 
               title="SLAVKOSHELL OS"
               subtitle="Enter Fusion Cockpit"
               icon={<Activity className="w-5 h-5" />}
               onClick={() => navigate('/fusion')}
            />
            <AccessModule 
               title="SLAVKOKERNEL"
               subtitle="View Protocol Docs"
               icon={<Terminal className="w-5 h-5" />}
               onClick={() => navigate('/protocol')}
            />
            <AccessModule 
               title="DATA ROOM"
               subtitle="Institutional Access"
               icon={<Lock className="w-5 h-5" />}
               onClick={() => navigate('/investors')}
            />
            <AccessModule 
               title="PROVENANCE"
               subtitle="Manifesto & Mission"
               icon={<Shield className="w-5 h-5" />}
               onClick={() => navigate('/manifesto')}
            />
        </div>

        {/* Footer Meta */}
        <footer className="text-center space-y-4">
           <div className="h-px w-24 bg-white/20 mx-auto" />
           <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase">
             Built by FormatDisc in Zagreb, Croatia. <br/>
             Authorized Personnel Only.
           </p>
        </footer>

      </div>
    </div>
  );
}

function AccessModule({ title, subtitle, icon, onClick }: { title: string, subtitle: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="group relative bg-black p-8 text-left hover:bg-neutral-900 transition-colors focus:outline-none"
    >
      <div className="flex items-start justify-between mb-4 text-gray-500 group-hover:text-green-500 transition-colors">
         {icon}
         <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">[ACCESS]</span>
      </div>
      <h2 className="text-xl font-bold tracking-widest mb-1 text-gray-200 group-hover:text-white">{title}</h2>
      <p className="text-xs text-gray-600 tracking-wider group-hover:text-gray-400 uppercase">{subtitle}</p>
    </button>
  );
}
