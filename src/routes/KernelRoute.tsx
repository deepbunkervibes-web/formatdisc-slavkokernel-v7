import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal, Play, StopCircle, RefreshCw, Cpu,
    Activity, Shield, Lock, ChevronRight, Zap
} from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { KernelInput, KernelOutput } from '../../api/_lib/kernel/types'; // Import shared types (or redeclare if path issues)

// Redeclare types for frontend to avoid relative import issues depending on build
interface KernelConfig {
    temperature: number;
    maxTokens: number;
    model: string;
}

const DEFAULT_CONFIG: KernelConfig = {
    temperature: 0.7,
    maxTokens: 1000,
    model: 'gpt-4-turbo'
};

export function KernelRoute() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<KernelOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const [config, setConfig] = useState<KernelConfig>(DEFAULT_CONFIG);

    const executeKernel = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setOutput(null);

        try {
            const response = await fetch('/api/kernel/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    config
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Execution failed');

            setOutput(data);
        } catch (error) {
            console.error('Kernel Error:', error);
            // Determine error message safely
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

            setOutput({
                text: `Error: ${errorMessage}`,
                route: 'error',
                confidence: 0,
                metrics: { latencyMs: 0, tokensUsed: 0, modelUsed: 'none', fallbackUsed: false },
                audit: { decisionId: '', manifestVersion: '', traceId: '' }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-accentPrimary/30">
            <Navigation />

            <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Terminal className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold tracking-tight">Kernel Console</h1>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">v12.0.0 • Production Kernel</span>
                        </div>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                        Direct interface to the SlavkoKernel logic engine. Test prompt routing,
                        multi-LLM fallback strategies, and deterministic decision trees.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Controls & Input */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Configuration Card */}
                        <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 backdrop-blur-sm">
                            <h3 className="text-sm font-medium mb-4 flex items-center">
                                <SettingsIcon className="w-4 h-4 mr-2 text-neutral-400" />
                                Configuration
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1.5 block">Model Temperature</label>
                                    <input
                                        type="range"
                                        min="0" max="1" step="0.1"
                                        value={config.temperature}
                                        onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                                        className="w-full accent-blue-500"
                                    />
                                    <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                                        <span>Precise (0.0)</span>
                                        <span>{config.temperature}</span>
                                        <span>Creative (1.0)</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-muted-foreground mb-1.5 block">Primary Model</label>
                                    <select
                                        value={config.model}
                                        onChange={(e) => setConfig({ ...config, model: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="gpt-4-turbo">GPT-4 Turbo</option>
                                        <option value="claude-3-opus">Claude 3 Opus</option>
                                        <option value="llama-3-70b">Llama 3 70B</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 backdrop-blur-sm">
                            <h3 className="text-sm font-medium mb-4 flex items-center">
                                <Activity className="w-4 h-4 mr-2 text-green-400" />
                                System Status
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Kernel State</span>
                                    <span className="flex items-center text-green-400">
                                        <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                                        Active
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Provider</span>
                                    <span className="text-foreground">OpenAI + Mock</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Terminal & Output */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Input Area */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                            <div className="relative bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden">
                                <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/5">
                                    <div className="flex space-x-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                    </div>
                                    <span className="ml-4 text-xs text-neutral-500 font-mono">kernel_input_v1.sh</span>
                                </div>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Enter system prompt or kernel command..."
                                    className="w-full h-40 bg-transparent p-4 text-sm font-mono text-neutral-300 focus:outline-none resize-none placeholder:text-neutral-700"
                                />
                                <div className="flex justify-end p-4 border-t border-white/5 bg-white/[0.02]">
                                    <button
                                        onClick={executeKernel}
                                        disabled={loading || !input.trim()}
                                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        ) : (
                                            <Play className="w-4 h-4 mr-2" />
                                        )}
                                        Execute
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Output Area (Animate Presence) */}
                        <AnimatePresence mode="wait">
                            {output && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="rounded-2xl bg-[#0F0F0F] border border-white/10 overflow-hidden"
                                >
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                                        <div className="flex items-center space-x-2">
                                            <Zap className="w-4 h-4 text-yellow-500" />
                                            <span className="text-xs font-semibold text-neutral-300">KERNEL OUPUT</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-xs text-neutral-500 flex items-center">
                                                <Cpu className="w-3 h-3 mr-1" />
                                                {output.metrics.latencyMs}ms
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${output.metrics.fallbackUsed ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`}>
                                                {output.route}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                                            {output.text}
                                        </p>
                                    </div>
                                    <div className="px-4 py-3 bg-black/40 border-t border-white/5 flex gap-4 text-[10px] font-mono text-neutral-600">
                                        <div>ID: <span className="text-neutral-500">{output.audit.decisionId || 'N/A'}</span></div>
                                        <div>MODEL: <span className="text-neutral-500">{output.metrics.modelUsed}</span></div>
                                        <div>TOKENS: <span className="text-neutral-500">{output.metrics.tokensUsed}</span></div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function SettingsIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
    )
}
