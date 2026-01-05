import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
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

// Temporary Shell Placeholder until we migrate the full SlavkoShell OS
const ShellPlaceholder = () => (
    <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-4">
        <div className="max-w-2xl w-full border border-green-900/50 p-8 bg-black/90 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <h1 className="text-2xl mb-4 tracking-tighter">SLAVKOSHELL_OS v2.0 // INITIALIZING</h1>
            <p className="mb-4 text-green-400/80">
                Connection established. The shell environment is being migrated standardizing on Kernel v7.0.
            </p>
            <div className="w-full h-1 bg-green-900/30 overflow-hidden rounded-full">
                <div className="h-full bg-green-500 w-1/3 animate-pulse" />
            </div>
            <div className="mt-4 text-xs text-green-600">
                STATUS: WAITING_FOR_DNS_PROOF<br/>
                ORIGIN: {hostname}
            </div>
        </div>
    </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            {isSimulationMode ? (
                <SimulationApp />
            ) : isShellMode ? (
                <ShellPlaceholder />
            ) : (
                <RouterProvider router={router} />
            )}
        </ErrorBoundary>
    </React.StrictMode>,
)
