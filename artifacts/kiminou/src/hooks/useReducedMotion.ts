import { useEffect, useState } from "react";

function getInitialState() {
  if (typeof window === "undefined") return { reducedMotion: false, coarsePointer: false };
  return {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    coarsePointer: window.matchMedia("(pointer: coarse)").matches,
  };
}

/**
 * True when the user has requested reduced motion OR is on a touch/coarse
 * pointer device (custom cursors, particle fields, and 3D canvases don't
 * make sense on touch regardless of the motion preference).
 */
export function useShouldReduceEffects(): boolean {
  const [state, setState] = useState(getInitialState);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const update = () =>
      setState({ reducedMotion: motionQuery.matches, coarsePointer: pointerQuery.matches });
    update();
    motionQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  return state.reducedMotion || state.coarsePointer;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => getInitialState().reducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
