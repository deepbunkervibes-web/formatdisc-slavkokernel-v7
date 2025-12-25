import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

const MvpStudio = React.lazy(() => import('../MvpStudio').then(module => ({ default: module.MvpStudio })));

const DemoSkeleton = () => (
    <div className="h-96 bg-neutral-50 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-neutral-300">Loading Compliance Demo...</div>
    </div>
);

export function ComplianceDemoSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
    const y = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

    return (
        <section ref={containerRef} className="relative h-[150vh] bg-background">
            <div className="sticky top-0 flex min-h-screen items-center justify-center py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    {/* Section Header */}
                    <motion.div
                        style={{ opacity, y }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-6 tracking-tight">
                            Experience Governance
                        </h2>
                        <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
                            See how FormatDisc transforms any idea into a regulator-ready process.
                        </p>
                    </motion.div>

                    {/* Demo Container */}
                    <motion.div
                        style={{ scale, opacity }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
                    >
                        {/* Demo App */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl border border-neutral-200 shadow-card overflow-hidden">
                                <div className="bg-neutral-50/50 px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Protocol / Studio</span>
                                    <div className="flex space-x-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-200"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-200"></div>
                                    </div>
                                </div>
                                <div className="p-1">
                                    <Suspense fallback={<DemoSkeleton />}>
                                        <MvpStudio
                                            complianceMode={true}
                                            showLineageTrace={true}
                                            showDeterminismProof={true}
                                            compactMode={true}
                                        />
                                    </Suspense>
                                </div>
                            </div>
                        </div>

                        {/* Compliance Sidebar */}
                        <div className="space-y-8 lg:pt-10">
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">Compliance Artifacts</h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "Immutable Audit Trail", color: "text-emerald-600", bg: "bg-emerald-50" },
                                        { title: "Deterministic Proof", color: "text-accent-purple", bg: "bg-purple-50" },
                                        { title: "EU AI Act Assessment", color: "text-accent-cyan", bg: "bg-blue-50" }
                                    ].map((item, i) => (
                                        <div key={i} className="group flex items-center space-x-4 p-4 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50 transition-ui">
                                            <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center`}>
                                                <CheckCircle className={`w-4 h-4 ${item.color}`} />
                                            </div>
                                            <span className="text-sm text-neutral-700 font-medium">{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="pt-4">
                                <a
                                    href="/studio"
                                    className="
                                        w-full bg-neutral-900 text-white px-6 py-4 rounded-xl font-medium 
                                        hover:bg-neutral-800 transition-ui flex items-center justify-between group 
                                        shadow-glow-subtle focus-visible:ring-2 focus-visible:ring-accent-cyan/40
                                    "
                                >
                                    <span>Open Full Studio</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
