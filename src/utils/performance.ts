import { trackEvent } from './posthog';

export function measurePerformance() {
  // Check if PerformanceObserver is supported by the browser.
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance entries to the console.
        console.log(`Performance Entry: ${entry.name}, Duration: ${entry.duration}ms`);

        // Send custom measurements to PostHog
        if (entry.entryType === 'measure') {
          trackEvent('performance_metric', {
            metric_name: entry.name,
            duration_ms: entry.duration,
          });
        }

        // Alert on slow operations (> 3s) and track them
        if (entry.duration > 3000) {
          console.warn(`⚠️ Slow operation detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
          trackEvent('performance_slow_op', {
            metric_name: entry.name,
            duration_ms: entry.duration,
            entry_type: entry.entryType,
          });
        }
      }
    });

    // Observe specific entry types.
    try {
        observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
        console.log("Performance observer is active.");
    } catch (e) {
        console.error("Failed to observe performance entries.", e);
    }
  } else {
    console.log("PerformanceObserver not supported, skipping performance measurements.");
  }
}

// A function to create a performance mark.
export function markPerformance(name: string) {
  if (window.performance) {
    window.performance.mark(name);
  }
}

// A function to measure the duration between a start mark and now.
export function measurePerformancePoint(name: string, startMark: string) {
  if (window.performance) {
    try {
        window.performance.measure(name, startMark);
    } catch (e) {
        // This can fail if the startMark doesn't exist, which is fine.
        // We log it quietly for debugging purposes.
        console.debug(`Could not measure performance for '${name}' from mark '${startMark}'.`, e);
    }
  }
}