import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeadingBlock, SectionDivider } from '../components/orchestration/OrchestrationHelpers';
import { QuantumPreview } from '../components/orchestration/QuantumPreview';
import { Cpu, Repeat, Activity, FileCode, ArrowLeft, Mail, Network } from 'lucide-react';
import { motionTokens } from '../constants/motionTokens';

const AutomatedOrchestration: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30 pt-20 pb-20">
            {/* Nav Back */}
            <div className="max-w-4xl mx-auto px-6 pt-8 mb-16">
                <button
                    onClick={() => navigate('/orchestration')}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.3em]"
                >
                    <ArrowLeft size={14} /> Back to Hub
                </button>
            </div>

            <main className="max-w-4xl mx-auto px-6">
                {/* Hero section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: motionTokens.duration.slow }}
                    className="mb-32"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-10">
                        <Network size={14} /> System Execution
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.85]">
                        Automatizirana <br />
                        <span className="text-white border-b-8 border-cyan-500/30">Orkestracija.</span>
                    </h1>
                    <p className="text-2xl text-gray-500 leading-tight max-w-2xl mb-16">
                        Kad Kernel Preuzme Teret, Ali Ne I Odgovornost. Skalabilnost bez gubitka suvereniteta.
                    </p>

                    <div className="p-10 bg-gray-950 border border-white/10 rounded-sm flex items-center justify-between">
                        <div>
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest font-black mb-2">Infra Status</div>
                            <div className="flex items-center gap-4">
                                <div className="h-4 w-4 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(0,255,157,0.5)]" />
                                <div className="text-2xl font-black uppercase tracking-widest">Active Audit Pipeline</div>
                            </div>
                        </div>
                        <Cpu className="text-white/20 w-12 h-12" />
                    </div>
                </motion.section>

                <SectionDivider />

                {/* Definition */}
                <section className="mb-32">
                    <HeadingBlock title="Implementacija" subtitle="Što podrazumijevam pod “automatiziranom orkestracijom”?" />
                    <div className="space-y-12 text-gray-400 text-xl leading-relaxed">
                        <p>
                            Automatizirana orkestracija znači da HPA, CI/CD, monitoring i audit rade bez ručnog nadzora – ali na temelju ručno definiranih pravila i forenzički provjerenih tokova.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: Repeat, title: "Regulatorni Kontekst", desc: "EU AI Act traži dokazive tokove, ne samo “radi nam u produkciji”." },
                                { icon: Activity, title: "Operativna Realnost", desc: "Ručna orkestracija ne skala – ali automatizacija bez ručnog temelja je hazard." },
                                { icon: FileCode, title: "FORMATDISC Pristup", desc: "Prvo ručno, forenzički, dokazivo. Tek onda automatizirano, skalabilno, reproducibilno." },
                                { icon: Cpu, title: "Code-as-Law", desc: "Podrazumijeva AI sustave koji su deterministički i auditabilni po dizajnu." }
                            ].map((item, i) => (
                                <div key={i} className="p-8 border border-white/5 bg-gray-900/10 group hover:border-cyan-500/30 transition-colors">
                                    <div className="flex gap-4 items-center mb-6">
                                        {item.icon && <item.icon className="text-cyan-500 w-6 h-6" />}
                                        <div className="text-white font-black uppercase tracking-tight">{item.title}</div>
                                    </div>
                                    <p className="text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Predavanja Section */}
                <section className="mb-32">
                    <HeadingBlock title="Predavanja 2025" subtitle="Kako izgleda kernel koji radi sam" />
                    <ul className="grid grid-cols-1 gap-4 mb-32">
                        {[
                            "Od ručnog do automatiziranog",
                            "Anatomija SlavkoKernel infrastrukture",
                            "SlavkoAuditKit u produkciji",
                            "Zero-touch deploy, full-touch audit",
                            "EU AI Act kao CI/CD zahtjev"
                        ].map((theme, i) => (
                            <li key={i} className="flex gap-4 items-center p-4 bg-gray-900/40 text-gray-300 border-l-2 border-cyan-500/50">
                                <span className="text-cyan-500 text-xs font-black">[{i + 1}]</span>
                                <span className="font-bold uppercase tracking-tight text-sm">{theme}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mb-12">
                        <HeadingBlock title="Quantum TV" subtitle="4D Pregled Automatizirane Infrastrukture" />
                        <p className="text-gray-500 max-w-xl text-lg italic uppercase tracking-tighter">
                            Ne pričamo samo o YAML-u i logovima – gledamo kako se sustav ponaša kroz vrijeme.
                        </p>
                    </div>
                    <QuantumPreview mode="automated" />
                    <div className="mt-10 p-8 bg-gray-950 border border-white/10 rounded-sm">
                        <h4 className="text-white font-black uppercase text-sm mb-4 tracking-widest">Što gledaš:</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Vizualni prikaz CI/CD pipelineova, HPA skaliranja i audit logova.
                            Ovo je 4D render vašeg AI sustava pod opterećenjem, pod greškom i pod regulatornim zahtjevom.
                        </p>
                    </div>
                </section>

                <SectionDivider />

                {/* CTA */}
                <motion.section
                    whileHover={{ scale: 1.02 }}
                    className="p-16 border-2 border-cyan-500/30 text-white text-center rounded-sm bg-cyan-950/10"
                >
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter text-cyan-400">Tehnička radionica</h2>
                    <p className="text-xl font-bold mb-10 text-gray-300 uppercase tracking-tight max-w-xl mx-auto">
                        Javi se s naslovom “Predavanje – Automatizirana Orkestracija AI Sustava”.
                    </p>
                    <a
                        href="mailto:mladen@formatdisc.hr?subject=Radionica - Automatizirana Orkestracija"
                        className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-cyan-400 transition-colors"
                    >
                        <Mail size={24} /> Schedule Session
                    </a>
                </motion.section>
            </main>

            {/* Kinetic Background elements */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[size:32px_32px] bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)]" />
        </div>
    );
};

export default AutomatedOrchestration;
