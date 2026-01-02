// Sentry stub to bypass build errors for missing dependencies
export const initSentry = () => {
    console.log('Sentry stub initialized (no @sentry/react found)');
};

export const captureException = (error: Error, context?: Record<string, any>) => {
    console.error('Captured Exception (Sentry Mock):', error, context);
};