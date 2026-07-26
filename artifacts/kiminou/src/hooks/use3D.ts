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

/* ── Foreground-canvas registry ──────────────────────────────────────────
   Every extra WebGL context costs a full render loop and its own
   post-processing chain, so the site-wide backdrop must never run alongside
   a page's own hero canvas. Foreground scenes register themselves here on
   mount and <GlobalScene3D /> stands down while any are live — no hardcoded
   route list to drift out of sync as heroes are added or moved.
   ──────────────────────────────────────────────────────────────────────── */
let foregroundScenes = 0;
const foregroundListeners = new Set<() => void>();

export function registerForegroundScene(): () => void {
  foregroundScenes += 1;
  foregroundListeners.forEach((l) => l());
  let released = false;
  return () => {
    if (released) return;
    released = true;
    foregroundScenes -= 1;
    foregroundListeners.forEach((l) => l());
  };
}

/** True while any page-level 3D hero canvas is mounted. */
export function useForegroundSceneActive(): boolean {
  return useSyncExternalStore(
    (listener) => {
      foregroundListeners.add(listener);
      return () => foregroundListeners.delete(listener);
    },
    () => foregroundScenes > 0,
    () => false,
  );
}
