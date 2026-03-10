import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type IntroPhase = "prompt" | "transition" | "done";

const ENTER_KEY = "kk-site-entered";

export default function WelcomeVideoOverlay() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (typeof window === "undefined") return "prompt";
    return window.sessionStorage.getItem(ENTER_KEY) === "1" ? "done" : "prompt";
  });

  useEffect(() => {
    if (phase !== "transition") return;
    const timeout = window.setTimeout(() => setPhase("done"), shouldReduceMotion ? 110 : 520);
    return () => window.clearTimeout(timeout);
  }, [phase, shouldReduceMotion]);

  const enterSite = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(ENTER_KEY, "1");
    }
    setPhase("transition");
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.35 }}
          aria-live="polite"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/click-to-enter-orb-feb-27-2026.png")' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,224,163,0.2),transparent_22%),linear-gradient(180deg,rgba(5,5,7,0.14),rgba(5,5,7,0.72)_58%,rgba(5,5,7,0.95)_100%)]" aria-hidden="true" />

          {phase === "prompt" && (
            <motion.div
              className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-amber-50"
              initial={shouldReduceMotion ? false : { opacity: 0.96, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.35 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-200/70" />
                <p className="text-[0.64rem] font-medium uppercase tracking-[0.34em] text-amber-100/80">Kiminou Knox</p>
                <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-200/70" />
              </div>
              <img src="/k-logo-3d.png" alt="" className="mb-6 h-24 w-24 drop-shadow-[0_0_28px_rgba(233,189,96,0.35)]" />
              <h1 className="mb-4 font-serif text-4xl font-light tracking-[0.06em] md:text-6xl">Enter</h1>
              <p className="mb-8 max-w-xl text-sm leading-relaxed text-amber-50/80 md:text-base">
                A world of faith, discipline, and authored legacy.
              </p>
              <button
                type="button"
                onClick={enterSite}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-amber-100/35 bg-black/30 px-10 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-amber-50 shadow-[0_0_35px_rgba(219,170,84,0.22)] backdrop-blur-md transition hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-100/80"
                aria-label="Enter Kiminou Knox"
              >
                Enter
              </button>
            </motion.div>
          )}

          {phase === "transition" && (
            <motion.div className="relative z-10 flex h-full items-center justify-center" initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,191,102,0.18),transparent_18%),linear-gradient(180deg,rgba(7,7,10,0.4),rgba(7,7,10,0.96))]"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.08 : 0.3 }}
              />
              <motion.img
                src="/k-logo-3d.png"
                alt=""
                className="relative z-10 h-28 w-28 md:h-36 md:w-36"
                initial={{ scale: 0.95, opacity: 0.86 }}
                animate={{ scale: shouldReduceMotion ? 1 : 1.12, opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.08 : 0.48, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
