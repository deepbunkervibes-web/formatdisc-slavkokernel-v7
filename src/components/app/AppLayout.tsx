/**
 * APP LAYOUT — Centralized root layout
 * Contains SEO, CRT overlay, provider stack, conditional shell UI
 */

import { Outlet } from 'react-router-dom';
import { SEOManager } from '../ui/SEOManager';
import { CRTOverlay } from '../ui/CRTOverlay';
import { PersonaProvider } from '../../persona/PersonaContext';
import { KernelProvider } from '../../kernel/KernelProvider';
import { LanguageProvider } from '../../context/LanguageContext';
import { InvestorAuthProvider } from '../../context/InvestorAuthContext';
import { Navigation } from '../ui/Navigation';
import { Footer } from '../ui/Footer';
import { GrokChat } from '../ui/GrokChat';
import { useSovereignTelemetry } from '../../fusion/telemetryHooks';
import { useSovereignLayout } from './useSovereignLayout';

export const AppLayout = () => {
  const sovereignMode = useSovereignLayout();
  const { hideShellUI, intensity, name } = sovereignMode;

  // Telemetry activation
  useSovereignTelemetry(sovereignMode.name, sovereignMode.intensity);

  return (
    <>
      <SEOManager mode={name} hostname={typeof window !== 'undefined' ? window.location.hostname : ''} />
      <CRTOverlay scanlineIntensity={intensity} />

      <PersonaProvider>
        <KernelProvider>
          <LanguageProvider>
            <InvestorAuthProvider>
              <div className={`min-h-screen bg-black text-foreground antialiased ${hideShellUI ? 'sovereign-view' : ''}`}>
                {!hideShellUI && <Navigation />}
                
                <main className={`flex-1 ${hideShellUI ? '' : 'pt-16'}`}>
                  <Outlet />
                </main>

                {!hideShellUI && <Footer />}
                {!hideShellUI && <GrokChat />}
              </div>
            </InvestorAuthProvider>
          </LanguageProvider>
        </KernelProvider>
      </PersonaProvider>
    </>
  );
};

export default AppLayout;
