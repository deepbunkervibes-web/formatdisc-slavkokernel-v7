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
import { usePersonaAutoGenerator } from '../../hooks/usePersonaAutoGenerator';
import { Toaster } from '../ui/toaster';

// Inner component to consume contexts safely
const LayoutContent = ({ sovereignMode }: { sovereignMode: any }) => {
  const { hideShellUI } = sovereignMode;
  
  // Activate Auto-Generator Hook
  const { isRegenerating } = usePersonaAutoGenerator();

  return (
    <div className={`min-h-screen bg-black text-foreground antialiased ${hideShellUI ? 'sovereign-view' : ''}`}>
        
        {/* GLOBAL AUTO-GEN INDICATOR */}
        {isRegenerating && (
            <>
                <div className="fixed top-0 left-0 w-full h-1 bg-green-900/50 z-50 overflow-hidden pointer-events-none">
                     <div className="h-full bg-terminal-green animate-progress-indeterminate shadow-[0_0_10px_#22c55e]"></div>
                </div>
                <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 border border-terminal-green/50 px-4 py-2 rounded text-[10px] font-mono text-terminal-green flex items-center gap-3 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.1)] backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    ADAPTING INTERFACE TO PERSONA...
                </div>
            </>
        )}

        {!hideShellUI && <Navigation />}
        
        <main className={`flex-1 ${hideShellUI ? '' : 'pt-16'}`}>
            <Outlet />
        </main>

        {!hideShellUI && <Footer />}
        {!hideShellUI && <GrokChat />}
        <Toaster />
    </div>
  );
};

export const AppLayout = () => {
  const sovereignMode = useSovereignLayout();
  const { name, intensity } = sovereignMode;

  // Telemetry activation
  useSovereignTelemetry(name, intensity);

  return (
    <>
      <SEOManager mode={name} hostname={typeof window !== 'undefined' ? window.location.hostname : ''} />
      <CRTOverlay scanlineIntensity={intensity} />

      {/* Provider Stack */}
      <PersonaProvider>
        <KernelProvider>
          <LanguageProvider>
            <InvestorAuthProvider>
               {/* Content Inner */}
               <LayoutContent sovereignMode={sovereignMode} />
            </InvestorAuthProvider>
          </LanguageProvider>
        </KernelProvider>
      </PersonaProvider>
    </>
  );
};

export default AppLayout;
