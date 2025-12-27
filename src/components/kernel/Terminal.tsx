import React, { useEffect, useState, useRef } from 'react';
import { useKernel } from '../kernel/KernelProvider';
import { useKernelMotion } from '../motion/useKernelMotion';
import { Terminal as TerminalIcon, Cpu, Hash, ArrowRight } from 'lucide-react';

export const Terminal = () => {
    const { tick, state, emit } = useKernel();
    const motion = useKernelMotion(0);
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (state === 'ready') {
            const initialOutput = [
                '[SYSTEM] kernel v12.0.4 booted from secure enclave',
                '[SYSTEM] deterministic clock synchronized to external source',
                '[AUDIT] trail initialized; cryptographic sealing active',
                '[SYSTEM] awaiting authenticated commands...'
            ];
            setOutput(initialOutput);
        }
    }, [state]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [output]);

    const executeCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        emit('user', `cli:exec:${trimmed}`);

        let newLines = [`> ${trimmed}`];

        const lower = trimmed.toLowerCase();
        if (lower === 'status' || lower === 'check') {
            newLines.push('✓ Kernel Context: ONLINE/SYNCED');
            newLines.push(`✓ Tick Vector: ${tick}`);
            newLines.push('✓ Integrity Seal: VALID');
        } else if (lower === 'clear') {
            setOutput(['[SYSTEM] console reset']);
            setCommand('');
            return;
        } else if (lower === 'version') {
            newLines.push('SlavkoKernel v12.0.4 (Deterministic Build)');
            newLines.push('FormatDisc UI Bridge v1.2');
        } else if (lower.startsWith('echo ')) {
            newLines.push(trimmed.substring(5));
        } else {
            newLines.push(`Unknown protocol: ${trimmed}`);
            newLines.push('Try: status, clear, version, echo <text>');
        }

        setOutput(prev => [...prev, ...newLines].slice(-20)); // Keep last 20 lines
        setCommand('');
    };

    return (
        <div className="bg-[#050505] rounded-xl border border-white/10 shadow-emerald-500/5 shadow-2xl overflow-hidden group">
            <div className="bg-[#0A0A0A] border-b border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <TerminalIcon size={18} className="text-[#00ff9d]" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest">Kernel Terminal Console</h3>
                        <div className="text-[10px] text-gray-500 flex items-center gap-3 mt-1 font-mono uppercase">
                            <span className="flex items-center gap-1"><Cpu size={10} className="text-blue-500" /> T:{tick}</span>
                            <span className="flex items-center gap-1"><Hash size={10} className="text-[#00ff9d]" /> AUDIT: SEALED</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse"></div>
                        <span className="text-[9px] font-bold text-[#00ff9d] uppercase">Real-Time</span>
                    </div>
                </div>
            </div>

            <div className="p-6 font-mono text-xs">
                <div
                    ref={scrollRef}
                    className="mb-6 h-[280px] overflow-y-auto bg-black/40 rounded-lg p-4 space-y-2 custom-scrollbar border border-white/5"
                >
                    {output.map((line, i) => (
                        <div
                            key={i}
                            className={`leading-relaxed ${line.startsWith('>') ? 'text-[#00ff9d] font-bold' :
                                line.startsWith('[AUDIT]') ? 'text-purple-400' :
                                    line.startsWith('[SYSTEM]') ? 'text-blue-400' :
                                        line.startsWith('✓') ? 'text-emerald-400' : 'text-gray-400'}`}
                        >
                            <span className="opacity-30 mr-2 select-none">[{i.toString().padStart(2, '0')}]</span>
                            {line}
                        </div>
                    ))}
                </div>

                <div className="flex items-center bg-black/50 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#00ff9d]/50 transition-all p-1">
                    <div className="px-4 py-3 text-[#00ff9d] font-bold">
                        $
                    </div>
                    <input
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && executeCommand(command)}
                        placeholder="Awaiting directive..."
                        className="flex-1 bg-transparent px-2 py-3 outline-none text-white placeholder:text-gray-700"
                        style={{ transform: `translateX(${motion * 1.5}px)` }}
                    />
                    <button
                        onClick={() => executeCommand(command)}
                        className="px-6 py-3 bg-[#00ff9d] text-black font-bold uppercase tracking-widest text-[10px] rounded-lg hover:brightness-110 transition-all flex items-center gap-2"
                    >
                        Run <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};
