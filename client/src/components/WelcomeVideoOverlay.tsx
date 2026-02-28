import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IntroPhase = "prompt" | "playing" | "done";

export default function WelcomeVideoOverlay() {
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("kk-play-intro") === "1") {
      return "playing";
    }

    return "prompt";
  });

  useEffect(() => {
    if (phase === "playing" && typeof window !== "undefined") {
      window.sessionStorage.removeItem("kk-play-intro");
    }
  }, [phase]);

  const startIntro = () => {
    setPhase("playing");
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {phase === "playing" && (
            <video
              src="/welcome-video.mp4"
              autoPlay
              playsInline
              onEnded={() => setPhase("done")}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <AnimatePresence>
            {phase === "prompt" && (
              <motion.div
                className="relative z-10 h-full w-full"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url("/click-to-enter-orb-feb-27-2026.png")' }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/38 to-black/72" aria-hidden="true" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_44%_58%,rgba(255,212,0,0.18),transparent_12%),radial-gradient(circle_at_18%_18%,rgba(251,191,36,0.08),transparent_28%)]" aria-hidden="true" />

                <motion.button
                  type="button"
                  onClick={startIntro}
                  className="absolute left-[44%] top-[58%] z-10 h-[14vh] min-h-[88px] w-[14vh] min-w-[88px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-amber-200/50 bg-amber-200/10 shadow-[0_0_28px_rgba(255,212,0,0.35)] backdrop-blur-[2px] transition hover:bg-amber-200/16 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-100/90 md:h-[12vw] md:min-h-[110px] md:w-[12vw] md:min-w-[110px]"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: [1, 1.035, 1] }}
                  transition={{
                    opacity: { duration: 0.45, delay: 0.2 },
                    scale: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
                  }}
                  aria-label="Click the orb to enter"
                >
                  <span className="sr-only">Click to Enter</span>
                </motion.button>

                <motion.div
                  className="pointer-events-none absolute left-[44%] top-[58%] h-[18vh] min-h-[112px] w-[18vh] min-w-[112px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.94, 1.06, 0.94] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />

                <motion.p
                  className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 px-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-white/85 md:text-base"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.35 }}
                >
                  Touch the orb to enter
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
