import { motion } from 'framer-motion';

type TerminalLineProps = {
  line: string;
  isCommand: boolean;
};

export const TerminalLine = ({ line, isCommand }: TerminalLineProps) => {
  const isAuditLine = line.includes('[AUDIT:');

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`text-sm font-mono ${isCommand ? 'text-green-500' : 'text-neutral-300'}`}
    >
      {line}
      {isAuditLine && (
        <motion.span
          className="ml-2 text-yellow-500/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          👻
        </motion.span>
      )}
    </motion.div>
  );
};
