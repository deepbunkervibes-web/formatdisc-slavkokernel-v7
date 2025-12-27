/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_POSTHOG_KEY: string;
    readonly VITE_SENTRY_DSN: string;
    readonly VITE_OLLAMA_BASE_URL: string;
    readonly VITE_GEMINI_API_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
