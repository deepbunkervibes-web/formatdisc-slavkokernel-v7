import React from 'react';

import { useLanguage } from '../../context/LanguageContext';

export const FounderStorySection = React.memo(() => {
    const { t } = useLanguage();
    return (
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">{t.founder.title}</h2>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400 font-light mt-8 leading-relaxed">
                        {t.founder.description}
                    </p>
                    <div className="mt-12 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-neutral-400 font-mono text-xs">
                            MG
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-neutral-900 dark:text-white">Mladen Gertner</div>
                            <div className="text-xs text-neutral-400 uppercase tracking-widest">{t.founder.role}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

FounderStorySection.displayName = 'FounderStorySection';
