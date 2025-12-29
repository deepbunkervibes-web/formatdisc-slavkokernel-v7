import * as React from 'react';import { useRef, useMemo } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { useLanguage } from '../../context/LanguageContext';

// Modular children
import { HeroBackgroundOrbs } from './hero/HeroBackgroundOrbs';
import { HeroValuePillars } from './hero/HeroValuePillars';

const gravitySink = {
  hidden: { opacity: 0, y: -60, scale: 1.1 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 2 }
  }
};

const elasticSnap = {
  hidden: { opacity: 0, scaleX: 0.3, scaleY: 1.2 },
  visible: {
    opacity: 1, scaleX: 1, scaleY: 1,
    transition: { type: "spring", stiffness: 500, damping: 15, velocity: 2 }
  }
};

export function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 0]);
  const breatheScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.02, 0.98, 0.95]);

  const pillars = useMemo(() => [
  { title: t.hero.pillars.deterministic.title, desc: t.hero.pillars.deterministic.desc, color: "text-accent-purple", icon: "◆" },
  { title: t.hero.pillars.audit.title, desc: t.hero.pillars.audit.desc, color: "text-accent-pink", icon: "◇" },
  { title: t.hero.pillars.mvp.title, desc: t.hero.pillars.mvp.desc, color: "text-accent-cyan", icon: "○" }],
  [t]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-background overflow-hidden">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                <HeroBackgroundOrbs />

                <div className="relative mx-auto max-w-7xl px-6">
                    <motion.div
            style={{ scale: breatheScale, rotateX, y: layer2Y }}
            initial="hidden" animate="visible" variants={gravitySink}
            className="mx-auto max-w-4xl text-center space-y-10 perspective-1000">
            
                        <motion.div variants={elasticSnap}>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
                                <motion.span
                  className="inline-block bg-gradient-to-r from-neutral-900 via-accent-purple to-accent-pink dark:from-white/10 dark:via-accent-purple dark:to-accent-pink bg-clip-text text-transparent bg-[length:200%_auto]"
                  animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
                  
                                    {t.hero.titlePrefix}
                                </motion.span>
                                {" "}{t.hero.titleSuffix}
                                <span className="block text-neutral-400 text-lg sm:text-xl md:text-2xl mt-4 font-normal">
                                    {t.hero.subtitle}
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              
                            {t.hero.description}
                        </motion.p>

                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-4 px-4 sm:px-0">
                            <motion.a
                href="https://ollama.com/mladen-gertner/slavkokernel-v7"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-white bg-gradient-to-r from-accent-purple to-accent-pink px-4 py-2 rounded-full relative overflow-hidden group shadow-lg"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                
                                <Zap className="w-3 h-3" />
                                {t.hero.badge}
                            </motion.a>
                            <motion.span className="text-xs sm:text-sm font-medium text-muted-foreground bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full">
                                {t.hero.quote}
                            </motion.span>
                        </div>

                        <HeroValuePillars pillars={pillars} />

                        <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
              
                            <motion.a
                href="/studio"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black px-8 py-4 font-medium relative overflow-hidden"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                
                                <span className="relative z-10">{t.hero.ctaStudio}</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </motion.a>

                            <motion.a
                href="/kernel"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 px-8 py-4 text-foreground font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                
                                {t.hero.ctaKernel}
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>);

}