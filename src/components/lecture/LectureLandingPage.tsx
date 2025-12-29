import React from 'react';
import { motion } from 'framer-motion';

const LectureLandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl md:text-5xl font-black text-cyan-400 mb-6 uppercase tracking-tight">
                        SlavkoKernel: 3000 Sati Ručne Orkestracije — Otvoreno Predavanje
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                        Prvi put javno. Bez filtera. Bez marketinga. Samo istina o tome kako je nastao najradikalniji AI governance kernel u regiji.
                    </p>
                </motion.div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-cyan-400 mb-6 uppercase border-b border-cyan-900/30 pb-2">Što ćete čuti</h2>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> Kako izgleda 3000 sati ručnog orkestriranja AI sustava</li>
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> Kako je iz 300 projekata nastao deterministički kernel</li>
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> Kako se gradi infrastruktura bez tima, bez investicije, bez kompromisa</li>
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> Kako izgleda stvarni rad iza “AI revolucije” — ne hype, nego praksa</li>
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> Zašto je ručni rad jedini put do stvarne auditabilnosti</li>
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> Kako se iz garaže gradi compliance OS za EU AI Act</li>
                        </ul>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold text-cyan-400 mb-6 uppercase border-b border-cyan-900/30 pb-2">Za koga je ovo</h2>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> Inženjere koji žele vidjeti stvarni rad, ne prezentacije</li>
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> Foundere koji žele razumjeti disciplinu, ne motivaciju</li>
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> Ljude koje zanima kako izgleda AI infrastruktura iznutra</li>
                            <li className="flex gap-3"><span className="text-cyan-500">→</span> One koji žele vidjeti dokaz, ne obećanje</li>
                        </ul>
                    </motion.section>
                </div>

                {/* Why Now & Format */}
                <div className="mt-20 space-y-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold text-cyan-400 mb-4 uppercase">Zašto sada</h2>
                        <p className="text-gray-400 text-lg">
                            Jer je SlavkoKernel prešao iz “osobnog projekta” u institucionalni artefakt. Vrijeme je da se pokaže kako je nastao.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold text-cyan-400 mb-6 uppercase">Format</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-400">
                            <li className="bg-gray-900/40 p-4 border border-white/5 rounded-sm">60 minuta predavanja</li>
                            <li className="bg-gray-900/40 p-4 border border-white/5 rounded-sm">30 minuta Q&A</li>
                            <li className="bg-gray-900/40 p-4 border border-white/5 rounded-sm">Live demonstracija determinističkog izvršenja</li>
                            <li className="bg-gray-900/40 p-4 border border-white/5 rounded-sm">Prikaz stvarnih audit logova i replay sustava</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Working Title */}
                <motion.div
                    className="mt-20 p-8 bg-cyan-950/20 border border-cyan-500/20 rounded-sm italic text-center"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest">Radni naslov predavanja</p>
                    <p className="text-2xl md:text-3xl font-bold text-white uppercase">
                        “Ručna Orkestracija: Kako sam izgradio AI Kernel bez tima, bez fondova i bez greške.”
                    </p>
                </motion.div>

                {/* Manual Orchestration Section */}
                <motion.section
                    className="mt-24 border-t border-cyan-500/10 pt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-black text-cyan-400 mb-12 uppercase text-center tracking-widest">
                        Primjeri Ručne Orkestracije
                    </h2>

                    <div className="space-y-8">
                        {[
                            {
                                title: "Auditni Sloj (SlavkoKernel Core)",
                                desc: "Manuelna integracija sidecar servisa za auditiranje LLM modela s real-time scoringom. Izrada ZIP distribucijskog paketa s ručno projektiranim JSON auditima.",
                                icon: "01"
                            },
                            {
                                title: "Pitch Paket & Outreach",
                                desc: "Ručno oblikovanje email tokova za institucionalne partnere (FER AI Lab, CroAI, Mindsmiths) i manuelno usklađivanje 'Claude admitted it' vizuala.",
                                icon: "02"
                            },
                            {
                                title: "Meta-Sadržaj u Dokumentaciji",
                                desc: "Umetanje meta-poruka u P.S. sekcije i HTML kodove unutar dokumenata za anticipiranje AI analize i 'behavior mapping'.",
                                icon: "03"
                            },
                            {
                                title: "Hardverska Dijagnostika",
                                desc: "Prijenos discipline hardverskog servisa (mikro-soldering, precizna dijagnostika) u preciznost AI koda. Nulta tolerancija na greške.",
                                icon: "04"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex gap-6 p-6 bg-gray-900/20 border border-white/5 hover:border-cyan-500/30 transition-all rounded-sm"
                            >
                                <div className="text-cyan-500 font-black text-2xl opacity-20 group-hover:opacity-100 transition-opacity">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 uppercase">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Final Hook */}
                <div className="mt-24 text-center">
                    <p className="text-gray-500 italic mb-8 max-w-lg mx-auto">
                        Ako želiš vidjeti kako izgleda stvarni AI rad — ne onaj s konferencija, nego onaj iz 3 ujutro — dođi.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                        animate={{
                            boxShadow: ["0 0 0px rgba(0,255,255,0)", "0 0 20px rgba(0,255,255,0.2)", "0 0 0px rgba(0,255,255,0)"]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <a
                            href="#prijava"
                            className="bg-cyan-500 text-black px-12 py-4 font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                        >
                            Prijave uskoro
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Pulse Animation Overlay for 'Ručni Rad' */}
            <motion.div
                className="fixed inset-0 pointer-events-none border-[1px] border-cyan-500/5"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Subtle Grid Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
    );
};

export default LectureLandingPage;
