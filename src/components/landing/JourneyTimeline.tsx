import * as React from 'react';

import { useLanguage } from '../../context/LanguageContext';

export const JourneyTimeline = React.memo(() => {
    const { t } = useLanguage();
    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-3xl font-semibold text-foreground tracking-tight">{t('timeline.title')}</h2>
                    <p className="text-muted-foreground max-w-2xl font-light">{t('timeline.description')}</p>
                    <div className="w-full h-[1px] bg-border mt-12 relative">
                        <div className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-foreground -translate-y-1/2" />
                        <div className="absolute top-1/2 right-0 w-4 h-4 rounded-full border-2 border-border bg-background -translate-y-1/2" />
                    </div>
                </div>
            </div>
        </section>);

});

JourneyTimeline.displayName = 'JourneyTimeline';