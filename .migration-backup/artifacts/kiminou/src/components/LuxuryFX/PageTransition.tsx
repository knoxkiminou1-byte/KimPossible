import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

const GOLD = "linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(251,191,36,0.88) 45%, rgba(253,224,71,0.92) 55%, rgba(0,0,0,0.98) 100%)";

export default function PageTransition() {
  const [location] = useLocation();
  const [phase, setPhase] = useState<"idle" | "covering" | "uncovering">("idle");
  const prevRef = useRef(location);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (prevRef.current === location) return;
    prevRef.current = location;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    setPhase("covering");
    timers.current.push(setTimeout(() => setPhase("uncovering"), 390));
    timers.current.push(setTimeout(() => setPhase("idle"), 820));

    return () => timers.current.forEach(clearTimeout);
  }, [location]);

  return (
    <>
      <AnimatePresence>
        {phase === "covering" && (
          <motion.div
            key="cover"
            className="fixed inset-0 pointer-events-none"
            style={{ background: GOLD, transformOrigin: "left center", zIndex: 9999 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {phase === "uncovering" && (
          <motion.div
            key="uncover"
            className="fixed inset-0 pointer-events-none"
            style={{ background: GOLD, transformOrigin: "right center", zIndex: 9999 }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
