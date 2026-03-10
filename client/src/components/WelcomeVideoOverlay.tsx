import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type IntroPhase = "prompt" | "transition" | "done";

const ENTER_KEY = "kk-site-entered";

export default function WelcomeVideoOverlay() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (typeof window === "undefined") return "prompt";
    return window.sessionStorage.getItem(ENTER_KEY) === "1" ? "done" : "prompt";
  });

  useEffect(() => {
    if (phase !== "transition") return;
    const timeout = window.setTimeout(() => setPhase("done"), prefersReducedMotion ? 120 : 700);
    return () => window.clearTimeout(timeout);
  }, [phase, prefersReducedMotion]);

  useEffect(() => {
    if (phase === "done" && typeof window !== "undefined") {
      window.sessionStorage.setItem(ENTER_KEY, "1");
    }
  }, [phase]);

  const startIntro = () => {
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
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/click-to-enter-orb-feb-27-2026.png")' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(245,208,128,0.16),transparent_18%),linear-gradient(180deg,rgba(5,5,8,0.08),rgba(5,5,8,0.58)_48%,rgba(5,5,8,0.92)_100%)]" aria-hidden="true" />

          {phase === "prompt" && (
            <motion.div
              className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-8 text-center text-white md:px-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.01, filter: "blur(6px)" }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex max-w-3xl flex-col items-center gap-6 md:gap-8">
                <motion.img
                  src="/k-logo-3d.png"
                  alt=""
                  className="h-24 w-24 drop-shadow-[0_0_28px_rgba(239,192,87,0.24)] md:h-32 md:w-32"
                  initial={{ opacity: 0, y: 18, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="space-y-4">
                  <motion.p
                    className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-amber-100/78 md:text-xs"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 }}
                  >
                    Kiminou Knox
                  </motion.p>
                  <motion.h1
                    className="max-w-3xl font-serif text-4xl font-light leading-[0.96] tracking-[0.04em] text-amber-50 md:text-6xl"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.48, delay: 0.14 }}
                  >
                    Enter
                  </motion.h1>
                  <motion.p
                    className="mx-auto max-w-2xl text-sm leading-relaxed text-white/76 md:text-lg"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.48, delay: 0.2 }}
                  >
                    Literature, discipline, faith, and legacy gathered into one atmosphere.
                  </motion.p>
                </div>
                <motion.button
                  type="button"
                  onClick={startIntro}
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-amber-100/30 bg-white/6 px-10 py-4 text-center shadow-[0_0_40px_rgba(233,190,92,0.14)] backdrop-blur-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-100/90"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.28 }}
                  aria-label="Enter Kiminou Knox"
                >
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.34em] text-amber-50 md:text-sm">
                    Enter
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === "transition" && (
            <motion.div
              className="relative z-10 flex h-full items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.18),transparent_18%),linear-gradient(180deg,rgba(7,7,9,0.12),rgba(7,7,9,0.88))]"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.45 }}
              />
              <motion.img
                src="/k-logo-3d.png"
                alt=""
                className="relative z-10 h-28 w-28 md:h-40 md:w-40"
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: prefersReducedMotion ? 1 : 1.2, opacity: 1, filter: "drop-shadow(0 0 36px rgba(251,191,36,0.26))" }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
