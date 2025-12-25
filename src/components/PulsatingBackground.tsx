import React from 'react';

export const PulsatingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 transition-colors duration-1000 ease-in-out overflow-hidden bg-primaryBg">
      {/* 
        The "Ethereal" effect is achieved by layering multiple blurred colored blobs 
        and animating their position/scale.
      */}
      
      {/* Orb 1: Purple/Violet */}
      <div className="absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob transition-colors duration-1000 bg-purple-300"></div>
      
      {/* Orb 2: Blue/Cyan */}
      <div className="absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 transition-colors duration-1000 bg-cyan-200"></div>
      
      {/* Orb 3: Pink */}
      <div className="absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 transition-colors duration-1000 bg-pink-200"></div>
      
      {/* Overlay for texture/noise if desired, sticking to clean for now */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
    </div>
  );
};
