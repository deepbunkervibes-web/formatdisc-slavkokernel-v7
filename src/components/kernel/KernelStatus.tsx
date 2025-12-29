import { Cpu, Zap, Shield, Clock } from 'lucide-react';

import { useKernel } from '../../kernel/KernelProvider';

export const KernelStatus = () => {
  const { state, tick } = useKernel();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="glass p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <Cpu className="text-[#00ff9d]" size={20} />
          <div>
            <div className="text-xs text-gray-400">State</div>
            <div className={`text-sm font-medium ${state === 'ready' ? 'text-[#00ff9d]' : 'text-amber-400'}`}>
              {state.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <Clock className="text-[#00ff9d]" size={20} />
          <div>
            <div className="text-xs text-gray-400">Tick</div>
            <div className="text-sm font-mono text-white">
              {tick.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <Zap className="text-[#00ff9d]" size={20} />
          <div>
            <div className="text-xs text-gray-400">Motion</div>
            <div className="text-sm font-medium text-white">
              {(tick % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <Shield className="text-[#00ff9d]" size={20} />
          <div>
            <div className="text-xs text-gray-400">Integrity</div>
            <div className="text-sm font-medium text-[#00ff9d]">
              Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};