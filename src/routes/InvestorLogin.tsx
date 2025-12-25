import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestorAuth } from '../context/InvestorAuthContext';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export function InvestorLogin() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useInvestorAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulate network delay for "security" feel
        setTimeout(() => {
            const success = login(email);
            if (success) {
                navigate('/investors/portal');
            } else {
                setError('Access denied. This email is not authorized for the Investor Portal.');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
                >
                    {/* Ambient glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple to-accent-cyan opacity-50" />

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                            <ShieldCheck className="w-5 h-5 text-accent-cyan" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-white tracking-tight">Investor Portal</h1>
                            <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Authorized Access Only</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm text-neutral-400 font-medium">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@fund.com"
                                    className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all placeholder:text-neutral-700"
                                    required
                                />
                                <Lock className="w-4 h-4 text-neutral-600 absolute left-3 top-3.5" />
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-400 text-sm bg-red-900/10 border border-red-900/20 p-3 rounded-lg flex items-center gap-2"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-medium rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-neutral-400 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    Access Portal
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
                        <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
                            Powered by SlavkoKernel™ v7 Security
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
