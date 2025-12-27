import React from 'react';
import { useDeployment } from '../kernel/useDeployment';
import { useKernelMotion } from '../motion/useKernelMotion';
import { Rocket, Shield, AlertTriangle } from 'lucide-react';

export const DeploymentControls = () => {
    const { deploy, simulateAttack } = useDeployment();
    const motion = useKernelMotion(0);

    return (
        <div className="bg-[#0A0A0A] border border-white/5 backdrop-blur-md p-6 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Rocket size={100} />
            </div>

            <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#00ff9d] mb-8 flex items-center gap-3 border-b border-white/5 pb-4">
                <Rocket size={18} className="animate-pulse" />
                Deployment Ceremony
            </h3>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-1">Select Targeting Layer</div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => deploy('staging')}
                            className="group p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-amber-400/30 hover:bg-amber-400/5 transition-all text-center flex flex-col items-center gap-3"
                            style={{ transform: `translateY(${motion * -4}px)` }}
                        >
                            <div className="p-3 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-colors">
                                <Rocket size={24} className="text-amber-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-gray-200 uppercase tracking-wide">Staging</span>
                                <span className="text-[9px] text-gray-500 uppercase tracking-tighter">Safe Sandbox</span>
                            </div>
                        </button>

                        <button
                            onClick={() => deploy('production')}
                            className="group p-5 bg-[#00ff9d]/[0.02] border border-[#00ff9d]/10 rounded-xl hover:border-[#00ff9d] hover:bg-[#00ff9d]/5 transition-all text-center flex flex-col items-center gap-3"
                            style={{ transform: `translateY(${motion * -4}px)` }}
                        >
                            <div className="p-3 rounded-full bg-[#00ff9d]/10 group-hover:bg-[#00ff9d]/20 transition-colors">
                                <Shield size={24} className="text-[#00ff9d]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-[#00ff9d] uppercase tracking-wide">Production</span>
                                <span className="text-[9px] text-[#00ff9d]/50 uppercase tracking-tighter">Global Deployment</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4 px-1">Stress Test Protocols</div>
                    <button
                        onClick={simulateAttack}
                        className="w-full p-4 border border-red-500/20 rounded-xl hover:border-red-500/50 hover:bg-red-500/10 transition-all flex items-center justify-center gap-3 group bg-red-500/[0.02]"
                    >
                        <AlertTriangle size={18} className="text-red-400 group-hover:animate-bounce" />
                        <span className="text-red-400 font-bold text-xs uppercase tracking-widest">Simulate Cyber Intrusion</span>
                    </button>
                    <div className="text-[9px] text-gray-600 mt-3 text-center uppercase font-mono italic">
                        Triggers recursive kernel locking and trace protocols
                    </div>
                </div>
            </div>
        </div>
    );
};
