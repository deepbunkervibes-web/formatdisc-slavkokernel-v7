import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Code, Shield } from 'lucide-react';

export function KernelPlayground() {
    // Retaining imports and logic exactly as they are, replacing ONLY the return JSX
    const [input, setInput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<any>(null);

    const runDeterministicDemo = () => {
        setIsRunning(true);

        // Simulate deterministic execution
        setTimeout(() => {
            const seed = Math.floor(Math.random() * 1000000);
            const deterministicResult = {
                inputHash: btoa(input).substring(0, 12),
                seed: seed,
                executionSteps: [
                    { step: 1, action: "Input captured", timestamp: Date.now() },
                    { step: 2, action: "Environment locked", timestamp: Date.now() + 100 },
                    { step: 3, action: "Deterministic execution", timestamp: Date.now() + 200 },
                    { step: 4, action: "Lineage captured", timestamp: Date.now() + 300 },
                    { step: 5, action: "Audit trail generated", timestamp: Date.now() + 400 }
                ],
                output: `Deterministic result for "${input}" (seed: ${seed})`,
                reproducible: true,
                auditTrail: "Cryptographically chained execution lineage"
            };

            setResult(deterministicResult);
            setIsRunning(false);
        }, 1500);
    };

    return (
        <section className="relative py-24 bg-background min-h-screen">
            <div className="mx-auto max-w-5xl px-6">
                <div
                    className="
                relative rounded-xl border border-neutral-200 bg-white
                p-6 md:p-8
                shadow-card
                transition-ui
              "
                >
                    {/* Ambient light (extremely subtle) */}
                    <div className="pointer-events-none absolute inset-0 rounded-xl before:absolute before:inset-0 before:bg-accent-cyan/5 before:blur-3xl before:opacity-30" />

                    <div className="relative space-y-10">
                        {/* Header */}
                        <header className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">
                                Kernel Playground
                            </h2>
                            <p className="text-sm text-neutral-600">
                                Deterministic execution surface. All outputs are auditable artefacts.
                            </p>
                        </header>

                        {/* Editor / Output */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-600">
                                    Input Prompt
                                </label>
                                <div className="
                      rounded-lg border border-neutral-200
                      bg-neutral-50 shadow-inner
                      focus-within:ring-2 focus-within:ring-accent-cyan/40
                      transition-all duration-150
                    ">
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="
                          w-full bg-transparent p-4
                          font-mono text-[13px] text-neutral-900
                          outline-none resize-none
                          placeholder:text-neutral-400
                        "
                                        rows={10}
                                        placeholder="Enter any text to test deterministic execution..."
                                    />
                                </div>
                            </div>

                            {/* Output */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-600">
                                    Deterministic Output
                                </label>
                                <div className={`
                      rounded-lg border border-neutral-200
                      bg-white p-4 md:p-6
                      font-mono text-[13px] leading-relaxed
                      whitespace-pre-wrap
                      shadow-card
                      border-t-2 border-accent-cyan/20
                      min-h-[290px]
                      transition-ui
                      ${result ? 'opacity-100' : 'opacity-70'}
                    `}>
                                    {result ? (
                                        <div className="space-y-4">
                                            <div className="text-emerald-700 font-semibold mb-2 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                Execution Complete
                                            </div>
                                            <div className="text-neutral-600">
                                                <span className="text-neutral-400 select-none">$ </span>
                                                {result.output}
                                            </div>
                                            <div className="pt-4 border-t border-neutral-100 space-y-2">
                                                <div className="text-xs text-neutral-400 uppercase tracking-widest">Lineage Trace</div>
                                                {result.executionSteps.map((step: any, i: number) => (
                                                    <div key={i} className="flex gap-3 text-neutral-500">
                                                        <span className="text-neutral-300">{step.step.toString().padStart(2, '0')}</span>
                                                        <span>{step.action}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-neutral-300 select-none italic">
                                // Waiting for execution trigger...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="flex justify-end">
                            <button
                                onClick={runDeterministicDemo}
                                disabled={isRunning || !input.trim()}
                                className="
                      rounded-lg bg-neutral-900 px-6 py-3
                      text-white font-medium
                      hover:bg-neutral-800
                      disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed
                      shadow-glow-subtle
                      transition-all duration-150
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-accent-cyan/40
                      flex items-center gap-2
                    "
                            >
                                {isRunning ? 'Executing...' : 'Run Kernel'} {isRunning && <span className="animate-spin">◌</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
