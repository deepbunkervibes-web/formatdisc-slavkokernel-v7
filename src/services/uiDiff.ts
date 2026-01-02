/**
 * UI DIFF ENGINE — Computes semantic changes between UI artifacts.
 */
import { diffJson } from "diff";

export class UIValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UIValidationError";
  }
}

export function computeUiDiff(oldJson: string, newJson: string) {
  try {
    const old = JSON.parse(oldJson);
    const newest = JSON.parse(newJson);

    const diffArray = diffJson(old, newest);
    const changes: { type: "add" | "remove" | "update"; value: string }[] = [];

    diffArray.forEach((part) => {
      if (part.added) changes.push({ type: "add", value: part.value });
      if (part.removed) changes.push({ type: "remove", value: part.value });
    });

    return changes;
  } catch (e) {
    console.warn("Failed to compute diff", e);
    return [];
  }
}

export function validateUiArtefact(artifact: any) {
  const MAX_TOKENS = 2000; // Adjusted for realistic components
  const forbiddenProps = new Set(["dangerouslySetInnerHTML"]);

  // Basic structure check
  if (!artifact.component || !artifact.type) {
    throw new UIValidationError("Invalid artifact structure: missing component or type");
  }

  const props = artifact.props ?? {};
  const tokenCount = JSON.stringify(props).length / 4; 
  
  if (tokenCount > MAX_TOKENS) {
    throw new UIValidationError(`Props complexity (${Math.ceil(tokenCount)} tokens) exceeds max (${MAX_TOKENS})`);
  }

  const disallowed = Object.keys(props).filter((k) => forbiddenProps.has(k));
  if (disallowed.length) {
    throw new UIValidationError(`Forbidden prop(s) detected: ${disallowed.join(", ")}`);
  }
}
