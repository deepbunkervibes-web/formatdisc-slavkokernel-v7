import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { InvestorAuthProvider } from './context/InvestorAuthContext';
import { Navigation } from './components/ui/Navigation';
import { Footer } from './components/ui/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { KernelProvider } from './kernel/KernelProvider';
import './globals.css';

function App() {
    return (
        <KernelProvider>
            <LanguageProvider>
                <InvestorAuthProvider>
                    <div className="min-h-screen bg-background text-foreground antialiased">
                        <Navigation />
                        <main className="flex-1 pt-16">
                            <Outlet />
                        </main>
                        <Footer />
                    </div>
                </InvestorAuthProvider>
            </LanguageProvider>
        </KernelProvider>
    );
}

export default App;
