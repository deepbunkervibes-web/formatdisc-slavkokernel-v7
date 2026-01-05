import { motion } from 'framer-motion';

type ComplianceBadgeProps = {
  status: 'VERIFIED' | 'PENDING' | 'FAILED';
};

export const ComplianceBadge = ({ status }: ComplianceBadgeProps) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'VERIFIED': return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'PENDING': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'FAILED': return 'bg-red-500/10 text-red-500 border-red-500/30';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    }
  };

  return (
    <motion.div
      className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border ${getBadgeStyle()}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {status}
    </motion.div>
  );
};
