import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Record = {
  title: string;
  year: number;
  cover: string;
  themes: string[];
  buy: string;
};

const RECORDS: Record[] = [
  {
    title: "The Spirit of Solomon",
    year: 2025,
    cover: "/books/spirit-of-solomon-cover.jpg",
    themes: ["Wisdom", "Faith", "Reckoning"],
    buy: "https://www.amazon.com/Spirit-Solomon-What-Love-Destroy/dp/B0F3VGQ1TK",
  },
  {
    title: "Hopeless Romantic",
    year: 2025,
    cover: "/books/hopeless-romantic-cover.jpg",
    themes: ["Love", "Heartbreak", "Healing"],
    buy: "https://www.amazon.com/Hopeless-Romantic-Kiminou-Knox/dp/B0FH32385N",
  },
  {
    title: "Black Boy Poems",
    year: 2025,
    cover: "/books/black-boy-poems-cover.jpg",
    themes: ["Identity", "Blackness", "Resilience"],
    buy: "https://www.amazon.com/Black-Boy-Poems-Kiminou-Knox/dp/B0FT4CQ9CH",
  },
];

const GROOVES =
  "repeating-radial-gradient(circle, rgba(255,255,255,0.02) 0px, rgba(0,0,0,0.8) 1px, rgba(0,0,0,0.8) 3px, rgba(255,255,255,0.02) 4px)";

function Vinyl({ record }: { record: Record }) {
  const [hovered, setHovered] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const tick = () => {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    if (!ctxRef.current) ctxRef.current = new Ctx();
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 40;
    gain.gain.value = 0.02;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.start(now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.005);
    osc.stop(now + 0.008);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={() => {
          if (hovered && Math.random() < 0.25) tick();
        }}
      >
        {/* needle arm */}
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="absolute -right-6 -top-6 z-20 pointer-events-none"
          initial={{ opacity: 0, rotate: -30 }}
          animate={hovered ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "100px 20px" }}
        >
          <circle cx="100" cy="20" r="6" fill="rgba(245,158,11,0.6)" />
          <line x1="100" y1="20" x2="50" y2="70" stroke="rgba(245,158,11,0.5)" strokeWidth="3" />
          <rect x="44" y="66" width="10" height="14" rx="2" fill="rgba(245,158,11,0.7)" />
        </motion.svg>

        <motion.div
          className="relative h-56 w-56 rounded-full"
          style={{ background: GROOVES }}
          animate={{
            rotate: hovered ? 0 : 360,
            scale: hovered ? 1.05 : 1,
            boxShadow: hovered
              ? "0 0 40px rgba(245,158,11,0.25)"
              : "0 0 0px rgba(245,158,11,0)",
          }}
          transition={{
            rotate: hovered
              ? { duration: 0.4 }
              : { duration: 8, ease: "linear", repeat: Infinity },
            scale: { duration: 0.4 },
            boxShadow: { duration: 0.4 },
          }}
        >
          {/* center label */}
          <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-black/40">
            <img src={record.cover} alt="" className="h-full w-full object-cover" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
          </div>
        </motion.div>
      </div>

      {/* slide-up info panel */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
        transition={{ duration: 0.4 }}
        className="mt-5 w-56 text-center"
      >
        <h3 className="font-serif text-lg font-light text-white">{record.title}</h3>
        <p className="mb-2 text-xs text-amber-400/50">{record.year}</p>
        <div className="mb-3 flex flex-wrap justify-center gap-1.5">
          {record.themes.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] tracking-wide text-white/30"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={record.buy}
          target="_blank"
          rel="noopener noreferrer external"
          className="inline-block border border-amber-400/30 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-amber-400/80 transition-colors hover:bg-amber-400 hover:text-black"
        >
          Listen / Buy
        </a>
      </motion.div>
    </div>
  );
}

export default function VinylRecord() {
  return (
    <section className="relative bg-black py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex items-center gap-4">
          <div className="h-px w-10 bg-amber-400/30" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">Pressed in Ink</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-16 md:flex-row md:gap-20">
          {RECORDS.map((r) => (
            <Vinyl key={r.title} record={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
