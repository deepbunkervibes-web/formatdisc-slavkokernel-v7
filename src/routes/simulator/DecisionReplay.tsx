import { motion } from 'framer-motion';

export type DecisionNode = {
  id: string;
  type: string;
  payload: any;
  timestamp: string;
  x: number;
  y: number;
};

export default function DecisionReplay({ events }: { events: any[] }) {
  // Map events to a 2D space for visualization
  const nodes: DecisionNode[] = events.slice(0, 8).map((event, index) => ({
    id: event.id || `event-${index}`,
    type: event.type,
    payload: event.payload,
    timestamp: event.timestamp,
    // Distribute nodes in a semi-random but readable pattern
    x: 50 + (index % 3) * 120 + Math.random() * 20,
    y: 50 + Math.floor(index / 3) * 100 + Math.random() * 20,
  }));

  const links = nodes.slice(1).map((node, index) => ({
    source: nodes[index],
    target: node,
  }));

  return (
    <div className="h-[400px] w-full relative bg-black/40 border border-white/5 rounded-sm overflow-hidden p-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {links.map((link, index) => (
          <motion.path
            key={`link-${index}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ delay: index * 0.2, duration: 1 }}
            d={`M${link.source.x + 32},${link.source.y + 32} L${link.target.x + 32},${link.target.y + 32}`}
            stroke="#8b5cf6"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4,4"
          />
        ))}
      </svg>

      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, type: 'spring', damping: 12 }}
          className="absolute w-16 h-16 bg-black border border-purple-500/30 rounded-lg flex flex-col items-center justify-center text-[8px] z-10 cursor-help group shadow-[0_0_15px_rgba(139,92,246,0.1)]"
          style={{ left: `${node.x}px`, top: `${node.y}px` }}
        >
            <div className="text-purple-400 font-bold uppercase mb-1 tracking-tighter truncate w-full text-center px-1">
                {node.type.split(':')[1] || node.type}
            </div>
            <div className="text-neutral-600 font-mono">
                {new Date(node.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            
            {/* Hover Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-2 bg-neutral-900 border border-white/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-2xl">
                <div className="text-white font-bold mb-1 truncate">{node.id}</div>
                <div className="text-neutral-500 font-mono text-[7px] leading-tight break-all">
                    {JSON.stringify(node.payload).substring(0, 100)}...
                </div>
            </div>
        </motion.div>
      ))}
    </div>
  );
}
