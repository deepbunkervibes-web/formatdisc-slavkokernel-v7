import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  mode: string;
  hostname: string;
}

const SEO_MAP: Record<string, { title: string; desc: string }> = {
  SHELL: {
    title: 'SlavkoShell OS — Sovereign Cockpit',
    desc: 'Primary control center for deterministic orchestration and institutional governance.'
  },
  FUSION: {
    title: 'SlavkoFusion — Nervous System Terminal',
    desc: 'Real-time telemetry and multi-agent orchestration console for signal analysis.'
  },
  PROTOCOL: {
    title: 'SlavkoProtocol — Legislative Vault',
    desc: 'Canonical standard documentation and zero-drift enforcement rules for SlavkoShell OS.'
  },
  INVESTORS: {
    title: 'Apex Investors — Institutional Briefing',
    desc: 'Strategic overview, market analysis, and governance transparency for partners.'
  },
  SIMULATOR: {
    title: 'SlavkoSimulator — Deterministic Projection',
    desc: 'Projection environment for simulating institutional outcomes and agentic flows.'
  }
};

export const SEOManager = ({ mode, hostname }: SEOProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const config = SEO_MAP[mode] || SEO_MAP.SHELL;
    
    // Update Title
    document.title = config.title;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', config.desc);
    }

    // Inject Sovereign Meta Tags
    const updateMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (name.includes('og:')) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('og:title', config.title);
    updateMeta('og:description', config.desc);
    updateMeta('formatdisc:host', hostname);
    updateMeta('formatdisc:view', mode);
    updateMeta('slavkoshell:build', 'v1.3.1');
    updateMeta('slavkoshell:audit-hash', btoa(hostname + mode).slice(0, 16));

    // Dynamic Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://${hostname}${pathname}`);

  }, [mode, hostname, pathname]);

  return null;
};
