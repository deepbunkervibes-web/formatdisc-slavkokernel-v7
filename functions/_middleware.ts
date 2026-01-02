// Sovereign Routing Layer v1.2
// Enables multi-domain federation for SlavkoShell OS

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const hostname = url.hostname;

  // 1. FUSION DOMAIN
  // fusion.formatdisc.hr -> serves /fusion internally
  if (hostname.startsWith('fusion.')) {
    // If accessing root of fusion domain, rewrite to /fusion path
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/fusion';
      return context.env.ASSETS.fetch(url.toString(), context.request);
    }
  }

  // 2. PROTOCOL DOMAIN
  // protocol.formatdisc.hr -> serves /protocol internally
  if (hostname.startsWith('protocol.')) {
     // If accessing root of protocol domain, rewrite to /protocol path
     if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/protocol';
      return context.env.ASSETS.fetch(url.toString(), context.request);
     }
  }

  // 3. Fallback / Pass-through
  return context.next();
};
