/**
 * DOMAIN GATEWAY — Sovereign Routing Integration
 * Automatically routes traffic based on sovereign domain identity.
 */

import React, { Suspense } from 'react';
import { useSovereignLayout } from '../components/app/useSovereignLayout';

// Lazy load applications to keep bundle size distributed
const FusionConsole = React.lazy(() => import('./fusion/FusionConsole'));
const ProtocolDocs = React.lazy(() => import('./protocol/ProtocolDocs'));
// For Investors, we use the Institutional Briefing we verified earlier
const InvestorsRoute = React.lazy(() => import('./InvestorsRoute').then(module => ({ default: module.InvestorsRoute }))); 
const LandingPage = React.lazy(() => import('./LandingPage').then(module => ({ default: module.LandingPage })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
    <div className="absolute mt-16 text-[10px] text-green-500 font-mono tracking-widest uppercase animate-pulse">
        Establishing Secure Uplink
    </div>
  </div>
);

export const DomainGateway: React.FC = () => {
    const { name } = useSovereignLayout();

    console.log(`[DOMAIN_GATEWAY] Routing for sovereign domain: ${name}`);

    return (
        <Suspense fallback={<PageLoader />}>
            {(() => {
                switch (name) {
                    case 'FUSION':
                        return <FusionConsole />;
                    case 'PROTOCOL':
                        return <ProtocolDocs />;
                    case 'INVESTORS':
                        return <InvestorsRoute />;
                    default:
                        return <LandingPage />;
                }
            })()}
        </Suspense>
    );
};
