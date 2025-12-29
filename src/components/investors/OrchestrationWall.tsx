import * as React from 'react';import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function OrchestrationWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ target: containerRef });

  const phases = [
  {
    id: '01',
    title: 'Kernel Genesis',
    desc: 'Architecture of the low-level deterministic kernel.',
    hours: '0 - 500h',
    items: ['Kernel Manifest', 'Memory Safe Allocator', 'Event Loop v1']
  },
  {
    id: '02',
    title: 'Deterministic Layer',
    desc: 'Eliminating randomness for auditability.',
    hours: '500 - 1200h',
    items: ['RNG Seeding', 'State Snapshots', 'Entropy Control']
  },
  {
    id: '03',
    title: 'Governance Surface',
    desc: 'API for compliance and observability.',
    hours: '1200 - 1800h',
    items: ['Audit API', 'Lineage Graph', 'Policy Hooks']
  },
  {
    id: '04',
    title: 'MVP Studio',
    desc: 'Building the application layer on top.',
    hours: '1800 - 2500h',
    items: ['Simulation Engine', 'Persona Agents', 'Council Logic']
  },
  {
    id: '05',
    title: 'Production Ready',
    desc: 'Polishing for institutional adoption.',
    hours: '2500 - 3000h',
    items: ['Security Hardening', 'Docs', 'Vercel Deployment']
  }];


  return (
    <section className="py-20 border-b border-neutral-800 bg-neutral-900/50">
            <div className="max-w-7xl mx-auto px-6 mb-10">
                <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-widest mb-2">3000-Hour Orchestration Wall</h3>
                <p className="text-neutral-400 max-w-2xl text-sm leading-relaxed">
                    A visual timeline of the solo engineering effort required to build SlavkoKernel from a theoretical concept to a production-grade infrastructure layer.
                </p>
            </div>

            <div
        ref={containerRef}
        className="overflow-x-auto pb-10 hide-scrollbar flex gap-8 px-6 snap-x snap-mandatory">
        
                {phases.map((phase, i) =>
        <motion.div
          key={phase.id}
          className="snap-center shrink-0 w-[300px] md:w-[350px] bg-neutral-950 border border-neutral-800 rounded-xl p-6 relative group hover:border-accent-cyan/30 transition-colors"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}>
          
                        {/* Connector Line */}
                        {i < phases.length - 1 &&
          <div className="absolute top-1/2 -right-8 w-8 h-[1px] bg-neutral-800 hidden md:block" />
          }

                        <div className="flex justify-between items-start mb-4">
                            <span className="text-4xl font-bold text-neutral-800 group-hover:text-neutral-700 transition-colors">{phase.id}</span>
                            <span className="text-xs font-mono text-neutral-500 bg-neutral-900 px-2 py-1 rounded border border-neutral-800">
                                {phase.hours}
                            </span>
                        </div>

                        <h4 className="text-lg font-semibold text-white mb-2">{phase.title}</h4>
                        <p className="text-sm text-neutral-400 mb-6 min-h-[40px]">{phase.desc}</p>

                        <ul className="space-y-2">
                            {phase.items.map((item, j) =>
            <li key={j} className="flex items-center gap-2 text-xs text-neutral-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-purple/50" />
                                    {item}
                                </li>
            )}
                        </ul>

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
        )}
            </div>
        </section>);

}