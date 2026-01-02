import * as React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { INSTITUTIONAL_TRANSITION, HEAVY_EASE } from '../../lib/motion-presets';

export const FounderStorySection = React.memo(() => {
    return (
        <section className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none">
                <Quote size={200} className="text-white" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={INSTITUTIONAL_TRANSITION}
                    viewport={{ once: true }}
                    className="bg-white/[0.01] border border-white/5 p-12 rounded-sm md:p-16 relative group overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500/10 group-hover:bg-green-500/30 transition-colors duration-1000" />
                    
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1, ease: HEAVY_EASE }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-12 leading-tight"
                    >
                        Born from the wreckage of <br/>
                        <span className="text-neutral-500">failed deployments.</span>
                    </motion.h2>
                    
                    <div className="space-y-8 text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                        <p>
                            FormatDisc wasn't built for sale. <strong className="text-white font-medium">It was built for survival.</strong>
                        </p>
                        <p>
                            After watching six months of engineering work evaporate due to a single, silent configuration drift, we realized: hope is not a strategy. Determinism is.
                        </p>
                        <p>
                            Today, FormatDisc serves teams who have learned the same hard lesson — and refuse to learn it again. We provide the sanctuary our own systems lacked.
                        </p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 flex items-center space-x-6 border-t border-white/5 pt-10"
                    >
                        <div className="w-16 h-16 rounded-sm bg-[#0a0a0a] border border-white/10 flex items-center justify-center font-bold text-neutral-600 font-mono text-xs shadow-inner">
                            MG
                        </div>
                        <div>
                            <div className="text-base font-bold text-white tracking-tight">Mladen Gertner</div>
                            <div className="text-[10px] text-green-500 uppercase tracking-[0.3em] font-mono mt-2 flex items-center gap-2">
                                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                Founding Maintainer
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});

FounderStorySection.displayName = 'FounderStorySection';