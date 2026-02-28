import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeVideoOverlay() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <video
            src="/welcome-video.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
            <motion.button
              type="button"
              onClick={() => setHasEntered(true)}
              className="h-40 w-40 rounded-full border border-white/70 bg-black/35 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:h-48 md:w-48"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Click to Enter
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
