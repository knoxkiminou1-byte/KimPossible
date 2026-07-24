import { useSyncExternalStore } from "react";

/**
 * Global on/off store for the site-wide 3D backdrop.
 *
 * Lives outside React so the floating toggle button and the <GlobalScene3D />
 * canvas (which sit in different parts of the tree) stay in sync without a
 * provider. Preference is persisted to localStorage and defaults to ON.
 */
const KEY = "kk-3d-enabled";

function read(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

let enabled = read();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function set3DEnabled(next: boolean) {
  if (next === enabled) return;
  enabled = next;
  try {
    window.localStorage.setItem(KEY, next ? "on" : "off");
  } catch {
    /* ignore quota / privacy-mode errors */
  }
  emit();
}

export function toggle3D() {
  set3DEnabled(!enabled);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** React hook — re-renders when the 3D preference changes. */
export function use3DEnabled(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => enabled,
    () => true, // server snapshot: assume on (canvas is client-only anyway)
  );
}
