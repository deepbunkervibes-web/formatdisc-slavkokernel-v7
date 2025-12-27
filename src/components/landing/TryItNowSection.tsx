import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TryItNowSection = React.memo(() => {
    const { t } = useLanguage();
    const [idea, setIdea] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const previewRef = useRef<HTMLDivElement>(null);

    const generatePreview = () => {
        if (!idea.trim()) return;
        setIsGenerating(true);

        setTimeout(() => {
            const mock = `// SYSTEM_SYNTHESIS_COMPLETE\n// Target: 48h_MVP_PROTOCOL\n// Idea: \"${idea}\"\n\nexport const Architecture = {\n    backend: \"Node.js (Express) / Deterministic Kernel\",\n    database: \"PostgreSQL / Cryptographic Audit Trail\",\n    frontend: \"React 19 / Modern Tailwind / Framer Motion\",\n    governance: \"EU AI Act Compliance Layer v1.2\"\n};\n\nexport const Endpoints = [\n    \"POST /api/v1/ingest - Secure input stabilization\",\n    \"GET  /api/v1/audit  - Real-time lineage verification\",\n    \"POST /api/v1/deploy - Atomic production rollout\"\n];\n\n// STATUS: READY_TO_SHIP_IN_48H`;
            setPreview(mock);
            setIsGenerating(false);

            // Auto-scroll to result
            setTimeout(() => {
                previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }, 800);
    };

    return (
        <section className="py-24 bg-neutral-50 dark:bg-neutral-800/30 border-t border-neutral-100 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight">{t.tryItNow.title}</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-2xl mx-auto font-light text-lg">
                        {t.tryItNow.description.split('GitHub Copilot').map((part, i, arr) => (
                            <React.Fragment key={i}>
                                {part}
                                {i < arr.length - 1 && <span className="text-neutral-900 dark:text-white font-medium">GitHub Copilot</span>}
                            </React.Fragment>
                        ))}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col md:flex-row items-stretch gap-3 p-2 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-card">
                            <input
                                type="text"
                                placeholder={t.tryItNow.placeholder}
                                value={idea}
                                onChange={e => setIdea(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && generatePreview()}
                                className="flex-1 px-6 py-4 bg-transparent text-neutral-900 dark:text-white outline-none placeholder:text-neutral-400 font-light"
                            />
                            <button
                                onClick={generatePreview}
                                disabled={isGenerating || !idea.trim()}
                                className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:opacity-90 transition-ui flex items-center justify-center gap-2 min-w-[180px] disabled:bg-neutral-200 dark:disabled:bg-neutral-700"
                            >
                                {isGenerating ? (
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>{t.tryItNow.cta}</span>
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
                                className="mt-8 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl bg-[#0d1117]"
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
});

TryItNowSection.displayName = 'TryItNowSection';
