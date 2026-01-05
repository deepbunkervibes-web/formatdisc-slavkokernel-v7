import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, BrowserRouter } from 'react-router-dom'
import { router } from './router'
import './globals.css'

import ErrorBoundary from './components/ErrorBoundary'
import { initSentry } from './utils/sentry';
import { initPostHog } from './utils/posthog';
import { KernelProvider } from './kernel/KernelProvider';
import { LanguageProvider } from './context/LanguageContext';

// Initialize monitoring
initSentry();
initPostHog();

// Lazy load sovereign apps
const SimulationApp = lazy(() => import('./SimulationApp'));
const OrchestrationHub = lazy(() => import('./routes/OrchestrationHub'));

// Deterministic Entry Point Protocol
// Supports simulation, shell, and main platform through sovereign entry points
const hostname = window.location.hostname;
const isSimulationMode = 
    hostname.startsWith('simulat') || 
    import.meta.env.VITE_APP_MODE === 'simulation';

const isShellMode = 
    hostname.startsWith('shell') || 
    hostname.startsWith('slavkoshell') || 
    import.meta.env.VITE_APP_MODE === 'shell';

const KernelBootLoader = () => (
    <div className="flex h-screen w-full items-center justify-center bg-black text-green-500 font-mono text-sm tracking-widest">
        <span className="animate-pulse">INITIALIZING_KERNEL_PARTITION...</span>
    </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <Suspense fallback={<KernelBootLoader />}>
                {isSimulationMode ? (
                    <SimulationApp />
                ) : isShellMode ? (
                    <KernelProvider>
                         <LanguageProvider>
                            {/* Shell Mode: Direct access to Orchestration Hub */}
                            <div className="min-h-screen bg-black text-white antialiased selection:bg-green-500/30">
                                <BrowserRouter>
                                    <OrchestrationHub />
                                </BrowserRouter>
                            </div>
                        </LanguageProvider>
                    </KernelProvider>
                ) : (
                    <RouterProvider router={router} />
                )}
            </Suspense>
        </ErrorBoundary>
    </React.StrictMode>,
)
