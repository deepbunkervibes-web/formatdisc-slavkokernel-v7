import React, { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, info: ErrorInfo) => void;
};

type State = {
    hasError: boolean;
    error?: Error;
};

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            const fallback = this.props.fallback ?? (
                <div className="mx-auto max-w-2xl p-6 text-center bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/30">
                    <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Ups… nešto je pošlo po zlu</h2>
                    <p className="mt-2 text-muted-foreground">
                        Dio stranice se nije mogao učitati. Molimo osvježite stranicu.
                    </p>
                    <button
                        className="mt-4 inline-flex items-center rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 hover:opacity-90 transition-opacity"
                        onClick={() => window.location.reload()}
                    >
                        Ponovno učitaj
                    </button>
                </div>
            );
            return fallback;
        }

        return this.props.children;
    }
}
