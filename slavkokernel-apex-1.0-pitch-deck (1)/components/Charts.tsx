import React from 'react';
import { MarketData } from '../types';

interface MarketChartProps {
  data: MarketData;
}

export const MarketChart = ({ data }: MarketChartProps) => {
  return (
    <div className="w-full flex flex-col gap-12 py-4">
      {/* Visual Chart Area - Nested Container Approach */}
      <div className="relative flex flex-col items-center">
        {/* TAM Container */}
        <div className="w-full border border-green-500/20 bg-green-500/5 p-8 rounded-xl relative overflow-hidden group hover:bg-green-500/10 transition-all duration-500 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 mb-8">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-[0.3em] text-green-800 block">GLOBAL INFRASTRUCTURE SPEND</span>
              <span className="text-sm font-black tracking-widest text-green-600 uppercase">Total Addressable Market (TAM)</span>
            </div>
            <span className="text-5xl font-black text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">{data.tam}</span>
          </div>
          
          {/* SAM Container */}
          <div className="w-full md:w-[75%] border border-green-500/40 bg-green-500/10 p-6 rounded-lg relative overflow-hidden group-hover:bg-green-500/20 transition-all duration-500 mb-6">
            <div className="flex justify-between items-center relative z-10">
              <div className="space-y-1">
                <span className="text-[8px] font-bold tracking-[0.2em] text-green-700 block">TARGET ENTERPRISE SEGMENT</span>
                <span className="text-xs font-bold tracking-widest text-green-500 uppercase">Serviceable Addressable Market (SAM)</span>
              </div>
              <span className="text-3xl font-black text-green-400">{data.sam}</span>
            </div>
            
            {/* SOM Container */}
            <div className="mt-4 w-full md:w-[50%] border border-green-400 bg-green-400/20 p-4 rounded relative overflow-hidden shadow-[0_0_20px_rgba(74,222,128,0.1)]">
              <div className="flex justify-between items-center relative z-10">
                <div className="space-y-1">
                  <span className="text-[8px] font-bold tracking-[0.2em] text-green-950 block">YEAR 1-3 CAPTURE</span>
                  <span className="text-xs font-black tracking-widest text-green-950 uppercase">Serviceable Obtainable Market (SOM)</span>
                </div>
                <span className="text-2xl font-black text-green-950">{data.som}</span>
              </div>
              <div className="absolute inset-0 bg-green-400/10 animate-pulse pointer-events-none" />
            </div>
          </div>

          {/* Background technical labels */}
          <div className="absolute bottom-4 right-6 opacity-10 pointer-events-none">
            <div className="text-[8px] font-mono leading-tight text-right uppercase">
              DATA_SOURCE: GARTNER_FORRESTER_2024<br/>
              COMP_ID: APEX_MKT_ANALYTICS<br/>
              SEC: 0xFA42_VERIFIED
            </div>
          </div>
        </div>
      </div>

      {/* Growth Drivers Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {data.drivers.map((driver, i) => {
          const [label, desc] = driver.split(': ');
          return (
            <div key={i} className="flex flex-col gap-1 px-4 py-3 border-l-2 border-green-900/50 hover:border-green-500 transition-colors">
              <div className="text-green-400 font-black text-[11px] tracking-widest uppercase mb-1">
                {label}
              </div>
              <div className="text-[10px] text-green-700 font-mono leading-relaxed font-bold uppercase tracking-tighter opacity-80">
                {desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default { MarketChart };