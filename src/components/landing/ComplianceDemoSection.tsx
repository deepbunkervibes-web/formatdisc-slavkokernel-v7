import * as React from 'react';
import { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { HEAVY_EASE } from '../../lib/motion-presets';

const MvpStudio = React.lazy(() => import('../MvpStudio').then((module) => ({ default: module.MvpStudio })));

const DemoSkeleton = () =>
    <div className="h-96 bg-neutral-900 rounded-sm animate-pulse flex items-center justify-center border border-white/10">
        <div className="text-neutral-500 font-mono text-xs uppercase tracking-widest">Initialising Kernel...</div>
    </div>;


export const ComplianceDemoSection = React.memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Institutional Scroll Mapping
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.98, 1]);

    return (
        <section ref={containerRef} className="relative min-h-[150vh] bg-black border-t border-white/5 selection:bg-green-500/20">
            <div className="sticky top-0 flex min-h-screen items-center justify-center py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <motion.div
                        style={{ opacity, y }}
                        className="text-center mb-20 px-4"
                    >
                        <p className="text-green-500 font-mono text-[10px] mb-4 tracking-[0.4em] uppercase">Gov_Protocol_04</p>
                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
                            Compliance is not a burden — <br/>
                            <span className="text-neutral-500 italic">it’s a competitive advantage.</span>
                        </h2>
                        <p className="text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
                            With FormatDisc, compliance becomes automated, transparent, and cryptographically verifiable. 
                            Establish a <span className="text-white">defensible artifact trail</span> for auditors and strategic partners.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

                        <motion.div
                            style={{ scale, opacity }} 
                            className="lg:col-span-2 relative group"
                        >
                            <div className="absolute -inset-1 bg-green-500/10 rounded-sm blur-2xl transition-opacity duration-1000 group-hover:opacity-100 opacity-30" />
                            <div className="bg-black rounded-sm border border-white/10 shadow-2xl overflow-hidden relative z-10">
                                <div className="bg-white/[0.03] px-5 py-4 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Shield size={14} className="text-green-500" />
                                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Compliance_Kernel :: DETERMINISTIC_LOCK</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/20 animate-pulse" />
                                    </div>
                                </div>
                                <div className="p-1">
                                    <Suspense fallback={<DemoSkeleton />}>
                                        <MvpStudio
                                            complianceMode={true}
                                            showLineageTrace={true}
                                            showDeterminismProof={true}
                                            compactMode={true} />
                                    </Suspense>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-12 h-full flex flex-col justify-center">
                            <div className="space-y-8">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-3">
                                    <div className="w-1 h-4 bg-green-500" />
                                    Verified Artifacts
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "Cryptographic Audit Log", 
                                        "Decision Lineage Trace", 
                                        "Regulatory Export Pack",
                                        "Kernel State Snapshot"
                                    ].map((item, i) =>
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i, ease: HEAVY_EASE }}
                                            className="group flex items-center space-x-4 p-5 rounded-sm border border-white/5 bg-white/[0.01] hover:border-green-500/30 hover:bg-green-500/[0.02] transition-all duration-700"
                                        >
                                            <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-500 group-hover:scale-150 transition-all duration-500" />
                                            <span className="text-xs text-neutral-400 font-mono tracking-wider group-hover:text-white transition-colors">{item}</span>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-8"
                            >
                                <Link
                                    to="/simulator"
                                    className="
                                        w-full bg-green-600 text-white px-8 py-5 rounded-sm font-bold tracking-[0.2em] uppercase font-mono text-xs
                                        hover:bg-green-500 transition-all duration-500 flex items-center justify-between group 
                                        shadow-[0_10px_30px_rgba(22,163,74,0.15)]
                                    "
                                >
                                    <span>Deploy Simulation</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

ComplianceDemoSection.displayName = 'ComplianceDemoSection';