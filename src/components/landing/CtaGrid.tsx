import * as React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Shield, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

import { useLanguage } from '../../context/LanguageContext';

export const CtaGrid = React.memo(() => {
  const { t } = useLanguage();

  const tiles = useMemo(() => [
    {
      title: t('ctaGrid.tiles.studio.title'),
      desc: t('ctaGrid.tiles.studio.desc'),
      icon: Terminal,
      link: "https://simulate.formatdisc.hr",
      primary: true,
      external: true
    },
    {
      title: t('ctaGrid.tiles.docs.title'),
      desc: t('ctaGrid.tiles.docs.desc'),
      icon: Shield,
      link: "/docs",
      primary: false,
      external: false
    },
    {
      title: t('ctaGrid.tiles.demo.title'),
      desc: t('ctaGrid.tiles.demo.desc'),
      icon: Rocket,
      link: "https://cal.com/mladengertner",
      external: true,
      primary: false
    }],
    [t]);

  return (
    <section className="py-32 bg-background relative overflow-hidden text-foreground">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-accent font-mono text-xs mb-4 tracking-[0.3em] uppercase">

            {t('ctaGrid.label')}
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {t('ctaGrid.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            const Component = tile.external ? 'a' : Link;
            const linkProps = tile.external ?
              { href: tile.link, target: '_blank', rel: 'noopener noreferrer' } :
              { to: tile.link };

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}>

                <Component
                  {...linkProps as any}
                  className={`
                    group block p-10 rounded-2xl transition-all duration-300 border h-full
                    ${tile.primary ?
                      'bg-foreground text-background border-foreground hover:shadow-xl' :
                      'bg-card text-card-foreground border-border hover:border-foreground/50 hover:bg-muted/50'}
                  `}>

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}>

                    <Icon className={`w-10 h-10 mb-6 ${tile.primary ? 'text-background' : 'text-accent'}`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{tile.title}</h3>
                  <p className={`text-sm font-light mb-8 leading-relaxed ${tile.primary ? 'text-background/80' : 'text-muted-foreground'}`}>
                    {tile.desc}
                  </p>
                  <div className="flex items-center text-sm font-medium">
                    <span>{t('ctaGrid.cta')}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </Component>
              </motion.div>);

          })}
        </div>
      </div>
    </section>);

});

CtaGrid.displayName = 'CtaGrid';