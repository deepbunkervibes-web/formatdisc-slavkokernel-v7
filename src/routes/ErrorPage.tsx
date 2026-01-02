import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono text-terminal-green selection:bg-terminal-green selection:text-black">
      <div className="border border-red-900 bg-red-950/20 p-8 rounded-lg max-w-lg w-full shadow-[0_0_30px_rgba(153,27,27,0.2)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-900/30 rounded">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-red-500">SYSTEM_ERROR_EXCEPTION</h1>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-gray-400">
            The kernel encountered an unexpected condition while routing the request. 
            Target domain or asset identifier could not be resolved.
          </p>
          
          <div className="p-4 bg-black/50 border border-gray-800 rounded text-xs overflow-auto max-h-40">
            <span className="text-red-400 font-bold">[!] ERROR_ID:</span> {error?.statusText || error?.message || 'NULL_POINTER'}<br/>
            <span className="text-red-400 font-bold">[!] STATUS:</span> {error?.status || '500'}<br/>
            <span className="text-gray-600">--- STACK_TRACE_REDACTED ---</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-950/30 border border-green-800 text-green-500 hover:bg-green-900/50 transition-all rounded font-bold uppercase text-sm"
          >
            <Home className="w-4 h-4" />
            Return to Gateway
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-800 hover:border-gray-500 transition-all rounded font-bold uppercase text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Re-init Protocol
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-[10px] text-gray-700 uppercase tracking-[0.2em]">
        SlavkoShell OS // Error Management Subsystem v7.0
      </div>
    </div>
  );
}
