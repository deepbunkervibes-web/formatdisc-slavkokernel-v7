import React from 'react';
import { motion } from 'framer-motion';

export const SectionDivider: React.FC = () => (
    <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-16"
    />
);

interface HeadingBlockProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({ title, subtitle, align = 'left' }) => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
        >
            <h2 className="text-2xl md:text-3xl font-mono font-black text-cyan-400 uppercase tracking-tighter mb-2">
                {title}
            </h2>
            {subtitle && (
                <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};
