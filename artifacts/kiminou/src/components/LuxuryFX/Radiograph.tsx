import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Zone = {
  id: string;
  label: string;
  title: string;
  body: string;
  tip: { x: number; y: number };
};

const ZONES: Zone[] = [
  {
    id: "head",
    label: "Vision & Voice",
    title: "Vision & Voice",
    body: "Speaker. Podcast host (KimYaps, 26 episodes). Youth advocate. The voice carries the work.",
    tip: { x: 64, y: 12 },
  },
  {
    id: "spine",
    label: "Literary Foundation",
    title: "Literary Foundation",
    body: "Ten published books. Poetry as a survival language, not a performance.",
    tip: { x: 64, y: 40 },
  },
  {
    id: "chest",
    label: "Faith & Spirit",
    title: "Faith & Spirit",
    body: "The Spirit of Solomon. Our Father? Wrestling is not doubt — it's devotion.",
    tip: { x: 16, y: 34 },
  },
  {
    id: "hands",
    label: "The Written Works",
    title: "The Written Works",
    body: "From Poems from a Black Boy to Kiminou's World of Imagination. Each book a chapter of a life still unfolding.",
    tip: { x: 16, y: 52 },
  },
  {
    id: "legs",
    label: "Athletic Career",
    title: "Athletic Career",
    body: "6'7\". Cristo Rey De La Salle. NCAA registered. The same discipline that fills a page fills a gym.",
    tip: { x: 64, y: 72 },
  },
];

function ZonePaths({ id }: { id: string }) {
  switch (id) {
    case "head":
      return <circle cx="200" cy="70" r="34" />;
    case "spine":
      return <line x1="200" y1="104" x2="200" y2="300" />;
    case "chest":
      return (
        <>
          <path d="M150 130 Q200 110 250 130" />
          <path d="M150 160 Q200 145 250 160" />
          <path d="M158 190 Q200 178 242 190" />
        </>
      );
    case "hands":
      return (
        <>
          <line x1="200" y1="130" x2="120" y2="210" />
          <line x1="120" y1="210" x2="100" y2="280" />
          <line x1="200" y1="130" x2="280" y2="210" />
          <line x1="280" y1="210" x2="300" y2="280" />
        </>
      );
    case "legs":
      return (
        <>
          <line x1="200" y1="300" x2="160" y2="440" />
          <line x1="160" y1="440" x2="150" y2="540" />
          <line x1="200" y1="300" x2="240" y2="440" />
          <line x1="240" y1="440" x2="250" y2="540" />
        </>
      );
    default:
      return null;
  }
}

export default function Radiograph() {
  const [active, setActive] = useState<string | null>(null);
  const activeZone = ZONES.find((z) => z.id === active) ?? null;

  return (
    <section className="relative w-full overflow-hidden bg-[#050508] py-24">
      {/* scanline texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(180,220,255,0.04) 0px, rgba(180,220,255,0.04) 1px, transparent 1px, transparent 3px)",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-14 flex items-center gap-4">
          <div className="h-px w-10 bg-white/10" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
            The Anatomy of Kiminou Knox
          </p>
        </div>

        {/* Desktop: SVG with hover zones */}
        <div className="relative hidden md:grid md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10">
          <div className="relative">
            <svg
              viewBox="0 0 400 580"
              className="mx-auto h-[560px] w-auto"
              style={{ filter: "drop-shadow(0 0 4px rgba(180,220,255,0.3))" }}
            >
              {ZONES.map((zone) => {
                const on = active === zone.id;
                return (
                  <g
                    key={zone.id}
                    onMouseEnter={() => setActive(zone.id)}
                    onMouseLeave={() => setActive(null)}
                    style={{ cursor: "pointer" }}
                    stroke={on ? "rgba(180,220,255,0.7)" : "rgba(255,255,255,0.08)"}
                    strokeWidth={on ? 2.2 : 1.4}
                    strokeLinecap="round"
                    fill="none"
                    className={on ? "animate-pulse" : ""}
                  >
                    {/* invisible wide hit area */}
                    <g stroke="transparent" strokeWidth={26}>
                      <ZonePaths id={zone.id} />
                    </g>
                    <ZonePaths id={zone.id} />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
              {activeZone ? (
                <motion.div
                  key={activeZone.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.3 }}
                  className="border border-[rgba(180,220,255,0.2)] bg-black/40 p-7 backdrop-blur-sm"
                >
                  <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[rgba(180,220,255,0.6)]">
                    {activeZone.label}
                  </p>
                  <h3 className="mb-3 font-serif text-2xl font-light text-white">
                    {activeZone.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55">{activeZone.body}</p>
                </motion.div>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-serif text-lg italic text-white/20"
                >
                  Hover a region to read the bone of the work.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: stacked text cards */}
        <div className="grid gap-4 md:hidden">
          {ZONES.map((zone) => (
            <div
              key={zone.id}
              className="border border-[rgba(180,220,255,0.15)] bg-black/30 p-6"
            >
              <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[rgba(180,220,255,0.55)]">
                {zone.label}
              </p>
              <h3 className="mb-2 font-serif text-xl font-light text-white">{zone.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{zone.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
