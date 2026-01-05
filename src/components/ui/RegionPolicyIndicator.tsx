import { motion } from 'framer-motion';

type RegionPolicyIndicatorProps = {
  region: string;
};

export const RegionPolicyIndicator = ({ region }: RegionPolicyIndicatorProps) => {
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-blue-500/30 bg-blue-500/10 text-blue-500"
      whileHover={{ scale: 1.05 }}
    >
      <span>🌍</span>
      <span>{region.toUpperCase()}</span>
    </motion.div>
  );
};
