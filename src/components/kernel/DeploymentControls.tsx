import { Rocket, Shield, AlertTriangle } from 'lucide-react';

import { useDeployment } from '../../kernel/useDeployment';
import { useKernelMotion } from '../../motion/useKernelMotion';

export const DeploymentControls = () => {
    const { deploy, simulateAttack } = useDeployment();
    const motion = useKernelMotion(0);

    return (
        <div className="glass p-6 rounded-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#00ff9d] mb-6 flex items-center gap-2">
                <Rocket size={16} />
                Deployment Ceremony
            </h3>

            <div className="space-y-4">
                <div className="space-y-3">
                    <div className="text-xs text-gray-400">Select Environment</div>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => deploy('staging')}
                            className="p-4 border border-white/10 rounded-lg hover:border-[#00ff9d]/30 hover:bg-[#00ff9d]/5 transition-all flex flex-col items-center gap-2 group"
                            style={{ transform: `translateY(${motion * -2}px)` }}
                        >
                            <div className="p-2 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20">
                                <Rocket size={20} className="text-amber-400" />
                            </div>
                            <span className="font-medium">Staging</span>
                            <span className="text-xs text-gray-400">Test Environment</span>
                        </button>

                        <button
                            onClick={() => deploy('production')}
                            className="p-4 border border-[#00ff9d]/20 rounded-lg hover:border-[#00ff9d] hover:bg-[#00ff9d]/10 transition-all flex flex-col items-center gap-2 group bg-gradient-to-br from-[#00ff9d]/5 to-transparent"
                            style={{ transform: `translateY(${motion * -2}px)` }}
                        >
                            <div className="p-2 rounded-full bg-[#00ff9d]/20 group-hover:bg-[#00ff9d]/30">
                                <Shield size={20} className="text-[#00ff9d]" />
                            </div>
                            <span className="font-medium text-[#00ff9d]">Production</span>
                            <span className="text-xs text-gray-400">Live Deployment</span>
                        </button>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                    <div className="text-xs text-gray-400 mb-3">Security Test</div>
                    <button
                        onClick={simulateAttack}
                        className="w-full p-3 border border-red-400/20 rounded-lg hover:border-red-400/40 hover:bg-red-400/5 transition-all flex items-center justify-center gap-2 group"
                    >
                        <AlertTriangle size={16} className="text-red-400" />
                        <span className="text-red-400 font-medium">Simulate Intrusion</span>
                    </button>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                        Triggers kernel lockdown protocol
                    </div>
                </div>
            </div>
        </div>
    );
};