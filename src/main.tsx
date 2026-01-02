import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './globals.css'

import ErrorBoundary from './components/ErrorBoundary'
import { initSentry } from './utils/sentry';
import { initPostHog } from './utils/posthog';

// Initialize monitoring
initSentry();
initPostHog();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    </React.StrictMode>,
)
