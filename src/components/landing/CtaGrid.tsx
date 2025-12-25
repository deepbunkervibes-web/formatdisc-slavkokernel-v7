import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Shield, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const tiles = [
    {
        title: "Launch Studio",
        desc: "Start building your deterministic MVP now.",
        icon: Terminal,
        link: "/studio",
        primary: true
    },
    {
        title: "Read the Docs",
        desc: "Understand the protocol and governance layers.",
        icon: Shield,
        link: "/docs",
        primary: false
    },
    {
        title: "Book a Demo",
        desc: "For enterprise engineering teams and CTOs.",
        icon: Rocket,
        link: "https://cal.com/mladengertner",
        external: true,
        primary: false
    }
];

export function CtaGrid() {
    return (
        <section className="py-32 bg-neutral-950 text-white relative overflow-hidden">
            {/* Animated background glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0.3 }}
            >
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-cyan/10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-accent-cyan font-mono text-xs mb-4 tracking-[0.3em] uppercase"
                    >
                        Next Steps
                    </motion.p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to Deploy?</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiles.map((tile, i) => {
                        const Icon = tile.icon;
                        const Component = tile.external ? 'a' : Link;
                        const linkProps = tile.external
                            ? { href: tile.link, target: '_blank', rel: 'noopener noreferrer' }
                            : { to: tile.link };

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <Component
                                    {...linkProps}
                                    className={`
                                        group block p-10 rounded-2xl transition-all duration-300 border h-full
                                        ${tile.primary
                                            ? 'bg-white text-neutral-900 border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]'
                                            : 'bg-neutral-900/50 text-white border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900'}
                                    `}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        <Icon className={`w-10 h-10 mb-6 ${tile.primary ? 'text-neutral-900' : 'text-accent-cyan'}`} />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-3">{tile.title}</h3>
                                    <p className={`text-sm font-light mb-8 leading-relaxed ${tile.primary ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                        {tile.desc}
                                    </p>
                                    <div className="flex items-center text-sm font-medium">
                                        <span>Get Started</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </Component>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
