import * as React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { 
    INSTITUTIONAL_TRANSITION, 
    HEAVY_EASE, 
    staggerContainer, 
    slideUpHeavy, 
    fadeInHeavy 
} from '../lib/motion-presets';

export function DocsRoute() {
  return (
    <section className="relative min-h-screen bg-black pt-40 pb-32 selection:bg-green-500/20">
            {/* Hard grid architecture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[size:64px_64px] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]" />
            
            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-32 space-y-8"
                >
                    <motion.div 
                        variants={fadeInHeavy}
                        className="inline-block px-4 py-1.5 border border-white/5 bg-white/[0.02] text-neutral-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 rounded-sm"
                    >
                        PROTOCOL_RESOURCES_V7
                    </motion.div>
                    
                    <motion.h1 
                        variants={slideUpHeavy}
                        className="text-5xl md:text-8xl font-bold tracking-tight text-white uppercase leading-[0.85]"
                    >
                        Technical <br/>
                        <span className="text-neutral-500 italic lowercase tracking-tight">Documentation.</span>
                    </motion.h1>
                    <motion.p 
                        variants={fadeInHeavy}
                        className="text-xl text-neutral-500 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Deep dive into strict architectural protocols, implementation guides, and compliance frameworks.
                    </motion.p>
                </motion.div>

                {/* Documentation Grid */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {[
                        {
                            title: "Technical Whitepaper",
                            desc: "Complete technical architecture and compliance framework documentation of the V7 kernel.",
                            icon: FileText,
                            action: "Download PDF",
                            type: "pdf"
                        },
                        {
                            title: "API Documentation",
                            desc: "Complete API reference and integration guides for SlavkoKernel protocols and secure end-points.",
                            icon: ExternalLink,
                            action: "View Specs",
                            type: "external"
                        },
                        {
                            title: "EU AI Act Guide",
                            desc: "Step-by-step guide for achieving EU AI Act compliance with FormatDisc autonomous systems.",
                            icon: FileText,
                            action: "Download Guide",
                            type: "pdf"
                        }
                    ].map((doc, i) => (
                        <motion.div 
                            key={i}
                            variants={slideUpHeavy}
                            className="group relative bg-neutral-950 border border-white/5 p-10 rounded-sm hover:border-white/20 transition-all duration-700 hover:-translate-y-2"
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-white/30 transition-colors" />
                            
                            <div className="w-12 h-12 bg-white/[0.02] border border-white/5 rounded-sm flex items-center justify-center mb-8 group-hover:bg-white/[0.05] transition-all duration-700">
                                <doc.icon className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors duration-700" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{doc.title}</h3>
                            <p className="text-sm text-neutral-500 mb-10 leading-relaxed font-light">
                                {doc.desc}
                            </p>
                            
                            <button className="flex items-center gap-3 text-[10px] font-bold text-neutral-400 group-hover:text-green-500 uppercase tracking-[0.3em] transition-all duration-700">
                                {doc.type === 'pdf' ? <Download size={14} /> : <ExternalLink size={14} />}
                                <span>{doc.action}</span>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* Secondary list */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-20 border-t border-white/5 flex flex-col items-center"
                >
                    <p className="text-neutral-700 text-[10px] uppercase tracking-[0.4em] font-mono mb-12">Latest_Protocol_Updates</p>
                    <div className="w-full max-w-2xl space-y-4">
                        {[
                            { date: "JAN_2026", label: "Kernel_v7.0.4r Patch Notes: Multi-Region Sync", status: "VERIFIED" },
                            { date: "DEC_2025", label: "Security_Audit: L7 Identity Boundary Proof", status: "SIGNED" },
                            { date: "NOV_2025", label: "Hardware_Acceleration: H100 Optimization Layer", status: "STABLE" }
                        ].map((update, i) => (
                          <div key={i} className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group cursor-default">
                            <div className="flex items-center gap-6">
                              <span className="text-neutral-700 font-mono text-[9px] group-hover:text-neutral-500">{update.date}</span>
                              <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">{update.label}</span>
                            </div>
                            <span className="text-green-500/50 font-mono text-[9px] tracking-widest group-hover:text-green-500 transition-colors">[{update.status}]</span>
                          </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>);
}

DocsRoute.displayName = 'DocsRoute';