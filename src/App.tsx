import { useMemo } from 'react';
import { GrokChat } from './components/ui/GrokChat';
import { CRTOverlay } from './components/ui/CRTOverlay';
import { KernelProvider } from './kernel/KernelProvider';
import { LanguageProvider } from './context/LanguageContext';
import { InvestorAuthProvider } from './context/InvestorAuthContext';
import { Navigation } from './components/ui/Navigation';
import { Footer } from './components/ui/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useSovereignTelemetry } from './fusion/telemetryHooks';

export default function App() {
  const location = useLocation();
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  // v1.3 Sovereign Detection Logic
  const sovereignMode = useMemo(() => {
    const isFusion = hostname.startsWith('slavkofusion.') || hostname.startsWith('fusion.') || location.pathname.startsWith('/fusion');
    const isProtocol = hostname.startsWith('slavkoprotocol.') || hostname.startsWith('protocol.') || location.pathname.startsWith('/protocol');
    const isInvestors = hostname.startsWith('investitors.') || hostname.startsWith('investors.') || location.pathname.startsWith('/investors');
    const isSimulator = location.pathname.startsWith('/simulator');

    const activeMode = isFusion ? 'FUSION' : isProtocol ? 'PROTOCOL' : isInvestors ? 'INVESTORS' : isSimulator ? 'SIMULATOR' : 'SHELL';

    return {
      active: isFusion || isProtocol || isInvestors || isSimulator,
      hideShellUI: isFusion || isProtocol || isInvestors || isSimulator,
      intensity: isFusion ? 0.5 : isProtocol ? 0.2 : 0.3,
      name: activeMode
    };
  }, [hostname, location.pathname]);

  // v1.3.1 Telemetry Activation
  useSovereignTelemetry(sovereignMode.name, sovereignMode.intensity);

  return (
    <>
      <CRTOverlay scanlineIntensity={sovereignMode.intensity} />
      <KernelProvider>
        <LanguageProvider>
          <InvestorAuthProvider>
            <div className={`min-h-screen bg-black text-foreground antialiased ${sovereignMode.hideShellUI ? 'sovereign-view' : ''}`}>
              
              {!sovereignMode.hideShellUI && <Navigation />}
              
              <main className={`flex-1 ${sovereignMode.hideShellUI ? '' : 'pt-16'}`}>
                <Outlet />
              </main>

              {!sovereignMode.hideShellUI && <Footer />}
              
              {/* Grok chat is only for the Shell/Cockpit, not for dedicated Law or Nervous System domains */}
              {!sovereignMode.hideShellUI && <GrokChat />}
              
            </div>
          </InvestorAuthProvider>
        </LanguageProvider>
      </KernelProvider>
    </>
  );
}

