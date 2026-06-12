import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImpossibleLoop() {
  const [looping, setLooping] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const armedRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && armedRef.current) {
          armedRef.current = false;
          setLooping(true);
        } else if (!entry.isIntersecting) {
          // re-arm once the user scrolls away from the bottom
          armedRef.current = true;
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const finish = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setLooping(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const skip = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setLooping(false);
  };

  useEffect(() => {
    if (!looping) return;
    timerRef.current = setTimeout(finish, 1200);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [looping]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      <AnimatePresence>
        {looping && (
          <motion.div
            key="impossible-loop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          >
            <button
              type="button"
              onClick={skip}
              className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-amber-400/60 transition-colors"
            >
              Skip
            </button>

            <motion.svg
              width="320"
              height="180"
              viewBox="0 0 320 180"
              fill="none"
              initial={{ rotateX: 0, scale: 0.92 }}
              animate={{ rotateX: 360, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.path
                d="M160 90 C 60 0, 60 180, 160 90 C 260 0, 260 180, 160 90 Z"
                stroke="#F59E0B"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="900"
                initial={{ strokeDashoffset: 900 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
              <motion.path
                d="M160 90 C 90 40, 90 140, 160 90 C 230 40, 230 140, 160 90 Z"
                stroke="#FDE68A"
                strokeOpacity="0.2"
                strokeWidth="1"
                fill="none"
                strokeDasharray="600"
                initial={{ strokeDashoffset: 600 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.1, delay: 0.1, ease: "easeInOut" }}
              />
            </motion.svg>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 font-serif text-white/20 tracking-[0.3em] text-sm uppercase"
            >
              You've come full circle.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
