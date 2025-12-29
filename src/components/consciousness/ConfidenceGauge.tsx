import * as React from 'react';

const ConfidenceGaugeComponent = ({ value }: {value: number;}) => {
  const pct = Math.round(value * 100);
  const color = pct > 80 ? 'text-green-400 border-green-400/30' :
  pct > 50 ? 'text-cyan-400 border-cyan-400/30' :
  'text-amber-400 border-amber-400/30';

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Holographic Circle Background */}
            <div className={`absolute inset-0 rounded-full border-2 border-dashed opacity-20 animate-spin-slow ${color.split(' ')[1]}`} />

            {/* Main Gauge */}
            <div className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center font-mono ${color} backdrop-blur-sm bg-black/20`}>
                <span className="text-3xl font-bold tracking-tighter">{pct}%</span>
                <span className="text-[9px] uppercase tracking-widest opacity-70">Conf.</span>
            </div>

            {/* Decorative elements */}
            <div className="absolute -inset-2 border border-white/5 rounded-full" />
        </div>);

};

export const ConfidenceGauge = React.memo(ConfidenceGaugeComponent);
ConfidenceGauge.displayName = 'ConfidenceGauge';