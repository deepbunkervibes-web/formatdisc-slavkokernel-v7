import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './globals.css';
import { initSentry } from './utils/sentry';
import { initPostHog } from './utils/posthog';
import { ErrorBoundary } from './components/ErrorBoundary';

// Initialize monitoring
initSentry();
initPostHog();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);
