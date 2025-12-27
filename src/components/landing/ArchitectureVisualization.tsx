import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const ArchitectureVisualization = React.memo(() => {
    const { t } = useLanguage();
    return (
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">{t.archVis.title}</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 font-light mt-4">{t.archVis.description}</p>
                </div>
                <div className="h-96 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center justify-center shadow-card overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-neutral-300 dark:text-neutral-600 font-mono text-sm tracking-widest uppercase relative z-10">{t.archVis.module}</span>
                </div>
            </div>
        </section>
    );
});

ArchitectureVisualization.displayName = 'ArchitectureVisualization';
