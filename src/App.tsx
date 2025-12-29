import * as React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { MotionPresence } from './components/motion/MotionPresence';
import { LandingPage } from './routes/LandingPage';
// import { MvpStudio } from './components/MvpStudio'; // Lazy loaded below
import { InvestorLogin } from './routes/InvestorLogin';
import { InvestorPortal } from './routes/InvestorPortal';
import { InvestorAuthProvider } from './context/InvestorAuthContext';
import { DocsRoute } from './routes/DocsRoute';
import { KernelRoute } from './routes/KernelRoute';
import { MetricsRoute } from './routes/MetricsRoute';
import { AuditRoute } from './routes/AuditRoute';
import { ObservabilityRoute } from './routes/ObservabilityRoute';
import { InvestorsRoute } from './routes/InvestorsRoute';
import { LaunchpadRoute } from './routes/LaunchpadRoute';
import { Navigation } from './components/ui/Navigation';
import { Footer } from './components/ui/Footer';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Lazy load heavy components
const LazyMvpStudio = React.lazy(() => import('./components/MvpStudio').then((module) => ({ default: module.MvpStudio })));

import { LanguageProvider } from './context/LanguageContext';
import { KernelProvider } from './kernel/KernelProvider';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <MotionPresence routeKey={location.pathname}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/studio" element={<LazyMvpStudio />} />
                    <Route path="/investors" element={<InvestorsRoute />} />
                    <Route path="/investors/login" element={<InvestorLogin />} />
                    <Route path="/investors/portal" element={<InvestorPortal />} />
                    <Route path="/docs" element={<DocsRoute />} />
                    <Route path="/kernel" element={<KernelRoute />} />
                    <Route path="/metrics" element={<MetricsRoute />} />
                    <Route path="/audit" element={<AuditRoute />} />
                    <Route path="/observability" element={<ObservabilityRoute />} />
                    <Route path="/launchpad" element={<LaunchpadRoute />} />
                </Routes>
            </MotionPresence>
        </Suspense>
    );
}

function App() {
    return (
        <KernelProvider>
            <LanguageProvider>
                <InvestorAuthProvider>
                    <BrowserRouter>
                        <div className="min-h-screen bg-background text-foreground antialiased selection:bg-accent-purple/20 selection:text-accent-purple relative">
                            {/* Ambient light wash - subtle perceptual depth */}
                            <div className="pointer-events-none fixed inset-0 -z-10">
                                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-3xl"></div>
                                <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-3xl"></div>
                            </div>

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