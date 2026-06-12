import { useEffect, useRef, useState } from "react";

type Mode = { name: string; ratios: number[] };

function modeForHour(hour: number): Mode {
  if (hour >= 5 && hour < 12) return { name: "Morning Major", ratios: [1, 1.25, 1.5] };
  if (hour >= 12 && hour < 17) return { name: "Afternoon Dorian", ratios: [1, 1.2, 1.5] };
  if (hour >= 17 && hour < 21) return { name: "Evening Minor", ratios: [1, 1.2, 1.4983] };
  return { name: "Night Phrygian", ratios: [1, 1.0667, 1.4983] };
}

export default function GenerativeScore() {
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [modeName, setModeName] = useState(() => modeForHour(new Date().getHours()).name);

  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode[]>([]);
  const gainsRef = useRef<GainNode[]>([]);
  const masterRef = useRef<GainNode | null>(null);
  const modeRef = useRef<Mode>(modeForHour(new Date().getHours()));
  const scrollRef = useRef(0);
  const mouseXRef = useRef(0.5);
  const mutedRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
    const master = masterRef.current;
    const ctx = ctxRef.current;
    if (master && ctx) {
      master.gain.setTargetAtTime(muted ? 0 : 0.04, ctx.currentTime, 0.2);
    }
  }, [muted]);

  // Track scroll + mouse without re-rendering
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    const onMouse = (e: PointerEvent) => {
      mouseXRef.current = e.clientX / Math.max(1, window.innerWidth);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMouse, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMouse);
    };
  }, []);

  const startAudio = () => {
    if (ctxRef.current) return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.setTargetAtTime(mutedRef.current ? 0 : 0.04, ctx.currentTime, 1.2);
    masterRef.current = master;

    const types: OscillatorType[] = ["sine", "triangle", "sawtooth"];
    const mode = modeRef.current;
    types.forEach((type, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = 55 * mode.ratios[i];
      gain.gain.value = i === 0 ? 0.6 : i === 1 ? 0.3 : 0.12;
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      oscRef.current.push(osc);
      gainsRef.current.push(gain);
    });

    setStarted(true);
  };

  // Modulation + resolution loop
  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const tick = () => {
      const ctx = ctxRef.current;
      if (ctx) {
        const base = 55 + scrollRef.current * 55; // 55–110 Hz
        const fifth = 1 + mouseXRef.current * 0.5; // unison → ~perfect fifth
        const atBottom = scrollRef.current > 0.985;
        const mode = modeRef.current;
        oscRef.current.forEach((osc, i) => {
          let target: number;
          if (atBottom) {
            // resolve to a major triad at 110Hz over ~3s
            const triad = [1, 1.25, 1.5];
            target = 110 * triad[i];
          } else {
            target = base * mode.ratios[i] * (i === 2 ? fifth : 1);
          }
          osc.frequency.setTargetAtTime(target, ctx.currentTime, atBottom ? 3 : 0.4);
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  // Update mode by hour, refresh oscillators' modal feel
  useEffect(() => {
    const id = window.setInterval(() => {
      const m = modeForHour(new Date().getHours());
      modeRef.current = m;
      setModeName(m.name);
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  // First-interaction starter (browser autoplay policy)
  useEffect(() => {
    const onFirst = () => {
      startAudio();
      window.removeEventListener("pointerdown", onFirst);
    };
    window.addEventListener("pointerdown", onFirst, { once: true });
    return () => window.removeEventListener("pointerdown", onFirst);
  }, []);

  useEffect(() => {
    return () => {
      oscRef.current.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* already stopped */
        }
      });
      const ctx = ctxRef.current;
      if (ctx && ctx.state !== "closed") {
        ctx.close().catch(() => undefined);
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => setMuted((m) => !m)}
      aria-pressed={muted}
      aria-label={muted ? "Unmute generative score" : "Mute generative score"}
      className="fixed bottom-4 left-4 z-[110] flex items-center gap-2 border border-amber-400/20 bg-black/70 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white/40 backdrop-blur-md transition-colors hover:border-amber-400/50 hover:text-amber-300"
    >
      <span className={muted ? "text-white/25" : "text-amber-400/80"}>♩</span>
      <span>Score</span>
      <span className="text-white/25">·</span>
      <span className="text-white/30 normal-case tracking-normal">
        {muted ? "muted" : started ? modeName : "tap to begin"}
      </span>
    </button>
  );
}
