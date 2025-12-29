import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface InvestorAuthContextType {
    isAuthenticated: boolean;
    login: (email: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const InvestorAuthContext = createContext<InvestorAuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:3001/api/auth';

export function InvestorAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check session on mount
        const checkSession = async () => {
            try {
                const res = await fetch(`${API_URL}/me`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    // Important: credentials 'include' sends cookies
                    credentials: 'include'
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error('Session check failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = async (email: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.success) {
                setIsAuthenticated(true);
                return { success: true };
            } else {
                return { success: false, error: data.error || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error during login' };
        }
    };

    const logout = async () => {
        try {
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsAuthenticated(false);
        }
    };

    return (
        <InvestorAuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
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
