import * as React from 'react';

export interface TreeNode {
  label: string;
  depth: number;
  status?: 'pending' | 'active' | 'resolved';
}

const DecisionTreeHologramComponent = ({ tree }: {tree: TreeNode[];}) => {
  return (
    <div className="w-full h-full bg-black/30 border border-white/10 rounded-lg backdrop-blur-md text-cyan-300 font-mono text-xs p-4 flex flex-col relative overflow-hidden shadow-lg shadow-cyan-900/10">
            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <span className="text-[10px] uppercase tracking-widest opacity-70">Decision Matrix</span>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white/50 rounded-full" />
                    <div className="w-1 h-1 bg-white/50 rounded-full" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                {tree.length === 0 &&
        <div className="text-white/20 italic text-center mt-10">Waiting for data...</div>
        }
                {tree.map((node, i) =>
        <div key={i} className={`flex items-center ${node.status === 'active' ? 'text-white bg-white/5' : 'opacity-70'} px-1 py-0.5 rounded`}>
                        <span className="font-mono text-white/20 mr-2 whitespace-pre">{Array(node.depth).fill('│  ').join('')}</span>
                        <span className="mr-2 text-cyan-500">└─</span>
                        <span>{node.label}</span>
                        {node.status === 'active' && <span className="ml-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />}
                    </div>
        )}
            </div>

            {/* Grid background effect */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
        </div>);

};

export const DecisionTreeHologram = React.memo(DecisionTreeHologramComponent);
DecisionTreeHologram.displayName = 'DecisionTreeHologram';