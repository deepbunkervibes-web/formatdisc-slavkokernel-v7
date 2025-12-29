import * as React from 'react';

import { useLanguage } from '../../context/LanguageContext';

export const FounderStorySection = React.memo(() => {
    const { t } = useLanguage();
    return (
        <section className="py-24 bg-muted/20 border-t border-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-semibold text-foreground tracking-tight">{t('founder.title')}</h2>
                    <p className="text-lg text-muted-foreground font-light mt-8 leading-relaxed">
                        {t('founder.description')}
                    </p>
                    <div className="mt-12 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground font-mono text-xs">
                            MG
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-foreground">Mladen Gertner</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-widest">{t('founder.role')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>);

});

FounderStorySection.displayName = 'FounderStorySection';