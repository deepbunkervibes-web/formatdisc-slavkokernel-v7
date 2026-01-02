/**
 * NEMOTRON-3-NANO ADAPTER — Final V7 Production Spec
 */
import { KernelTask, KernelResult } from "../../infrastructure/types";
import { FusionTelemetry } from "../../services/fusionTelemetry";

export async function nemotronAdapter(task: KernelTask): Promise<KernelResult> {
  const prompt = `
You are Nemotron-3-Nano (30B) – a sovereign LLM.
Task: ${task.action}
Mode: ${task.mode}
Payload:
${JSON.stringify(task.payload, null, 2)}
`.trim();

  // 👉 Model selection based on budget
  const model = task.budget === "cloud" 
                ? "nemotron-3-nano:30b-cloud"
                : "nemotron-3-nano:latest";

  // 👇 Start the timer – exactly what Fusion Telemetry expects
  FusionTelemetry.start("nemotron");

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: {
          temperature: task.mode === "probabilistic" ? 0.7 : 0,
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Ollama error ${response.status}: ${err}`);
    }

    const json = await response.json();
    
    // 👇 Stop the timer – records latency to FusionTelemetry store
    FusionTelemetry.stop("nemotron");
    
    // Log tokens if available (calculated by response length as proxy for now)
    FusionTelemetry.logTokens("nemotron", json.response.length);

    return {
      agent: "nemotron-3-nano",
      output: json.response,
      timestamp: Date.now(),
      audit: {
        model,
        reasoning: task.mode === "reasoning" ? "enabled" : "internal",
        mode: task.mode
      }
    };
  } catch (error) {
    FusionTelemetry.stop("nemotron");
    throw error;
  }
}
