import { GrokChat } from './components/ui/GrokChat';
import { CRTOverlay } from './components/ui/CRTOverlay';
import { KernelProvider } from './kernel/KernelProvider';
import { LanguageProvider } from './context/LanguageContext';
import { InvestorAuthProvider } from './context/InvestorAuthContext';
import { Navigation } from './components/ui/Navigation';
import { Footer } from './components/ui/Footer';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <CRTOverlay scanlineIntensity={0.3} />
      <KernelProvider>
        <LanguageProvider>
          <InvestorAuthProvider>
            <div className="min-h-screen bg-background text-foreground antialiased">
              <Navigation />
              <main className="flex-1 pt-16">
                <Outlet />
              </main>
              <Footer />
              {/* Grok chat widget – always present */}
              <GrokChat />
            </div>
          </InvestorAuthProvider>
        </LanguageProvider>
      </KernelProvider>
    </>
  );
}

