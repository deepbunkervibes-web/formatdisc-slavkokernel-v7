import * as React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../ui/StatusBadge';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen bg-surface-primary flex items-center justify-center overflow-hidden border-b border-border-subtle">
      {/* Background Matrix/Grid Effect - Subtle, authoritative */}
      <div className="absolute inset-0 scanline-overlay opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">

        {/* Status Header - Declarative, not promotional */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-16 space-y-4"
        >
          <div className="flex items-center space-x-6">
            <StatusBadge status="EU AI ACT COMPLIANT" variant="verified" animate />
            <span className="text-text-muted text-[10px]">|</span>
            <StatusBadge status="SYSTEM OPERATIONAL" variant="active" />
          </div>
        </motion.div>

        {/* Monolithic Heading - White, Cold, Massive */}
        <div className="text-center mb-20 space-y-8">
          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-brand text-5xl md:text-7xl lg:text-9xl tracking-widest text-text-primary"
          >
            SLAVKOKERNEL<span className="text-2xl lg:text-4xl align-top opacity-30">™</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-mono text-sm md:text-base text-text-muted uppercase tracking-[0.3em]"
          >
            Deterministic AI Governance OS <span className="text-white/10 px-2">//</span> v12.1
          </motion.h2>
        </div>

        {/* Declarative States - No CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-12 font-mono text-xs tracking-widest text-text-secondary"
        >
          <div className="flex flex-col items-center gap-2 group cursor-default">
            <span className="text-text-muted text-[10px]">ACCESS STATUS</span>
            <span className="border-b border-transparent group-hover:border-text-muted transition-colors">
              RESTRICTED [INVITE ONLY]
            </span>
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/5" />

          <div className="flex flex-col items-center gap-2 group cursor-pointer hover:text-text-primary transition-colors">
            <span className="text-text-muted text-[10px]">DOCUMENTATION</span>
            <a href="/docs" className="flex items-center gap-2 border-b border-transparent group-hover:border-white/20 transition-all">
              AVAILABLE
              <span className="text-[10px] opacity-50">↗</span>
            </a>
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/5" />

          <div className="flex flex-col items-center gap-2 group cursor-pointer hover:text-text-primary transition-colors">
            <span className="text-text-muted text-[10px]">INVESTOR DATA</span>
            <a href="/investors" className="flex items-center gap-2 border-b border-transparent group-hover:border-white/20 transition-all">
              AUTHORIZED
              <span className="text-[10px] opacity-50">↗</span>
            </a>
          </div>
        </motion.div>

        {/* System Footer Metrics - Passive Telemetry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-0 right-0 flex justify-center space-x-16 opacity-40 hover:opacity-100 transition-opacity duration-500"
        >
          <div className="text-center">
            <div className="text-[9px] font-mono text-text-muted tracking-wider mb-1">GLOBAL DECISIONS</div>
            <div className="text-[10px] font-mono text-signal-active">1,024,892_</div>
          </div>
          <div className="text-center">
            <div className="text-[9px] font-mono text-text-muted tracking-wider mb-1">UPTIME</div>
            <div className="text-[10px] font-mono text-signal-verified">99.999%</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}