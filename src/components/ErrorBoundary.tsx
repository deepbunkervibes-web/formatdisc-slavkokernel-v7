
import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error; isChunkError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, isChunkError: false };

  static getDerivedStateFromError(err: Error): State {
    const isChunkError = ErrorBoundary.isChunkLoadError(err);
    return { hasError: true, error: err, isChunkError };
  }

  static isChunkLoadError(error: Error): boolean {
    const message = error.message.toLowerCase();
    return (
      message.includes('failed to fetch dynamically imported module') ||
      message.includes('loading chunk') ||
      message.includes('loading css chunk')
    );
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error('Unhandled error', err, info);
    
    // Auto-reload on chunk errors after a short delay
    if (ErrorBoundary.isChunkLoadError(err)) {
      console.warn('[ErrorBoundary] Chunk load error detected. Scheduling auto-reload...');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  render() {
    if (this.state.hasError) {
      // Chunk load error - show recovery UI
      if (this.state.isChunkError) {
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
            <div className="text-center p-8 border border-yellow-500/20 bg-yellow-950/10 rounded-sm max-w-lg">
              <h1 className="text-xl text-yellow-500 font-bold mb-4 uppercase tracking-widest">Asset_Sync_Required</h1>
              <p className="text-neutral-500 text-xs mb-4">
                A newer version of the kernel is being synchronized.
              </p>
              <p className="text-neutral-600 text-[10px] mb-8">
                Module: {this.state.error?.message?.split('/').pop() || 'unknown'}
              </p>
              <div className="flex flex-col gap-3">
                <div className="text-yellow-500/60 text-[10px] uppercase tracking-widest animate-pulse">
                  Auto-reloading in 3 seconds...
                </div>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-black border border-yellow-500/20 transition-all uppercase tracking-widest text-[10px] font-bold"
                >
                  Reload_Now
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Generic error
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
          <div className="text-center p-8 border border-red-500/20 bg-red-950/10 rounded-sm max-w-lg">
            <h1 className="text-xl text-red-500 font-bold mb-4 uppercase tracking-widest">System_Critical_Error</h1>
            <p className="text-neutral-500 text-xs mb-8">{this.state.error?.message || 'Unknown kernel panic'}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all uppercase tracking-widest text-[10px] font-bold"
            >
              Reboot_System
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}