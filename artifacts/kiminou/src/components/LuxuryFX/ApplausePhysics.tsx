import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tier = { min: number; label: string };

const TIERS: Tier[] = [
  { min: 76, label: "Standing Ovation" },
  { min: 51, label: "Sustained Applause" },
  { min: 26, label: "Scattered Applause" },
  { min: 0, label: "Polite Silence" },
];

function tierFor(score: number): string {
  if (score >= 100) return "Encore";
  return TIERS.find((t) => score >= t.min)?.label ?? "Polite Silence";
}

const CONFETTI_COLORS = ["#F59E0B", "#FDE68A", "#FFFBEB", "#D97706"];

export default function ApplausePhysics() {
  const [score, setScore] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const soundEnabledRef = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const scrollDepthRef = useRef(0);
  const movesRef = useRef(0);
  const clicksRef = useRef(0);
  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    const saved = localStorage.getItem("applause-collapsed");
    if (saved === "1") setCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("applause-collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  useEffect(() => {
    const enable = () => {
      soundEnabledRef.current = true;
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx && !ctxRef.current) ctxRef.current = new Ctx();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollDepthRef.current = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    };
    const onMove = () => {
      movesRef.current = Math.min(500, movesRef.current + 1);
    };
    const onClick = () => {
      clicksRef.current += 1;
    };

    window.addEventListener("pointerdown", enable, { once: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    onScroll();

    return () => {
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const dwell = Math.min(120, (Date.now() - mountTimeRef.current) / 1000);
      const s =
        scrollDepthRef.current * 0.4 +
        (movesRef.current / 500) * 100 * 0.2 +
        clicksRef.current * 10 +
        (dwell / 120) * 100 * 0.4;
      setScore(Math.min(100, Math.round(s)));
    }, 500);
    return () => clearInterval(id);
  }, []);

  const tier = tierFor(score);
  const isOvation = score >= 76;
  const isEncore = score >= 100;

  // Play applause-ish texture as tiers escalate
  const lastTierRef = useRef("");
  useEffect(() => {
    if (!soundEnabledRef.current || !ctxRef.current) return;
    if (tier === lastTierRef.current) return;
    lastTierRef.current = tier;
    const ctx = ctxRef.current;
    const intensity =
      tier === "Encore" ? 0.06 : tier === "Standing Ovation" ? 0.05 : tier === "Sustained Applause" ? 0.035 : tier === "Scattered Applause" ? 0.02 : 0.008;
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (Math.random() < 0.3 ? 1 : 0.2);
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1500;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    noise.start(now);
    gain.gain.linearRampToValueAtTime(intensity, now + 0.1);
    gain.gain.linearRampToValueAtTime(0, now + 0.8);
    noise.stop(now + 0.85);
  }, [tier]);

  return (
    <div className="hidden md:flex">
      {/* confetti */}
      <AnimatePresence>
        {isOvation && (
          <div className="pointer-events-none fixed inset-0 z-[115] overflow-hidden">
            {Array.from({ length: isEncore ? 80 : 36 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute top-0 h-2 w-2"
                style={{
                  left: `${Math.random() * 100}%`,
                  background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{ y: "110vh", opacity: [1, 1, 0], rotate: 360 }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* encore overlay */}
      <AnimatePresence>
        {isEncore && (
          <motion.div
            key="encore"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3 }}
            className="pointer-events-none fixed inset-0 z-[116] flex items-center justify-center"
          >
            <span className="font-serif text-5xl uppercase tracking-[0.3em] text-amber-300 md:text-7xl">
              Encore · Encore · Encore
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* meter */}
      <div className="fixed bottom-4 right-4 z-[110] w-56 border border-amber-400/20 bg-black/70 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center justify-between px-4 py-2.5 text-[10px] uppercase tracking-[0.25em] text-amber-400/70"
        >
          <span>{tier}</span>
          <span className="text-white/30">{collapsed ? "↑" : "↓"}</span>
        </button>
        {!collapsed && (
          <div className="px-4 pb-3">
            <div className="h-px w-full bg-white/10">
              <motion.div
                className="h-px bg-amber-400"
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/25">
              Engagement {score}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
