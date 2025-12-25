/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                accent: {
                    purple: '#7928CA',
                    pink: '#FF0080',
                    cyan: '#0070F3',
                    DEFAULT: '#7f5af0', // Fallback/Main accent
                },
                muted: 'var(--muted)',
                card: 'var(--card)',
                cardBorder: 'var(--card-border)',
                border: '#e5e7eb',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'glow': '0 0 50px -12px rgba(121, 40, 202, 0.3)',
                'glow-subtle': '0 0 30px -10px rgba(255, 0, 128, 0.2)',
                'card': '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'blob': 'blob 10s infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    from: { opacity: 0, transform: 'translateY(10px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.2)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.8)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' }
                }
            }
        },
    },
    darkMode: 'class',
    safelist: [
        'dark',
        'bg-background',
        'text-foreground',
        'bg-accent-purple',
        'bg-accent-cyan',
        'selection:bg-accent-purple/20',
        'selection:text-accent-purple',
        'text-accent',
        'bg-accent',
        'border-border',
        'bg-muted',
    ],
}
