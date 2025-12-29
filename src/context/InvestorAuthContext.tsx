import * as React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { logger } from '@/utils/logger';

// Type describing the authenticated user
interface User {
  email: string;
  role?: string;
}

interface InvestorAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const InvestorAuthContext = createContext<InvestorAuthContextType | undefined>(undefined);

const API_Auth_URL = '/api/auth'; // Using relative path for proxying

export function InvestorAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to sync boolean state
  const isAuthenticated = !!user;

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      // Avoid flash of loading state if already loaded (unlikely on mount, but good practice)
      try {
        const res = await fetch(`${API_Auth_URL}/me`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include' // Important: sends cookies
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        logger.error('Session check failed', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API_Auth_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      logger.error('Login error', error);
      return { success: false, error: 'Network error during login' };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_Auth_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      logger.error('Logout error', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <InvestorAuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading }}>
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