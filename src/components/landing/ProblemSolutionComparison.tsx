import React from 'react';

export function ProblemSolutionComparison() {
    return (
        <section className="py-24 bg-white border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-neutral-900">The Problem</h3>
                        <p className="text-neutral-500 font-light">Black-box AI, regulatory non-compliance, and uncontrollable hallucinations in production environments.</p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-accent-cyan">The Solution</h3>
                        <p className="text-neutral-500 font-light">Deterministic workflows, immutable audit trails, and automated compliance verification for every inference.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
