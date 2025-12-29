import * as React from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { InvestorAuthProvider } from './context/InvestorAuthContext';
import { Navigation } from './components/ui/Navigation';
import { Footer } from './components/ui/Footer';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { LanguageProvider } from './context/LanguageContext';
import { KernelProvider } from './kernel/KernelProvider';
import { MotionPresence } from './components/motion/MotionPresence';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

// Lazy loading all routes for optimal performance and error isolation
const LandingPage = lazy(() => import('./routes/LandingPage').then(m => ({ default: m.LandingPage })));
const InvestorsRoute = lazy(() => import('./routes/InvestorsRoute').then(m => ({ default: m.InvestorsRoute })));
const InvestorLogin = lazy(() => import('./routes/InvestorLogin').then(m => ({ default: m.InvestorLogin })));
const InvestorPortal = lazy(() => import('./routes/InvestorPortal').then(m => ({ default: m.InvestorPortal })));
const DocsRoute = lazy(() => import('./routes/DocsRoute').then(m => ({ default: m.DocsRoute })));
const KernelRoute = lazy(() => import('./routes/KernelRoute').then(m => ({ default: m.KernelRoute })));
const MetricsRoute = lazy(() => import('./routes/MetricsRoute').then(m => ({ default: m.MetricsRoute })));
const AuditRoute = lazy(() => import('./routes/AuditRoute').then(m => ({ default: m.AuditRoute })));
const ObservabilityRoute = lazy(() => import('./routes/ObservabilityRoute').then(m => ({ default: m.ObservabilityRoute })));
const LaunchpadRoute = lazy(() => import('./routes/LaunchpadRoute').then(m => ({ default: m.LaunchpadRoute })));
const KernelDashboard = lazy(() => import('./routes/KernelDashboard').then(m => ({ default: m.KernelDashboard })));
const ObservabilityDashboard = lazy(() => import('./components/observability/ObservabilityDashboard'));
const LectureLandingPage = lazy(() => import('./components/lecture/LectureLandingPage'));
const OrchestrationHub = lazy(() => import('./routes/OrchestrationHub'));
const ManualOrchestration = lazy(() => import('./routes/ManualOrchestration'));
const AutomatedOrchestration = lazy(() => import('./routes/AutomatedOrchestration'));

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
                <MotionPresence routeKey={location.pathname}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/investors" element={<InvestorsRoute />} />
                        <Route path="/investors/login" element={<InvestorLogin />} />
                        <Route path="/investors/portal" element={<InvestorPortal />} />
                        <Route path="/docs" element={<DocsRoute />} />
                        <Route path="/kernel" element={<KernelRoute />} />
                        <Route path="/metrics" element={<MetricsRoute />} />
                        <Route path="/audit" element={<AuditRoute />} />
                        <Route path="/observability" element={<ObservabilityRoute />} />
                        <Route path="/launchpad" element={<LaunchpadRoute />} />
                        <Route path="/kernel-dashboard" element={<KernelDashboard />} />
                        <Route path="/signal" element={<ObservabilityDashboard />} />
                        <Route path="/lecture" element={<LectureLandingPage />} />
                        <Route path="/orchestration" element={<OrchestrationHub />} />
                        <Route path="/orchestration/manual" element={<ManualOrchestration />} />
                        <Route path="/orchestration/automated" element={<AutomatedOrchestration />} />
                    </Routes>
                </MotionPresence>
            </Suspense>
        </ErrorBoundary>
    );
}

function App() {
    return (
        <KernelProvider>
            <LanguageProvider>
                <InvestorAuthProvider>
                    <BrowserRouter>
                        <div className="min-h-screen bg-background text-foreground antialiased">
                            <Navigation />
                            <main className="flex-1">
                                <AnimatedRoutes />
                            </main>
                            <Footer />
                        </div>
                    </BrowserRouter>
                </InvestorAuthProvider>
            </LanguageProvider>
        </KernelProvider>
    );
}

export default App;