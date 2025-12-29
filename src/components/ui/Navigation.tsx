import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Video, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../../context/LanguageContext';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();

    const NAV_ITEMS = [
        { path: '/', label: t.nav.home },
        { path: '/studio', label: t.nav.studio },
        { path: '/kernel', label: t.nav.kernel },
        { path: '/metrics', label: t.nav.metrics },
        { path: '/audit', label: t.nav.audit },
        { path: '/launchpad', label: 'Launchpad' },
        { path: '/docs', label: t.nav.docs },
        { path: '/investors', label: t.nav.investors },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-background/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center overflow-hidden"
                        >
                            <span className="font-mono font-bold text-white dark:text-black text-lg">&gt;_</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                                initial={{ opacity: 0, x: -100 }}
                                whileHover={{ opacity: 1, x: 100 }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-semibold tracking-tight text-foreground">FormatDisc™</span>
                            <span className="text-[10px] text-muted-foreground font-mono">SlavkoKernel™ v7</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item, index) => (
                            <motion.div
                                key={item.path}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * index }}
                            >
                                <Link
                                    to={item.path}
                                    className={`text-sm transition-colors ${location.pathname === item.path
                                        ? 'text-foreground font-medium'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <motion.span whileHover={{ y: -2 }} className="inline-block">
                                        {item.label}
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA & Language */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={() => setLanguage(language === 'hr' ? 'en' : 'hr')}
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Globe className="w-4 h-4" />
                            {language.toUpperCase()}
                        </button>

                        <a
                            href="https://cal.com/mladengertner"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-neutral-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 group hover:shadow-lg transition-shadow"
                            >
                                {t.nav.bookCall}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden mt-4 pb-4 border-t border-border pt-4 overflow-hidden"
                        >
                            <div className="flex flex-col gap-2">
                                {NAV_ITEMS.map((item, index) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`block px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                                ? 'bg-neutral-100 dark:bg-neutral-800 text-foreground font-medium'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-900'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className="flex items-center justify-between px-4 py-3 text-muted-foreground">
                                    <span>Language</span>
                                    <button
                                        onClick={() => setLanguage(language === 'hr' ? 'en' : 'hr')}
                                        className="font-medium text-foreground flex items-center gap-2"
                                    >
                                        <Globe className="w-4 h-4" />
                                        {language === 'hr' ? 'Hrvatski' : 'English'}
                                    </button>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="pt-4 border-t border-border"
                                >
                                    <a
                                        href="https://cal.com/mladengertner"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center px-4 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg font-medium"
                                    >
                                        {t.nav.bookCall}
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
