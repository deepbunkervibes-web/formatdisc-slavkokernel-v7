import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface InvestorAuthContextType {
    isAuthenticated: boolean;
    login: (email: string) => boolean;
    logout: () => void;
}

const InvestorAuthContext = createContext<InvestorAuthContextType | undefined>(undefined);

const WHITELISTED_EMAILS = [
    'jc@filrougecapital.com',
    'mladen@formatdisc.hr',
    'demo@investor.com' // Temporary for testing
];

export function InvestorAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check local storage for existing session
        const session = localStorage.getItem('formatdisc_investor_session');
        if (session === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (email: string): boolean => {
        // Simple client-side whitelist check for MVP.
        // In production, this should be server-side verification.
        const normalizedEmail = email.toLowerCase().trim();
        if (WHITELISTED_EMAILS.includes(normalizedEmail)) {
            setIsAuthenticated(true);
            localStorage.setItem('formatdisc_investor_session', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('formatdisc_investor_session');
    };

    return (
        <InvestorAuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </InvestorAuthContext.Provider>
    );
}

export function useInvestorAuth() {
    const context = useContext(InvestorAuthContext);
    if (context === undefined) {
        throw new Error('useInvestorAuth must be used within an InvestorAuthProvider');
    }
    return context;
}
