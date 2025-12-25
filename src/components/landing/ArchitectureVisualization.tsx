import React from 'react';

export function ArchitectureVisualization() {
    return (
        <section className="py-24 bg-neutral-50 border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight">System Architecture</h2>
                    <p className="text-neutral-500 font-light mt-4">The deterministic engine powering auditable AI.</p>
                </div>
                <div className="h-96 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center shadow-card">
                    <span className="text-neutral-300 font-mono text-sm tracking-widest uppercase">Visualization Module / Offline</span>
                </div>
            </div>
        </section>
    );
}
