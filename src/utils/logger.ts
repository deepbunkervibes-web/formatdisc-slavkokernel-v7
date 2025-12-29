/**
 * Simple logger utility to centralize logging and satisfy ESLint rules.
 * In a real app, this could be connected to Sentry, Datadog, etc.
 */

const isDev = import.meta.env.DEV;

export const logger = {
    info: (...args: unknown[]) => {
        if (isDev) {
            console.log(' [SLAVKO-INFO]', ...args);
        }
    },
    warn: (...args: unknown[]) => {
        console.warn(' [SLAVKO-WARN]', ...args);
    },
    error: (...args: unknown[]) => {
        console.error(' [SLAVKO-ERROR]', ...args);
    },
    debug: (...args: unknown[]) => {
        if (isDev) {
            console.debug(' [SLAVKO-DEBUG]', ...args);
        }
    }
};
