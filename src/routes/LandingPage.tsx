import React from 'react';
import { useMeta } from '../utils/metaManager';
import { HeroSection } from '../components/landing/HeroSection';
import { JourneyTimeline } from '../components/landing/JourneyTimeline';
import { ArchitectureVisualization } from '../components/landing/ArchitectureVisualization';
import { ComplianceDemoSection } from '../components/landing/ComplianceDemoSection';
import { ProblemSolutionComparison } from '../components/landing/ProblemSolutionComparison';
import { FounderStorySection } from '../components/landing/FounderStorySection';
import { CtaGrid } from '../components/landing/CtaGrid';
import { MetricsSection } from '../components/landing/MetricsSection';
import { ValuePropositionSection } from '../components/landing/ValuePropositionSection';
import { TryItNowSection } from '../components/landing/TryItNowSection';

export function LandingPage() {
    useMeta({
        title: 'FormatDisc — Od ideje do MVP-a u 48 sata',
        description: 'FormatDisc pomaže timovima i osnivačima da u kratkom roku izgrade, validiraju i isporuče audit-pripremni MVP uz determinističku AI arhitekturu.',
        keywords: 'AI governance, 48h MVP, deterministic AI, audit trail, compliance, startup development, FormatDisc',
        canonical: 'https://formatdisc.hr/'
    });

    return (
        <div className="pt-16">
            <HeroSection />
            <ValuePropositionSection />
            <JourneyTimeline />
            <ArchitectureVisualization />
            <ComplianceDemoSection />
            <TryItNowSection />
            <ProblemSolutionComparison />
            <FounderStorySection />
            <MetricsSection />
            <CtaGrid />
        </div>
    );
}
