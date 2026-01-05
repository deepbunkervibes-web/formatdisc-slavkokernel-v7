import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { simulatorEmitter } from '../stores/simulatorStore';
import { TerminalLine } from './ui/TerminalLine';

export const Terminal = () => {
  const [input, setInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> Booting SlavkoShell v2.1...",
    "> Initializing Fusion Online",
    "> Kernel v7.0.4r verified",
    "> EU-Only Mode enforced",
    "> Audit Trail activated",
    "> Ready."
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom on new output
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handleCommand = () => {
    if (!input.trim()) return;

    // Echo command to output
    const commandLine = `> ${input}`;
    setTerminalOutput(prev => [...prev, commandLine]);

    // Emit kernel event
    simulatorEmitter.emit('command:executed', {
      command: input,
      timestamp: new Date().toISOString(),
      user: 'engineer',
    });

    // Add to history
    simulatorEmitter.addCommandToHistory(input);

    // Simulate kernel response
    setTimeout(() => {
      const response = simulateKernelResponse(input);
      setTerminalOutput(prev => [...prev, response]);
    }, 300);

    setInput('');
  };

  const simulateKernelResponse = (command: string): string => {
    const cmd = command.toLowerCase().trim();
    
    const responses: Record<string, string> = {
      'help': `Available commands:
  help       - Show this help
  status     - System status
  clear      - Clear terminal (audit-aware)
  reboot     - True Reboot
  audit      - View audit logs
  whoami     - Show current user`,
      'status': `SlavkoShell v2.1 | Kernel v7.0.4r | EU-Only Mode | Node: ZAGREB_NODE_01`,
      'clear': `Terminal cleared.
[AUDIT: Clear command executed at ${new Date().toLocaleTimeString()}]`,
      'reboot': `Initiating True Reboot...
[AUDIT: Reboot command executed at ${new Date().toLocaleTimeString()}]
> System will restart in 3 seconds...`,
      'audit': `Audit log available in /audit directory
> Total events logged: ${Math.floor(Math.random() * 100) + 50}
> Last audit: ${new Date().toLocaleTimeString()}`,
      'whoami': `engineer@slavko-shell (SlavkoKernel™ Institutional Terminal)
> Session ID: ${crypto.randomUUID().substring(0, 8)}
> Access Level: L7_INSTITUTIONAL`,
    };

    if (cmd === 'clear') {
      // Clear terminal but keep audit message
      setTimeout(() => {
        setTerminalOutput([responses['clear']]);
      }, 100);
      return '';
    }

    return responses[cmd] || `> ${command}: Command not found. Type 'help' for available commands.`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  return (
    <div className="bg-black border border-white/10 rounded-sm overflow-hidden h-[500px] flex flex-col font-mono">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500">SlavkoShell_v2.1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] uppercase tracking-widest text-green-500">ONLINE</span>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10"
      >
        {terminalOutput.map((line, index) => (
          <TerminalLine key={index} line={line} isCommand={line.startsWith('>')} />
        ))}
      </div>

      <div className="p-3 border-t border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-sm">&gt;</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-neutral-300 border-none outline-none text-sm placeholder:text-neutral-700"
            placeholder="Type 'help' for available commands..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};
