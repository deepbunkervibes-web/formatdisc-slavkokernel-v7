import React from 'react';

export function JourneyTimeline() {
    return (
        <section className="py-24 bg-white border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight">Development Timeline</h2>
                    <p className="text-neutral-500 max-w-2xl font-light">From initial protocol design to enterprise-grade AI governance.</p>
                    <div className="w-full h-[1px] bg-neutral-100 mt-12 relative">
                        <div className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-neutral-900 -translate-y-1/2" />
                        <div className="absolute top-1/2 right-0 w-4 h-4 rounded-full border-2 border-neutral-200 bg-white -translate-y-1/2" />
                    </div>
                </div>
            </div>
        </section>
    );
}
