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
                        Kinetic <br />
                        <span className="text-white border-b-8 border-cyan-500/30">Scaling.</span>
                    </h1>
                    <p className="text-2xl text-gray-500 leading-tight max-w-2xl mb-16">
                        Kad je zakon ručno definiran, kernel preuzima volan. Skalabilnost bez gubitka suvereniteta.
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
                    <HeadingBlock title="Implementacija" subtitle="Automatizacija kao Code-as-Law" />
                    <div className="space-y-12 text-gray-400 text-xl leading-relaxed">
                        <p>
                            Automatizacija u SlavkoKernel svijetu nije prepuštanje "crnoj kutiji".
                            To je reprodukcija ručno dokazanih tokova kroz suverenu infrastrukturu.
                            Kernel drži ritam, a Kubernetes služi kao egzekutor zakona.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: Repeat, title: "Deterministički Tokovi", desc: "Isti input -> isti output -> isti hash. Svaki put." },
                                { icon: Activity, label: "HPA Skaliranje", desc: "Sustav raste bez ugrožavanja audit integriteta." },
                                { icon: FileCode, label: "Zero-Touch Audit", desc: "Automatsko generiranje forenzičkih logova po zakonu." },
                                { icon: Cpu, label: "Sovereign Infra", desc: "Vlastiti CI/CD pipelineovi koji enforcaju pravila." }
                            ].map((item, i) => (
                                <div key={i} className="p-8 border border-white/5 bg-gray-900/10 group hover:border-cyan-500/30 transition-colors">
                                    <div className="flex gap-4 items-center mb-6">
                                        {item.icon && <item.icon className="text-cyan-500 w-6 h-6" />}
                                        <div className="text-white font-black uppercase tracking-tight">{item.title || item.label}</div>
                                    </div>
                                    <p className="text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quantum Preview Automated */}
                <section className="mb-32">
                    <div className="mb-12">
                        <HeadingBlock title="Quantum Infra" subtitle="Sistemski Pregled Tokova" />
                        <p className="text-gray-500 max-w-xl text-lg italic uppercase tracking-tighter">
                            Vizualizacija kinetičke egzekucije pod opterećenjem.
                        </p>
                    </div>
                    <QuantumPreview mode="automated" />
                    <div className="mt-10 p-8 bg-gray-950 border border-white/10 rounded-sm">
                        <h4 className="text-white font-black uppercase text-sm mb-4 tracking-widest">Što gledaš:</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Ovo je vizualizacija automatizirane orkestracije: CI/CD pipelineovi guraju nove verzije,
                            dok se audit logovi monolitno zapisuju u realnom vremenu. Automatizacija ovdje nije
                            “AI radi što hoće”, nego “sustav izvršava ono što je ručno definirano”.
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
                        Fokusirana infra radionica za timove koji žele auditabilni, deterministički CI/CD.
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
