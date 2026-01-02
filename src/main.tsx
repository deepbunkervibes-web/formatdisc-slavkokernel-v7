import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './globals.css'

import ErrorBoundary from './components/ErrorBoundary'
import { initSentry } from './utils/sentry';
import { initPostHog } from './utils/posthog';
import { initFusionRegistry } from './fusion/fusionRegistry';
import { PersonaRegistry } from './persona/PersonaRegistry';
import { DEFAULT_PERSONAS } from './persona/PersonaDefinitions';

// Initialize monitoring & fusion
initSentry();
initPostHog();
initFusionRegistry();

// Initialize Persona Registry (v2.0)
DEFAULT_PERSONAS.forEach(persona => PersonaRegistry.register(persona));
PersonaRegistry.markInitialized();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    </React.StrictMode>,
)
