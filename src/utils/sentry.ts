import * as Sentry from '@sentry/react';

export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    if (import.meta.env.DEV) {
      console.warn('Sentry DSN not found. Skipping initialization in DEV.');
    }
    return;
  }

  Sentry.init({
    dsn,
    integrations: [],
    tracesSampleRate: 1.0, // Capture 100% of transactions for now
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
  });

  console.log('Sentry initialized.');
};

export const captureException = (error: Error, context?: Record<string, any>) => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureException(error, { extra: context });
  } else {
    console.error('Captured Exception (Sentry Mock):', error, context);
  }
};