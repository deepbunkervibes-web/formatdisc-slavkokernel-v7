/**
 * UI ARTIFACT STORE — Client-Side Persistence Layer
 * Simulates filesystem storage using LocalStorage for the demo.
 * In a real V7 deployment, this would use Cloudflare KV.
 */

const STORAGE_KEY_CURRENT = "slavko_v7_ui_current";
const STORAGE_KEY_PREV = "slavko_v7_ui_prev";

export function saveUIArtifact(artifact: any) {
  // 1. Move current to prev
  const current = localStorage.getItem(STORAGE_KEY_CURRENT);
  if (current) {
    localStorage.setItem(STORAGE_KEY_PREV, current);
  }
  
  // 2. Save new current
  localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(artifact));
  
  // 3. Emit event for hot-reload
  window.dispatchEvent(new CustomEvent("UI_ARTIFACT_UPDATED", { detail: artifact }));
}

export function loadUIArtifact() {
  const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
  return raw ? JSON.parse(raw) : null;
}

export function loadPreviousArtifact() {
  const raw = localStorage.getItem(STORAGE_KEY_PREV);
  return raw ? JSON.parse(raw) : null;
}
