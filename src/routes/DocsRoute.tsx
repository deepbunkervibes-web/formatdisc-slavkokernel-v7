import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

export function DocsRoute() {
    return (
        <section className="relative min-h-screen bg-background pt-32 pb-24">
            {/* Ambient light (extremely subtle) */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-accent-cyan/5 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-accent-purple/5 blur-3xl opacity-50" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-center mb-20 space-y-6"
                >
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
                        Technical Documentation
                    </h1>
                    <p className="text-lg text-neutral-500 font-light max-w-2xl mx-auto leading-relaxed">
                        Deep dive into strict architectural protocols, implementation guides, and compliance frameworks.
                    </p>
                </motion.div>

                {/* Documentation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="
                        group relative bg-white rounded-xl border border-neutral-200 p-8
                        shadow-card hover:shadow-lg hover:-translate-y-[1px]
                        transition-ui
                    ">
                        <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center mb-6 border border-neutral-100">
                            <FileText className="w-5 h-5 text-neutral-700" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">Technical Whitepaper</h3>
                        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                            Complete technical architecture and compliance framework documentation.
                        </p>
                        <button className="flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-accent-cyan transition-ui outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40 rounded-sm">
                            <Download className="w-4 h-4" />
                            <span>Download PDF</span>
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="
                        group relative bg-white rounded-xl border border-neutral-200 p-8
                        shadow-card hover:shadow-lg hover:-translate-y-[1px]
                        transition-ui
                    ">
                        <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center mb-6 border border-neutral-100">
                            <ExternalLink className="w-5 h-5 text-neutral-700" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">API Documentation</h3>
                        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                            Complete API reference and integration guides for SlavkoKernel protocols.
                        </p>
                        <button className="flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-accent-purple transition-ui outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40 rounded-sm">
                            <span>View Specs</span>
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Card 3 */}
                    <div className="
                         group relative bg-white rounded-xl border border-neutral-200 p-8
                        shadow-card hover:shadow-lg hover:-translate-y-[1px]
                        transition-ui
                    ">
                        <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center mb-6 border border-neutral-100">
                            <FileText className="w-5 h-5 text-neutral-700" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">EU AI Act Guide</h3>
                        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                            Step-by-step guide for achieving EU AI Act compliance with FormatDisc.
                        </p>
                        <button className="flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-emerald-600 transition-ui outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40 rounded-sm">
                            <Download className="w-4 h-4" />
                            <span>Download Guide</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
