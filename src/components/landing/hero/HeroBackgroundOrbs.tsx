import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const HeroBackgroundOrbs = React.memo(() => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX / innerWidth - 0.5) * 50);
            mouseY.set((clientY / innerHeight - 0.5) * 50);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
                style={{ x: smoothMouseX, y: smoothMouseY }}
                className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/10 blur-3xl opacity-60"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                style={{
                    x: useTransform(smoothMouseX, v => -v * 0.5),
                    y: useTransform(smoothMouseY, v => -v * 0.5)
                }}
                className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-accent-cyan/15 to-accent-purple/10 blur-3xl opacity-50"
                animate={{ scale: [1, 0.8, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
});

HeroBackgroundOrbs.displayName = 'HeroBackgroundOrbs';
