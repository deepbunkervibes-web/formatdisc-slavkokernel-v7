import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { staggerContainer, slideUpHeavy, INSTITUTIONAL_TRANSITION } from '../../lib/motion-presets';

export function Footer() {
    const { t } = useLanguage();

    const links = {
        Product: [
            { label: t('nav.studio'), href: 'https://simulate.formatdisc.hr', external: true },
            { label: 'Kernel Engine', href: '/kernel' },
            { label: t('nav.docs'), href: '/docs' }],

        Governance: [
            { label: 'Operational Manifesto', href: '/manifesto', external: false },
            { label: 'Ollama_Dist_v7', href: 'https://ollama.com/mladen-gertner/slavkokernel-v7', external: true },
            { label: 'GitHub_Repository', href: 'https://github.com/mladengertner', external: true }],

        Institutional: [
            { label: 'Investor_Data_Room', href: '/investors', external: false },
            { label: 'Schedule_Audit', href: 'https://cal.com/mladengertner', external: true }]
    };

    return (
        <footer className="border-t border-white/5 bg-black selection:bg-green-500/20">
            <div className="max-w-7xl mx-auto px-6 py-24">
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-5 gap-16"
                >
                    {/* Brand */}
                    <motion.div variants={slideUpHeavy} className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-4 mb-8 group">
                            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm group-hover:bg-green-500 transition-colors duration-700">
                                <span className="font-mono font-bold text-black text-lg">&gt;_</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-brand text-sm tracking-[0.3em] text-white font-bold">FORMATDISC</span>
                                <span className="font-mono text-[9px] text-neutral-600 tracking-[0.2em] uppercase">Security_Kernel_V7</span>
                            </div>
                        </Link>
                        <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-sm mb-10">
                            The terminal environment for high-precision autonomous systems. 
                            Built for determinism, verified by law.
                        </p>

                        {/* Status Beacon */}
                        <div className="flex items-center gap-4 px-4 py-3 bg-neutral-950 border border-white/5 rounded-sm w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
                            <span className="font-mono text-[9px] text-neutral-500 tracking-[0.3em] uppercase">System_Stable: Zagreb_Node_01</span>
                        </div>
                    </motion.div>

                    {/* Links */}
                    {Object.entries(links).map(([category, items]) =>
                        <motion.div key={category} variants={slideUpHeavy}>
                            <h4 className="font-mono text-[10px] text-white font-bold mb-8 uppercase tracking-[0.4em]">{category}</h4>
                            <ul className="space-y-4">
                                {items.map((item) =>
                                    <li key={item.label}>
                                        {item.external ?
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-neutral-500 hover:text-green-500 font-mono tracking-widest transition-all duration-300">
                                                {item.label}
                                            </a> :
                                            <Link
                                                to={item.href}
                                                className="text-xs text-neutral-500 hover:text-green-500 font-mono tracking-widest transition-all duration-300">
                                                {item.label}
                                            </Link>
                                        }
                                    </li>
                                )}
                            </ul>
                        </motion.div>
                    )}
                </motion.div>

                {/* Bottom Bar */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-between gap-8 pt-16 mt-24 border-t border-white/5"
                >
                    <div className="text-center md:text-left space-y-2">
                        <p className="text-[10px] text-neutral-600 font-mono tracking-[0.2em] uppercase">© 2026 FormatDisc. Operational Rights Protected.</p>
                        <p className="text-[9px] text-neutral-700 font-mono tracking-widest">
                            VL. MLADEN GERTNER · OIB: 18915075854 · ZAGREB, CROATIA · EU
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="https://github.com/formatdisc" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-white transition-colors">
                            <span className="font-mono text-[10px] tracking-widest uppercase">Github</span>
                        </a>
                        <a href="https://www.linkedin.com/company/formatdisc/" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-white transition-colors">
                            <span className="font-mono text-[10px] tracking-widest uppercase">LinkedIn</span>
                        </a>
                        <a href="https://twitter.com/formatdisc" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-white transition-colors">
                            <span className="font-mono text-[10px] tracking-widest uppercase">X (Twitter)</span>
                        </a>
                        <a href="mailto:mladen@formatdisc.hr" className="text-neutral-700 hover:text-white transition-colors">
                            <span className="font-mono text-[10px] tracking-widest uppercase">E-Mail</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>);
}

Footer.displayName = 'Footer';