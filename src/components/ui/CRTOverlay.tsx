import React from 'react';

// Fix: Changed to a named export to resolve module resolution issues.
export const CRTOverlay = ({ scanlineIntensity = 0.5 }: { scanlineIntensity?: number }) => {
  // Map scanlineIntensity (0-1) to an opacity range (e.g., 0 to 0.15)
  const mainScanlineOpacity = 0.05 + scanlineIntensity * 0.1; // Range from 0.05 to 0.15
  const rollingBeamAlpha = 0.05 + scanlineIntensity * 0.1; // Range from 0.05 to 0.15

  return (
  <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
    <style>{`
      @keyframes scanline-scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      @keyframes scanline-distortion {
        /* Mostly stable, then a burst of horizontal jitter for VSync tearing */
        0%, 90%, 100% { transform: scaleY(1) skewX(0deg) translateX(0px); opacity: 0.08; } 
        91% { transform: scaleY(1.02) skewX(1deg) translateX(2px); opacity: 0.15; } 
        92% { transform: scaleY(0.98) skewX(-2deg) translateX(-3px); opacity: 0.1; }
        93% { transform: scaleY(1.01) skewX(0.5deg) translateX(1px); opacity: 0.05; }
        94% { transform: scaleY(1) skewX(0deg) translateX(-2.5px); opacity: 0.08; }
        95% { transform: scaleY(1) skewX(0deg) translateX(1.5px); opacity: 0.08; }
        96% { transform: scaleY(1) skewX(0deg) translateX(-1px); opacity: 0.08; }
        97% { transform: scaleY(1) skewX(0deg) translateX(2px); opacity: 0.08; }
        98% { transform: scaleY(1) skewX(0deg) translateX(-0.5px); opacity: 0.08; }
      }
      @keyframes static-flicker {
        0% { opacity: 0.03; transform: scale(1); } /* Increased from 0.02 */
        5% { opacity: 0.08; transform: scale(1.015) translateX(2px); } /* Increased opacity */
        10% { opacity: 0.03; } /* Increased from 0.02 */
        15% { opacity: 0.09; transform: scale(1.025) translateX(-3px); } /* Increased opacity */
        20% { opacity: 0.03; } /* Increased from 0.02 */
        50% { opacity: 0.03; } /* Increased from 0.02 */
        55% { opacity: 0.1; transform: scale(1.015) translateY(2px); } /* Increased opacity */
        60% { opacity: 0.03; } /* Increased from 0.02 */
        100% { opacity: 0.03; } /* Increased from 0.02 */
      }
      @keyframes noise-shift {
        0% { background-position: 0px 0px; }
        10% { background-position: -10px 10px; }
        20% { background-position: 15px -5px; }
        30% { background-position: -5px -15px; }
        40% { background-position: 20px 20px; }
        50% { background-position: -20px 5px; }
        60% { background-position: 5px -25px; }
        70% { background-position: -15px 10px; }
        80% { background-position: 10px -10px; }
        90% { background: -10px -5px; }
        100% { background-position: 0px 0px; }
      }
      @keyframes interference-color-shift {
        0% { filter: hue-rotate(0deg) saturate(100%); }
        15% { filter: hue-rotate(15deg) saturate(120%); } /* Wider hue shift, higher saturation */
        30% { filter: hue-rotate(-12deg) saturate(90%); } /* Wider hue shift, lower saturation */
        45% { filter: hue-rotate(20deg) saturate(130%); } /* Even wider, higher saturation */
        60% { filter: hue-rotate(-15deg) saturate(95%); } /* Even wider, lower saturation */
        75% { filter: hue-rotate(10deg) saturate(115%); }
        100% { filter: hue-rotate(0deg) saturate(100%); }
      }
      /* NEW: Phosphor Decay Flicker */
      @keyframes fast-phosphor-flicker {
        0%, 100% { opacity: 0.005; }
        25% { opacity: 0.012; }
        50% { opacity: 0.003; }
        75% { opacity: 0.01; }
      }
    `}</style>
    
    {/* Dense Scanlines (Interlaced) */}
    <div 
      className="absolute inset-0" 
      style={{ 
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.5) 50%)', 
        backgroundSize: '100% 3px',
        opacity: mainScanlineOpacity // Dynamically set opacity
      }} 
    />
    
    {/* Film Grain / Noise */}
    <div 
      className="absolute inset-0 opacity-[0.05] mix-blend-overlay animate-flicker" 
      style={{ 
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        backgroundRepeat: 'repeat',
        filter: 'contrast(170%) brightness(100%)'
      }} 
    />

    {/* ENHANCED: Variable Static Interference Layer with Motion and Color Shift */}
    <div 
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      style={{
         backgroundImage: 'url("https://grainy-gradients.app/noise.svg")',
         backgroundRepeat: 'repeat',
         backgroundSize: '150px 150px',
         animation: 'static-flicker 0.15s steps(2) infinite, noise-shift 0.15s steps(2) infinite, interference-color-shift 6s linear infinite', /* Changed 9s to 6s */
         opacity: 0.09 /* Increased from 0.07 */
      }}
    />

    {/* NEW: Subtle Shifting Color Tint Layer */}
    <div
      className="absolute inset-0 pointer-events-none mix-blend-overlay"
      style={{
        backgroundImage: 'url("https://grainy-gradients.app/noise.svg")',
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px', // Different size for varied texture
        animation: 'interference-color-shift 20s linear infinite', // Slower shift
        opacity: 0.02, // Very subtle
        filter: 'saturate(150%) brightness(80%)' // Enhance tint visibility slightly
      }}
    />

    {/* NEW: Very Faint, Fast-Flickering Phosphor Decay Layer */}
    <div
      className="absolute inset-0 pointer-events-none mix-blend-overlay"
      style={{
        backgroundImage: 'url("https://grainy-gradients.app/noise.svg")', // Using noise.svg for consistency
        backgroundRepeat: 'repeat',
        backgroundSize: '80px 80px',
        animation: 'fast-phosphor-flicker 0.04s steps(1) infinite', // Faster flicker
        opacity: 0.025, // Increased from 0.015
      }}
    />

    {/* Primary Rolling Beam - Distorted */}
    <div 
        className="absolute top-0 left-0 w-full h-[200px]"
        style={{
            background: `linear-gradient(to bottom, transparent, rgba(0, 255, 65, ${rollingBeamAlpha}), transparent)`, // Dynamically set alpha
            animation: 'scanline-scan 6s linear infinite, scanline-distortion 4s ease-in-out infinite alternate',
            mixBlendMode: 'overlay'
        }}
    />

    {/* Secondary Interference Line (Fast) */}
    <div 
        className="absolute top-0 left-0 w-full h-[2px] bg-white/20"
        style={{
            animation: 'scanline-scan 2.5s linear infinite',
            opacity: 0.1
        }}
    />
    
    {/* Vignette - No Bezel by default for clean OS look, unless requested */}
    <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.7)] pointer-events-none opacity-50"></div>
  </div>
);
};
