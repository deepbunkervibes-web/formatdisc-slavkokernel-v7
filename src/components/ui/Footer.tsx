import * as React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const links = {
    Product: [
    { label: 'Studio', href: '/studio' },
    { label: 'Kernel', href: '/kernel' },
    { label: 'Documentation', href: '/docs' }],

    Resources: [
    { label: 'SlavkoKernel on Ollama', href: 'https://ollama.com/mladen-gertner/slavkokernel-v7', external: true },
    { label: 'GitHub', href: 'https://github.com/mladengertner', external: true },
    { label: 'Architecture Decisions', href: '/docs#adr', external: false }],

    Company: [
    { label: 'Investors', href: '/investors' },
    { label: 'Contact', href: 'mailto:mladen@formatdisc.hr', external: true }]

  };

  return (
    <footer className="border-t border-border bg-secondary/30">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
                                <span className="font-mono font-bold text-background text-lg">&gt;_</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground">FormatDisc</span>
                                <span className="text-[10px] text-muted-foreground font-mono">SlavkoKernel v7</span>
                            </div>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
                            Deterministic AI governance for the EU AI Act era. Making enterprise AI transparent, reproducible, and regulator-ready.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <a href="mailto:mladen@formatdisc.hr" className="block hover:text-foreground transition-colors">
                                mladen@formatdisc.hr
                            </a>
                            <a href="tel:+385915421014" className="block hover:text-foreground transition-colors">
                                +385 91 542 1014
                            </a>
                            <p className="text-xs pt-2">
                                Zagreb, Croatia · EU
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([category, items]) =>
          <div key={category}>
                            <h4 className="font-semibold text-foreground mb-4 text-sm">{category}</h4>
                            <ul className="space-y-3">
                                {items.map((item) =>
              <li key={item.label}>
                                        {item.external ?
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  
                                                {item.label}
                                            </a> :

                <Link
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  
                                                {item.label}
                                            </Link>
                }
                                    </li>
              )}
                            </ul>
                        </div>
          )}
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 mt-12 border-t border-border">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground">© 2025 FormatDisc. All rights reserved.</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                            FORMATDISC, vl. Mladen Gertner · OIB: 18915075854 · Zagreb, Croatia
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* GitHub */}
                        <a
              href="https://github.com/mladengertner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub">
              
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a
              href="https://hr.linkedin.com/in/mladen-gertner-0329b7364"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn">
              
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {/* Ollama */}
                        <a
              href="https://ollama.com/mladen-gertner/slavkokernel-v7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Ollama">
              
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </a>
                        {/* Email */}
                        <a
              href="mailto:mladen@formatdisc.hr"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email">
              
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>);

}