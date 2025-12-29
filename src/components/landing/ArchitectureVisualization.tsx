import * as React from 'react';

import { useLanguage } from '../../context/LanguageContext';

export const ArchitectureVisualization = React.memo(() => {
    const { t } = useLanguage();
    return (
        <section className="py-24 bg-muted/20 border-t border-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-semibold text-foreground tracking-tight">{t('archVis.title')}</h2>
                    <p className="text-muted-foreground font-light mt-4">{t('archVis.description')}</p>
                </div>
                <div className="h-96 bg-card border border-border rounded-2xl flex items-center justify-center shadow-sm overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-muted-foreground/50 font-mono text-sm tracking-widest uppercase relative z-10">{t('archVis.module')}</span>
                </div>
            </div>
        </section>);

});

ArchitectureVisualization.displayName = 'ArchitectureVisualization';