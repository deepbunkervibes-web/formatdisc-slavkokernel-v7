import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// INNOVATION #1: Gravity Sink Effect (opposite of bounce - elements sink into place)
const gravitySink = {
    hidden: { opacity: 0, y: -60, scale: 1.1 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 2, // Heavy mass = slow, deliberate movement
        }
    }
};

// INNOVATION #2: Magnetic Pull (elements attracted to each other)
const magneticPull = {
    hidden: { opacity: 0, x: -100, rotate: -5 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
            delay: i * 0.15,
            type: "spring",
            stiffness: 200,
            damping: 25,
        }
    })
};

// INNOVATION #3: Elastic Snap (stretches then snaps)
const elasticSnap = {
    hidden: { opacity: 0, scaleX: 0.3, scaleY: 1.2 },
    visible: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
            velocity: 2,
        }
    }
};

export function HeroSection() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Smooth mouse tracking for magnetic effects
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // INNOVATION #4: Depth Parallax - different elements at different depths
    const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -150]);

    // INNOVATION #5: Rotation on scroll (subtle tilt)
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 0]);

    // INNOVATION #6: Scale breathing effect
    const breatheScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.02, 0.98, 0.95]);

    // Mouse tracking for magnetic effect on orbs
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX / innerWidth - 0.5) * 50);
            mouseY.set((clientY / innerHeight - 0.5) * 50);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative h-[200vh] bg-background overflow-hidden">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">

                {/* INNOVATION #7: Morphing Background Orbs with Mouse Tracking */}
                <div className="pointer-events-none absolute inset-0">
                    <motion.div
                        style={{ x: smoothMouseX, y: smoothMouseY }}
                        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/10 blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        style={{
                            x: useTransform(smoothMouseX, v => -v * 0.5),
                            y: useTransform(smoothMouseY, v => -v * 0.5)
                        }}
                        className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-accent-cyan/15 to-accent-purple/10 blur-3xl"
                        animate={{
                            scale: [1, 0.8, 1],
                            rotate: [0, -90, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    {/* INNOVATION #8: Floating Particles */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-accent-purple/30"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + i * 10}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 10, 0],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </div>

                <div className="relative mx-auto max-w-7xl px-6">
                    <motion.div
                        style={{
                            scale: breatheScale,
                            rotateX,
                            y: layer2Y,
                        }}
                        initial="hidden"
                        animate="visible"
                        variants={gravitySink}
                        className="mx-auto max-w-4xl text-center space-y-10 perspective-1000"
                    >
                        {/* INNOVATION #9: Staggered Character Reveal */}
                        <motion.div variants={elasticSnap}>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
                                <motion.span
                                    className="inline-block bg-gradient-to-r from-neutral-900 via-accent-purple to-accent-pink bg-clip-text text-transparent bg-[length:200%_auto]"
                                    animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                >
                                    {t.hero.titlePrefix}
                                </motion.span>
                                {" "}{t.hero.titleSuffix}
                                <span className="block text-neutral-400 text-lg sm:text-xl md:text-2xl mt-4 font-normal">
                                    {t.hero.subtitle}
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subtitle with typewriter effect simulation */}
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-neutral-500 font-light leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            {t.hero.description}
                        </motion.p>

                        {/* INNOVATION #10: Badges with Magnetic Hover */}
                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-4 px-4 sm:px-0">
                            <motion.a
                                href="https://ollama.com/mladen-gertner/slavkokernel-v7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-medium text-white bg-gradient-to-r from-accent-purple to-accent-pink px-4 py-2 rounded-full shadow-glow-subtle relative overflow-hidden group"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 30px rgba(121, 40, 202, 0.4)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Shine effect on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                                />
                                <Zap className="w-3 h-3" />
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                {t.hero.badge}
                            </motion.a>
                            <motion.span
                                className="text-xs sm:text-sm font-medium text-neutral-700 bg-neutral-100 px-4 py-2 rounded-full text-center"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.05)" }}
                            >
                                {t.hero.quote}
                            </motion.span>
                        </div>

                        {/* Value pillars with stagger animation */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left pt-4 px-4 sm:px-0">
                            {[
                                { title: t.hero.pillars.deterministic.title, desc: t.hero.pillars.deterministic.desc, color: "text-accent-purple", icon: "◆" },
                                { title: t.hero.pillars.audit.title, desc: t.hero.pillars.audit.desc, color: "text-accent-pink", icon: "◇" },
                                { title: t.hero.pillars.mvp.title, desc: t.hero.pillars.mvp.desc, color: "text-accent-cyan", icon: "○" }
                            ].map((pillar, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={magneticPull}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -5,
                                        transition: { type: "spring", stiffness: 400 }
                                    }}
                                    className="space-y-1 p-4 sm:p-4 bg-white sm:bg-neutral-50/50 rounded-xl border border-transparent hover:border-neutral-200 transition-colors cursor-default"
                                >
                                    <div className={`text-sm font-semibold ${pillar.color} flex items-center gap-2`}>
                                        <span className="text-lg">{pillar.icon}</span>
                                        {pillar.title}
                                    </div>
                                    <div className="text-xs text-neutral-500 font-light leading-relaxed">{pillar.desc}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTAs with dramatic entrance */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.8,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
                        >
                            <motion.a
                                href="/studio"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-8 py-4 text-white font-medium relative overflow-hidden"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {/* Animated gradient background */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-purple bg-[length:200%_100%]"
                                    animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    style={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                />
                                <span className="relative z-10">{t.hero.ctaStudio}</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </motion.a>

                            <motion.a
                                href="/kernel"
                                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 px-8 py-4 text-neutral-800 font-medium hover:bg-neutral-50 transition-colors"
                                whileHover={{ scale: 1.02, borderColor: "rgba(121, 40, 202, 0.3)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t.hero.ctaKernel}
                            </motion.a>
                        </motion.div>

                        {/* Signature with fade-in */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="pt-16 text-[10px] text-neutral-400 tracking-[0.2em] uppercase"
                        >
                            {t.hero.builder}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
