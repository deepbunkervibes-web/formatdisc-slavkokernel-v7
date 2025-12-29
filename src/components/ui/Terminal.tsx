import * as React from 'react';import { useEffect, useRef } from 'react';

import { EvaluationLog } from '../../types';

interface TerminalProps {
  logs: EvaluationLog[];
  isProcessing: boolean;
}

const getAgentStyles = (agent: string) => {
  switch (agent.trim().toUpperCase()) {
    case 'KERNEL':
      return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20';
    case 'SYSTEM':
      return 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border border-slate-500/20';
    case 'COUNCIL':
      return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20';
    case 'SKEPTIC_AGENT':
      return 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20';
    case 'ANALYST_AGENT':
      return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20';
    case 'SIMULATOR_AGENT':
      return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20';
    case 'RESEARCHER_AGENT':
      return 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20';
    default:
      return 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border border-slate-500/20';
  }
};

export function Terminal({ logs, isProcessing }: TerminalProps) {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="font-mono text-xs text-slate-600 dark:text-secondaryText h-full space-y-2">
      {logs.map((log, index) => {
        const time = log.timestamp.substring(11, 19);
        const agentStyles = getAgentStyles(log.agent);
        return (
          <p key={index} className="whitespace-pre-wrap animate-fade-in flex items-start gap-2">
              <span className="text-slate-400 dark:text-secondaryText/50 shrink-0 select-none">{`> ${time}`}</span>
              <span className={`px-1.5 py-0.5 rounded-md font-semibold text-[10px] tracking-wide uppercase shrink-0 select-none ${agentStyles}`}>{log.agent}</span>
              <span className="break-words">{log.message}</span>
          </p>);

      })}
      {isProcessing &&
      <div className="flex items-center gap-2 text-accentBlue pt-2">
          <div className="w-2 h-2 bg-accentBlue rounded-full animate-pulse"></div>
          <p>Processing...</p>
        </div>
      }
      <div ref={terminalEndRef} />
    </div>);

}