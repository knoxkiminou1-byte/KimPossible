import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Constants ────────────────────────────────────────────── */
const STATION_ANGLE = 215;
const LOCK_RANGE = 16;
const STATION_FREQ = "97.3";

const PRESETS = [
  { freq: "88.5", label: "KQED", angle: 20 },
  { freq: "93.7", label: "Wild", angle: 95 },
  { freq: "97.3", label: "KimYaps", angle: STATION_ANGLE, isStation: true },
  { freq: "102.1", label: "KBLX", angle: 290 },
  { freq: "107.7", label: "KSAN", angle: 345 },
];

function angleDiff(a: number, b: number) {
  let d = ((a - b) % 360 + 360) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

/* ─── Web Audio Engine ─────────────────────────────────────── */
class RadioAudio {
  ctx: AudioContext | null = null;
  noiseGain: GainNode | null = null;
  filter: BiquadFilterNode | null = null;
  masterGain: GainNode | null = null;
  processor: ScriptProcessorNode | null = null;
  analyser: AnalyserNode | null = null;
  started = false;

  start() {
    if (this.started) return;
    this.started = true;
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();

    /* White noise via ScriptProcessor */
    this.processor = this.ctx.createScriptProcessor(2048, 0, 1);
    this.processor.onaudioprocess = (e) => {
      const out = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < out.length; i++) out[i] = Math.random() * 2 - 1;
    };

    /* Band-pass filter — changes with frequency */
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "bandpass";
    this.filter.frequency.value = 1200;
    this.filter.Q.value = 0.8;

    /* Noise gain */
    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.value = 0.28;

    /* Master gain */
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 1.0;

    /* Analyser for oscilloscope */
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.65;

    /* Chain */
    this.processor.connect(this.filter);
    this.filter.connect(this.noiseGain);
    this.noiseGain.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  setProximity(proximity: number, locked: boolean) {
    if (!this.noiseGain || !this.filter || !this.ctx) return;
    const t = this.ctx.currentTime;
    if (locked) {
      this.noiseGain.gain.setTargetAtTime(0.0, t, 0.25);
    } else {
      const vol = 0.05 + (1 - proximity) * 0.3;
      this.noiseGain.gain.setTargetAtTime(vol, t, 0.15);
      const freq = 600 + proximity * 2400;
      this.filter.frequency.setTargetAtTime(freq, t, 0.1);
    }
  }

  getTimeDomainData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(128).fill(128);
    const buf = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(buf);
    return buf;
  }

  stop() {
    this.ctx?.close();
  }
}

/* ─── Oscilloscope Canvas ──────────────────────────────────── */
function Oscilloscope({ audio, locked, proximity }: { audio: RadioAudio | null; locked: boolean; proximity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (ts: number) => {
      timeRef.current = ts;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      /* CRT glow background */
      const locked_color = locked ? "rgba(34,197,94," : "rgba(245,158,11,";
      ctx.fillStyle = locked ? "rgba(0,15,5,0.92)" : "rgba(5,8,12,0.92)";
      ctx.fillRect(0, 0, W, H);

      /* Grid lines */
      ctx.strokeStyle = locked ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(0, (H / 4) * i); ctx.lineTo(W, (H / 4) * i); ctx.stroke();
      }
      for (let i = 1; i < 8; i++) {
        ctx.beginPath(); ctx.moveTo((W / 8) * i, 0); ctx.lineTo((W / 8) * i, H); ctx.stroke();
      }

      /* Waveform */
      let data: number[];
      if (audio?.started) {
        const raw = audio.getTimeDomainData();
        data = Array.from(raw).map(v => v / 128.0 - 1);
      } else {
        /* Animated sine when no audio */
        data = Array.from({ length: 128 }, (_, i) => {
          const t = ts * 0.001;
          if (locked) {
            return Math.sin((i / 128) * Math.PI * 4 + t * 2) * 0.5 * (0.8 + Math.sin(t * 0.7) * 0.2);
          }
          return (Math.random() - 0.5) * (1 - proximity * 0.7) * 0.9;
        });
      }

      /* Main trace */
      const grd = ctx.createLinearGradient(0, 0, W, 0);
      if (locked) {
        grd.addColorStop(0, "rgba(34,197,94,0)");
        grd.addColorStop(0.2, "rgba(34,197,94,0.9)");
        grd.addColorStop(0.8, "rgba(134,239,172,1)");
        grd.addColorStop(1, "rgba(34,197,94,0)");
      } else {
        grd.addColorStop(0, "rgba(245,158,11,0)");
        grd.addColorStop(0.2, `rgba(245,158,11,${0.4 + proximity * 0.5})`);
        grd.addColorStop(0.8, `rgba(251,191,36,${0.5 + proximity * 0.4})`);
        grd.addColorStop(1, "rgba(245,158,11,0)");
      }

      /* Glow layer */
      ctx.shadowBlur = locked ? 14 : 8;
      ctx.shadowColor = locked ? "rgba(34,197,94,0.8)" : "rgba(245,158,11,0.6)";
      ctx.strokeStyle = grd;
      ctx.lineWidth = locked ? 2 : 1.5;
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = (i / (data.length - 1)) * W;
        const y = H / 2 - v * (H * 0.38);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      /* Second thinner glow */
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.35;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      /* Scan line */
      const scanX = ((ts * 0.08) % W);
      ctx.strokeStyle = locked ? "rgba(134,239,172,0.15)" : "rgba(245,158,11,0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(scanX, 0); ctx.lineTo(scanX, H); ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [audio, locked, proximity]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={140}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

/* ─── Needle VU Meter ──────────────────────────────────────── */
function NeedleVU({ locked, side }: { locked: boolean; side: "L" | "R" }) {
  const [level, setLevel] = useState(0.1);
  useEffect(() => {
    const iv = setInterval(() => {
      setLevel(prev => {
        const target = locked
          ? 0.45 + Math.sin(Date.now() * 0.003 + (side === "R" ? 1.5 : 0)) * 0.4
          : 0.05 + Math.random() * 0.15;
        return prev + (target - prev) * 0.25 + (Math.random() - 0.5) * (locked ? 0.06 : 0.02);
      });
    }, 50);
    return () => clearInterval(iv);
  }, [locked, side]);

  const clamped = Math.max(0, Math.min(1, level));
  const angle = -40 + clamped * 80; // -40° to +40°

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: 56, height: 40 }}>
        {/* Arc background */}
        <svg viewBox="0 0 56 40" className="absolute inset-0 w-full h-full">
          <path d="M4 38 A26 26 0 0 1 52 38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <path d="M4 38 A26 26 0 0 1 52 38" fill="none"
            stroke={locked ? "rgba(34,197,94,0.3)" : "rgba(245,158,11,0.3)"} strokeWidth="2"
            strokeDasharray={`${clamped * 68} 68`} />
          {/* Zone markers */}
          {[0, 0.33, 0.66, 1].map((t, i) => {
            const a = (-40 + t * 80) * Math.PI / 180;
            const r = 23;
            const cx = 28 + Math.sin(a) * r;
            const cy = 38 - Math.cos(a) * r;
            return <circle key={i} cx={cx} cy={cy} r={1} fill={t > 0.8 ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.2)"} />;
          })}
          {/* Needle */}
          <g transform={`rotate(${angle}, 28, 38)`}>
            <line x1="28" y1="38" x2="28" y2="14"
              stroke={locked ? "rgba(134,239,172,0.9)" : "rgba(245,158,11,0.8)"}
              strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="38" r="2.5" fill={locked ? "rgba(34,197,94,0.5)" : "rgba(245,158,11,0.4)"} />
          </g>
        </svg>
      </div>
      <span className="text-[7px] uppercase tracking-[0.3em]"
        style={{ color: locked ? "rgba(134,239,172,0.5)" : "rgba(255,255,255,0.2)" }}>{side}</span>
    </div>
  );
}

/* ─── 7-Segment Digit display ──────────────────────────────── */
function SevenSegDisplay({ value, locked }: { value: string; locked: boolean }) {
  const color = locked ? "#86efac" : "#fbbf24";
  const dimColor = locked ? "rgba(134,239,172,0.07)" : "rgba(251,191,36,0.07)";
  const glow = locked ? "0 0 12px rgba(134,239,172,0.5)" : "0 0 8px rgba(251,191,36,0.3)";

  return (
    <div className="flex items-center gap-1" style={{ fontFamily: "'Courier New', monospace" }}>
      {value.split("").map((ch, i) => (
        ch === "." ? (
          <div key={i} className="w-1.5 h-1.5 rounded-full self-end mb-1"
            style={{ background: color, boxShadow: glow }} />
        ) : (
          <div key={i} className="relative" style={{ width: 28, height: 46 }}>
            {/* Digit glow bg */}
            <div className="absolute inset-0 rounded"
              style={{ background: locked ? "rgba(0,20,8,0.8)" : "rgba(5,8,3,0.8)" }} />
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold leading-none"
              style={{ color, textShadow: `${glow}, ${glow}`, letterSpacing: 0 }}>
              {ch}
            </span>
            {/* Scanline */}
            <div className="absolute inset-0 pointer-events-none rounded overflow-hidden">
              <div className="w-full h-full opacity-20"
                style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.4) 2px,rgba(0,0,0,0.4) 4px)" }} />
            </div>
          </div>
        )
      ))}
    </div>
  );
}

/* ─── Speaker Grille ────────────────────────────────────────── */
function SpeakerGrille({ active }: { active: boolean }) {
  return (
    <div className="relative overflow-hidden rounded" style={{ width: 100, height: 130 }}>
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(145deg,#0f1115,#1a1d24)", border: "1px solid rgba(255,255,255,0.06)" }} />
      {/* Dot grid */}
      <div className="absolute inset-2 grid gap-1.5" style={{ gridTemplateColumns: "repeat(8,1fr)" }}>
        {Array.from({ length: 64 }, (_, i) => (
          <motion.div key={i} className="rounded-full"
            style={{ width: "100%", aspectRatio: "1", background: active ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.12)" }}
            animate={active ? { opacity: [0.3, 0.8 + Math.random() * 0.2, 0.3] } : { opacity: 0.3 }}
            transition={{ duration: 0.8 + Math.random() * 0.8, repeat: Infinity, delay: i * 0.012 }} />
        ))}
      </div>
      {/* Horizontal bars overlay */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="absolute left-0 right-0 h-px"
          style={{ top: `${15 + i * 14}%`, background: "rgba(0,0,0,0.35)" }} />
      ))}
    </div>
  );
}

/* ─── Main RadioDial Component ─────────────────────────────── */
export default function RadioDial({ onLock }: { onLock?: (locked: boolean) => void }) {
  const [angle, setAngle] = useState(60);
  const [dragging, setDragging] = useState(false);
  const [locked, setLocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<RadioAudio | null>(null);
  const dragStartRef = useRef<{ mouseAngle: number; dialAngle: number } | null>(null);
  const prevLockedRef = useRef(false);

  const diff = angleDiff(angle, STATION_ANGLE);
  const lockProximity = Math.max(0, 1 - diff / LOCK_RANGE);
  const isLocked = diff < LOCK_RANGE;

  /* Display frequency */
  const displayFreq = useMemo(() => {
    if (isLocked) return STATION_FREQ;
    const nearest = PRESETS.reduce((best, f) => {
      const d = angleDiff(angle, f.angle);
      return d < angleDiff(angle, best.angle) ? f : best;
    }, PRESETS[0]);
    const d = angleDiff(angle, nearest.angle);
    if (d < 10) return nearest.freq;
    const base = parseFloat(nearest.freq);
    const shift = (Math.sin(angle * 0.15) * 3.5);
    return (base + shift).toFixed(1);
  }, [angle, isLocked]);

  /* Sync locked state */
  useEffect(() => {
    if (isLocked !== prevLockedRef.current) {
      prevLockedRef.current = isLocked;
      setLocked(isLocked);
      onLock?.(isLocked);
    }
  }, [isLocked, onLock]);

  /* Update audio proximity */
  useEffect(() => {
    audioRef.current?.setProximity(lockProximity, isLocked);
  }, [lockProximity, isLocked]);

  /* Cleanup */
  useEffect(() => () => { audioRef.current?.stop(); }, []);

  const getMouseAngle = useCallback((e: PointerEvent | React.PointerEvent, rect: DOMRect) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;
  }, []);

  const startAudio = useCallback(() => {
    if (!audioRef.current) audioRef.current = new RadioAudio();
    if (!audioRef.current.started) {
      audioRef.current.start();
      setHasStarted(true);
    }
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    startAudio();
    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDragging(true);
    dragStartRef.current = { mouseAngle: getMouseAngle(e, rect), dialAngle: angle };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [angle, getMouseAngle, startAudio]);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragging || !dragStartRef.current || !dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const mouseAngle = getMouseAngle(e, rect);
    let delta = mouseAngle - dragStartRef.current.mouseAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    setAngle(((dragStartRef.current.dialAngle + delta) % 360 + 360) % 360);
  }, [dragging, getMouseAngle]);

  const onPointerUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging, onPointerMove, onPointerUp]);

  const snapToStation = useCallback(() => {
    startAudio();
    /* Animate angle to station */
    let start: number | null = null;
    const from = angle;
    const to = STATION_ANGLE;
    let diff = ((to - from) % 360 + 360) % 360;
    if (diff > 180) diff -= 360;
    const target = from + diff;
    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / 700, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setAngle(((from + diff * ease) % 360 + 360) % 360);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [angle, startAudio]);

  const signalBars = Math.round(lockProximity * 5);

  return (
    <div className="select-none w-full">
      {/* ═══════════════════════════════════════════════
          RADIO HOUSING
      ═══════════════════════════════════════════════ */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1c1f28 0%, #0d0f14 40%, #141720 100%)",
          boxShadow: locked
            ? "0 0 0 1px rgba(34,197,94,0.15), 0 0 60px rgba(34,197,94,0.06), 0 30px 80px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07)"
            : "0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07)",
          transition: "box-shadow 0.6s",
        }}
      >
        {/* Top brand bar */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.25)" }}>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: locked ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.12)", border: `1px solid ${locked ? "rgba(34,197,94,0.4)" : "rgba(245,158,11,0.3)"}` }}>
              <div className="w-1.5 h-1.5 rounded-full"
                style={{ background: locked ? "#22c55e" : "#f59e0b", boxShadow: locked ? "0 0 6px #22c55e" : "0 0 4px #f59e0b" }} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] font-semibold"
                style={{ color: locked ? "rgba(134,239,172,0.8)" : "rgba(245,158,11,0.6)" }}>
                KimYaps Studio
              </p>
              <p className="text-[7px] uppercase tracking-[0.3em] text-white/20">Broadcast Receiver · Model KY-273</p>
            </div>
          </div>
          {/* On-Air indicator */}
          <AnimatePresence>
            {locked && (
              <motion.div className="flex items-center gap-2 px-3 py-1 rounded"
                style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)" }}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="w-1.5 h-1.5 rounded-full bg-red-400"
                  animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
                <span className="text-[8px] uppercase tracking-[0.35em] text-red-400 font-semibold">On Air</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── MAIN PANEL ── */}
        <div className="p-5 flex flex-col gap-4">

          {/* ── Oscilloscope Display ── */}
          <div className="relative rounded overflow-hidden"
            style={{
              height: 140,
              background: locked ? "rgba(0,15,5,0.95)" : "rgba(3,6,10,0.95)",
              border: locked ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(255,255,255,0.07)",
              boxShadow: locked ? "inset 0 0 30px rgba(34,197,94,0.04), 0 0 20px rgba(34,197,94,0.05)" : "inset 0 0 20px rgba(0,0,0,0.5)",
              transition: "border-color 0.5s, box-shadow 0.5s",
            }}>
            <Oscilloscope audio={hasStarted ? audioRef.current : null} locked={locked} proximity={lockProximity} />
            {/* CRT vignette */}
            <div className="absolute inset-0 pointer-events-none rounded"
              style={{ background: "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />
            {/* CRT reflection */}
            <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.025), transparent)" }} />
            {/* Frequency label overlay */}
            <div className="absolute bottom-2 right-3">
              <span className="text-[7px] uppercase tracking-[0.3em]"
                style={{ color: locked ? "rgba(134,239,172,0.4)" : "rgba(255,255,255,0.12)" }}>
                {locked ? "STEREO · LOCKED" : "SCANNING…"}
              </span>
            </div>
          </div>

          {/* ── Frequency + VU Row ── */}
          <div className="flex items-center justify-between gap-4">
            {/* VU Left */}
            <NeedleVU locked={locked} side="L" />

            {/* Center: Frequency Display */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="flex items-baseline gap-2">
                <SevenSegDisplay value={displayFreq} locked={locked} />
                <span className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: locked ? "rgba(134,239,172,0.6)" : "rgba(245,158,11,0.4)" }}>FM</span>
              </div>
              {/* Station name */}
              <AnimatePresence mode="wait">
                {locked ? (
                  <motion.div key="station" className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}>
                    <motion.div className="w-1 h-1 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                    <span className="text-[9px] uppercase tracking-[0.35em] font-semibold"
                      style={{ color: "rgba(134,239,172,0.8)" }}>KimYaps FM</span>
                  </motion.div>
                ) : (
                  <motion.p key="scan" className="text-[8px] uppercase tracking-[0.3em] text-white/20"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {PRESETS.find(p => angleDiff(angle, p.angle) < 15)?.label ?? "· · · · ·"}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* VU Right */}
            <NeedleVU locked={locked} side="R" />
          </div>

          {/* ── Band Strip ── */}
          <div className="relative h-8 rounded overflow-hidden"
            style={{ background: "linear-gradient(90deg,#08090c,#111318,#08090c)", border: "1px solid rgba(255,255,255,0.05)" }}>
            {/* Band label */}
            <div className="absolute inset-0 flex items-center px-3 gap-1 pointer-events-none">
              {["88", "", "", "92", "", "", "96", "", "", "100", "", "", "104", "", "", "108"].map((f, i) => (
                <div key={i} className="flex flex-col items-center" style={{ flex: 1 }}>
                  <div className="w-px mb-0.5" style={{ height: f ? 8 : 5, background: f ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)" }} />
                  {f && <span className="text-[6px] text-white/20 font-mono">{f}</span>}
                </div>
              ))}
            </div>
            {/* KimYaps marker */}
            <div className="absolute top-1 bottom-1 flex flex-col items-center pointer-events-none"
              style={{ left: `${(STATION_ANGLE / 360) * 100}%`, transform: "translateX(-50%)" }}>
              <div className="w-px flex-1" style={{ background: "rgba(245,158,11,0.6)" }} />
              <span className="text-[6px] text-amber-400/60 font-mono leading-none mt-0.5">97.3</span>
            </div>
            {/* Needle */}
            <motion.div className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
              style={{
                left: `${(angle / 360) * 100}%`,
                background: locked ? "rgba(134,239,172,0.9)" : "rgba(245,158,11,0.8)",
                boxShadow: locked ? "0 0 6px rgba(134,239,172,0.7)" : "0 0 4px rgba(245,158,11,0.5)",
              }} />
          </div>

          {/* ── Controls Row ── */}
          <div className="flex items-end gap-5">
            {/* Speaker Grille */}
            <SpeakerGrille active={locked} />

            {/* Center: Dial + presets */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Preset buttons */}
              <div className="flex gap-1.5">
                {PRESETS.map((p) => (
                  <motion.button
                    key={p.freq}
                    onClick={() => {
                      startAudio();
                      if (p.isStation) snapToStation();
                      else setAngle(p.angle);
                    }}
                    className="flex-1 py-1.5 rounded text-center relative overflow-hidden"
                    style={{
                      background: p.isStation && locked ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${p.isStation ? (locked ? "rgba(34,197,94,0.35)" : "rgba(245,158,11,0.25)") : "rgba(255,255,255,0.07)"}`,
                    }}
                    whileTap={{ scale: 0.93 }}
                  >
                    <span className="text-[7px] uppercase tracking-[0.2em] block"
                      style={{ color: p.isStation ? (locked ? "rgba(134,239,172,0.8)" : "rgba(245,158,11,0.6)") : "rgba(255,255,255,0.2)" }}>
                      {p.isStation ? "★" : p.label}
                    </span>
                    {p.isStation && (
                      <span className="text-[6px] block" style={{ color: locked ? "rgba(134,239,172,0.5)" : "rgba(245,158,11,0.35)" }}>
                        {p.freq}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* THE BIG DIAL */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[7px] uppercase tracking-[0.4em]"
                    style={{ color: "rgba(255,255,255,0.2)" }}>Tune</span>
                  <div ref={dialRef} className="relative cursor-grab active:cursor-grabbing"
                    style={{ width: 90, height: 90 }}
                    onPointerDown={onPointerDown}>
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(from 0deg, #141720 0deg, #1e2230 180deg, #141720 360deg)",
                        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 6px 20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
                      }} />
                    {/* Tick marks */}
                    {Array.from({ length: 60 }, (_, i) => (
                      <div key={i} className="absolute left-1/2 origin-bottom"
                        style={{
                          top: 2, width: 1,
                          height: i % 5 === 0 ? 9 : 5,
                          background: i % 5 === 0 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)",
                          transform: `translateX(-50%) rotate(${i * 6}deg)`,
                          transformOrigin: `50% calc(45px - ${i % 5 === 0 ? 9 : 5}px)`,
                        }} />
                    ))}
                    {/* Station dot */}
                    <div className="absolute pointer-events-none"
                      style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "rgba(245,158,11,0.7)",
                        boxShadow: "0 0 6px rgba(245,158,11,0.8)",
                        top: 6, left: "50%",
                        transform: `translateX(-50%) rotate(0deg)`,
                        transformOrigin: `50% calc(45px - 6px)`,
                      }} />
                    {/* Inner knob */}
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        inset: 10,
                        rotate: angle,
                        background: locked
                          ? "radial-gradient(circle at 38% 32%, #1e3026, #0a1810)"
                          : "radial-gradient(circle at 38% 32%, #22263a, #0e1018)",
                        boxShadow: locked
                          ? "0 0 0 1px rgba(34,197,94,0.25), 0 4px 16px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12)"
                          : "0 0 0 1px rgba(255,255,255,0.07), 0 4px 16px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1)",
                        transition: "background 0.5s, box-shadow 0.5s",
                      }}
                    >
                      {/* Ridged grip lines */}
                      {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="absolute left-1/2 top-1 rounded-full"
                          style={{
                            width: 1, height: "35%",
                            background: "rgba(255,255,255,0.08)",
                            transform: `translateX(-50%) rotate(${i * 45}deg)`,
                            transformOrigin: `50% calc(35px - 4px)`,
                          }} />
                      ))}
                      {/* Indicator */}
                      <div className="absolute left-1/2 top-2 rounded-full"
                        style={{
                          width: 3, height: "38%",
                          background: locked ? "rgba(134,239,172,1)" : "rgba(245,158,11,0.9)",
                          boxShadow: locked ? "0 0 8px rgba(134,239,172,0.8)" : "0 0 6px rgba(245,158,11,0.7)",
                          transform: "translateX(-50%)",
                          transformOrigin: "50% 100%",
                        }} />
                    </motion.div>
                    {/* Lock pulse ring */}
                    <AnimatePresence>
                      {locked && (
                        <motion.div className="absolute inset-0 rounded-full pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.06, 1] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                          style={{ boxShadow: "0 0 0 2px rgba(34,197,94,0.2), 0 0 30px rgba(34,197,94,0.12)" }} />
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Signal + status */}
                <div className="flex-1 flex flex-col gap-3">
                  {/* Signal bars */}
                  <div>
                    <p className="text-[7px] uppercase tracking-[0.3em] mb-1.5"
                      style={{ color: "rgba(255,255,255,0.2)" }}>Signal</p>
                    <div className="flex items-end gap-1">
                      {[0.18, 0.36, 0.54, 0.72, 0.9].map((t, i) => (
                        <div key={i} className="rounded-sm transition-all duration-150"
                          style={{
                            width: 7, height: 7 + i * 5,
                            background: lockProximity >= t
                              ? locked ? "rgba(134,239,172,0.9)" : "rgba(245,158,11,0.85)"
                              : "rgba(255,255,255,0.08)",
                            boxShadow: lockProximity >= t && locked ? "0 0 5px rgba(134,239,172,0.5)" : "none",
                          }} />
                      ))}
                    </div>
                  </div>

                  {/* Snap button */}
                  <motion.button
                    onClick={snapToStation}
                    className="w-full py-2 text-[8px] uppercase tracking-[0.3em] rounded transition-all duration-300"
                    style={{
                      background: locked ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.07)",
                      border: locked ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(245,158,11,0.2)",
                      color: locked ? "rgba(134,239,172,0.8)" : "rgba(245,158,11,0.6)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}>
                    {locked ? "✓ KimYaps" : "⇒ Find 97.3"}
                  </motion.button>

                  {/* Hint */}
                  <AnimatePresence>
                    {!hasStarted && (
                      <motion.p className="text-[7px] uppercase tracking-[0.25em] text-center"
                        style={{ color: "rgba(245,158,11,0.45)" }}
                        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                        exit={{ opacity: 0 }}>
                        drag dial or tap ⇒
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right decorative panel */}
            <div className="flex flex-col gap-2 items-end">
              {/* Knobs */}
              {["Vol", "Bass", "Treb"].map((label, i) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="text-[6px] uppercase tracking-[0.2em]"
                    style={{ color: "rgba(255,255,255,0.15)" }}>{label}</span>
                  <div className="w-7 h-7 rounded-full cursor-default"
                    style={{
                      background: "radial-gradient(circle at 40% 35%, #1e2230, #0d0f14)",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-0.5 h-2.5 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          transform: `rotate(${-30 + i * 30}deg)`,
                          transformOrigin: "50% 100%",
                        }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom screw row */}
        <div className="flex justify-between px-5 pb-4 pt-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 35% 35%, #252a38, #0d0f14)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}>
              <div className="w-1.5 h-px bg-white/10 rotate-45" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
