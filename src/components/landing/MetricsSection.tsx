import * as React from 'react';
import { useMemo } from 'react';

import { useLanguage } from '../../context/LanguageContext';

export const MetricsSection = React.memo(() => {
    const { t } = useLanguage();

    const metrics = useMemo(() => [
        { label: t('metrics.velocity.label'), value: t('metrics.velocity.value') },
        { label: t('metrics.audit.label'), value: t('metrics.audit.value') },
        { label: t('metrics.compliance.label'), value: t('metrics.compliance.value') },
        { label: t('metrics.integrity.label'), value: t('metrics.integrity.value') }
    ],
        [t]);

    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {metrics.map((metric, i) => (
                        <div key={i} className="space-y-2 group">
                            <div className="text-3xl font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                                {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-widest">
                                {metric.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

MetricsSection.displayName = 'MetricsSection';