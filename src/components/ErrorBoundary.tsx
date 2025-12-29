import * as React from 'react';import { Component, ReactNode } from 'react';

import { captureException } from '../utils/sentry';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    captureException(error, { componentStack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center text-center bg-background text-foreground animate-in fade-in duration-500">
                    <div className="bg-destructive/10 p-8 rounded-2xl border border-destructive/20 backdrop-blur-sm max-w-md mx-4">
                        <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                        <h1 className="text-3xl font-bold text-destructive mb-2 tracking-tight">System Critical</h1>
                        <p className="text-muted-foreground mb-6">
                            An unrecoverable state has been detected. The kernel has logged this event for analysis.
                        </p>
                        <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg hover:shadow-primary/20">
              
                            Reboot System
                        </button>
                    </div>
                </div>);

    }

    return this.props.children;
  }
}