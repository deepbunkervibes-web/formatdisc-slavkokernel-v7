/**
 * NEMOTRON-3-NANO ADAPTER — Sovereign LLM Integration
 * Calls local Ollama instance for deterministic inference.
 */

export interface KernelTask {
  action: string;
  mode: 'deterministic' | 'probabilistic';
  payload: any;
}

export interface KernelResult {
  agent: string;
  output: string;
  timestamp: number;
  audit: {
    model: string;
    reasoning: string;
    mode: string;
  };
}

export async function nemotronAdapter(task: KernelTask): Promise<KernelResult> {
  const prompt = `
You are Nemotron-3-Nano (30B) – a sovereign LLM.
Task: ${task.action}
Mode: ${task.mode}
Payload:
${JSON.stringify(task.payload, null, 2)}
`.trim();

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "nemotron-3-nano:latest",
      prompt,
      stream: false
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Ollama error ${response.status}: ${err}`);
  }

  const json = await response.json();

  return {
    agent: "nemotron-3-nano",
    output: json.response,
    timestamp: Date.now(),
    audit: {
      model: "nemotron-3-nano:latest",
      reasoning: "internal",
      mode: task.mode
    }
  };
}
