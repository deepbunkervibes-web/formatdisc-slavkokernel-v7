import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, BrowserRouter } from 'react-router-dom'
import { router } from './router'
import './globals.css'

import ErrorBoundary from './components/ErrorBoundary'
import { initSentry } from './utils/sentry';
import { initPostHog } from './utils/posthog';
import { lazyWithRetry } from './utils/lazyWithRetry';

// Initialize monitoring
initSentry();
initPostHog();

// Lazy load sovereign apps with automatic retry
const SimulationApp = lazyWithRetry(() => import('./SimulationApp'));
const ShellApp = lazyWithRetry(() => import('./ShellApp'));

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
                    <BrowserRouter>
                        <ShellApp />
                    </BrowserRouter>
                ) : (
                    <RouterProvider router={router} />
                )}
            </Suspense>
        </ErrorBoundary>
    </React.StrictMode>,
)
