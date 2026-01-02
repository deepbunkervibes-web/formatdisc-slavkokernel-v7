
import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: Error) {
    return { hasError: true, error: err };
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error('Unhandled error', err, info);
  }

  render() {
    if (this.state.hasError) {
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