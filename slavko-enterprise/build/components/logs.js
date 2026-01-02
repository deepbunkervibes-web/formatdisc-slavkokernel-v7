export function initLogs() {
  const logEl = document.querySelector('#slavko-logs');
  if (!logEl) return;

  const messages = [
    "Initializing SlavkoShell kernel…",
    "Loading governance manifest…",
    "Verifying build integrity…",
    "SHA-256 integrity check: PASS",
    "Starting orchestration engine…",
    "Agent[Analyst] online - Listening for startup ideas",
    "Agent[Skeptic] online - Policy validation active",
    "Agent[Simulator] online - Market drift detection enabled",
    "Agent[Researcher] online - Context retrieval sync complete",
    "Telemetry stream active on port 2847",
    "Entropy stable at 0.042",
    "Provenance ledger synchronized with local block",
    "SlavkoShell kernel v1.0.0 ready for simulation."
  ];

  let i = 0;

  function pushLog() {
    if (i < messages.length) {
      const div = document.createElement('div');
      div.className = 'log-line';
      const timestamp = new Date().toISOString().split('T')[1].split('Z')[0];
      div.innerHTML = `<span class="timestamp">[${timestamp}]</span> <span class="message">${messages[i]}</span>`;
      logEl.appendChild(div);
      logEl.scrollTop = logEl.scrollHeight;
      i++;
      setTimeout(pushLog, 100 + Math.random() * 300);
    }
  }

  pushLog();
}
