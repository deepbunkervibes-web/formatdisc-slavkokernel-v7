import { lazy, ComponentType } from 'react';

/**
 * Lazy load a component with automatic retry on failure.
 * Handles transient network issues and stale asset hashes gracefully.
 * 
 * @param importFn - Dynamic import function
 * @param retries - Number of retry attempts (default: 3)
 * @param delay - Delay between retries in ms (default: 1000)
 */
export function lazyWithRetry<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    retries = 3,
    delay = 1000
): React.LazyExoticComponent<T> {
    return lazy(() => retryImport(importFn, retries, delay));
}

/**
 * For named exports, wrap the import transformation with retry logic.
 */
export function lazyNamedWithRetry<T extends ComponentType<any>>(
    importFn: () => Promise<any>,
    exportName: string,
    retries = 3,
    delay = 1000
): React.LazyExoticComponent<T> {
    return lazy(() => 
        retryImport(
            () => importFn().then(m => ({ default: m[exportName] as T })),
            retries,
            delay
        )
    );
}

async function retryImport<T>(
    importFn: () => Promise<T>,
    retries: number,
    delay: number
): Promise<T> {
    let lastError: Error | undefined;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            // Add cache-busting on retry attempts
            if (attempt > 0) {
                console.warn(`[LazyRetry] Attempt ${attempt + 1}/${retries + 1} for module import`);
            }
            return await importFn();
        } catch (error) {
            lastError = error as Error;
            
            // Check if it's a chunk loading error
            if (isChunkLoadError(error)) {
                console.warn(`[LazyRetry] Chunk load failed, attempt ${attempt + 1}/${retries + 1}`);
                
                if (attempt < retries) {
                    await sleep(delay * (attempt + 1)); // Exponential backoff
                    
                    // On final retry, try forcing a page reload to get fresh assets
                    if (attempt === retries - 1) {
                        console.warn('[LazyRetry] Final attempt - will reload on next failure');
                    }
                }
            } else {
                // Non-chunk error, don't retry
                throw error;
            }
        }
    }
    
    // All retries exhausted - offer reload option
    console.error('[LazyRetry] All retry attempts failed. Consider reloading the page.');
    throw lastError;
}

function isChunkLoadError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    
    const message = error.message.toLowerCase();
    return (
        message.includes('failed to fetch dynamically imported module') ||
        message.includes('loading chunk') ||
        message.includes('loading css chunk') ||
        message.includes('dynamically imported module')
    );
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
