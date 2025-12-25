import React from 'react';

export function FounderStorySection() {
    return (
        <section className="py-24 bg-neutral-50 border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight">The Foundation</h2>
                    <p className="text-lg text-neutral-500 font-light mt-8 leading-relaxed">
                        FormatDisc was born from a simple realization: the future of AI isn't just about intelligence,
                        it's about integrity. We build the infrastructure that makes AI systems auditable,
                        reproducible, and safe for enterprise deployment.
                    </p>
                    <div className="mt-12 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-neutral-200" />
                        <div>
                            <div className="text-sm font-semibold text-neutral-900">Mladen Gertner</div>
                            <div className="text-xs text-neutral-400">Founder & System Architect</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
