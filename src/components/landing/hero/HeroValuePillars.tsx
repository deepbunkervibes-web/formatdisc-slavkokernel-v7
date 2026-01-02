import * as React from 'react';
import { motion, Variants } from 'framer-motion';

const magneticPull: Variants = {
  hidden: { opacity: 0, x: -100, rotate: -5 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  })
};

interface PillarProps {
  pillars: Array<{title: string;desc: string;color: string;icon: string;}>;
}

export const HeroValuePillars = React.memo(({ pillars }: PillarProps) =>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left pt-4 px-4 sm:px-0">
        {pillars.map((pillar, i) =>
  <motion.div
    key={i}
    custom={i}
    initial="hidden"
    animate="visible"
    variants={magneticPull}
    whileHover={{
      scale: 1.05,
      y: -5,
      transition: { type: "spring", stiffness: 400 }
    }}
    className="space-y-1 p-4 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-accent-purple transition-all cursor-default">
    
                <div className={`text-sm font-semibold ${pillar.color} flex items-center gap-2`}>
                    <span className="text-lg">{pillar.icon}</span>
                    {pillar.title}
                </div>
                <div className="text-xs text-neutral-500 font-light leading-relaxed">{pillar.desc}</div>
            </motion.div>
  )}
    </div>
);

HeroValuePillars.displayName = 'HeroValuePillars';