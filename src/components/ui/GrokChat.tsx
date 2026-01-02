// src/components/ui/GrokChat.tsx
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GROK_SLIDE } from '../../lib/motion-presets';
import './GrokChat.module.css';

export const GrokChat: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Icon */}
      <button
        className="grok-icon"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Grok AI chat"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="11" fill="var(--grok-bg)" />
          <polygon points="10,8 16,12 10,16" fill="var(--grok-fg)" />
        </svg>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="grok-panel"
            variants={GROK_SLIDE}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <header className="grok-header">
              <h3>Grok xAI Assistant</h3>
              <button onClick={() => setOpen(false)} aria-label="Close">
                ✕
              </button>
            </header>
            <section className="grok-body">
              <p className="grok-welcome">
                <em>Welcome, sovereign.</em> Ask me anything about the kernel, compliance, or architecture.
              </p>
              <form
                className="grok-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  // placeholder – later connect to real Grok endpoint
                }}
              >
                <input type="text" placeholder="Enter your query…" className="grok-input" />
                <button type="submit" className="grok-send">
                  Send
                </button>
              </form>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
