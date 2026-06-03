import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const MILESTONES = [
  {
    year: "2006",
    title: "Born in the Bay Area",
    detail: "Early signs of athletic and creative talent emerge in Oakland, East Palo Alto.",
    category: "personal",
    x: 12, y: 20,
  },
  {
    year: "2019",
    title: "Athletic Emergence",
    detail: "Reaches 6'7\" and begins excelling on the basketball court across multiple sports.",
    category: "athletic",
    x: 28, y: 55,
  },
  {
    year: "2020",
    title: "First Publication",
    detail: "The Spirit of Solomon published — the beginning of a literary universe.",
    category: "literary",
    x: 45, y: 18,
  },
  {
    year: "2021",
    title: "Team Captain",
    detail: "Cristo Rey De La Salle — leads program while earning academic honors.",
    category: "athletic",
    x: 62, y: 48,
  },
  {
    year: "2022",
    title: "Four Books Published",
    detail: "Our Father, Poems from a Black Boy, and two more — exploring faith, identity, love.",
    category: "literary",
    x: 38, y: 75,
  },
  {
    year: "2023",
    title: "The Tee Shirt Teens",
    detail: "Founds his own fashion brand rooted in youth culture and authentic expression.",
    category: "business",
    x: 75, y: 25,
  },
  {
    year: "2024",
    title: "Miles Hall Foundation Honor",
    detail: "Wins essay contest recognizing community leadership and his grandmother's legacy.",
    category: "personal",
    x: 18, y: 82,
  },
  {
    year: "2024",
    title: "Seven Books Published",
    detail: "Hopeless Romantic and Kiminou the Great complete a 7-book literary universe.",
    category: "literary",
    x: 85, y: 65,
  },
  {
    year: "2025",
    title: "Renaissance Man",
    detail: "Class of 2025. Athlete. Author. Entrepreneur. The next chapter begins.",
    category: "personal",
    x: 52, y: 88,
  },
];

const CATEGORY_COLORS: Record<string, { star: string; glow: string; border: string }> = {
  personal: { star: "#c084fc", glow: "rgba(192,132,252,0.5)", border: "rgba(192,132,252,0.3)" },
  athletic: { star: "#f87171", glow: "rgba(248,113,113,0.5)", border: "rgba(248,113,113,0.3)" },
  literary: { star: "#60a5fa", glow: "rgba(96,165,250,0.5)", border: "rgba(96,165,250,0.3)" },
  business: { star: "#4ade80", glow: "rgba(74,222,128,0.5)", border: "rgba(74,222,128,0.3)" },
};

function Star({ milestone, index, active, onActivate }: {
  milestone: typeof MILESTONES[0];
  index: number;
  active: boolean;
  onActivate: (i: number | null) => void;
}) {
  const colors = CATEGORY_COLORS[milestone.category];

  return (
    <motion.g
      style={{ cursor: "pointer" }}
      onClick={() => onActivate(active ? null : index)}
      onMouseEnter={() => onActivate(index)}
      onMouseLeave={() => onActivate(null)}
    >
      {/* Outer glow ring */}
      <motion.circle
        cx={`${milestone.x}%`}
        cy={`${milestone.y}%`}
        r={active ? 18 : 10}
        fill="none"
        stroke={colors.glow}
        strokeWidth="1"
        animate={{ r: active ? 18 : 10, opacity: active ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Pulsing ring */}
      <motion.circle
        cx={`${milestone.x}%`}
        cy={`${milestone.y}%`}
        r={8}
        fill="none"
        stroke={colors.star}
        strokeWidth="0.5"
        opacity={0.3}
        animate={{ r: [8, 14, 8], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
      />
      {/* Main star */}
      <motion.circle
        cx={`${milestone.x}%`}
        cy={`${milestone.y}%`}
        r={active ? 6 : 4}
        fill={colors.star}
        animate={{ r: active ? 6 : 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        style={{ filter: active ? `drop-shadow(0 0 8px ${colors.glow})` : "none" }}
      />
      {/* Year label */}
      <text
        x={`${milestone.x}%`}
        y={`${milestone.y}%`}
        dy={-12}
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize="9"
        fontFamily="serif"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {milestone.year}
      </text>
    </motion.g>
  );
}

export default function ConstellationTimeline() {
  const [active, setActive] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (inView && !revealed) setRevealed(true);

  const activeMilestone = active !== null ? MILESTONES[active] : null;

  // Build constellation lines — connect adjacent milestones
  const CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [0, 2], [3, 5], [4, 7],
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #070b14 0%, #000000 100%)" }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 1.5 + 0.5,
              height: Math.random() * 1.5 + 0.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-amber-400/50 mb-4 font-medium">
            Journey of Excellence
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-4">
            The Constellation
          </h2>
          <p className="text-sm text-white/30 max-w-sm mx-auto">
            Hover a star to reveal the milestone
          </p>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: colors.star, boxShadow: `0 0 6px ${colors.glow}` }}
                />
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/30 capitalize">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SVG Constellation */}
        <div className="relative">
          <motion.svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            className="w-full"
            style={{ height: "clamp(320px, 50vw, 520px)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Connection lines */}
            {revealed && CONNECTIONS.map(([a, b], i) => {
              const ma = MILESTONES[a];
              const mb = MILESTONES[b];
              const isHighlighted = active === a || active === b;
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={`${ma.x}%`} y1={`${ma.y}%`}
                  x2={`${mb.x}%`} y2={`${mb.y}%`}
                  stroke={isHighlighted ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.06)"}
                  strokeWidth={isHighlighted ? "0.4" : "0.2"}
                  strokeDasharray="1 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.8 }}
                />
              );
            })}

            {/* Stars */}
            {revealed && MILESTONES.map((m, i) => (
              <Star
                key={m.year + m.title}
                milestone={m}
                index={i}
                active={active === i}
                onActivate={setActive}
              />
            ))}
          </motion.svg>

          {/* Active milestone card */}
          <AnimatePresence>
            {activeMilestone && (
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-sm pointer-events-none"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="mx-4 p-5 backdrop-blur-xl border"
                  style={{
                    background: "rgba(0,0,0,0.85)",
                    borderColor: CATEGORY_COLORS[activeMilestone.category].border,
                    boxShadow: `0 0 40px ${CATEGORY_COLORS[activeMilestone.category].glow}`,
                  }}
                >
                  <p
                    className="text-[9px] uppercase tracking-[0.35em] mb-2 font-medium"
                    style={{ color: CATEGORY_COLORS[activeMilestone.category].star }}
                  >
                    {activeMilestone.year} · {activeMilestone.category}
                  </p>
                  <h3 className="font-serif text-lg text-white mb-2">
                    {activeMilestone.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {activeMilestone.detail}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
