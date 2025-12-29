import * as React from 'react';
import { Suspense, useMemo } from 'react';

import { useMeta } from '../utils/metaManager';
import { useLanguage } from '../context/LanguageContext';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { SectionSkeleton } from '../components/ui/SectionSkeleton';
import { usePrefetchSection } from '../hooks/usePrefetchSection';
import { MotionLanding } from '../components/motion/MotionTemplates';

// ---------- LAZY LOADED SECTIONS (Dynamic Imports) ----------
const importHero = () => import('../components/landing/HeroSection').then((mod) => ({ default: mod.HeroSection }));
const importValue = () => import('../components/landing/ValuePropositionSection').then((mod) => ({ default: mod.ValuePropositionSection }));
const importTimeline = () => import('../components/landing/JourneyTimeline').then((mod) => ({ default: mod.JourneyTimeline }));
const importArch = () => import('../components/landing/ArchitectureVisualization').then((mod) => ({ default: mod.ArchitectureVisualization }));
const importCompliance = () => import('../components/landing/ComplianceDemoSection').then((mod) => ({ default: mod.ComplianceDemoSection }));
const importTryNow = () => import('../components/landing/TryItNowSection').then((mod) => ({ default: mod.TryItNowSection }));
const importProblem = () => import('../components/landing/ProblemSolutionComparison').then((mod) => ({ default: mod.ProblemSolutionComparison }));
const importFounder = () => import('../components/landing/FounderStorySection').then((mod) => ({ default: mod.FounderStorySection }));
const importMetrics = () => import('../components/landing/MetricsSection').then((mod) => ({ default: mod.MetricsSection }));
const importCta = () => import('../components/landing/CtaGrid').then((mod) => ({ default: mod.CtaGrid }));

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
const SectionWrapper = ({ children, height, prefetchFn }: { children: React.ReactNode; height: string; prefetchFn?: () => Promise<any>; }) => {
    const prefetchRef = usePrefetchSection(prefetchFn);
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

    // We strictly order the sections for the deterministic motion system.
    // Each MotionLanding wrapper will handle its own entrance animation.
    return (
        <div className="pt-16 space-y-0 overflow-x-hidden bg-background">
            <MotionLanding order={1}>
                <SectionWrapper height="h-screen">
                    <HeroSection />
                </SectionWrapper>
            </MotionLanding>

            <MotionLanding order={2}>
                <SectionWrapper height="h-[600px]" prefetchFn={importValue}>
                    <ValuePropositionSection />
                </SectionWrapper>
            </MotionLanding>

            <MotionLanding order={3}>
                <SectionWrapper height="h-[300px]" prefetchFn={importTimeline}>
                    <JourneyTimeline />
                </SectionWrapper>
            </MotionLanding>

            <MotionLanding order={4}>
                <SectionWrapper height="h-[600px]" prefetchFn={importArch}>
                    <ArchitectureVisualization />
                </SectionWrapper>
            </MotionLanding>

            <MotionLanding order={5}>
                <SectionWrapper height="h-screen" prefetchFn={importCompliance}>
                    <ComplianceDemoSection />
                </SectionWrapper>
            </MotionLanding>

            <MotionLanding order={6}>
                <SectionWrapper height="h-[500px]" prefetchFn={importTryNow}>
                    <TryItNowSection />
                </SectionWrapper>
            </MotionLanding>

            <MotionLanding order={7}>
                <SectionWrapper height="h-[300px]" prefetchFn={importProblem}>
                    <ProblemSolutionComparison />
                </SectionWrapper>
            </MotionLanding>

            <MotionLanding order={8}>
                <SectionWrapper height="h-[400px]" prefetchFn={importFounder}>
                    <FounderStorySection />
                </SectionWrapper>
            </MotionLanding>

            <MotionLanding order={9}>
                <SectionWrapper height="h-[200px]" prefetchFn={importMetrics}>
                    <MetricsSection />
                </SectionWrapper>
            </MotionLanding>

            <MotionLanding order={10}>
                <SectionWrapper height="h-[600px]" prefetchFn={importCta}>
                    <CtaGrid />
                </SectionWrapper>
            </MotionLanding>
        </div>
    );
}