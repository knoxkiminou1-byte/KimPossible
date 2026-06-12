import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FIRST_VISIT_KEY = "kiminou-first-edition-seen";

const POEM_LINE = "They called me wise before I learned\nwhat wisdom cost.";

export default function FirstEditionOverlay() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(FIRST_VISIT_KEY);
    if (!seen) {
      const t = setTimeout(() => setShow(true), 600);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);

  function handleEnter() {
    setLeaving(true);
    setTimeout(() => {
      setShow(false);
      localStorage.setItem(FIRST_VISIT_KEY, "1");
    }, 900);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#050404" }}
        >
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px"
          }} />

          {/* LEFT page */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: leaving ? "-52%" : 0 }}
            transition={{ duration: 0.85, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 origin-right"
            style={{ background: "linear-gradient(to right, #0a0806, #0d0a07)", borderRight: "1px solid rgba(251,191,36,0.06)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-amber-900/5 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent" />
          </motion.div>

          {/* RIGHT page */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: leaving ? "52%" : 0 }}
            transition={{ duration: 0.85, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 origin-left"
            style={{ background: "linear-gradient(to left, #0a0806, #0d0a07)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/5 to-transparent" />
          </motion.div>

          {/* CENTER content */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: leaving ? 0 : 1, y: leaving ? -20 : 0, scale: leaving ? 1.02 : 1 }}
            transition={{ duration: 0.7, delay: leaving ? 0 : 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 flex flex-col items-center gap-8 px-8 max-w-lg text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-px bg-amber-400/30" />
              <span className="text-[9px] uppercase tracking-[0.55em] text-amber-400/50 font-medium">First Edition</span>
              <div className="w-12 h-px bg-amber-400/30" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <p className="font-serif text-5xl md:text-7xl font-light text-white leading-tight tracking-wide">
                Kiminou<br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">Knox</span>
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
            />

            {/* Poem line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="font-serif text-base md:text-lg italic text-white/50 leading-relaxed whitespace-pre-line"
            >
              "{POEM_LINE}"
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="text-[9px] uppercase tracking-[0.4em] text-amber-400/30"
            >
              — The Spirit of Solomon
            </motion.p>

            {/* Enter button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              onClick={handleEnter}
              className="mt-2 group relative px-14 py-4 border border-amber-400/30 text-amber-300/80 text-[10px] uppercase tracking-[0.4em] hover:border-amber-400 hover:text-amber-300 transition-all duration-500 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-amber-400/8"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <span className="relative">Enter the World</span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="text-[9px] text-white/15 uppercase tracking-[0.3em]"
            >
              Author · Athlete · Entrepreneur
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
