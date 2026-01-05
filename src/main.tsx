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
// Supports both 'simulate' and 'simulation' subdomains
const isSimulationMode = 
    window.location.hostname.startsWith('simulat') || 
    import.meta.env.VITE_APP_MODE === 'simulation';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            {isSimulationMode ? <SimulationApp /> : <RouterProvider router={router} />}
        </ErrorBoundary>
    </React.StrictMode>,
)
