import { useLanguage } from '../../context/LanguageContext';

export function PricingSection() {
    const { t } = useLanguage();

    return (
        <section
            id="pricing"
            className="py-24 bg-background border-t border-border"
        >
            <div className="max-w-6xl mx-auto px-6">
                <header className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-foreground">
                        {t('pricing.title')}
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        {t('pricing.subtitle')}
                    </p>
                </header>

                <div className="grid gap-8 md:grid-cols-3">
                    {t('pricing.plans').map((plan: any) => (
                        <div
                            key={plan.id}
                            className={`
                rounded-3xl p-8
                bg-muted/40
                border border-border
                text-foreground
                flex flex-col
                ${plan.highlight ? 'ring-2 ring-accent' : ''}
              `}
                        >
                            <h3 className="text-xl font-semibold">
                                {plan.name}
                            </h3>

                            <div className="mt-4 text-4xl font-bold">
                                {plan.price}
                            </div>

                            <p className="mt-2 text-sm text-muted-foreground">
                                {plan.description}
                            </p>

                            <ul className="mt-6 space-y-2 text-sm flex-1">
                                {plan.features.map((f: any) => (
                                    <li key={f.label} className="flex gap-2">
                                        <span>{typeof f === 'string' ? '✓' : (f.included ? '✓' : '–')}</span>
                                        <span
                                            className={
                                                typeof f === 'string' ? '' : (
                                                    f.included
                                                        ? 'text-foreground'
                                                        : 'text-muted-foreground line-through')
                                            }
                                        >
                                            {typeof f === 'string' ? f : f.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="
                  mt-8 w-full rounded-xl py-3
                  bg-accent text-accent-foreground
                  font-semibold
                  transition-colors
                "
                            >
                                {t('pricing.cta')}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Rationale Section */}
                {t('pricing.rationale') && (
                    <div className="mt-24 border-t border-border pt-16">
                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1">
                                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">
                                    {t('pricing.rationale.title')}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    {t('pricing.rationale.description')}
                                </p>
                                <button className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/90">
                                    {t('pricing.rationale.cta')}
                                </button>
                            </div>

                            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest border-b border-red-500/20 pb-2">
                                        Što 2900 € Nije
                                    </h4>
                                    <ul className="space-y-3">
                                        {t('pricing.rationale.listNot') && Array.isArray(t('pricing.rationale.listNot')) && t('pricing.rationale.listNot').map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                                <span className="text-red-500 font-bold shrink-0">✕</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                                        Što 2900 € Jest
                                    </h4>
                                    <ul className="space-y-3">
                                        {t('pricing.rationale.listIs') && Array.isArray(t('pricing.rationale.listIs')) && t('pricing.rationale.listIs').map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
