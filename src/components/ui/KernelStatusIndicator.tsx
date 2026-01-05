import { motion } from 'framer-motion';

type Status = 'STABLE' | 'WARNING' | 'CRITICAL';

type KernelStatusIndicatorProps = {
  status: Status;
};

export const KernelStatusIndicator = ({ status }: KernelStatusIndicatorProps) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'STABLE': return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'WARNING': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'CRITICAL': return 'bg-red-500/10 text-red-500 border-red-500/30';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    }
  };

  return (
    <motion.div
      className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border ${getStatusStyle()}`}
      whileHover={{ scale: 1.05 }}
    >
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      {status}
    </motion.div>
  );
};
