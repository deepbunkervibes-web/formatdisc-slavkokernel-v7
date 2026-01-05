import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { KernelProvider } from './kernel/KernelProvider';
import { LanguageProvider } from './context/LanguageContext';

// Lazy load shell routes for optimal performance
const OrchestrationHub = lazy(() => import('./routes/OrchestrationHub'));
const ManualOrchestration = lazy(() => import('./routes/ManualOrchestration'));
const AutomatedOrchestration = lazy(() => import('./routes/AutomatedOrchestration'));
const DocsRoute = lazy(() => import('./routes/DocsRoute').then(m => ({ default: m.DocsRoute })));
const AuditRoute = lazy(() => import('./routes/AuditRoute').then(m => ({ default: m.AuditRoute })));

const ShellBootLoader = () => (
    <div className="flex h-screen w-full items-center justify-center bg-black text-green-500 font-mono text-sm tracking-widest">
        <span className="animate-pulse">LOADING_SHELL_PARTITION...</span>
    </div>
);

const ShellApp: React.FC = () => {
    return (
        <KernelProvider>
            <LanguageProvider>
                <div className="min-h-screen bg-black text-white antialiased selection:bg-green-500/30">
                    <Suspense fallback={<ShellBootLoader />}>
                        <Routes>
                            {/* Main Hub */}
                            <Route path="/" element={<OrchestrationHub />} />
                            
                            {/* Orchestration Paths */}
                            <Route path="/orchestration/manual" element={<ManualOrchestration />} />
                            <Route path="/orchestration/automated" element={<AutomatedOrchestration />} />
                            
                            {/* Documentation & Audit */}
                            <Route path="/docs" element={<DocsRoute />} />
                            <Route path="/audit" element={<AuditRoute />} />
                            
                            {/* Fallback: Redirect unknown routes to Hub */}
                            <Route path="*" element={<OrchestrationHub />} />
                        </Routes>
                    </Suspense>
                </div>
            </LanguageProvider>
        </KernelProvider>
    );
};

export default ShellApp;
