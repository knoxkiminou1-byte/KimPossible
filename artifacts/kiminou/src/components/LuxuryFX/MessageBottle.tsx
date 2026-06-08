import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage = "idle" | "rolling" | "bottling" | "sailing" | "sent" | "closing";

export default function MessageBottle({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const playing = stage !== "idle";

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const form = node.querySelector("form");
    if (!form) return;

    const handler = () => {
      // Animation runs in parallel; the form's own submit handler still fires the POST.
      if (stage !== "idle") return;
      onSubmit?.();
      setStage("rolling");
      timers.current.push(setTimeout(() => setStage("bottling"), 500));
      timers.current.push(setTimeout(() => setStage("sailing"), 1200));
      timers.current.push(setTimeout(() => setStage("sent"), 3000));
      timers.current.push(setTimeout(() => setStage("closing"), 4500));
      timers.current.push(setTimeout(() => setStage("idle"), 5300));
    };

    // capture phase so we react even though ContactForm handles the actual POST
    form.addEventListener("submit", handler, true);
    return () => form.removeEventListener("submit", handler, true);
  }, [stage, onSubmit]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      {children}

      <AnimatePresence>
        {playing && stage !== "closing" && (
          <motion.div
            key="bottle-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#02080f]"
          >
            {/* ocean waves */}
            <svg
              className="pointer-events-none absolute bottom-0 left-0 w-[200%]"
              viewBox="0 0 1440 200"
              preserveAspectRatio="none"
              style={{ height: "40%" }}
            >
              <motion.path
                d="M0 100 Q360 60 720 100 T1440 100 V200 H0 Z"
                fill="rgba(30,90,140,0.3)"
                animate={{ x: [0, -360, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                d="M0 120 Q360 160 720 120 T1440 120 V200 H0 Z"
                fill="rgba(20,60,100,0.4)"
                animate={{ x: [0, 360, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>

            {/* rolling scroll → bottle */}
            <AnimatePresence mode="wait">
              {(stage === "rolling" || stage === "bottling") && (
                <motion.div
                  key="vessel"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 1 }}
                >
                  {stage === "rolling" ? (
                    <motion.div
                      className="h-3 rounded-full bg-amber-200/70"
                      initial={{ width: 220 }}
                      animate={{ width: 24 }}
                      transition={{ duration: 0.5 }}
                    />
                  ) : (
                    <BottleSVG />
                  )}
                </motion.div>
              )}

              {stage === "sailing" && (
                <motion.div
                  key="sailing"
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: 400, y: 50, scale: 0.3, opacity: 0 }}
                  transition={{ duration: 1.6, ease: "easeIn" }}
                >
                  <BottleSVG />
                </motion.div>
              )}

              {stage === "sent" && (
                <motion.p
                  key="sent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-serif text-2xl italic text-white/40"
                >
                  Sent to sea.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "closing" && (
          <motion.div
            key="closing"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-[#02080f]"
          >
            <p className="font-serif text-lg italic text-white/30">It will find its way.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BottleSVG() {
  return (
    <svg width="80" height="160" viewBox="0 0 80 160" fill="none">
      {/* cork */}
      <rect x="32" y="2" width="16" height="18" rx="3" fill="rgba(160,110,60,0.8)" />
      {/* neck */}
      <rect x="34" y="18" width="12" height="26" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.4)" />
      {/* body — teardrop */}
      <path
        d="M40 44 C 18 60, 12 100, 20 130 C 26 152, 54 152, 60 130 C 68 100, 62 60, 40 44 Z"
        fill="rgba(245,158,11,0.15)"
        stroke="rgba(245,158,11,0.4)"
        strokeWidth="1.5"
      />
      {/* tiny scroll inside */}
      <rect x="34" y="95" width="12" height="20" rx="2" fill="rgba(255,250,235,0.6)" />
    </svg>
  );
}
