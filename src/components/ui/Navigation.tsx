import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { INSTITUTIONAL_TRANSITION, HEAVY_EASE } from '../../lib/motion-presets';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { language, setLanguage } = useLanguage();

    const NAV_ITEMS = [
        { path: '/', label: 'The Kernel' },
        { path: '/manifesto', label: 'Manifesto' },
        { path: '/audit', label: 'Audit Trail' },
        { path: '/docs', label: 'Documentation' },
        { path: 'https://simulation.formatdisc.hr', label: 'Deploy Simulation', external: true, primary: true },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/5 selection:bg-green-500/30">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* System Identity - Monolithic */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-4 group transition-all duration-700">
                        <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm group-hover:bg-green-500 transition-colors duration-700">
                            <span className="font-mono font-bold text-black text-lg">&gt;_</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-brand text-sm tracking-[0.4em] text-white font-bold group-hover:text-green-500 transition-colors duration-700">FORMATDISC</span>
                            <span className="font-mono text-[8px] text-neutral-600 tracking-[0.2em] group-hover:text-green-900 transition-colors duration-700 uppercase">Operational_Kernel_v7.0</span>
                        </div>
                    </Link>

                    {/* Desktop System Menu */}
                    <nav className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-8 h-10 ml-4">
                        {NAV_ITEMS.map((item) => (
                            item.external ? (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-5 py-2.5 text-[9px] font-mono font-bold rounded-sm transition-all duration-500 tracking-[0.25em] uppercase flex items-center gap-2 ${
                                        item.primary 
                                          ? 'bg-green-600 text-white hover:bg-green-500 border border-green-500/50 shadow-xl shadow-green-900/30' 
                                          : 'text-neutral-500 hover:text-white hover:bg-white/[0.03]'
                                    }`}
                                >
                                    {item.label} {item.primary ? null : <span className="text-[7px] align-top opacity-30">↗</span>}
                                </a>
                            ) : (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-5 py-2.5 text-[9px] font-mono font-bold rounded-sm transition-all duration-500 tracking-[0.25em] uppercase ${location.pathname === item.path
                                            ? 'text-green-500 bg-green-500/[0.03]'
                                            : 'text-neutral-500 hover:text-white hover:bg-white/[0.03]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </nav>
                </div>

                {/* System Controls - Declarative */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Status Bit */}
                    <div className="flex items-center gap-3 px-3 py-1.5 bg-neutral-950 border border-white/5 rounded-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        <span className="font-mono text-[8px] text-neutral-500 tracking-[0.3em] uppercase">Status: DETERMINISTIC</span>
                    </div>

                    <button
                        onClick={() => setLanguage(language === 'hr' ? 'en' : 'hr')}
                        className="text-[9px] font-mono text-neutral-700 hover:text-white uppercase tracking-[0.3em] px-3 py-2 border border-transparent hover:border-white/10 transition-all rounded-sm"
                    >
                        [{language.toUpperCase()}]
                    </button>

                    <a
                        href="/investors"
                        className="flex items-center gap-3 bg-white text-black px-4 py-2 rounded-sm text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-neutral-200 transition-all duration-500 shadow-xl shadow-white/5"
                    >
                        <Shield className="w-3.5 h-3.5" />
                        <span>Data_Room</span>
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-3 text-white hover:bg-white/5 rounded-sm border border-white/5 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-5 h-5 text-green-500" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: HEAVY_EASE }}
                        className="lg:hidden border-t border-white/5 bg-black/95 backdrop-blur-2xl overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 space-y-2">
                            {NAV_ITEMS.map((item) => (
                                item.external ? (
                                    <a
                                        key={item.path}
                                        href={item.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-6 py-4 text-[10px] font-mono font-bold text-neutral-500 hover:text-white hover:bg-white/[0.03] border border-transparent rounded-sm tracking-[0.3em] uppercase transition-all duration-500"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label} <span className="opacity-30">↗</span>
                                    </a>
                                ) : (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`block px-6 py-4 text-[10px] font-mono font-bold rounded-sm tracking-[0.3em] uppercase border border-transparent transition-all duration-500 ${location.pathname === item.path
                                                ? 'bg-green-500/[0.05] text-green-500 border-green-500/10'
                                                : 'text-neutral-500 hover:text-white hover:bg-white/[0.03]'
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ))}
                        </nav>
                        <div className="p-8 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-neutral-700 tracking-[0.5em] uppercase">
                            <span className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-green-500 rounded-full" />
                                System_Stable
                            </span>
                            <span>v7.0.4r</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

Navigation.displayName = 'Navigation';