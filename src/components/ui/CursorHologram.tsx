import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * CURSOR HOLOGRAM – The Living AI Entity of A-NAOS
 * Follows the user cursor and visualizes kernel telemetry in real-time.
 */
export const CursorHologram = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [pulseColor, setPulseColor] = useState('rgba(34, 197, 94, 0.4)'); // Green-500
  const [label, setLabel] = useState('RUNTIME: NOMINAL');

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleKernelEvent = (e: any) => {
        // Reaction to Phase 10 events
        if (e.detail?.type === 'REPLICATION_SUCCESS') {
            setPulseColor('rgba(59, 130, 246, 0.6)'); // Blue-500
            setLabel('REPLICATION: SUCCESS');
            setTimeout(() => {
                setPulseColor('rgba(34, 197, 94, 0.4)');
                setLabel('RUNTIME: NOMINAL');
            }, 3000);
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('NEURAL_SYNAPSE_FIRED', handleKernelEvent);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('NEURAL_SYNAPSE_FIRED', handleKernelEvent);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: smoothX,
        y: smoothY,
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Central Core */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          boxShadow: [
             `0 0 20px ${pulseColor}`,
             `0 0 40px ${pulseColor}`,
             `0 0 20px ${pulseColor}`
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-4 h-4 bg-white/80 rounded-sm backdrop-blur-md border border-white/20"
      />

      {/* Orbiting Shards */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: 40 + i * 10,
            height: 40 + i * 10,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 70%',
          }}
        />
      ))}

      {/* Info Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 10 }}
        className="absolute left-full ml-4 whitespace-nowrap"
      >
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-white tracking-widest uppercase flex flex-col gap-0.5">
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
            {label}
          </span>
          <span className="opacity-40">SEAL: 5e8b3c7d...</span>
        </div>
      </motion.div>

      {/* Glitch Overlay */}
      <motion.div
        animate={{
           opacity: [0, 0.1, 0],
           x: [0, 2, -2, 0]
        }}
        transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: Math.random() * 5
        }}
        className="absolute inset-0 bg-blue-500 mix-blend-overlay blur-sm"
      />
    </motion.div>
  );
};
