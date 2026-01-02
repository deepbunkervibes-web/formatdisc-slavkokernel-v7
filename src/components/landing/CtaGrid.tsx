import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, FileText, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUpHeavy, INSTITUTIONAL_TRANSITION } from '../../lib/motion-presets';

export const CtaGrid = React.memo(() => {
  
  const tiles = [
    {
      title: "Run a Simulation",
      desc: "Deploy a live kernel instance and test your architecture against our constraints.",
      icon: Terminal,
      link: "/simulator",
      primary: true,
      external: false,
      cta: "Launch Studio"
    },
    {
      title: "Read the Documentation",
      desc: "Understand the mathematical proofs and rigorous standards behind the kernel.",
      icon: FileText,
      link: "/docs",
      primary: false,
      external: false,
      cta: "View Docs"
    },
    {
      title: "Book an Audit",
      desc: "Schedule a high-precision architectural review with the FormatDisc team.",
      icon: Calendar,
      link: "https://cal.com/mladengertner",
      external: true,
      primary: false,
      cta: "Schedule Call"
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden text-white border-t border-white/5 selection:bg-green-500/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neutral-500 font-mono text-xs mb-4 tracking-[0.4em] uppercase tracking-widest">
            OPERATIONAL_NEXT_STEPS
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to stabilize <br/> <span className="text-neutral-500 italic">your system?</span>
          </h2>
        </header>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            const Component = tile.external ? 'a' : Link;
            const linkProps = tile.external ?
              { href: tile.link, target: '_blank', rel: 'noopener noreferrer' } :
              { to: tile.link };

            return (
              <motion.div
                key={i}
                variants={slideUpHeavy}
              >
                <Component
                  {...linkProps as any}
                  className={`
                    group block p-12 rounded-sm transition-all duration-700 border h-full relative overflow-hidden
                    ${tile.primary ?
                      'bg-green-600 border-green-500 text-white hover:bg-green-500' :
                      'bg-black border-white/5 hover:border-white/20 text-white hover:bg-white/[0.02]'}
                  `}>
                  
                   {/* Mechanical Aspect - No playful scale/rotate */}
                   <Icon className={`absolute -bottom-8 -right-8 w-40 h-40 opacity-[0.03] transition-opacity duration-1000 group-hover:opacity-[0.08] ${tile.primary ? 'text-black' : 'text-white'}`} />

                  <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-sm mb-10 flex items-center justify-center ${tile.primary ? 'bg-white/10' : 'bg-white/[0.03] border border-white/10 group-hover:border-green-500/50 transition-colors duration-700'}`}>
                        <Icon className={`w-6 h-6 ${tile.primary ? 'text-white' : 'text-neutral-500 group-hover:text-green-500 transition-colors duration-700'}`} />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-4 tracking-tight">{tile.title}</h3>
                        <p className={`text-sm font-light mb-12 leading-relaxed ${tile.primary ? 'text-green-50' : 'text-neutral-500 group-hover:text-neutral-400 transition-colors duration-700'}`}>
                          {tile.desc}
                        </p>
                      </div>
                      
                      <div className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] mt-auto">
                        <span>{tile.cta}</span>
                        <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-700" />
                      </div>
                  </div>
                </Component>
              </motion.div>);

          })}
        </motion.div>
      </div>
    </section>);

});

CtaGrid.displayName = 'CtaGrid';