// In a real application, you would import the posthog-js library.
// For this environment, we'll use mock functions.

interface PostHog {
  init: (apiKey: string, options: object) => void;
  capture: (event: string, properties?: object) => void;
  identify: (userId: string, properties?: object) => void;
  debug: () => void;
}

// Mock PostHog object
const posthogMock: PostHog = {
  init: (apiKey, options) => {
    console.log("PostHog.init called with key:", apiKey, "and options:", options);
  },
  capture: (event, properties) => {
    console.log(`PostHog captured event: '${event}' with properties:`, properties);
  },
  identify: (userId, properties) => {
    console.log(`PostHog identified user: '${userId}' with properties:`, properties);
  },
  debug: () => {
    console.log("PostHog debug mode enabled.");
  }
};

export function initPostHog() {
  const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
  if (posthogKey) {
    posthogMock.init(posthogKey, {
      api_host: 'https://app.posthog.com',
      loaded: (ph) => {
        // In dev mode, you might enable debug mode
        // if (process.env.NODE_ENV === 'development') ph.debug();
      },
    });
    console.log("PostHog initialized for product analytics.");
  } else {
    console.log("PostHog key not found, skipping initialization.");
  }
}

export function trackEvent(event: string, properties?: Record<string, any>) {
  posthogMock.capture(event, properties);
}

export function identifyUser(userId: string, properties?: Record<string, any>) {
  posthogMock.identify(userId, properties);
}