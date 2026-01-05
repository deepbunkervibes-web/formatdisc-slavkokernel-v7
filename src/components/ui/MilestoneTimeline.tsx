import { motion } from 'framer-motion';

const milestones = [
  {
    id: 'v7.0.4r',
    title: 'Kernel v7.0.4r Patch Notes',
    date: '2026-01-15',
    status: 'VERIFIED',
    description: 'Multi-Region Sync Optimization',
  },
  {
    id: 'security-audit',
    title: 'Security Audit: L7 Identity Boundary Proof',
    date: '2025-12-20',
    status: 'SIGNED',
    description: 'EU Compliance Verification',
  },
  {
    id: 'h100-optimization',
    title: 'Hardware Acceleration: H100 Optimization Layer',
    date: '2025-11-10',
    status: 'STABLE',
    description: '300-1000ms Latency Simulation',
  },
];

export const MilestoneTimeline = () => {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
      <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-bold mb-6">Institutional_Milestones</h3>
      <div className="space-y-6 relative">
        <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/5 border-l border-dashed border-white/10" />
        
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start relative"
          >
            <div className="w-6 h-6 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0 z-10">
              <span className="text-green-500 text-xs">✓</span>
            </div>
            <div className="flex-1 pb-2">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-sm uppercase tracking-wider">{milestone.title}</h4>
                <span className="text-[10px] text-blue-500 font-mono">{milestone.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] text-green-500 uppercase tracking-widest font-bold px-2 py-1 bg-green-500/5 border border-green-500/20 rounded-sm">{milestone.status}</span>
                <span className="text-xs text-neutral-500">{milestone.description}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
