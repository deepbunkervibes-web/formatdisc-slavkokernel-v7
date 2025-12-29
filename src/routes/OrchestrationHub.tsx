import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeadingBlock, SectionDivider } from '../components/orchestration/OrchestrationHelpers';
import { QuantumPreview } from '../components/orchestration/QuantumPreview';
import { User, Cpu, ArrowRight } from 'lucide-react';
import { motionTokens } from '../constants/motionTokens';

const OrchestrationHub: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30 pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Founding Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: motionTokens.duration.slow, ease: motionTokens.ease.audit }}
                    className="mb-24 text-center"
                >
                    <div className="inline-block px-4 py-1.5 border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                        Constitutional Boundary
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 leading-[0.9]">
                        Orchestration is <br />not a feature.<br />
                        <span className="text-cyan-500 italic">It is a law.</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                        U svijetu SlavkoKernela, orkestracija je čin suvereniteta.
                        Ovdje definiramo granicu između ljudske namjere i sistemske egzekucije.
                    </p>
                </motion.div>

                {/* Central Quantum Surface */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <QuantumPreview mode="hub" />
                    <p className="mt-6 text-center text-gray-600 text-[10px] uppercase tracking-[0.4em] font-black">
                        Quantum Orchestration Surface · v1.0.0
                    </p>
                </motion.div>

                {/* Path Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Manual */}
                    <motion.div
                        whileHover={{ y: -10, borderColor: 'rgba(0,255,255,0.4)', backgroundColor: 'rgba(0,255,157,0.02)' }}
                        onClick={() => navigate('/orchestration/manual')}
                        className="group p-10 bg-gray-900/10 border border-white/5 cursor-pointer transition-all flex flex-col justify-between min-h-[440px]"
                    >
                        <div>
                            <div className="flex items-center gap-5 mb-10">
                                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-sm">
                                    <User className="text-cyan-400 w-10 h-10" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-1">Human Intent</div>
                                    <div className="text-2xl font-black text-white uppercase">RUČNA</div>
                                </div>
                            </div>
                            <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">3.000 Sati Discipline</h3>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                SlavkoKernel nije nastao automatizacijom, nego ručnom orkestracijom.
                                Istražite put od servisera do suverenog kernela.
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-cyan-500 font-black uppercase tracking-[0.2em] text-xs">
                            <span>Sovereignty details</span>
                            <ArrowRight className="group-hover:translate-x-3 transition-transform" />
                        </div>
                    </motion.div>

                    {/* Automated */}
                    <motion.div
                        whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                        onClick={() => navigate('/orchestration/automated')}
                        className="group p-10 bg-gray-950 border border-white/10 cursor-pointer transition-all flex flex-col justify-between min-h-[440px]"
                    >
                        <div>
                            <div className="flex items-center gap-5 mb-10">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                                    <Cpu className="text-white w-10 h-10" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">System Execution</div>
                                    <div className="text-2xl font-black text-white uppercase">AUTOMATIZIRANA</div>
                                </div>
                            </div>
                            <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">Kinetic Scaling</h3>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                Kad je zakon definiran, kernel preuzima.
                                Skalabilni audit pipelineovi koji ne žrtvuju suverenitet radi brzine.
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-white/50 group-hover:text-white font-black uppercase tracking-[0.2em] text-xs transition-colors">
                            <span>Infrastructure layer</span>
                            <ArrowRight className="group-hover:translate-x-3 transition-transform" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default OrchestrationHub;
