import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, BrowserRouter } from 'react-router-dom'
import { router } from './router'
import SimulationApp from './SimulationApp';
import './globals.css'

import ErrorBoundary from './components/ErrorBoundary'
import { initSentry } from './utils/sentry';
import { initPostHog } from './utils/posthog';

// Initialize monitoring
initSentry();
initPostHog();

// Deterministic Entry Point Protocol
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

import OrchestrationHub from './routes/OrchestrationHub';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
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
        </ErrorBoundary>
    </React.StrictMode>,
)
