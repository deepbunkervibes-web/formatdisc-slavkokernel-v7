import * as React from 'react';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  staggerContainer, 
  slideUpHeavy, 
  fadeInHeavy 
} from '../../lib/motion-presets';

export const MetricsSection = React.memo(() => {
    const metrics = useMemo(() => [
        { label: "Startups Validated", value: "2,847+", desc: "Successful kernel deployments on v7 architecture." },
        { label: "Accuracy Rate", value: "94%", desc: "Deterministic projection precision recorded in audit logs." },
        { label: "Avg. Time Saved", value: "48h", desc: "Per deployment cycle using orchestrated states." },
        { label: "Investment Raised", value: "12M€", desc: "Total capital secured via FormatDisc verifiable data rooms." }
    ], []);

    return (
        <section className="py-24 bg-black overflow-hidden relative border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
                >
                    {metrics.map((metric, i) => (
                        <motion.div 
                            key={i}
                            variants={slideUpHeavy}
                            className="space-y-4 group"
                        >
                            <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-[0.3em] group-hover:text-green-500 transition-colors duration-500">
                                {metric.label}
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                                {metric.value}
                            </div>
                            <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-[200px]">
                                {metric.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

MetricsSection.displayName = 'MetricsSection';