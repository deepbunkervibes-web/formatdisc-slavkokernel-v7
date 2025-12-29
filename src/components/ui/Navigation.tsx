import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../../context/LanguageContext';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { language, setLanguage } = useLanguage();

    const NAV_ITEMS = [
        { path: '/', label: 'Overview' },
        { path: 'https://simulate.formatdisc.hr', label: 'Studio', external: true },
        { path: '/kernel', label: 'Kernel' },
        { path: '/metrics', label: 'Telemetry' },
        { path: '/audit', label: 'Audit_Log' },
        { path: '/investors', label: 'Investors' }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface-primary/95 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

                {/* System Identity - Monolithic */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm">
                            <span className="font-mono font-bold text-black text-xs">&gt;</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-brand text-xs tracking-[0.2em] text-white">FORMATDISC</span>
                        </div>
                    </Link>

                    {/* Desktop System Menu */}
                    <nav className="hidden md:flex items-center gap-1 border-l border-white/10 pl-6 h-6">
                        {NAV_ITEMS.map((item) => (
                            item.external ? (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 text-[10px] font-mono font-medium text-neutral-500 hover:text-white hover:bg-white/5 rounded-sm transition-colors tracking-widest uppercase"
                                >
                                    {item.label} <span className="text-[8px] align-top opacity-50">↗</span>
                                </a>
                            ) : (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-1 text-[10px] font-mono font-medium rounded-sm transition-colors tracking-widest uppercase ${location.pathname === item.path
                                            ? 'text-white bg-white/5'
                                            : 'text-neutral-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </nav>
                </div>

                {/* System Controls - Declarative */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Status Bit */}
                    <div className="flex items-center gap-2 px-2 py-1 bg-surface-elevated border border-white/5 rounded-sm">
                        <div className="w-1 h-1 rounded-full bg-signal-active" />
                        <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">SYS: ONLINE</span>
                    </div>

                    <button
                        onClick={() => setLanguage(language === 'hr' ? 'en' : 'hr')}
                        className="text-[10px] font-mono text-neutral-600 hover:text-white uppercase tracking-widest px-2"
                    >
                        [{language}]
                    </button>

                    <a
                        href="/investors"
                        className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                    >
                        <Shield className="w-3 h-3" />
                        <span>Data_Room</span>
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-white hover:bg-white/10 rounded-sm"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/10 bg-surface-primary overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 space-y-1">
                            {NAV_ITEMS.map((item) => (
                                item.external ? (
                                    <a
                                        key={item.path}
                                        href={item.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-3 text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent rounded-sm tracking-widest uppercase"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label} ↗
                                    </a>
                                ) : (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`block px-4 py-3 text-xs font-mono rounded-sm tracking-widest uppercase border border-transparent ${location.pathname === item.path
                                                ? 'bg-white/5 text-white'
                                                : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ))}
                        </nav>
                        <div className="p-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-neutral-500 tracking-widest">
                            <span>STATUS: LIVE</span>
                            <span>v12.1</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}