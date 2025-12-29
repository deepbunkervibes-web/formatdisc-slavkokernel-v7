import React from 'react';
import { Cpu, Zap, Shield, Clock } from 'lucide-react';

import { useKernel } from '../../kernel/KernelProvider';

export const KernelStatus = () => {
    const { state, tick } = useKernel();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
                {
                    label: 'State',
                    value: state.toUpperCase(),
                    icon: Cpu,
                    color: state === 'ready' ? 'text-[#00ff9d]' : 'text-amber-400',
                    bg: 'bg-black/20'
                },
                {
                    label: 'Clock Tick',
                    value: tick.toLocaleString(),
                    icon: Clock,
                    color: 'text-blue-400',
                    font: 'font-mono'
                },
                {
                    label: 'Resolution',
                    value: '16ms (60Hz)',
                    icon: Zap,
                    color: 'text-purple-400'
                },
                {
                    label: 'Integrity',
                    value: 'VERIFIED',
                    icon: Shield,
                    color: 'text-[#00ff9d]'
                }
            ].map((item, i) => (
                <div key={i} className="bg-[#0A0A0A] border border-white/5 backdrop-blur-md p-4 rounded-xl shadow-lg hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-white/5 ${item.color.replace('text-', 'bg-').replace('text', 'bg').split('-')[0] + '-500/10'}`}>
                            <item.icon className={item.color} size={18} />
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{item.label}</div>
                            <div className={`text-sm font-bold ${item.color} ${item.font || ''}`}>
                                {item.value}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
