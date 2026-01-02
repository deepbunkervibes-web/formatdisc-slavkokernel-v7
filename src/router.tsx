import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import App from './App';

const LandingPage = React.lazy(() => import('./routes/LandingPage').then(module => ({ default: module.LandingPage })));
const OrchestrationHub = React.lazy(() => import('./routes/OrchestrationHub'));
const ManualOrchestration = React.lazy(() => import('./routes/ManualOrchestration'));
const AutomatedOrchestration = React.lazy(() => import('./routes/AutomatedOrchestration'));
const ManifestoPage = React.lazy(() => import('./routes/ManifestoPage'));
const DocsRoute = React.lazy(() => import('./routes/DocsRoute').then(module => ({ default: module.DocsRoute })));
const AuditRoute = React.lazy(() => import('./routes/AuditRoute').then(module => ({ default: module.AuditRoute })));
const InvestorsRoute = React.lazy(() => import('./routes/InvestorsRoute').then(module => ({ default: module.InvestorsRoute })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: 'manifesto',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ManifestoPage />
          </Suspense>
        ),
      },
      {
        path: 'docs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DocsRoute />
          </Suspense>
        ),
      },
      {
        path: 'audit',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuditRoute />
          </Suspense>
        ),
      },
      {
        path: 'investors',
        element: (
          <Suspense fallback={<PageLoader />}>
            <InvestorsRoute />
          </Suspense>
        ),
      },
      {
        path: 'orchestration',
        children: [
            {
                index: true,
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <OrchestrationHub />
                  </Suspense>
                ),
            },
            {
                path: 'hub',
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <OrchestrationHub />
                  </Suspense>
                ),
            },
            {
                path: 'manual',
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <ManualOrchestration />
                  </Suspense>
                ),
            },
            {
                path: 'automated',
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <AutomatedOrchestration />
                  </Suspense>
                ),
            }
        ]
      }
    ],
  },
]);
