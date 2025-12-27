import React, { Suspense, useMemo } from 'react';
import { useMeta } from '../utils/metaManager';
import { useLanguage } from '../context/LanguageContext';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { SectionSkeleton } from '../components/ui/SectionSkeleton';
import { usePrefetchSection } from '../hooks/usePrefetchSection';

// ---------- LAZY LOADED SECTIONS (Dynamic Imports) ----------
const importHero = () => import('../components/landing/HeroSection').then(mod => ({ default: mod.HeroSection }));
const importValue = () => import('../components/landing/ValuePropositionSection').then(mod => ({ default: mod.ValuePropositionSection }));
const importTimeline = () => import('../components/landing/JourneyTimeline').then(mod => ({ default: mod.JourneyTimeline }));
const importArch = () => import('../components/landing/ArchitectureVisualization').then(mod => ({ default: mod.ArchitectureVisualization }));
const importCompliance = () => import('../components/landing/ComplianceDemoSection').then(mod => ({ default: mod.ComplianceDemoSection }));
const importTryNow = () => import('../components/landing/TryItNowSection').then(mod => ({ default: mod.TryItNowSection }));
const importProblem = () => import('../components/landing/ProblemSolutionComparison').then(mod => ({ default: mod.ProblemSolutionComparison }));
const importFounder = () => import('../components/landing/FounderStorySection').then(mod => ({ default: mod.FounderStorySection }));
const importMetrics = () => import('../components/landing/MetricsSection').then(mod => ({ default: mod.MetricsSection }));
const importCta = () => import('../components/landing/CtaGrid').then(mod => ({ default: mod.CtaGrid }));

const HeroSection = React.lazy(importHero);
const ValuePropositionSection = React.lazy(importValue);
const JourneyTimeline = React.lazy(importTimeline);
const ArchitectureVisualization = React.lazy(importArch);
const ComplianceDemoSection = React.lazy(importCompliance);
const TryItNowSection = React.lazy(importTryNow);
const ProblemSolutionComparison = React.lazy(importProblem);
const FounderStorySection = React.lazy(importFounder);
const MetricsSection = React.lazy(importMetrics);
const CtaGrid = React.lazy(importCta);

// ---------- FALLBACK WRAPPER ----------
const SectionWrapper = ({ children, height, prefetchFn }: { children: React.ReactNode, height: string, prefetchFn?: () => Promise<any> }) => {
    const prefetchRef = prefetchFn ? usePrefetchSection(prefetchFn) : null;
    return (
        <ErrorBoundary fallback={<SectionSkeleton height={height} />}>
            <Suspense fallback={<SectionSkeleton height={height} />}>
                {children}
            </Suspense>
            {prefetchRef && <div ref={prefetchRef} className="h-1 w-1" />}
        </ErrorBoundary>
    );
};

export function LandingPage() {
    const { t } = useLanguage();

    const metaData = useMemo(() => ({
        title: t.meta?.landingTitle || 'FormatDisc — Od ideje do MVP-a u 48 sata',
        description: t.meta?.landingDesc || 'FormatDisc pomaže timovima i osnivačima da u kratkom roku izgrade i isporuče audit-pripremni MVP.',
        keywords: 'AI governance, 48h MVP, deterministic AI, SlavkoKernel',
        canonical: 'https://formatdisc.hr/'
    }), [t]);

    useMeta(metaData);

    return (
        <div className="pt-16 space-y-0 overflow-x-hidden bg-background">
            <SectionWrapper height="h-screen">
                <HeroSection />
            </SectionWrapper>

            <SectionWrapper height="h-[600px]" prefetchFn={importValue}>
                <ValuePropositionSection />
            </SectionWrapper>

            <SectionWrapper height="h-[300px]" prefetchFn={importTimeline}>
                <JourneyTimeline />
            </SectionWrapper>

            <SectionWrapper height="h-[600px]" prefetchFn={importArch}>
                <ArchitectureVisualization />
            </SectionWrapper>

            <SectionWrapper height="h-screen" prefetchFn={importCompliance}>
                <ComplianceDemoSection />
            </SectionWrapper>

            <SectionWrapper height="h-[500px]" prefetchFn={importTryNow}>
                <TryItNowSection />
            </SectionWrapper>

            <SectionWrapper height="h-[300px]" prefetchFn={importProblem}>
                <ProblemSolutionComparison />
            </SectionWrapper>

            <SectionWrapper height="h-[400px]" prefetchFn={importFounder}>
                <FounderStorySection />
            </SectionWrapper>

            <SectionWrapper height="h-[200px]" prefetchFn={importMetrics}>
                <MetricsSection />
            </SectionWrapper>

            <SectionWrapper height="h-[600px]" prefetchFn={importCta}>
                <CtaGrid />
            </SectionWrapper>
        </div>
    );
}
