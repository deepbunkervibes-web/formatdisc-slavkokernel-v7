import React from 'react';
import { Shield, Globe, Zap, ArrowRight, Activity, Landmark } from 'lucide-react';

export default function FormatDiscHub() {
  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-green-900 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1),transparent_70%)]" />
        
        <div className="z-10 text-center max-w-4xl px-4 animate-fade-in-up">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-800 bg-green-950/30 text-green-400 text-xs tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SOVEREIGN NODE: ZAGREB-01
           </div>
           
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
             FormatDisc<sup className="text-xs">™</sup><br/>
             <span className="text-green-500">Sovereign Operating Systems</span>
           </h1>
           
           <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
             Deterministic orchestration kernels for institutional governance. 
             Built in Zagreb, Croatia. Deployed globally.
           </p>
           
           <div className="flex flex-col md:flex-row gap-4 justify-center">
             <a href="/fusion" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-bold rounded flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,0,0.3)]">
               <Activity className="w-5 h-5" />
               SlavkoShell<sup className="text-[8px]">™</sup> OS
             </a>
             <a href="/investors" className="px-8 py-4 border border-gray-700 hover:border-gray-500 rounded flex items-center justify-center gap-2 transition-all hover:bg-gray-900">
               <Landmark className="w-5 h-5" />
               INSTITUTIONAL BRIEF
             </a>
           </div>
        </div>
      </section>

      {/* PRODUCT ECOSYSTEM */}
      <section className="py-24 border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Product Ecosystem</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <ProductCard 
               icon={<Shield className="w-8 h-8 text-green-500" />}
               title={<>SlavkoShell<sup className="text-[8px]">™</sup> OS</>}
               text="Sovereign operating system with deterministic orchestration, audit-safe telemetry, and institutional governance."
               link="/fusion"
            />
            <ProductCard 
               icon={<Zap className="w-8 h-8 text-blue-500" />}
               title={<>SlavkoKernel<sup className="text-[8px]">™</sup></>}
               text="Self-replicating runtime with cryptographic vote receipts, Merkle-FS ledger, and Phase 11 Meta-Governance."
               link="/protocol"
            />
            <ProductCard 
               icon={<Globe className="w-8 h-8 text-purple-500" />}
               title="FormatDisc Platform"
               text="End-to-end infrastructure for sovereign AI systems. From Zagreb to the world."
               link="https://formatdisc.hr"
            />
          </div>
        </div>
      </section>
      
      {/* CTA FOOTER */}
      <section className="py-32 flex flex-col items-center justify-center text-center">
         <h2 className="text-4xl font-bold mb-6">Ready to Deploy?</h2>
         <p className="text-gray-400 mb-8 max-w-lg">
           Join the sovereign infrastructure revolution. Built for institutions that demand deterministic control.
         </p>
         <a href="/docs" className="text-green-500 hover:text-green-400 underline decoration-dotted underline-offset-8 text-lg flex items-center gap-2">
            VIEW DOCUMENTATION <ArrowRight className="w-4 h-4" />
         </a>
      </section>

      {/* FOOTER BRANDING */}
      <footer className="border-t border-gray-800 py-8 text-center text-xs text-gray-600">
        <p>FormatDisc<sup>™</sup> · SlavkoShell<sup>™</sup> · SlavkoKernel<sup>™</sup></p>
        <p className="mt-2">Zagreb, Croatia · {new Date().getFullYear()}</p>
        <p className="mt-2">
          <a href="https://formatdisc.hr" className="hover:text-green-500 transition-colors">formatdisc.hr</a>
          {' · '}
          <a href="https://github.com/deepbunkervibes-web/formatdisc-slavkokernel-v7" className="hover:text-green-500 transition-colors">GitHub</a>
        </p>
      </footer>
    </div>
  );
}

function ProductCard({ icon, title, text, link }: { icon: React.ReactNode, title: React.ReactNode, text: string, link: string }) {
  return (
    <a href={link} className="block p-8 border border-gray-800 rounded-lg hover:border-green-900/50 transition-colors group">
       <div className="mb-6 p-4 bg-gray-900/30 rounded w-fit group-hover:bg-gray-900 transition-colors">{icon}</div>
       <h3 className="text-2xl font-bold mb-4">{title}</h3>
       <p className="text-gray-400 leading-relaxed">{text}</p>
    </a>
  );
}
