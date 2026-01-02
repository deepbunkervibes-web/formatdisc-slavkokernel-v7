import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { 
  staggerContainer, 
  slideUpHeavy, 
  fadeInHeavy 
} from '../../lib/motion-presets';

const StatusBadge = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
    <div className={`flex items-center space-x-2 px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-mono ${active ? 'text-green-500' : 'text-neutral-500'}`}>
        <div className={`w-1 h-1 rounded-full ${active ? 'bg-green-500 animate-pulse' : 'bg-neutral-800'}`} />
        <span>{children}</span>
    </div>
);

export const HeroSection = React.memo(() => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-black selection:bg-green-500/30 selection:text-green-200">
            {/* Background Grid & Ambient Glow */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-green-500/5 blur-[120px] rounded-full" />

            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="container max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center"
            >
                {/* Status Indicator */}
                <motion.div variants={fadeInHeavy} className="mb-12 flex items-center gap-3">
                    <StatusBadge active>Kernel Engine Active</StatusBadge>
                    <StatusBadge>V7.0 Stable</StatusBadge>
                </motion.div>

                {/* Headline */}
                <motion.h1 
                    variants={slideUpHeavy}
                    className="text-6xl md:text-8xl lg:text-[100px] font-bold text-white tracking-tight leading-[0.9] mb-8"
                >
                    Summon the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                        Kernel.
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p 
                    variants={slideUpHeavy}
                    className="text-lg md:text-2xl text-neutral-400 font-light max-w-2xl mb-12 leading-relaxed"
                >
                    Standardize your deployment surface. Eliminate architectural drift. 
                    Establish a <span className="text-white font-normal underline decoration-green-500/30 underline-offset-4">deterministic sanctuary</span> for your startup's core.
                </motion.p>

                {/* Unified CTA Logic */}
                <motion.div 
                    variants={slideUpHeavy}
                    className="flex flex-col sm:flex-row items-center gap-6 mb-24"
                >
                    <button 
                        onClick={() => document.getElementById('simulation-mode')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative w-full sm:w-auto px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-sm transition-all duration-300 shadow-xl shadow-green-900/20 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                            Run a Simulation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                    
                    <Link to="/investors" className="group w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-sm border border-white/10 transition-all duration-300 flex items-center justify-center">
                        <span className="flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                            Institutional Access <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </span>
                    </Link>
                </motion.div>

                {/* Passive Static Telemetry (No Motion to maintain grounding) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-4 pt-12 border-t border-white/5 w-full max-w-4xl">
                    <div className="text-left py-4">
                        <div className="text-[10px] text-neutral-500 uppercase tracking-[.3em] font-mono mb-1">State</div>
                        <div className="text-xs text-green-500 font-mono">STABILIZED</div>
                    </div>
                    <div className="text-left py-4">
                        <div className="text-[10px] text-neutral-500 uppercase tracking-[.3em] font-mono mb-1">Audit Trail</div>
                        <div className="text-xs text-white font-mono uppercase">Read-Only Enforced</div>
                    </div>
                    <div className="text-left py-4 border-l md:border-l-0 border-white/5 pl-4 md:pl-0">
                        <div className="text-[10px] text-neutral-500 uppercase tracking-[.3em] font-mono mb-1">Governance</div>
                        <div className="text-xs text-white font-mono uppercase">Token Gated</div>
                    </div>
                    <div className="text-left py-4 border-l md:border-l-0 border-white/5 pl-4 md:pl-0">
                        <div className="text-[10px] text-neutral-500 uppercase tracking-[.3em] font-mono mb-1">Uptime</div>
                        <div className="text-xs text-white font-mono uppercase">99.999% Proven</div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
});

HeroSection.displayName = 'HeroSection';