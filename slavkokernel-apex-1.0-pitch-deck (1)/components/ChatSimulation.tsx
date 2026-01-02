
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { api } from '../api';
import { ProjectManifest, ChatMessage } from '../types';
import { Terminal as TerminalIcon, Shield, Search, Zap, Database, Users, Lock, Unlock, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface ChatSimulationProps {
  sessionId: string;
  manifest: ProjectManifest;
  log: ChatMessage[];
  onNewMessage: (line: string, level?: 'INFO' | 'WARN' | 'CRITICAL', role?: 'system' | 'user') => void;
}

const SUGGESTED_COMMANDS = [
  { label: 'OLLAMA', icon: Database, cmd: 'Check runtime mladen-gertner/slavkokernel-v7' },
  { label: 'COUNCIL', icon: Users, cmd: 'Initiate multi-agent quorum check' },
  { label: 'AUDIT', icon: Shield, cmd: 'Generate signed manifest audit' },
  { label: 'INTEGRITY', icon: Search, cmd: 'Run kernel integrity scan' }
];

const SeverityDot = ({ level }: { level?: 'INFO' | 'WARN' | 'CRITICAL' }) => {
  let color = "bg-terminal-green";
  if (level === 'WARN') color = "bg-terminal-amber";
  if (level === 'CRITICAL') color = "bg-terminal-red animate-pulse";
  return <div className={`w-1.5 h-1.5 rounded-full ${color}`} />;
};

export default function ChatSimulation({ sessionId, manifest, log, onNewMessage }: ChatSimulationProps) {
  const [cmd, setCmd] = useState('');
  const [processing, setProcessing] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [currentStream, setCurrentStream] = useState<string>('');
  const endRef = useRef<HTMLDivElement>(null);

  const bestMatch = useMemo(() => {
    if (!cmd.trim()) return null;
    return SUGGESTED_COMMANDS.find(s => 
      s.cmd.toLowerCase().startsWith(cmd.toLowerCase())
    )?.cmd || null;
  }, [cmd]);

  useEffect(() => {
    if (isScrollLocked) return;
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log, processing, isScrollLocked, currentStream]);

  async function send(customCmd?: string) {
    const activeCmd = customCmd || cmd;
    if (!activeCmd.trim() || processing) return;
    
    setCmd('');
    onNewMessage(`> ${activeCmd}`, 'INFO', 'user');
    setProcessing(true);
    setCurrentStream('');

    try {
      let fullResponse = '';
      const stream = api.chatStream(sessionId, activeCmd, manifest);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setCurrentStream(fullResponse);
      }
      
      const isError = fullResponse.includes('[ERROR]') || fullResponse.includes('[PANIC]');
      onNewMessage(fullResponse, isError ? 'CRITICAL' : 'INFO', 'system');
    } catch (e) {
      onNewMessage(`[ERROR] V7_PANIC: ${e instanceof Error ? e.message : String(e)}`, 'CRITICAL', 'system');
    } finally {
      setProcessing(false);
      setCurrentStream('');
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      send();
    } else if ((e.key === 'Tab' || e.key === 'ArrowRight') && bestMatch && bestMatch !== cmd) {
      e.preventDefault();
      setCmd(bestMatch);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black font-mono">
      <div className="px-8 py-5 border-b border-terminal-green/10 flex justify-between items-center bg-zinc-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <TerminalIcon size={14} className="text-terminal-green" />
          <span className="text-[10px] font-black text-white silver-edge tracking-[0.3em] uppercase">V7_STREAM_OVERSEER</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsScrollLocked(!isScrollLocked)}
            className={`flex items-center gap-2 px-2 py-1 rounded-sm border transition-all text-[8px] font-black uppercase tracking-widest ${isScrollLocked ? 'border-terminal-green/50 text-terminal-green bg-terminal-green/5' : 'border-white/5 text-zinc-600 hover:text-white'}`}
          >
            {isScrollLocked ? <Lock size={10} /> : <Unlock size={10} />}
            {isScrollLocked ? 'LOCKED' : 'SYNC_ON'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 space-y-4 scrollbar-hide">
        {log.map((entry, i) => (
          <div key={i} className={`group animate-in fade-in slide-in-from-left-4 duration-300 ${
            entry.content.startsWith('>') || entry.role === 'user' ? 'mb-2' : 'pl-6 border-l border-white/10 hover:border-terminal-green/40'
          }`}>
            {entry.content.startsWith('>') || entry.role === 'user' ? (
              <div className="flex items-center gap-3">
                <span className="text-terminal-green font-black text-[10px] opacity-30">#</span>
                <span className="text-[11px] font-bold text-white silver-edge tracking-tight">{entry.content.replace(/^>\s*/, '')}</span>
              </div>
            ) : (
              <div className="relative flex gap-3 items-start">
                <div className="mt-1.5 opacity-60">
                  <SeverityDot level={entry.level} />
                </div>
                <div className={`text-[12px] leading-relaxed font-medium whitespace-pre-wrap ${
                  entry.level === 'CRITICAL' ? 'text-terminal-red font-bold' : 
                  entry.level === 'WARN' ? 'text-terminal-amber' : 'text-zinc-400'
                }`}>
                  {entry.content}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {processing && (
          <div className="flex flex-col gap-2 animate-in fade-in duration-300">
             {currentStream ? (
               <div className="pl-6 border-l border-terminal-green/50 py-1">
                 <div className="text-[12px] text-terminal-green font-medium whitespace-pre-wrap animate-pulse">
                   {currentStream}
                   <span className="inline-block w-2 h-4 bg-terminal-green ml-1 animate-flicker"></span>
                 </div>
               </div>
             ) : (
               <div className="flex items-center gap-4 pl-6 border-l border-terminal-green/50 py-3">
                 <div className="flex gap-1.5">
                   <div className="w-1 h-1 bg-terminal-green animate-pulse" />
                   <div className="w-1 h-1 bg-terminal-green animate-pulse [animation-delay:0.2s]" />
                   <div className="w-1 h-1 bg-terminal-green animate-pulse [animation-delay:0.4s]" />
                 </div>
                 <span className="text-[9px] font-black text-terminal-green tracking-[0.4em] uppercase">V7_PROCESSING_QUORUM</span>
               </div>
             )}
          </div>
        )}
        <div ref={endRef} className="h-8" />
      </div>

      <div className="border-t border-terminal-green/10 bg-black/80 backdrop-blur-xl p-8 space-y-6">
        <div className="flex flex-wrap gap-3">
          {SUGGESTED_COMMANDS.map((sc, i) => (
            <button
              key={i}
              onClick={() => send(sc.cmd)}
              disabled={processing}
              className="flex items-center gap-2 px-3 py-1.5 border border-white/5 bg-zinc-900/40 text-[9px] font-black text-zinc-500 hover:text-terminal-green hover:border-terminal-green/30 transition-all uppercase tracking-widest disabled:opacity-20"
            >
              <sc.icon size={10} />
              {sc.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="relative flex items-center bg-black border border-white/10 px-6 py-4 focus-within:border-terminal-green/50 transition-all shadow-2xl">
            <span className="text-terminal-green mr-4 font-black opacity-20 text-xs shrink-0">KERNEL@v7:~$</span>
            <div className="flex-1 relative flex items-center">
              {bestMatch && bestMatch !== cmd && (
                <span className="absolute left-0 top-0 text-white/20 text-xs font-mono font-bold tracking-tight uppercase pointer-events-none select-none">
                  <span className="opacity-0">{cmd}</span>
                  {bestMatch.substring(cmd.length)}
                </span>
              )}
              <input
                className="w-full bg-transparent border-none outline-none text-white focus:ring-0 text-xs font-mono font-bold tracking-tight uppercase relative z-10"
                value={cmd}
                onChange={e => setCmd(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ENTER_COMMAND_ID..."
                autoFocus
                disabled={processing}
              />
            </div>
            <button 
              onClick={() => send()}
              disabled={!cmd.trim() || processing}
              className="ml-4 p-2 text-zinc-600 hover:text-terminal-green disabled:opacity-0 transition-colors"
            >
              <Zap size={16} fill={cmd.trim() ? "currentColor" : "none"} />
            </button>
          </div>
          {bestMatch && bestMatch !== cmd && (
            <div className="absolute -top-6 right-0 text-[8px] font-black text-terminal-green/40 tracking-[0.2em] uppercase">
              TAB / ⮕ TO AUTOCOMPLETE
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
