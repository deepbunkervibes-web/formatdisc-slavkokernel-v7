import * as React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { staggerContainer, slideUpHeavy } from '../../lib/motion-presets';

const plans = [
    {
        name: "Seed Kernel",
        price: "0€",
        period: "/ month",
        desc: "For individual architects and experimental validation.",
        features: ["1 Active Kernel Instance", "7-Day Audit Retention", "Community Support", "Basic Determinism Checks"],
        cta: "Deploy Kernel",
        highlight: false
    },
    {
        name: "Growth Circuit",
        price: "2,900€",
        period: "/ month",
        desc: "For series-A teams demanding operational rigor.",
        features: ["Unlimited Instances", "1-Year Audit Retention", "Priority SLA Support", "Full Governance Suite", "Visual Architecture Map"],
        cta: "Upgrade Circuit",
        highlight: true
    },
    {
        name: "Enterprise Lattice",
        price: "Custom",
        period: "",
        desc: "For institutions requiring cryptographic proof of state.",
        features: ["Private Cloud Deployment", "Infinite Audit Retention", "Dedicated Solutions Architect", "Custom Compliance Modules", "Regulatory Export Packs"],
        cta: "Book Consultation",
        highlight: false
    }
];

export const PricingSection = React.memo(() => {
    return (
        <section id="pricing" className="py-32 bg-black border-t border-white/5 selection:bg-green-500/20">
            <div className="max-w-7xl mx-auto px-6">
                <header className="text-center mb-20 px-4">
                    <p className="text-neutral-500 font-mono text-[10px] mb-4 tracking-[0.4em] uppercase tracking-widest">FINANCIAL_GOVERNANCE</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Predictable pricing for <br/> <span className="text-neutral-500 italic">serious infrastructure.</span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        We monetize predictability, not user seats. Choose the governance level that matches your risk profile.
                    </p>
                </header>

                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {plans.map((plan, i) => (
                        <motion.div 
                            key={i}
                            variants={slideUpHeavy}
                            className={`
                                relative p-10 rounded-sm border flex flex-col h-full transition-all duration-700 group
                                ${plan.highlight 
                                    ? 'bg-neutral-900/50 border-green-500/30' 
                                    : 'bg-black border-white/5 hover:border-white/10'}
                            `}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 right-0 bg-green-500/10 text-green-500 text-[9px] uppercase font-bold p-3 tracking-[0.2em] border-l border-b border-green-500/20">
                                    Recommended_Path
                                </div>
                            )}

                            <div className="mb-12">
                                <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-[0.3em] mb-4 group-hover:text-white transition-colors duration-500">{plan.name}</h3>
                                <div className="flex items-baseline mb-4">
                                    <span className="text-5xl font-bold text-white tracking-tighter">{plan.price}</span>
                                    <span className="text-neutral-600 ml-3 text-xs font-mono uppercase tracking-widest">{plan.period}</span>
                                </div>
                                <p className="text-sm text-neutral-500 font-light leading-relaxed">{plan.desc}</p>
                            </div>
                            
                            <ul className="space-y-5 mb-12 flex-1 pt-8 border-t border-white/5">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500">
                                        <Check size={14} className={plan.highlight ? "text-green-500 shrink-0 mt-0.5" : "text-neutral-800 shrink-0 mt-0.5"} />
                                        <span className="leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`
                                w-full py-5 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500
                                ${plan.highlight 
                                    ? 'bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-900/20' 
                                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}
                            `}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

PricingSection.displayName = 'PricingSection';
