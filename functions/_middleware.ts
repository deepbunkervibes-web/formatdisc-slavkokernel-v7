export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const hostname = url.hostname;

  // 1. FUSION DOMAIN (Supports slavkofusion.* and fusion.*)
  if (hostname.startsWith('slavkofusion.') || hostname.startsWith('fusion.')) {
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/fusion';
      return context.env.ASSETS.fetch(url.toString(), context.request);
    }
  }

  // 2. PROTOCOL DOMAIN (Supports slavkoprotocol.* and protocol.*)
  if (hostname.startsWith('slavkoprotocol.') || hostname.startsWith('protocol.')) {
     if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/protocol';
      return context.env.ASSETS.fetch(url.toString(), context.request);
     }
  }

  // 3. INVESTORS DOMAIN (Supports investitors.* and investors.*)
  if (hostname.startsWith('investitors.') || hostname.startsWith('investors.')) {
     if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/investors';
      return context.env.ASSETS.fetch(url.toString(), context.request);
     }
  }

  return context.next();
};
