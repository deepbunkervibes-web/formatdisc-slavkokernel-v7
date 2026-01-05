// Sentry stub to bypass build errors for missing dependencies
export const initSentry = () => {
    if (import.meta.env.DEV) {
        console.log('Sentry stub initialized (no @sentry/react found)');
    }
};

export const captureException = (error: Error, context?: Record<string, any>) => {
    if (import.meta.env.DEV) {
        console.error('Captured Exception (Sentry Mock):', error, context);
    }
};