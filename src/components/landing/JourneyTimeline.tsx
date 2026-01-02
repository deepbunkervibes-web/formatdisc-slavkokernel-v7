import * as React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Box, Play, Rocket } from 'lucide-react';
import { staggerContainer, slideUpHeavy } from '../../lib/motion-presets';

const steps = [
    {
        title: "Initialize the Kernel",
        description: "Establish behavioral contracts, constraints, and system law.",
        icon: Terminal
    },
    {
        title: "Model the Architecture",
        description: "Visualize dependencies, flows, and operational surfaces.",
        icon: Box
    },
    {
        title: "Simulate Scenarios",
        description: "Stress-test assumptions, risks, and growth trajectories.",
        icon: Play
    },
    {
        title: "Deploy with Confidence",
        description: "A reproducible, audit-safe system emerges — ready for real-world load.",
        icon: Rocket
    }
];

export const JourneyTimeline = React.memo(() => {
    return (
        <section className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
             {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-green-500/5 blur-[120px] pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                     <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-neutral-500 font-mono text-xs mb-4 tracking-[0.3em] uppercase">
                        EXECUTION PATH
                    </motion.p>
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
                        From chaos to clarity — in a deterministic sequence.
                    </h2>
                </div>

                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
                >
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-px bg-white/5" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={slideUpHeavy}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Checkpoint Node */}
                                <div className="z-10 w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8 group-hover:border-green-500/50 group-hover:bg-white/[0.02] transition-all duration-700">
                                    <Icon className="text-neutral-500 w-8 h-8 group-hover:text-green-500 transition-colors duration-500" />
                                </div>

                                <div className="space-y-4 max-w-[240px]">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-mono text-neutral-600 mb-2">STEP 0{index + 1}</span>
                                        <h3 className="text-lg font-bold text-white">{step.title}</h3>
                                    </div>
                                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
});

JourneyTimeline.displayName = 'JourneyTimeline';