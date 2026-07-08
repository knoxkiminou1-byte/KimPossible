import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type AmbientTheme = "cathedral" | "sports" | "noir" | "editorial" | "default";

interface AmbientAudioProps {
  theme?: AmbientTheme;
}

const THEME_CONFIG: Record<AmbientTheme, { freq: number; type: OscillatorType; gain: number; label: string }[]> = {
  cathedral: [
    { freq: 110, type: "sine", gain: 0.06, label: "bass" },
    { freq: 220, type: "sine", gain: 0.03, label: "mid" },
    { freq: 330, type: "sine", gain: 0.015, label: "high" },
    { freq: 440, type: "sine", gain: 0.008, label: "shimmer" },
  ],
  sports: [
    { freq: 80, type: "sawtooth", gain: 0.025, label: "sub" },
    { freq: 160, type: "square", gain: 0.015, label: "pulse" },
    { freq: 320, type: "sine", gain: 0.01, label: "crowd" },
  ],
  noir: [
    { freq: 55, type: "sine", gain: 0.07, label: "deep" },
    { freq: 110, type: "sine", gain: 0.04, label: "drone" },
    { freq: 165, type: "sine", gain: 0.02, label: "tension" },
  ],
  editorial: [
    { freq: 130, type: "sine", gain: 0.04, label: "warm" },
    { freq: 195, type: "sine", gain: 0.025, label: "bright" },
    { freq: 260, type: "sine", gain: 0.012, label: "airy" },
  ],
  default: [
    { freq: 82, type: "sine", gain: 0.055, label: "root" },
    { freq: 123, type: "sine", gain: 0.03, label: "fifth" },
    { freq: 164, type: "sine", gain: 0.018, label: "octave" },
  ],
};

export default function AmbientAudio({ theme = "default" }: AmbientAudioProps) {
  const [playing, setPlaying] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const masterRef = useRef<GainNode | null>(null);

  const stop = useCallback(() => {
    if (!ctxRef.current || !masterRef.current) return;
    masterRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.5);
    setTimeout(() => {
      nodesRef.current.forEach(({ osc }) => { try { osc.stop(); } catch {} });
      nodesRef.current = [];
      setPlaying(false);
    }, 1200);
  }, []);

  const start = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.setTargetAtTime(0.7, ctx.currentTime, 1.2);
    master.connect(ctx.destination);
    masterRef.current = master;

    const config = THEME_CONFIG[theme];
    nodesRef.current = config.map(({ freq, type, gain }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      gainNode.gain.value = gain;

      const drift = ctx.createOscillator();
      drift.frequency.value = 0.08 + Math.random() * 0.05;
      const driftGain = ctx.createGain();
      driftGain.gain.value = freq * 0.006;
      drift.connect(driftGain);
      driftGain.connect(osc.frequency);
      drift.start();

      osc.type = type;
      osc.frequency.value = freq;
      osc.connect(gainNode);
      gainNode.connect(master);
      osc.start();

      return { osc, gain: gainNode };
    });

    setPlaying(true);
    setInitialized(true);
  }, [theme]);

  useEffect(() => {
    if (playing) {
      stop();
      setTimeout(start, 1300);
    }
  }, [theme]);

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close();
      }
    };
  }, []);

  const toggle = () => {
    if (playing) {
      stop();
    } else {
      start();
    }
  };

  return (
    <motion.button
      onClick={toggle}
      title={playing ? "Stop ambient audio" : "Play ambient audio"}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-3 py-2.5 bg-black/80 border border-white/10 backdrop-blur-xl hover:border-amber-400/30 transition-all duration-300 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Waveform icon */}
      <div className="flex items-end gap-[2px] h-4">
        {[3, 6, 9, 5, 8, 4, 7].map((h, i) => (
          <motion.div
            key={i}
            className="w-[2px] bg-amber-400/60 group-hover:bg-amber-400 transition-colors"
            style={{ height: `${h}px` }}
            animate={playing ? {
              height: [`${h}px`, `${h * 1.8}px`, `${h * 0.6}px`, `${h}px`],
            } : { height: `${h}px` }}
            transition={playing ? {
              duration: 0.8 + i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            } : {}}
          />
        ))}
      </div>
      <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 group-hover:text-amber-400/70 transition-colors">
        {playing ? "Sound" : initialized ? "Sound" : "Sound"}
      </span>
      <AnimatePresence>
        {playing && (
          <motion.div
            key="dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-1.5 h-1.5 rounded-full bg-amber-400"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
