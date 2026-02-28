import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IntroPhase = "prompt" | "playing" | "done";

export default function WelcomeVideoOverlay() {
  const [phase, setPhase] = useState<IntroPhase>("prompt");

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
                className="relative z-10 flex h-full w-full items-center justify-center px-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  type="button"
                  onClick={() => setPhase("playing")}
                  className="h-40 w-40 rounded-full border border-white/70 bg-black/35 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:h-48 md:w-48"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Click to Enter
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
