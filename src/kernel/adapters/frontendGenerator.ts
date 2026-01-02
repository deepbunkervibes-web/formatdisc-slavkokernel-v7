/**
 * FRONTEND GENERATOR ADAPTER — Self-Generating UI Logic
 * Generates React + Tailwind code artefacts from natural language.
 */
import { KernelTask, KernelResult } from "../../infrastructure/types";
import { FusionTelemetry } from "../../services/fusionTelemetry";

export async function frontendGenerator(task: KernelTask): Promise<KernelResult> {
  const spec = task.payload?.spec?.trim() ?? "";
  if (!spec) {
    throw new Error("UI generation requires a non-empty `spec` field.");
  }

  const prompt = `
You are Nemotron-3-Nano (30 B) – a sovereign LLM that only returns syntactically correct React + Tailwind code.
Do NOT output any explanatory text, only the code.

Task: generate a UI component.
Spec: ${spec}
Framework: ${task.payload?.framework ?? "react"}
Style: ${task.payload?.style ?? "tailwind"}

Return exactly one valid JSON object with the following structure:
{
  "component": "exported react component code as string",
  "styles": "tailwind classes or css as string",
  "type": "functionComponent",
  "props": {}
}
`.trim();

  const model = task.budget === "cloud"
                ? "nemotron-3-nano:30b-cloud"
                : "nemotron-3-nano:latest";

  FusionTelemetry.start("frontend-generator");

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: { temperature: 0 }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Ollama error ${response.status}: ${err}`);
    }

    const raw = await response.json();
    
    // Clean markdown fences if LLM "hallucinates" them despite instructions
    const cleanResponse = raw.response.replace(/^```json\n|```$/g, "").trim();
    const parsed = JSON.parse(cleanResponse);

    FusionTelemetry.stop("frontend-generator");
    FusionTelemetry.logTokens("frontend-generator", parsed.component.length);

    return {
      agent: "frontend-generator",
      output: JSON.stringify(parsed),
      timestamp: Date.now(),
      audit: {
        model,
        reasoning: task.mode === "reasoning" ? "enabled" : "internal",
        mode: task.mode
      }
    };
  } catch (error) {
    FusionTelemetry.stop("frontend-generator");
    throw error;
  }
}
