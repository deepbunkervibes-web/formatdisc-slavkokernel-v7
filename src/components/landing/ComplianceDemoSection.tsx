import * as React from 'react';import { Suspense, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

import { useLanguage } from '../../context/LanguageContext';

const MvpStudio = React.lazy(() => import('../MvpStudio').then((module) => ({ default: module.MvpStudio })));

const DemoSkeleton = () =>
<div className="h-96 bg-neutral-50 dark:bg-neutral-900 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-neutral-300 dark:text-neutral-600 font-mono text-xs uppercase tracking-widest">Initialising Kernel...</div>
    </div>;


export const ComplianceDemoSection = React.memo(() => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  const artifacts = useMemo(() => [
  { title: t.compliance.items.audit, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { title: t.compliance.items.proof, color: "text-accent-purple", bg: "bg-purple-50 dark:bg-purple-500/10" },
  { title: t.compliance.items.assessment, color: "text-accent-cyan", bg: "bg-blue-50 dark:bg-cyan-500/10" }],
  [t]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-background">
            <div className="sticky top-0 flex min-h-screen items-center justify-center py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <motion.div
            style={{ opacity, y }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20">
            
                        <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-6 tracking-tight">
                            {t.compliance.title}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                            {t.compliance.description}
                        </p>
                    </motion.div>

                    <motion.div
            style={{ scale, opacity }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-card overflow-hidden">
                                <div className="bg-neutral-50/50 dark:bg-neutral-800/50 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Protocol / Studio_Lite</span>
                                    <div className="flex space-x-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
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
                        </div>

                        <div className="space-y-8 lg:pt-10">
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-foreground tracking-tight">{t.compliance.artifacts}</h3>
                                <div className="space-y-3">
                                    {artifacts.map((item, i) =>
                  <div key={i} className="group flex items-center space-x-4 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all">
                                            <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center`}>
                                                <CheckCircle className={`w-4 h-4 ${item.color}`} />
                                            </div>
                                            <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">{item.title}</span>
                                        </div>
                  )}
                                </div>
                            </div>

                            <div className="pt-4">
                                <a
                  href="/studio"
                  className="
                                        w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-4 rounded-xl font-medium 
                                        hover:opacity-90 transition-all flex items-center justify-between group 
                                        shadow-lg focus-visible:ring-2 focus-visible:ring-accent-cyan/40
                                    ">




                  
                                    <span>{t.compliance.openStudio}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>);

});

ComplianceDemoSection.displayName = 'ComplianceDemoSection';