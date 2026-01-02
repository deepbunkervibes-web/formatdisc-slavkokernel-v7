import React from 'react';
import { motion } from 'framer-motion';

export default function ProtocolDocs() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-green-900 selection:text-white pb-20">
      
      {/* Hero Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 pt-24 pb-12 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">V7.0.0</span>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">RFC-1 CANONICAL</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Slavko Protocol Specification</h1>
          <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
            The orchestration backbone for teams who refuse downtime, ambiguity, and vendor lock-in. 
            Coordinates specialized agents with strict council governance and cryptographic audit trails.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-8 sticky top-24 self-start hidden lg:block">
          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Architecture</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#message-format" className="text-green-400 font-bold border-l-2 border-green-500 pl-3">Message Structure</a></li>
              <li><a href="#pipeline" className="text-neutral-400 hover:text-white transition pl-3 border-l-2 border-transparent hover:border-white/20">Declarative Pipelines</a></li>
              <li><a href="#stack" className="text-neutral-400 hover:text-white transition pl-3 border-l-2 border-transparent hover:border-white/20">Operational Stack</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Security</h3>
             <ul className="space-y-2 text-sm">
              <li><a href="#security" className="text-neutral-400 hover:text-white transition pl-3 border-l-2 border-transparent hover:border-white/20">Architecture & TLS</a></li>
              <li><a href="#audit" className="text-neutral-400 hover:text-white transition pl-3 border-l-2 border-transparent hover:border-white/20">Cryptographic Audit</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-16">
          
          <section id="message-format">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span>2.1 Canonical Message Structure</span>
              <div className="h-px flex-1 bg-neutral-800"></div>
            </h2>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              All communication within the OS must adhere to the <code>SlavkoMessage</code> interface. 
              Any deviation results in immediate rejection by the Fusion Layer.
            </p>
            
            <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6 font-mono text-xs overflow-x-auto shadow-2xl">
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

          <section id="pipeline">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span>2.2 Declarative Pipelines</span>
              <div className="h-px flex-1 bg-neutral-800"></div>
            </h2>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Pipelines are defined in YAML/JSON, ensuring strict reproducibility across environments.
              The Council Orchestrator enforces quorum and thresholds before any action is executed.
            </p>
            
            <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6 font-mono text-xs overflow-x-auto shadow-2xl relative group">
                <div className="absolute top-3 right-3 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Pipeline.yaml</div>
{`version: "7"
name: "slavko-demo"
inputs:
  prompt: "Ship a crisp summary with action items."
council:
  quorum: 3
  threshold: 0.66
agents:
  - id: write
    model: "llama3:8b"
    policy: "content:summary"
  - id: think
    model: "llama3:8b"
    policy: "reasoning:chain"
  - id: eval
    model: "codellama:13b"
    policy: "score:clarity,consistency"
audit:
  sign: true
  store: "postgres"`}
            </div>
          </section>

          <section id="stack">
             <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span>2.3 Operational Stack</span>
              <div className="h-px flex-1 bg-neutral-800"></div>
            </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-900/40 p-5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition">
                    <h3 className="text-sm font-bold text-white mb-2">Dual-Layer AI Runtime</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                        Orchestration kernel built on <strong>Llama2:7b</strong> and <strong>Ollama</strong>. 
                        Coordinates Pattern, Risk, Eval, and Think agents with standardized I/O contracts.
                    </p>
                </div>
                <div className="bg-neutral-900/40 p-5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition">
                    <h3 className="text-sm font-bold text-white mb-2">Persistence & State</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                        <strong>PostgreSQL</strong> for state, audit logs, and Signed Manifests.
                        <strong>Redis</strong> for high-performance job queues and caching.
                    </p>
                </div>
                 <div className="bg-neutral-900/40 p-5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition">
                    <h3 className="text-sm font-bold text-white mb-2">CI/CD & Observability</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                        <strong>Prometheus + Grafana</strong> for built-in metrics.
                        GitHub Actions for tests, SBOM generation, and vulnerability scans.
                    </p>
                </div>
                 <div className="bg-neutral-900/40 p-5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition">
                    <h3 className="text-sm font-bold text-white mb-2">Ollama Native</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                        Vendor lock-in free. Local, portable, model-agnostic design.
                        Control your stack end-to-end.
                    </p>
                </div>
             </div>
          </section>

          <section id="security" className="bg-blue-900/5 border border-blue-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
               <span className="text-blue-400">3.0 Security Architecture</span>
            </h2>
            <div className="space-y-6">
                <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                    <div>
                        <h4 className="text-sm font-bold text-white">Authentication & RBAC</h4>
                        <p className="text-sm text-neutral-400 mt-1">Short-lived JWTs, optional refresh tokens, and rotated secrets. Strict Role-Based Access Control masked per endpoint.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                    <div>
                        <h4 className="text-sm font-bold text-white">Transport Security</h4>
                        <p className="text-sm text-neutral-400 mt-1">TLS 1.3 enforced for all external traffic with strict cipher suites. Secrets managed via environment/secret stores.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                    <div>
                        <h4 className="text-sm font-bold text-white">Audit Proofing</h4>
                        <p className="text-sm text-neutral-400 mt-1">Every decision is traceable end-to-end with optional cryptographic sealing (SHA-256). Runs are tamper-evident records.</p>
                    </div>
                </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
