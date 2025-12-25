import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, Send } from 'lucide-react';

export function TryItNowSection() {
    const [idea, setIdea] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const previewRef = React.useRef<HTMLDivElement>(null);

    const generatePreview = () => {
        if (!idea.trim()) return;
        setIsGenerating(true);

        setTimeout(() => {
            const mock = `// SYSTEM_SYNTHESIS_COMPLETE
// Target: 48h_MVP_PROTOCOL
// Idea: "${idea}"

export const Architecture = {
    backend: "Node.js (Express) / Deterministic Kernel",
    database: "PostgreSQL / Cryptographic Audit Trail",
    frontend: "React 19 / Modern Tailwind / Framer Motion",
    governance: "EU AI Act Compliance Layer v1.2"
};

export const Endpoints = [
    "POST /api/v1/ingest - Secure input stabilization",
    "GET  /api/v1/audit  - Real-time lineage verification",
    "POST /api/v1/deploy - Atomic production rollout"
];

// STATUS: READY_TO_SHIP_IN_48H`;
            setPreview(mock);
            setIsGenerating(false);

            // Auto-scroll to result
            setTimeout(() => {
                previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }, 800);
    };

    return (
        <section className="py-24 bg-neutral-50 border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight">Try it now – zero friction</h2>
                    <p className="text-neutral-500 mt-4 max-w-2xl mx-auto font-light text-lg">
                        Think of it as <span className="text-neutral-900 font-medium">GitHub Copilot — but for the entire product</span>, not just code.
                        Enter an idea to see the architecture FormatDisc designs instantly.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col md:flex-row items-stretch gap-3 p-2 bg-white rounded-2xl border border-neutral-200 shadow-card">
                            <input
                                type="text"
                                placeholder="Describe your product idea in one sentence..."
                                value={idea}
                                onChange={e => setIdea(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && generatePreview()}
                                className="flex-1 px-6 py-4 bg-transparent text-neutral-900 outline-none placeholder:text-neutral-400"
                            />
                            <button
                                onClick={generatePreview}
                                disabled={isGenerating || !idea.trim()}
                                className="px-8 py-4 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-ui flex items-center justify-center gap-2 min-w-[180px] disabled:bg-neutral-200"
                            >
                                {isGenerating ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Generate Preview</span>
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {preview && (
                            <motion.div
                                ref={previewRef}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-8 rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-[#0d1117]"
                            >
                                <div className="bg-[#161b22] px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TerminalIcon className="w-4 h-4 text-neutral-400" />
                                        <span className="text-xs font-mono text-neutral-400">formatdisc_synthesis_log.ts</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                                    </div>
                                </div>
                                <div className="p-6 font-mono text-[13px] leading-relaxed text-blue-300 overflow-x-auto">
                                    <pre className="whitespace-pre">
                                        {preview.split('\n').map((line, i) => (
                                            <div key={i} className="flex gap-4">
                                                <span className="text-neutral-600 select-none w-4">{i + 1}</span>
                                                <span className={
                                                    line.startsWith('//') ? 'text-neutral-500 italic' :
                                                        line.includes('export') ? 'text-purple-400' :
                                                            line.includes('"') ? 'text-emerald-400' :
                                                                'text-blue-300'
                                                }>
                                                    {line}
                                                </span>
                                            </div>
                                        ))}
                                    </pre>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
