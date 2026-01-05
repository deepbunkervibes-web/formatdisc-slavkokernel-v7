import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { KernelProvider } from './kernel/KernelProvider';
import { LanguageProvider } from './context/LanguageContext';
import { lazyWithRetry, lazyNamedWithRetry } from './utils/lazyWithRetry';

// Lazy load shell routes with automatic retry on chunk failures
const OrchestrationHub = lazyWithRetry(() => import('./routes/OrchestrationHub'));
const ManualOrchestration = lazyWithRetry(() => import('./routes/ManualOrchestration'));
const AutomatedOrchestration = lazyWithRetry(() => import('./routes/AutomatedOrchestration'));
const DocsRoute = lazyNamedWithRetry(() => import('./routes/DocsRoute'), 'DocsRoute');
const AuditRoute = lazyNamedWithRetry(() => import('./routes/AuditRoute'), 'AuditRoute');

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
