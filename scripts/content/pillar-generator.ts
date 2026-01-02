import fs from 'fs';
import path from 'path';

// Minimal Pillar Content Generator
// Usage: npx tsx scripts/content/pillar-generator.ts --target=pillar --keyword="..."

const args = process.argv.slice(2);
const keywordArg = args.find(a => a.startsWith('--keyword='));
const keyword = keywordArg ? keywordArg.split('=')[1] : 'fintech-hub';

const template = `
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Globe, Landmark, ArrowRight, Activity } from 'lucide-react';
import { useScrollTo } from '../hooks/useScrollTo';

export default function PillarPage() {
  const scrollTo = useScrollTo();

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-green-900 selection:text-white">
      <Helmet>
        <title>Zagreb FinTech Hub 2025 — Sovereign Governance & Digital Assets</title>
        <meta name="description" content="Join the Zagreb FinTech Hub 2025. Verify crypto-receipts, participate in the Meta-Council, and unlock EU-wide sovereign governance directly from Zagreb." />
        <link rel="canonical" href="https://slavkoshell.formatdisc.hr/fintech-hub" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1),transparent_70%)]" />
        
        <div className="z-10 text-center max-w-4xl px-4 animate-fade-in-up">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-800 bg-green-950/30 text-green-400 text-xs tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SOVEREIGN NODE: ZAGREB-01
           </div>
           
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
             Zagreb FinTech Hub <br/>
             <span className="text-green-500">2025 Integration</span>
           </h1>
           
           <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
             The first operational sovereign-governance node in the EU. 
             Verify assets. Join the Meta-Council. Execute deterministic law.
           </p>
           
           <div className="flex flex-col md:flex-row gap-4 justify-center">
             <button onClick={() => window.location.href = '/simulator'} className="px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-bold rounded flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,0,0.3)]">
               <Activity className="w-5 h-5" />
               ENTER SIMULATOR
             </button>
             <button onClick={() => window.location.href = '/investors'} className="px-8 py-4 border border-gray-700 hover:border-gray-500 rounded flex items-center justify-center gap-2 transition-all hover:bg-gray-900">
               <Landmark className="w-5 h-5" />
               INVESTOR BRIEF
             </button>
           </div>
        </div>
      </section>

      {/* VALUE PROPOSITION CLUSTERS */}
      <section className="py-24 border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
            <Cluster 
               icon={<Shield className="w-8 h-8 text-green-500" />}
               title="Sovereign Verification"
               text="Cryptographic proof of receipt integrity. No third-party auditors required. The ledger is the law."
            />
            <Cluster 
               icon={<Globe className="w-8 h-8 text-blue-500" />}
               title="EU-Wide Compliance"
               text="Pre-validated for MiCA and GDPR. Operate across 27 member states with a single deterministic kernel."
            />
            <Cluster 
               icon={<Landmark className="w-8 h-8 text-purple-500" />}
               title="Meta-Council Access"
               text="Join the governance layer. Stake verify-receipts to gain voting weight in the protocol evolution."
            />
        </div>
      </section>
      
      {/* CTA FOOTER */}
      <section className="py-32 flex flex-col items-center justify-center text-center">
         <h2 className="text-4xl font-bold mb-6">Ready to sync?</h2>
         <p className="text-gray-400 mb-8 max-w-lg">The Zagreb node is accepting seed peers. Claim your sovereign identity before the quorum closes.</p>
         <a href="/fusion" className="text-green-500 hover:text-green-400 underline decoration-dotted underline-offset-8 text-lg flex items-center gap-2">
            INITIALIZE FUSION <ArrowRight className="w-4 h-4" />
         </a>
      </section>
    </div>
  );
}

function Cluster({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="p-8 border border-gray-800 rounded-lg hover:border-green-900/50 transition-colors group">
       <div className="mb-6 p-4 bg-gray-900/30 rounded w-fit group-hover:bg-gray-900 transition-colors">{icon}</div>
       <h3 className="text-2xl font-bold mb-4">{title}</h3>
       <p className="text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}
`;

const targetDir = path.join(process.cwd(), 'src', 'routes', 'content');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const fileName = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.tsx';
const filePath = path.join(targetDir, fileName);

fs.writeFileSync(filePath, template);

console.log(`✅ Generated Pillar Page: ${filePath}`);
console.log('👉 Next step: Add route mapping in src/router.tsx');
