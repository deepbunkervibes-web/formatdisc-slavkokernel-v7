import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { QuantumPreview } from '../components/orchestration/QuantumPreview';
import { User, Cpu, ArrowRight } from 'lucide-react';
import { 
    INSTITUTIONAL_TRANSITION, 
    HEAVY_EASE, 
    staggerContainer, 
    slideUpHeavy, 
    fadeInHeavy 
} from '../lib/motion-presets';

const OrchestrationHub: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/20 pt-32 pb-32">
            <div className="max-w-6xl mx-auto px-6">
                {/* Founding Statement */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="mb-32 text-center"
                >
                    <motion.div 
                        variants={fadeInHeavy}
                        className="inline-block px-5 py-2 border border-green-500/10 bg-green-500/[0.02] text-green-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-12 rounded-sm"
                    >
                        CONSTITUTIONAL_BOUNDARY_L7
                    </motion.div>
                    <motion.h1 
                        variants={slideUpHeavy}
                        className="text-5xl md:text-8xl font-bold uppercase tracking-tight mb-12 leading-[0.85]"
                    >
                        Orchestration is <br />
                        <span className="text-neutral-500 italic lowercase tracking-tight">not a feature.</span><br />
                        <span className="text-green-500">It is a law.</span>
                    </motion.h1>
                    <motion.p 
                        variants={fadeInHeavy}
                        className="text-neutral-400 max-w-2xl mx-auto text-xl leading-relaxed font-light"
                    >
                        In the world of SlavkoKernel, orchestration is an act of sovereignty. 
                        We define the hard boundary between human intent and systemic execution.
                    </motion.p>
                </motion.div>

                {/* Central Quantum Surface */}
                <motion.div
                    variants={fadeInHeavy}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-32 group"
                >
                    <QuantumPreview mode="hub" />
                    <div className="mt-8 flex items-center justify-between px-2">
                         <p className="text-neutral-700 text-[9px] uppercase tracking-[0.5em] font-mono">
                            Quantum_Orchestration_Grid :: SECURE_SYNC
                        </p>
                        <p className="text-neutral-800 text-[9px] uppercase tracking-[0.5em] font-mono">
                            v7.0.4r
                        </p>
                    </div>
                </motion.div>

                {/* Path Selectors */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* Manual */}
                    <motion.div
                        variants={slideUpHeavy}
                        onClick={() => navigate('/orchestration/manual')}
                        className="group p-12 bg-neutral-950/50 border border-white/5 cursor-pointer transition-all duration-700 hover:border-green-500/20 flex flex-col justify-between min-h-[480px] rounded-sm relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/0 via-green-500/0 to-green-500/0 group-hover:via-green-500/30 transition-all duration-1000" />
                        
                        <div>
                            <div className="flex items-center gap-6 mb-12">
                                <div className="p-5 bg-white/[0.02] border border-white/10 rounded-sm group-hover:border-green-500/30 transition-all duration-700">
                                    <User className="text-neutral-500 group-hover:text-green-500 w-8 h-8 transition-colors duration-700" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.3em] mb-2">Source: Human_Intent</div>
                                    <div className="text-2xl font-bold text-white uppercase tracking-wider">Manual_Control</div>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold mb-8 uppercase tracking-tight text-white/90">3.000 Hours of Discipline.</h3>
                            <p className="text-neutral-500 text-lg leading-relaxed mb-8 font-light">
                                SlavkoKernel was not born from automation, but from manual orchestration. 
                                Explore the path from artisan to sovereign kernel.
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-neutral-600 group-hover:text-green-500 font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-700">
                            <span>Sovereignty_Ledger</span>
                            <ArrowRight className="group-hover:translate-x-3 transition-transform duration-700" />
                        </div>
                    </motion.div>

                    {/* Automated */}
                    <motion.div
                        variants={slideUpHeavy}
                        onClick={() => navigate('/orchestration/automated')}
                        className="group p-12 bg-neutral-950/50 border border-white/5 cursor-pointer transition-all duration-700 hover:border-white/20 flex flex-col justify-between min-h-[480px] rounded-sm relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/0 group-hover:bg-white/10 transition-all duration-1000" />

                        <div>
                            <div className="flex items-center gap-6 mb-12">
                                <div className="p-5 bg-white/[0.02] border border-white/10 rounded-sm group-hover:border-white/30 transition-all duration-700">
                                    <Cpu className="text-neutral-500 group-hover:text-white w-8 h-8 transition-colors duration-700" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.3em] mb-2">Source: System_Law</div>
                                    <div className="text-2xl font-bold text-white uppercase tracking-wider">Kinetic_Execution</div>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold mb-8 uppercase tracking-tight text-white/90">Autonomous Scaling.</h3>
                            <p className="text-neutral-500 text-lg leading-relaxed mb-8 font-light">
                                Once the law is defined, the kernel executes. 
                                Scalable audit pipelines that never sacrifice sovereignty for speed.
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-neutral-600 group-hover:text-white font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-700">
                            <span>Infrastructure_Protocol</span>
                            <ArrowRight className="group-hover:translate-x-3 transition-transform duration-700" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrchestrationHub;
