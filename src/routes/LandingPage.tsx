import * as React from 'react';
import { useMemo } from 'react';

import { useMeta } from '../utils/metaManager';
import { useLanguage } from '../context/LanguageContext';
import { MotionLanding } from '../components/motion/MotionTemplates';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { SectionSkeleton } from '../components/ui/SectionSkeleton';

// Only the canonical hero section
const HeroSection = React.lazy(() =>
    import('../components/landing/HeroSection').then(mod => ({
        default: mod.HeroSection
    }))
);

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ErrorBoundary fallback={<SectionSkeleton height="h-screen" />}>
            <React.Suspense fallback={<SectionSkeleton height="h-screen" />}>
                {children}
            </React.Suspense>
        </ErrorBoundary>
    );
};

export function LandingPage() {
    const { t } = useLanguage();

    const metaData = useMemo(
        () => ({
            title: t('meta.landingTitle'),
            description: t('meta.landingDesc'),
            keywords: 'FormatDisc, SlavkoShell, SlavkoKernel, OS governance',
            canonical: 'https://formatdisc.hr/'
        }),
        [t]
    );

    useMeta(metaData);

    return (
        <div className="pt-16 overflow-x-hidden bg-background">
            <MotionLanding order={1}>
                <SectionWrapper>
                    <HeroSection />
                </SectionWrapper>
            </MotionLanding>
        </div>
    );
}