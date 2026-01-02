import React from 'react';
import { motion } from 'framer-motion';

export default function ProtocolDocs() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-green-900 selection:text-white pb-20">
      
      {/* Hero Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 pt-24 pb-12 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm font-mono text-green-500 mb-2">RFC-1 CANONICAL STANDARD</div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Slavko Protocol Specification</h1>
          <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
            The governing law of the SlavkoShell Operating System. Defines the atomic structure of 
            inter-module communication, ensuring zero-drift and total auditability.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-8 sticky top-24 self-start">
          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Core Specs</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#message-format" className="text-green-400 font-medium">Message Format</a></li>
              <li><a href="#modules" className="text-neutral-400 hover:text-white transition">Module Taxonomy</a></li>
              <li><a href="#drift" className="text-neutral-400 hover:text-white transition">Drift Enforcement</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Governance</h3>
             <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Manifest</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Charter</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-12">
          
          <section id="message-format">
            <h2 className="text-2xl font-bold text-white mb-4">2.1 Canonical Message Structure</h2>
            <p className="text-neutral-400 mb-6">
              All communication within the OS must adhere to the <code>SlavkoMessage</code> interface. 
              Any deviation results in immediate rejection by the Fusion Layer.
            </p>
            
            <div className="bg-neutral-900 rounded border border-neutral-800 p-4 font-mono text-xs overflow-x-auto">
{`interface SlavkoMessage<TPayload = unknown> {
  id: string;        // UUIDv7 (Time-sortable)
  origin: Module;    // 'KERNEL' | 'UI' | 'AI'
  intent: string;    // Semantic Action Verb
  payload: TPayload; // Structured Data
  timestamp: string; // ISO-8601
  audit: {
    signature: string; // SHA-256 Hash
    lineage: string[]; // Trace IDs
  };
}`}
            </div>
          </section>

          <section id="modules">
            <h2 className="text-2xl font-bold text-white mb-4">2.2 System Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'KERNEL', desc: 'Sovereign Runtime & State Manager' },
                { name: 'FUSION', desc: 'Message Bus & Convergence Engine' },
                { name: 'UI', desc: 'Operator Cockpit (React)' },
                { name: 'SIMULATOR', desc: 'Deterministic Outcome Projector' },
                { name: 'AGENT', desc: 'Autonomous Persona Instance' },
              ].map(m => (
                <div key={m.name} className="bg-neutral-900/50 p-4 rounded border border-neutral-800">
                  <div className="font-mono font-bold text-green-500 mb-1">{m.name}</div>
                  <div className="text-sm text-neutral-400">{m.desc}</div>
                </div>
              ))}
            </div>
          </section>

           <section id="drift" className="border-t border-neutral-800 pt-8">
            <h2 className="text-2xl font-bold text-white mb-4">3.0 Zero Drift Enforcement</h2>
            <p className="text-neutral-400">
               The Protocol Layer is immutable at runtime. Any attempt to inject non-canonical messages 
               triggers a <span className="text-red-400">PROTOCOL_VIOLATION</span> audit event and terminates the offending process.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
}
