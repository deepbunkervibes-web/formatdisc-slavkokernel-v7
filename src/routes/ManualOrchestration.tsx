import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeadingBlock, SectionDivider } from '../components/orchestration/OrchestrationHelpers';
import { QuantumPreview } from '../components/orchestration/QuantumPreview';
import { Clock, Binary, Zap, ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { motionTokens } from '../constants/motionTokens';

const ManualOrchestration: React.FC = () => {
    const navigate = useNavigate();
    const [hours, setHours] = useState(0);
    const [projects, setProjects] = useState(0);

    useEffect(() => {
        const hInterval = setInterval(() => {
            setHours(prev => (prev < 3000 ? prev + 83 : 3000));
        }, 30);
        const pInterval = setInterval(() => {
            setProjects(prev => (prev < 300 ? prev + 11 : 300));
        }, 50);
        return () => { clearInterval(hInterval); clearInterval(pInterval); };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30 pt-20 pb-20">
            {/* Nav Back */}
            <div className="max-w-4xl mx-auto px-6 pt-8 mb-16">
                <button
                    onClick={() => navigate('/orchestration')}
                    className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-colors uppercase text-[10px] font-black tracking-[0.3em]"
                >
                    <ArrowLeft size={14} /> Back to Hub
                </button>
            </div>

            <main className="max-w-4xl mx-auto px-6">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: motionTokens.duration.slow }}
                    className="mb-32"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-10">
                        <ShieldCheck size={14} /> Sovereign Intent
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.85]">
                        Ručna <br />
                        <span className="text-cyan-500">Orkestracija.</span>
                    </h1>
                    <p className="text-2xl text-gray-400 leading-tight max-w-2xl mb-16">
                        Disciplina stvaranja AI suvereniteta kroz 3.000 sati ručnog rada. Bez tima. Bez prečaca.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="p-10 bg-gray-900/20 border border-cyan-500/10 rounded-sm"
                        >
                            <Clock className="text-cyan-500 mb-6 w-10 h-10" />
                            <div className="text-6xl font-black text-white mb-2 tracking-tighter">{hours.toLocaleString()}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Hours of labor</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="p-10 bg-gray-900/20 border border-cyan-500/10 rounded-sm"
                        >
                            <Binary className="text-cyan-500 mb-6 w-10 h-10" />
                            <div className="text-6xl font-black text-white mb-2 tracking-tighter">{projects}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Sovereign Projects</div>
                        </motion.div>
                    </div>
                </motion.section>

                <SectionDivider />

                {/* Narrative */}
                <section className="mb-32">
                    <HeadingBlock title="Vjerodostojnost" subtitle="Što znači biti ručni arhitekt?" />
                    <div className="space-y-10 text-gray-400 text-xl leading-relaxed">
                        <p>
                            Ručna orkestracija u SlavkoKernel svijetu znači da **nema skrivenog tima**.
                            Svaki commit, svaki deployment, svaki incident — nosi jedan potpis.
                            Ovo nije priča o "AI magiji", već o rigoroznom inženjerskom i forenzičkom radu.
                        </p>
                        <div className="space-y-6">
                            {[
                                "Bez crnih kutija: svaki AI tok ima auditni sloj i hash.",
                                "Bez naknadne dokumentacije: pitch, kernel i audit nastaju sinkrono.",
                                "Puna forenzička odgovornost za svaku liniju koda."
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-5 items-start"
                                >
                                    <Zap className="text-cyan-500 mt-1 shrink-0" size={20} />
                                    <span className="font-bold uppercase tracking-tight text-white/90">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quantum TV Section */}
                <section className="mb-32">
                    <div className="mb-12">
                        <HeadingBlock title="Quantum TV" subtitle="Hologramski Pregled Sustava" />
                        <p className="text-gray-500 max-w-xl text-lg italic uppercase tracking-tighter">
                            Zamislite ekran koji ne prikazuje samo UI, nego cijeli životni ciklus jedne odluke.
                        </p>
                    </div>
                    <QuantumPreview mode="manual" />
                    <div className="mt-10 p-8 bg-gray-900/10 border border-white/5 rounded-sm">
                        <h4 className="text-cyan-500 font-black uppercase text-sm mb-4 tracking-widest">Što gledaš:</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Ovo nije "lijepa animacija". Svaka linija predstavlja tok odluke kroz SlavkoKernel: 
                          ulazni signal -> prolazak kroz council -> hash-lančani audit zapis.
                            Ručna orkestracija znači da svaki od tih tokova ima ime, commit i odgovornu osobu.
                        </p>
                    </div>
                </section>

                <SectionDivider />

                {/* CTA */}
                <motion.section
                    whileHover={{ scale: 1.02 }}
                    className="p-16 bg-cyan-500 text-black text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter">Organiziraj predavanje</h2>
                    <p className="text-xl font-bold mb-10 opacity-80 uppercase tracking-tight max-w-xl mx-auto">
                        Pokažite svom timu kako izgleda ručno orkestriran AI sustav — bez filtera, bez marketinga.
                    </p>
                    <a
                        href="mailto:mladen@formatdisc.hr?subject=Predavanje - Ručna Orkestracija"
                        className="inline-flex items-center gap-4 px-12 py-5 bg-black text-cyan-500 font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform"
                    >
                        <Mail size={24} /> Get in touch
                    </a>
                </motion.section>
            </main>

            {/* Ambient Background Elements */}
            {[25, 30, 35].map((duration, i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration, repeat: Infinity, ease: "linear" }}
                    className={`fixed pointer-events-none ${i === 0 ? '-right-64 top-1/4' : i === 1 ? '-left-64 bottom-1/4' : 'top-0 left-1/2'} w-[500px] h-[500px] border border-cyan-500/5 rounded-full`}
                />
            ))}
        </div>
    );
};

export default ManualOrchestration;
