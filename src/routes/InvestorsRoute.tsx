import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download, Mail, Phone } from 'lucide-react';

export function InvestorsRoute() {
    return (
        <div className="min-h-screen bg-slate-950 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Investor{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Data Room
                        </span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Access technical deep-dive, market analysis, and complete investment materials
                        for FormatDisc — the infrastructure layer for EU AI Act compliance.
                    </p>
                </motion.div>

                {/* Data Room Access */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 mb-16"
                >
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Download className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Complete Investment Package</h2>
                        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                            Download our comprehensive investor materials including technical architecture,
                            market analysis, financial projections, and founder background.
                        </p>
                        <a
                            href="https://formatdisc.hr/investors-download"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                        >
                            <span>Access Data Room</span>
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>

                {/* Key Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
                    >
                        <h3 className="text-xl font-semibold text-white mb-4">The Opportunity</h3>
                        <ul className="text-slate-300 space-y-2">
                            <li>• €35M compliance fines mandate solution</li>
                            <li>• 40,000+ enterprises need compliance</li>
                            <li>• $30B+ AI governance market</li>
                            <li>• EU AI Act enforcement begins 2025</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
                    >
                        <h3 className="text-xl font-semibold text-white mb-4">Our Solution</h3>
                        <ul className="text-slate-300 space-y-2">
                            <li>• Infrastructure-level approach</li>
                            <li>• Zero model replacement</li>
                            <li>• Deterministic execution layer</li>
                            <li>• Regulatory alignment built-in</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
                    >
                        <h3 className="text-xl font-semibold text-white mb-4">Ask & Use of Funds</h3>
                        <ul className="text-slate-300 space-y-2">
                            <li>• €750k seed for 18-month runway</li>
                            <li>• 70% Engineering & Product</li>
                            <li>• 20% Go-to-Market & Pilots</li>
                            <li>• 10% Operations & Legal</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center bg-slate-800 rounded-xl border border-slate-700 p-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Let's Build the Future of Trusted AI</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                        <a
                            href="mailto:mladen@formatdisc.hr"
                            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            <span>mladen@formatdisc.hr</span>
                        </a>
                        <a
                            href="tel:+385915421014"
                            className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            <span>+385 91 542 1014</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
