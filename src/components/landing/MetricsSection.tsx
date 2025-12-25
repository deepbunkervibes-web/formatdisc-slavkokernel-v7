import React from 'react';

export function MetricsSection() {
    return (
        <section className="py-24 bg-white border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { label: "Deployment Velocity", value: "48h" },
                        { label: "Audit Traceability", value: "100%" },
                        { label: "Compliance Mapping", value: "EU AI Act" },
                        { label: "System Integrity", value: "Deterministic" }
                    ].map((metric, i) => (
                        <div key={i} className="space-y-2">
                            <div className="text-3xl font-semibold text-neutral-900 tracking-tight">{metric.value}</div>
                            <div className="text-xs text-neutral-400 uppercase tracking-widest">{metric.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
