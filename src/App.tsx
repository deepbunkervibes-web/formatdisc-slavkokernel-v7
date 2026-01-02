import { GrokChat } from './components/ui/GrokChat';

function App() {
  return (
    <>
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

