/**
 * LIVE RUNTIME RENDERER
 * Listens for UI_ARTIFACT_UPDATED events and re-renders the AI-generated component.
 */
import React, { useState, useEffect } from "react";
import { loadUIArtifact } from "../../services/uiArtifactStore";

export const LiveRuntimeRenderer: React.FC = () => {
  const [artifact, setArtifact] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const refreshArtifact = () => {
    try {
      const art = loadUIArtifact();
      if (art) setArtifact(art);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Initial load
    refreshArtifact();

    // Hot-reload listener
    const handler = (e: any) => {
      console.log("🔥 Hot-Reloading UI Artifact:", e.detail);
      setArtifact(e.detail);
      setError(null);
    };

    window.addEventListener("UI_ARTIFACT_UPDATED", handler);
    window.addEventListener("storage", refreshArtifact); // Cross-tab sync

    return () => {
      window.removeEventListener("UI_ARTIFACT_UPDATED", handler);
      window.removeEventListener("storage", refreshArtifact);
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 border border-red-500 bg-black/50 text-red-500 font-mono text-sm">
        RUNTIME ERROR: {error}
      </div>
    );
  }

  if (!artifact) {
    return (
      <div className="p-8 border border-white/10 border-dashed rounded text-center text-zinc-500 font-mono text-xs">
        WAITING FOR GENERATOR SIGNAL...
      </div>
    );
  }

  // Security: In a real app, use a sandboxed iframe or strict CSP.
  // For this Sovereign OS, we trust the kernel's output (validated by Governance Gate).
  return (
    <div className="live-preview-container animate-in fade-in duration-500">
      <div className="text-[10px] uppercase text-terminal-green mb-2 opacity-50 flex justify-between">
        <span>Generated: {new Date().toLocaleTimeString()}</span>
        <span>{artifact.type}</span>
      </div>
      <div className="p-6 bg-zinc-900/50 rounded-lg border border-white/5 shadow-2xl">
         {/* Since we have raw code string, we can't eval it directly in React easily without a parser.
             For this demo, we will display the code and a mock 'Rendered' view if specific types match.
             A full implementation would use a remote compiler or `new Function` with strict scope. 
          */}
          <pre className="text-xs text-green-400 overflow-x-auto p-4 bg-black rounded whitespace-pre-wrap">
            {artifact.component}
          </pre>
      </div>
    </div>
  );
};
