import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const WORDS = [
  { word: "Faith", books: ["Our Father?", "The Spirit of Solomon"], size: "text-3xl" },
  { word: "Identity", books: ["Poems from a Black Boy"], size: "text-2xl" },
  { word: "Love", books: ["Hopeless Romantic", "The Spirit of Solomon"], size: "text-4xl" },
  { word: "Resilience", books: ["Poems from a Black Boy"], size: "text-xl" },
  { word: "Reckoning", books: ["The Spirit of Solomon"], size: "text-2xl" },
  { word: "Silence", books: ["Our Father?"], size: "text-3xl" },
  { word: "Becoming", books: ["Poems from a Black Boy", "Hopeless Romantic"], size: "text-2xl" },
  { word: "Wisdom", books: ["The Spirit of Solomon"], size: "text-xl" },
  { word: "Heritage", books: ["Poems from a Black Boy"], size: "text-3xl" },
  { word: "Hope", books: ["Our Father?", "Poems from a Black Boy"], size: "text-2xl" },
  { word: "Healing", books: ["Hopeless Romantic"], size: "text-3xl" },
  { word: "Heartbreak", books: ["Hopeless Romantic"], size: "text-xl" },
  { word: "Searching", books: ["Our Father?"], size: "text-2xl" },
  { word: "Redemption", books: ["The Spirit of Solomon", "Our Father?"], size: "text-xl" },
  { word: "Legacy", books: ["Poems from a Black Boy"], size: "text-2xl" },
  { word: "Truth", books: ["The Spirit of Solomon", "Our Father?"], size: "text-3xl" },
  { word: "Grace", books: ["Hopeless Romantic", "Our Father?"], size: "text-xl" },
  { word: "Belonging", books: ["Poems from a Black Boy"], size: "text-2xl" },
  { word: "Power", books: ["Poems from a Black Boy", "The Spirit of Solomon"], size: "text-xl" },
  { word: "Longing", books: ["Hopeless Romantic"], size: "text-3xl" },
];

const POSITIONS = [
  { x: 8, y: 15 }, { x: 55, y: 8 }, { x: 80, y: 18 }, { x: 20, y: 35 },
  { x: 70, y: 32 }, { x: 42, y: 22 }, { x: 10, y: 58 }, { x: 85, y: 52 },
  { x: 35, y: 48 }, { x: 60, y: 60 }, { x: 15, y: 78 }, { x: 50, y: 72 },
  { x: 78, y: 75 }, { x: 28, y: 65 }, { x: 65, y: 42 }, { x: 45, y: 85 },
  { x: 5, y: 42 }, { x: 90, y: 35 }, { x: 30, y: 88 }, { x: 72, y: 88 },
];

export default function WordCloud() {
  const [active, setActive] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setRevealed(true), 200);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section ref={ref} className="relative py-28 bg-black overflow-hidden">
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-amber-500/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[250px] bg-amber-600/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-amber-400/50 mb-4 font-medium">
            The Universe of His Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-3">
            Themes &amp; Ideas
          </h2>
          <p className="text-sm text-white/30 max-w-md mx-auto">
            Hover any word to see which books explore it
          </p>
        </motion.div>

        {/* Word cloud canvas */}
        <div
          className="relative w-full mx-auto"
          style={{ height: 420 }}
        >
          {WORDS.map((item, i) => {
            const pos = POSITIONS[i];
            const isActive = active === i;
            const isDimmed = active !== null && !isActive;

            return (
              <motion.div
                key={item.word}
                className="absolute cursor-pointer select-none"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ opacity: 0, scale: 0.4, filter: "blur(8px)" }}
                animate={
                  revealed
                    ? {
                        opacity: isDimmed ? 0.12 : 1,
                        scale: isActive ? 1.25 : 1,
                        filter: "blur(0px)",
                      }
                    : { opacity: 0, scale: 0.4, filter: "blur(8px)" }
                }
                transition={{
                  delay: revealed ? i * 0.04 : 0,
                  duration: 0.6,
                  opacity: { duration: 0.3 },
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <span
                  className={`font-serif font-light transition-colors duration-300 ${item.size} ${
                    isActive
                      ? "text-amber-300"
                      : "text-white/55"
                  }`}
                  style={
                    isActive
                      ? { textShadow: "0 0 24px rgba(251,191,36,0.5), 0 0 48px rgba(251,191,36,0.2)" }
                      : {}
                  }
                >
                  {item.word}
                </span>

                {/* Tooltip */}
                {isActive && (
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 mt-2 z-20 min-w-[160px]"
                    style={{ top: "100%" }}
                    initial={{ opacity: 0, y: -6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/90 border border-amber-400/20 backdrop-blur-md px-4 py-3 text-center shadow-2xl">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-1.5">Found in</p>
                      {item.books.map((b) => (
                        <p key={b} className="text-xs text-white/70 font-serif italic leading-snug">
                          {b}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/25" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
            {WORDS.length} themes across 7 books
          </p>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/25" />
        </motion.div>
      </div>
    </section>
  );
}
