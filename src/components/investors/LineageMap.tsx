import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Activity, Database, CheckCircle, ArrowRight } from 'lucide-react';

export function LineageMap() {
    const steps = [
        {
            icon: Activity,
            label: 'Input Signal',
            detail: 'Raw Data Ingestion',
            hash: '0x7f...3a2b'
        },
        {
            icon: GitCommit,
            label: 'Execution',
            detail: 'Deterministic Kernel',
            hash: '0x9c...1d4e'
        },
        {
            icon: Database,
            label: 'Governance',
            detail: 'Lineage Capture',
            hash: '0x2b...8f9a'
        },
        {
            icon: CheckCircle,
            label: 'Output',
            detail: 'Auditable Result',
            hash: '0x5e...0c1d'
        }
    ];

    return (
        <section className="py-16">
            <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-widest mb-10 text-center">Execution Lineage Map</h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
                {steps.map((step, i) => (
                    <React.Fragment key={i}>
                        <motion.div
                            className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl w-full md:w-48 flex flex-col items-center text-center relative hover:border-accent-purple/50 transition-colors group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-purple/10 group-hover:text-accent-purple transition-colors">
                                <step.icon className="w-5 h-5 text-neutral-400 group-hover:text-accent-purple transition-colors" />
                            </div>
                            <h4 className="text-white font-medium text-sm mb-1">{step.label}</h4>
                            <p className="text-xs text-neutral-500 mb-3">{step.detail}</p>
                            <div className="text-[10px] font-mono text-neutral-600 bg-neutral-950 px-2 py-1 rounded border border-neutral-900 truncate w-full">
                                {step.hash}
                            </div>
                        </motion.div>

                        {i < steps.length - 1 && (
                            <motion.div
                                className="text-neutral-700 hidden md:block px-4"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.15 + 0.1 }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </motion.div>
                        )}

                        {i < steps.length - 1 && (
                            <div className="h-8 w-[1px] bg-neutral-800 md:hidden" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
