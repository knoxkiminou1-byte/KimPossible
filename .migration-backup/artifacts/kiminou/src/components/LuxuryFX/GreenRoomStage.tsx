import { useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NOTES = [
  { text: "Remember the opening — slow down.", x: "12%", y: "22%", r: -4 },
  { text: "Eye contact first 30 seconds.", x: "68%", y: "30%", r: 5 },
  { text: "They're here for you.", x: "22%", y: "62%", r: -6 },
  { text: "Breathe. The room can wait.", x: "62%", y: "68%", r: 3 },
];

function crowdAmbiance() {
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const bufferSize = ctx.sampleRate * 1.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1000;
  const gain = ctx.createGain();
  gain.gain.value = 0;
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  noise.start(now);
  gain.gain.linearRampToValueAtTime(0.1, now + 0.6);
  gain.gain.linearRampToValueAtTime(0, now + 1.5);
  noise.stop(now + 1.6);
  window.setTimeout(() => ctx.close().catch(() => undefined), 2000);
}

export default function GreenRoomStage({ children }: { children: ReactNode }) {
  const [isOnStage, setIsOnStage] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const transitioningRef = useRef(false);

  const goOnStage = () => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setTransitioning(true);
    crowdAmbiance();
    window.setTimeout(() => {
      setIsOnStage(true);
    }, 450);
    window.setTimeout(() => {
      transitioningRef.current = false;
      setTransitioning(false);
    }, 1000);
  };

  return (
    <div className="relative">
      {isOnStage && (
        <>
          {/* subtle stage spotlight */}
          <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(245,158,11,0.05) 0%, transparent 60%)",
            }}
          />
          <button
            type="button"
            onClick={() => setIsOnStage(false)}
            className="fixed left-4 top-24 z-[90] border border-white/15 bg-black/60 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/40 backdrop-blur-md transition-colors hover:border-amber-400/40 hover:text-amber-300"
          >
            ← Backstage
          </button>
          {children}
        </>
      )}

      <AnimatePresence>
        {!isOnStage && (
          <motion.div
            key="green-room"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d1208]"
            style={{ boxShadow: "inset 0 0 200px rgba(255,200,120,0.08)" }}
          >
            {/* mirror with bulb ring */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-md border border-amber-200/10">
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                return (
                  <span
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-amber-200/20"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * 130}px)`,
                      top: `calc(50% + ${Math.sin(angle) * 170}px)`,
                    }}
                  />
                );
              })}
            </div>

            {/* sofa outline */}
            <svg
              className="pointer-events-none absolute bottom-10 left-10 opacity-20"
              width="220"
              height="100"
              viewBox="0 0 220 100"
              fill="none"
            >
              <rect x="10" y="40" width="200" height="50" rx="10" stroke="rgba(255,255,255,0.3)" />
              <rect x="0" y="30" width="40" height="60" rx="10" stroke="rgba(255,255,255,0.3)" />
              <rect x="180" y="30" width="40" height="60" rx="10" stroke="rgba(255,255,255,0.3)" />
            </svg>

            {/* scattered notes */}
            {NOTES.map((n, i) => (
              <p
                key={i}
                className="pointer-events-none absolute max-w-[160px] font-mono text-xs text-white/20"
                style={{ left: n.x, top: n.y, transform: `rotate(${n.r}deg)` }}
              >
                {n.text}
              </p>
            ))}

            <div className="relative z-10 text-center">
              <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-amber-200/40">
                Backstage
              </p>
              <h2 className="mb-10 font-serif text-4xl font-light text-white/80 md:text-5xl">
                The room is full.
              </h2>
              <button
                type="button"
                onClick={goOnStage}
                className="border border-amber-400/40 bg-amber-400/5 px-10 py-4 font-serif text-sm uppercase tracking-[0.3em] text-amber-300 transition-colors hover:bg-amber-400 hover:text-black"
              >
                Go On →
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* curtain overlay during transition */}
      <CurtainSweep active={transitioning} />
    </div>
  );
}

function CurtainSweep({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="curtain"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)", "inset(0 0 0 100%)"] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, times: [0, 0.5, 1], ease: "easeInOut" }}
          className="fixed inset-0 z-[120]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #4a0d12 0px, #6b1018 30px, #4a0d12 60px)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
