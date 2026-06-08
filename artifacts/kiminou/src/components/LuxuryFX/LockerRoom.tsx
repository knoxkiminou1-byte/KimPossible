import { useRef, useState } from "react";

const SIDE_LOCKERS = [
  { side: "left", text: `CONFERENCE STATS · 2024-25` },
  { side: "left", text: `RECRUITING PROFILE · NCSA` },
  { side: "left", text: `TEAM RECORD · CRISTO REY` },
  { side: "right", text: `VARSITY CAPTAIN · 2024` },
  { side: "right", text: `CALIHOOP TOP TEAM` },
  { side: "right", text: `MULTI-SPORT · BBALL + FB` },
];

const NOTES = [
  { text: `Stay focused.`, r: -5 },
  { text: `6'7" is enough.`, r: 4 },
  { text: `The work is the prayer.`, r: -3 },
];

const METAL =
  "repeating-linear-gradient(90deg, #0a0b0d 0px, #0a0b0d 6px, #111317 6px, #111317 8px)";

function cassetteMotif(ctxRef: React.MutableRefObject<AudioContext | null>) {
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  if (!ctxRef.current) ctxRef.current = new Ctx();
  const ctx = ctxRef.current;
  const notes = [330, 392, 494, 587];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.value = 0.04;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const start = ctx.currentTime + i * 0.18;
    osc.start(start);
    gain.gain.setValueAtTime(0.04, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
    osc.stop(start + 0.24);
  });
}

export default function LockerRoom() {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<number | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 3, y: px * 3 });
  };

  return (
    <section className="relative bg-[#070809] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px w-10 bg-amber-400/30" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">The Locker Room</p>
        </div>

        {/* Desktop 3D room */}
        <div
          className="relative hidden h-[520px] w-full md:block"
          style={{ perspective: "1000px" }}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div
            className="relative h-full w-full transition-transform duration-200"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* back wall */}
            <div
              className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2"
              style={{ background: METAL, transform: "translateZ(-300px)" }}
            >
              {/* focal locker */}
              <div className="absolute left-1/2 top-1/2 h-[260px] w-[160px] -translate-x-1/2 -translate-y-1/2">
                {/* inside (revealed on open) */}
                <div className="absolute inset-0 border border-amber-400/30 bg-[#0d0f12] p-3">
                  <svg viewBox="0 0 100 120" className="mx-auto h-20 w-auto">
                    <path d="M30 10 L50 20 L70 10 L80 30 L65 40 V100 H35 V40 L20 30 Z" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="2" />
                    <text x="50" y="70" textAnchor="middle" fill="rgba(245,158,11,0.9)" fontSize="16" fontFamily="serif">#1</text>
                  </svg>
                  <p className="mt-1 text-center font-serif text-xs text-white/60">KNOX #1</p>
                  <p className="mt-2 text-center text-[8px] uppercase tracking-[0.15em] text-amber-400/50">
                    MVP · All-Conference · Scholar-Athlete
                  </p>
                  <div className="mt-2 space-y-1">
                    {NOTES.map((n, i) => (
                      <p
                        key={i}
                        className="bg-amber-100/5 px-1 py-0.5 text-center text-[8px] text-white/45"
                        style={{ transform: `rotate(${n.r}deg)`, fontFamily: "cursive" }}
                      >
                        {n.text}
                      </p>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => cassetteMotif(ctxRef)}
                    className="mx-auto mt-2 block border border-amber-400/30 px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-amber-400/70 hover:bg-amber-400 hover:text-black"
                  >
                    ▤ Play Tape
                  </button>
                </div>

                {/* door */}
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  className="absolute inset-0 border border-white/15 bg-[#15181c]"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                    transform: open ? "rotateY(-80deg)" : "rotateY(0deg)",
                    transition: "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <span className="absolute right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border-2 border-white/20" />
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.2em] text-white/30">
                    {open ? "" : "Click to open"}
                  </span>
                </button>
              </div>
            </div>

            {/* left wall */}
            <div
              className="absolute left-1/2 top-1/2 flex h-[400px] w-[300px] origin-left -translate-y-1/2 flex-col justify-center gap-3 p-4"
              style={{ background: METAL, transform: "translateX(-300px) translateZ(-300px) rotateY(90deg)" }}
            >
              {SIDE_LOCKERS.filter((l) => l.side === "left").map((l, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="border border-white/10 px-3 py-4 text-[9px] uppercase tracking-[0.15em] transition-colors"
                  style={{ color: hovered === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)" }}
                >
                  {l.text}
                </div>
              ))}
            </div>

            {/* right wall */}
            <div
              className="absolute left-1/2 top-1/2 flex h-[400px] w-[300px] origin-right -translate-y-1/2 flex-col justify-center gap-3 p-4"
              style={{ background: METAL, transform: "translateX(300px) translateZ(-300px) rotateY(-90deg)" }}
            >
              {SIDE_LOCKERS.filter((l) => l.side === "right").map((l, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(100 + i)}
                  onMouseLeave={() => setHovered(null)}
                  className="border border-white/10 px-3 py-4 text-[9px] uppercase tracking-[0.15em] transition-colors"
                  style={{ color: hovered === 100 + i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)" }}
                >
                  {l.text}
                </div>
              ))}
            </div>

            {/* floor */}
            <div
              className="absolute left-1/2 top-1/2 h-[300px] w-[600px] origin-top -translate-x-1/2"
              style={{ background: METAL, transform: "translateZ(-300px) translateY(200px) rotateX(90deg)" }}
            />
          </div>
        </div>

        {/* Mobile 2D layout */}
        <div className="grid gap-4 md:hidden">
          <div className="border border-amber-400/30 bg-[#0d0f12] p-6">
            <p className="mb-1 font-serif text-lg text-white/70">KNOX #1</p>
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-amber-400/50">
              MVP · All-Conference · Scholar-Athlete
            </p>
            <div className="space-y-2">
              {NOTES.map((n, i) => (
                <p key={i} className="bg-amber-100/5 px-3 py-2 text-sm text-white/50" style={{ fontFamily: "cursive" }}>
                  {n.text}
                </p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => cassetteMotif(ctxRef)}
              className="mt-4 border border-amber-400/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-amber-400/70"
            >
              ▤ Play Tape
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {SIDE_LOCKERS.map((l, i) => (
              <div key={i} className="border border-white/10 p-4 text-[9px] uppercase tracking-[0.15em] text-white/35">
                {l.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
