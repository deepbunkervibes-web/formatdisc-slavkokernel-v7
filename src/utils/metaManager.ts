interface MetaConfig {
    title: string;
    description: string;
    keywords?: string;
    canonical?: string;
}

export class MetaManager {
    private static instance: MetaManager;
    private originalTitle: string;
    private originalMeta: Record<string, string>;

    private constructor() {
        this.originalTitle = document.title;
        this.originalMeta = {};
    }

    static getInstance(): MetaManager {
        if (!MetaManager.instance) {
            MetaManager.instance = new MetaManager();
        }
        return MetaManager.instance;
    }

    setMeta(config: MetaConfig): void {
        // Set title
        document.title = config.title;

        // Set description
        this.setMetaTag('description', config.description);

        // Set keywords if provided
        if (config.keywords) {
            this.setMetaTag('keywords', config.keywords);
        }

        // Set canonical if provided
        if (config.canonical) {
            this.setCanonicalTag(config.canonical);
        }
    }

    private setMetaTag(name: string, content: string): void {
        let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    private setCanonicalTag(href: string): void {
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        link.setAttribute('href', href);
    }

    restoreOriginal(): void {
        document.title = this.originalTitle;
        // Restore other original meta tags as needed
    }
}

// Hook for React components
import React from 'react';

export function useMeta(config: MetaConfig): void {
    React.useEffect(() => {
        const manager = MetaManager.getInstance();
        manager.setMeta(config);

        return () => {
            manager.restoreOriginal();
        };
    }, [config]);
}
