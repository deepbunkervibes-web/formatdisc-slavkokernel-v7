import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Binary, ShieldCheck, ArrowRight } from 'lucide-react';

export const OrchestrationTeaser: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-mono font-black text-white uppercase leading-none mb-6">
                                <span className="text-cyan-400 block mb-2">Dva Puta.</span>
                                Jedna Jurisdikcija.
                            </h2>
                            <p className="text-xl text-gray-400 font-mono mb-8 max-w-xl">
                                Od 3.000 sati ručnog rada do automatiziranog audit-pipelinea.
                                SlavkoKernel ne automatizira povjerenje — on ga kodificira.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/orchestration')}
                                    className="px-8 py-4 bg-cyan-500 text-black font-mono font-black uppercase flex items-center gap-3"
                                >
                                    Uđi u Hub <ArrowRight size={20} />
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                        {[
                            {
                                title: "RUČNA",
                                subtitle: "3.000+ Sati discipline",
                                icon: Binary,
                                path: "/orchestration/manual"
                            },
                            {
                                title: "AUTOMATIZIRANA",
                                subtitle: "Skalabilni audit pipeline",
                                icon: ShieldCheck,
                                path: "/orchestration/automated"
                            }
                        ].map((box, i) => (
                            <motion.div
                                key={box.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ borderColor: 'rgba(0,255,255,0.4)', x: 10 }}
                                onClick={() => navigate(box.path)}
                                className="group p-6 bg-gray-950 border border-white/10 cursor-pointer transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <box.icon className="text-cyan-500 w-8 h-8" />
                                        <div>
                                            <div className="text-xs text-cyan-600 font-mono font-bold">{box.title}</div>
                                            <div className="text-white font-mono font-black">{box.subtitle}</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-gray-700 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/5 blur-[100px] pointer-events-none" />
        </section>
    );
};
