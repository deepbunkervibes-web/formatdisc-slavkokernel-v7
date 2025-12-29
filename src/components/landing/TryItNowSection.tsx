import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export function TryItNowSection() {
    const { t } = useLanguage();
    const [value, setValue] = useState('');

    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
                <header className="mb-10">
                    <h2 className="text-3xl font-semibold text-foreground">
                        {t('try.title')}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        {t('try.subtitle')}
                    </p>
                </header>

                <div
                    className="
            rounded-2xl p-6
            bg-muted/40
            border border-border
          "
                >
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={t('try.placeholder')}
                        className="
              w-full h-32 p-4 rounded-xl
              bg-background
              text-foreground
              border border-border
              resize-none
              focus:ring-2 focus:ring-accent/30
            "
                    />

                    <div className="mt-6 flex justify-end">
                        <button
                            className="
                rounded-xl px-5 py-2
                bg-accent text-accent-foreground
                font-semibold
              "
                        >
                            {t('try.cta')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}