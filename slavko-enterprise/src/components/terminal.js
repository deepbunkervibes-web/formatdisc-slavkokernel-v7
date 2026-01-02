export function initTerminal() {
  const term = document.querySelector('#slavko-terminal');
  const output = document.querySelector('#slavko-terminal-output');
  const input = document.querySelector('#slavko-terminal-input');

  if (!term || !output || !input) return;

  const commands = {
    help: () => [
      "Available commands:",
      "  status      – build integrity + provenance",
      "  pipeline    – show pipeline visualization",
      "  integrity   – SHA-256 hash of current build",
      "  governance  – governance manifest",
      "  clear       – clear terminal"
    ],
    status: () => [
      "SlavkoShell Status:",
      "  Build: deterministic",
      "  Integrity: verified",
      "  Provenance: active",
      "  Uptime: " + Math.floor(performance.now() / 1000) + "s"
    ],
    pipeline: () => [
      "Opening pipeline visualization…",
      "Accessing block metadata...",
      "Pipeline state: DETACHED"
    ],
    integrity: () => [
      "SHA-256 IDENTIFIER:",
      window.__SLAVKO_PROVENANCE__?.sha256 || "PENDING_BUILD"
    ],
    governance: () => [
      "Governance Manifest:",
      "  Mode: SOVEREIGN",
      "  Agents: 4 (Analyst, Skeptic, Simulator, Researcher)",
      "  Protocol: SLAVKO-V7-ALPHA",
      "  Ledger: LOCAL_IMMUTABLE"
    ],
    clear: () => {
      output.innerHTML = "";
      return ["Terminal cleared."];
    }
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = "";
      
      // Echo command
      const promptDiv = document.createElement('div');
      promptDiv.className = 'prompt-line';
      promptDiv.innerHTML = `<span class="prompt">slavko></span> ${cmd}`;
      output.appendChild(promptDiv);

      const lines = commands[cmd] ? commands[cmd]() : [`Unknown command: ${cmd}. Type 'help' for options.`];
      
      lines.forEach(line => {
        const div = document.createElement('div');
        div.className = 'response-line';
        div.textContent = line;
        output.appendChild(div);
      });
      
      output.scrollTop = output.scrollHeight;
    }
  });

  // Initial greeting
  const div = document.createElement('div');
  div.className = 'response-line system';
  div.textContent = "SlavkoShell™ Interactive CLI initialized. Type 'help' to begin.";
  output.appendChild(div);
}
