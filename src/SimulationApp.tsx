import * as React from 'react';
import { KernelProvider } from './kernel/KernelProvider';
import { MvpStudio } from './components/MvpStudio';
import { Toaster } from './components/ui/toaster';
import './globals.css';

import { LanguageProvider } from './context/LanguageContext';

/**
 * SimulationApp - The sovereign entry point for simulate.formatdisc.hr
 * 
 * This application shell focuses purely on the MVP Simulation Tool,
 * stripping away the broader corporate/institutional context of the main site
 * to focus the user on the immediate interaction with the Kernel.
 */
export default function SimulationApp() {
    return (
        <KernelProvider>
            <LanguageProvider>
                {/* 
                  We strictly enforce dark mode and the specific layout for the studio.
                  The MvpStudio component handles its own internal state and layout (QuantumCanvas, etc).
                */}
                <main className="min-h-screen bg-black text-white antialiased selection:bg-green-500/30">
                    <MvpStudio 
                        complianceMode={true} 
                        showLineageTrace={true} 
                        showDeterminismProof={true}
                    />
                </main>
                <Toaster />
            </LanguageProvider>
        </KernelProvider>
    );
}
