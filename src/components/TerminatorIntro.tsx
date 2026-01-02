import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export default function TerminatorIntro({
  onComplete,
}: { onComplete: () => void }) {
  const [step, setStep] = useState(0); // 0→countdown, 1→final message

  // Simulated countdown (3 seconds)
  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s < 3 ? s + 1 : 3));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Play a low‑freq hum once (Web‑Audio)
  useEffect(() => {
    if (step === 3) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          osc.frequency.value = 30; // deep “engine” tone
          osc.connect(ctx.destination);
          osc.start();
          // stop after 2 s
          setTimeout(() => {
            osc.stop();
            ctx.close();
            onComplete(); // drop into the pitch‑deck
          }, 2000);
        } else {
            // Fallback if AudioContext is not supported
            setTimeout(onComplete, 2000);
        }
      } catch (e) {
          // Fallback if audio fails
          console.error("Audio init failed", e);
          setTimeout(onComplete, 2000);
      }
    }
  }, [step, onComplete]);

  if (step < 3) {
    // Glitchy “digital rain”
    return (
      <div className="absolute inset-0 bg-black overflow-hidden font-mono index-50 z-50">
        <div className="absolute inset-0 pointer-events-none opacity-30 text-green-500">
           {/* Simple static rain effect for performance */}
           <div className="absolute top-10 left-10 animate-pulse">010101</div>
           <div className="absolute top-20 right-20 animate-pulse delay-75">101010</div>
           <div className="absolute bottom-10 left-1/2 animate-pulse delay-150">001100</div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-6xl tracking-wide text-green-500 font-bold">
          <span className="animate-pulse">
            INITIATING… {String(3 - step).padStart(2, '0')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <div className="text-center text-white max-w-md">
        <p className="text-4xl md:text-5xl font-mono tracking-wider text-green-500 border border-green-800 p-8 rounded bg-black shadow-[0_0_50px_rgba(0,255,0,0.2)] animate-pulse">
          YOU ARE TERMINATED<br/>
          <span className="text-sm text-green-800 mt-4 block">ENTER THE VERTEX</span>
        </p>
      </div>
    </div>
  );
}
