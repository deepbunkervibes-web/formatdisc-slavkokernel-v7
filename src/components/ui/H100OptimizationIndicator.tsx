import { motion } from 'framer-motion';

type H100OptimizationIndicatorProps = {
  optimized: boolean;
};

export const H100OptimizationIndicator = ({ optimized }: H100OptimizationIndicatorProps) => {
  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border ${
        optimized 
          ? 'border-purple-500/30 bg-purple-500/10 text-purple-500' 
          : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500'
      }`}
      whileHover={{ scale: 1.05 }}
    >
      <span>⚡</span>
      <span>{optimized ? 'OPTIMIZED' : 'PENDING'}</span>
    </motion.div>
  );
};
