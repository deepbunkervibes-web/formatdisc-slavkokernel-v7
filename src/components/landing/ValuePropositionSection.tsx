import { motion, useInView } from 'framer-motion';
import { Lightbulb, Layers, Rocket } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const getCards = (t: any) => [
    {
        title: t.valueProp.cards.idea.title,
        icon: Lightbulb,
        description: t.valueProp.cards.idea.desc,
        bullet: t.valueProp.cards.idea.bullet,
        color: 'from-amber-500/20 to-orange-500/10'
    },
    {
        title: t.valueProp.cards.system.title,
        icon: Layers,
        description: t.valueProp.cards.system.desc,
        bullet: t.valueProp.cards.system.bullet,
        color: 'from-blue-500/20 to-cyan-500/10'
    },
    {
        title: t.valueProp.cards.result.title,
        icon: Rocket,
        description: t.valueProp.cards.result.desc,
        bullet: t.valueProp.cards.result.bullet,
        color: 'from-emerald-500/20 to-green-500/10'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

export const ValuePropositionSection = React.memo(() => {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const cards = React.useMemo(() => getCards(t), [t]);

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent-cyan/5 to-transparent blur-3xl opacity-40" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-accent-purple/5 to-transparent blur-3xl opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-accent-cyan font-mono text-xs mb-4 tracking-[0.3em] uppercase"
                    >
                        {t.valueProp.label}
                    </motion.p>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                        {t.valueProp.title}
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
                        {t.valueProp.description}
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {cards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent-cyan/30 transition-all duration-300"
                            >
                                {/* Hover glow */}
                                <motion.div
                                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                <div className="relative">
                                    {/* Icon */}
                                    <motion.div
                                        className="w-14 h-14 rounded-xl bg-secondary dark:bg-neutral-800 flex items-center justify-center mb-6 group-hover:bg-foreground transition-colors duration-300"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        <Icon className="w-7 h-7 text-foreground group-hover:text-background transition-colors duration-300" />
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4 text-sm">{card.description}</p>
                                    <p className="text-[10px] text-accent-cyan uppercase tracking-[0.2em] font-mono">{card.bullet}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
});

ValuePropositionSection.displayName = 'ValuePropositionSection';
