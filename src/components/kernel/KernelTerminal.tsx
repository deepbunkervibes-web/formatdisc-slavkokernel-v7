import { useState, useMemo } from 'react';
import { Terminal as TerminalIcon, Cpu, Hash } from 'lucide-react';

import { useKernel } from '../../kernel/KernelProvider';
import { useKernelMotion } from '../../motion/useKernelMotion';

export const KernelTerminal = () => {
    const { tick, state, emit } = useKernel();
    const motion = useKernelMotion(0);
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState<string[]>(() => {
        // Initialize with empty array; will populate when kernel is ready
        return [];
    });
    const [initialized, setInitialized] = useState(false);

    // Initialize output when kernel is ready using useMemo to derive initial state
    useMemo(() => {
        if (state === 'ready' && !initialized) {
            setOutput([
                '> kernel booted successfully',
                '> deterministic clock synchronized',
                '> audit trail initialized',
                '> awaiting commands...'
            ]);
            setInitialized(true);
        }
    }, [state, initialized]);

    const executeCommand = (cmd: string) => {
        if (!cmd.trim()) return;

        emit('user', `command:${cmd}`);

        const newOutput = [...output, `> ${cmd}`];

        if (cmd === 'status') {
            newOutput.push('✓ Kernel: ONLINE');
            newOutput.push('✓ Clock: SYNCHRONIZED');
            newOutput.push('✓ Audit: SEALED');
        } else if (cmd === 'clear') {
            setOutput(['> terminal cleared']);
            return;
        } else if (cmd.startsWith('echo ')) {
            newOutput.push(cmd.substring(5));
        } else {
            newOutput.push(`Command not recognized: ${cmd}`);
        }

        setOutput(newOutput.slice(-10));
        setCommand('');
    };

    return (
        <div className="glass rounded-xl overflow-hidden">
            <div className="bg-gray-900/50 border-b border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <TerminalIcon size={20} className="text-[#00ff9d]" />
                    <div>
                        <h3 className="font-medium">Kernel Terminal</h3>
                        <div className="text-xs text-gray-400 flex items-center gap-2">
                            <Cpu size={12} />
                            <span>Tick: {tick}</span>
                            <Hash size={12} />
                            <span>Integrity verified</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"></div>
                        <span className="text-xs text-[#00ff9d]">LIVE</span>
                    </div>
                </div>
            </div>

            <div className="p-4 font-mono text-sm">
                <div className="mb-4 h-64 overflow-y-auto bg-black/30 rounded p-3">
                    {output.map((line, i) => (
                        <div
                            key={i}
                            className={`py-1 ${line.startsWith('>') ? 'text-[#00ff9d]' : 'text-gray-300'}`}
                        >
                            {line}
                        </div>
                    ))}
                </div>

                <div className="flex items-center border border-white/10 rounded overflow-hidden">
                    <div className="px-3 py-2 bg-gray-900/50 text-[#00ff9d]">
                        &gt;
                    </div>
                    <input
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && executeCommand(command)}
                        placeholder="Type a command (status, clear, echo...)"
                        className="flex-1 bg-transparent px-3 py-2 outline-none text-foreground"
                        style={{ transform: `translateX(${motion * 2}px)` }}
                    />
                    <button
                        onClick={() => executeCommand(command)}
                        className="px-4 py-2 bg-[#00ff9d]/10 text-[#00ff9d] hover:bg-[#00ff9d]/20 transition-colors"
                    >
                        Execute
                    </button>
                </div>
            </div>
        </div>
    );
};
