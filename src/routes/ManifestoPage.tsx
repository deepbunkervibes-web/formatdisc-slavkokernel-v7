import * as React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/ui/Navigation';
import { Footer } from '../components/ui/Footer';
import {
    INSTITUTIONAL_TRANSITION,
    staggerContainer,
    slideUpHeavy,
    fadeInHeavy
} from '../lib/motion-presets';

export const ManifestoPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-green-500/20 selection:text-green-200">
      <Navigation />
      
      <main className="flex-grow pt-40 pb-32 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.header 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-32 text-center"
          >
            <motion.p 
              variants={fadeInHeavy}
              className="text-green-500 font-mono text-[10px] mb-6 tracking-[0.5em] uppercase"
            >
              OPERATIONAL_DOCTRINE_V7.0
            </motion.p>
            <motion.h1 
              variants={slideUpHeavy}
              className="text-4xl md:text-7xl font-bold tracking-tight mb-10 leading-[0.9]"
            >
              The FormatDisc <br/>
              <span className="text-neutral-500 italic">Operational Manifesto.</span>
            </motion.h1>
            <motion.p 
              variants={fadeInHeavy}
              className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto"
            >
              Software architecture is not an art. <br/>
              It is a rigorous discipline of <span className="text-white">constraint</span>, <span className="text-white">verification</span>, and <span className="text-white">proof</span>.
            </motion.p>
          </motion.header>

          {/* Principles */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-32"
          >
            {[
              {
                number: "PROTOCOL_01",
                title: "Determinism over Optimism",
                body: "Software should not 'hope' to run correctly. It must verify its state before execution. If the environment does not match the rigorous constraints defined by the kernel, the system must refuse to boot."
              },
              {
                number: "PROTOCOL_02",
                title: "Explicit Constraints over Implicit Conventions",
                body: "Tribal knowledge is a failure of architecture. Every dependency, every flow, and every operational boundary must be explicitly defined in code, visualisable by the kernel, and enforceable by the runtime."
              },
              {
                number: "PROTOCOL_03",
                title: "Auditability as a First-Class Citizen",
                body: "A system that cannot prove its history is a liability. Every state change, every deployment, and every configuration shift must be cryptographically signed and stored in an immutable ledger."
              },
              {
                number: "PROTOCOL_04",
                title: "The Kernel is the Only Truth",
                body: "There is no 'production environment' separate from the definition. The Kernel definition is the environment. Drift is not an annoyance; it is a corruption of the system state that must be eliminated."
              }
            ].map((principle, index) => (
              <motion.section 
                key={principle.number}
                variants={slideUpHeavy}
                className="relative pl-12 border-l border-white/5 group hover:border-green-500/20 transition-all duration-1000"
              >
                <div className="absolute -left-[1.5px] top-0 w-[4px] h-[32px] bg-green-500/0 group-hover:bg-green-500/50 transition-all duration-700" />
                
                <span className="text-[10px] font-mono text-neutral-600 mb-4 block tracking-[0.3em] uppercase">{principle.number}</span>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">{principle.title}</h2>
                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                  {principle.body}
                </p>
              </motion.section>
            ))}
          </motion.div>

          {/* Signatures */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={INSTITUTIONAL_TRANSITION}
            viewport={{ once: true }}
            className="mt-40 pt-20 border-t border-white/5"
          >
             <div className="flex items-center space-x-8">
                <div className="w-20 h-20 rounded-sm bg-neutral-950 border border-white/10 flex items-center justify-center font-bold text-neutral-600 font-mono text-xs shadow-inner uppercase tracking-widest">
                    M_G
                </div>
                <div>
                    <div className="text-xl font-bold text-white tracking-tight">Mladen Gertner</div>
                    <div className="text-[10px] text-green-500 uppercase tracking-[0.4em] font-mono mt-3 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                        First Signatory
                    </div>
                </div>
            </div>
            <div className="mt-12 space-y-2 text-[10px] text-neutral-700 font-mono uppercase tracking-[0.3em]">
              <p>VALIDATED_BY: KERNEL_AUTH_L7</p>
              <p>HASH_TRACE: 0x77ae...9f21</p>
              <p>STATUS: LEGALLY_BINDING_SYSTEM_LAW</p>
            </div>
          </motion.div>

        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ManifestoPage;
