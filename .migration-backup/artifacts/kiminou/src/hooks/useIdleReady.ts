import { useEffect, useState } from "react";

export function useIdleReady(timeout = 1200) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(() => setReady(true), { timeout });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => setReady(true), timeout);
    return () => globalThis.clearTimeout(timeoutId);
  }, [ready, timeout]);

  return ready;
}
