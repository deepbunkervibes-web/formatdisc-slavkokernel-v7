import posthog from 'posthog-js';

export const initPostHog = () => {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

  if (!key) {
    if (import.meta.env.DEV) {
      console.warn('PostHog Key not found. Analytics disabled in DEV.');
    }
    return;
  }

  try {
    posthog.init(key, {
      api_host: host,
      autocapture: true, // Automatically capture clicks, etc.
      capture_pageview: true,
      persistence: 'localStorage+cookie',
    });
    console.log('PostHog initialized.');
  } catch (e) {
    console.error('PostHog initialization failed:', e);
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (import.meta.env.VITE_POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  } else {
    console.log(`[PostHog Mock] Track: ${eventName}`, properties);
  }
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (import.meta.env.VITE_POSTHOG_KEY) {
    posthog.identify(userId, properties);
  } else {
    console.log(`[PostHog Mock] Identify: ${userId}`, properties);
  }
};