import { useEffect, useMemo, useState } from "react";
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
    const timeout = window.setTimeout(() => setPhase("done"), prefersReducedMotion ? 120 : 800);
    return () => window.clearTimeout(timeout);
  }, [phase, prefersReducedMotion]);

  useEffect(() => {
    if (phase === "done" && typeof window !== "undefined") {
      window.sessionStorage.setItem(ENTER_KEY, "1");
    }
  }, [phase]);

  const buttonLabel = useMemo(
    () => (prefersReducedMotion ? "Enter" : "Touch the orb to enter"),
    [prefersReducedMotion],
  );

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
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/click-to-enter-orb-feb-27-2026.png")' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(245,208,128,0.18),transparent_18%),linear-gradient(180deg,rgba(5,5,8,0.08),rgba(5,5,8,0.58)_48%,rgba(5,5,8,0.92)_100%)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(197,151,71,0.12),transparent_28%)]" aria-hidden="true" />

          {phase === "prompt" && (
            <motion.div
              className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-8 text-center text-white md:px-10 md:py-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.01, filter: "blur(6px)" }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full" />

              <div className="flex max-w-4xl flex-col items-center gap-6 md:gap-8">
                <motion.img
                  src="/k-logo-3d.png"
                  alt=""
                  className="h-28 w-28 drop-shadow-[0_0_32px_rgba(239,192,87,0.28)] md:h-36 md:w-36"
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="space-y-4 md:space-y-5">
                  <motion.p
                    className="text-[0.68rem] font-medium uppercase tracking-[0.48em] text-amber-100/80 md:text-xs"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                  >
                    A spiritual editorial experience
                  </motion.p>
                  <motion.h1
                    className="max-w-4xl font-serif text-4xl font-light leading-[0.95] tracking-[0.04em] text-amber-50 md:text-6xl lg:text-7xl"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.14 }}
                  >
                    Enter the world of Kiminou Knox
                  </motion.h1>
                  <motion.p
                    className="mx-auto max-w-2xl text-sm leading-relaxed text-white/78 md:text-lg"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.22 }}
                  >
                    Literature, athletic discipline, faith, and legacy gathered into one atmosphere. Step in slowly. Let the voice meet you.
                  </motion.p>
                </div>

                <motion.button
                  type="button"
                  onClick={startIntro}
                  className="mt-4 inline-flex min-h-[120px] min-w-[120px] items-center justify-center rounded-full border border-amber-100/35 bg-white/6 p-6 text-center shadow-[0_0_50px_rgba(233,190,92,0.18)] backdrop-blur-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-100/90 md:min-h-[150px] md:min-w-[150px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: [1, 1.03, 1] }}
                  transition={{ opacity: { duration: 0.4, delay: 0.3 }, scale: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
                  aria-label="Enter Kiminou Knox"
                >
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.38em] text-amber-50 md:text-sm">
                    {buttonLabel}
                  </span>
                </motion.button>
              </div>

              <motion.p
                className="text-[0.68rem] uppercase tracking-[0.42em] text-white/55 md:text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.35 }}
              >
                Luxury is restraint plus one impossible thing
              </motion.p>
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
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.22),transparent_18%),linear-gradient(180deg,rgba(7,7,9,0.12),rgba(7,7,9,0.88))]"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.55 }}
              />
              <motion.img
                src="/k-logo-3d.png"
                alt=""
                className="relative z-10 h-32 w-32 md:h-44 md:w-44"
                initial={{ scale: 0.84, rotateX: -12, opacity: 0.72 }}
                animate={{ scale: prefersReducedMotion ? 1 : 1.35, rotateX: 0, opacity: 1, filter: "drop-shadow(0 0 46px rgba(251,191,36,0.32))" }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
