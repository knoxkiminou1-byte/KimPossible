import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const POEM_LINES = [
  ["Between", "right", "and", "easy,"],
  ["I", "chose", "comfort."],
  ["Between", "truth", "and", "peace,"],
  ["I", "chose", "silence."],
  ["Now", "I", "sit", "in", "the", "ruins"],
  ["of", "my", "careful", "compromises,"],
  ["wondering", "if", "wisdom"],
  ["was", "always", "meant", "to", "hurt", "this", "much."],
];

const POEM_TITLE = "The Weight of Choosing";
const POEM_SOURCE = "The Spirit of Solomon";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function PoemAssembler() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    if (inView && !assembled) {
      const t = setTimeout(() => setAssembled(true), 300);
      return () => clearTimeout(t);
    }
  }, [inView, assembled]);

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Ambient light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-amber-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-amber-400/50 mb-3 font-medium">
            A Poem in Motion
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white/90 italic">
            {POEM_TITLE}
          </h2>
          <p className="text-xs text-white/25 mt-2 tracking-[0.2em] uppercase">
            from {POEM_SOURCE}
          </p>
          <div className="mt-6 w-10 h-px bg-amber-400/30 mx-auto" />
        </motion.div>

        {/* Poem */}
        <div className="space-y-3">
          {POEM_LINES.map((line, lineIdx) => (
            <div key={lineIdx} className="flex flex-wrap gap-x-2.5 gap-y-1 justify-center">
              {line.map((word, wordIdx) => {
                const globalIdx = wordIndex++;
                const seed = globalIdx * 37 + lineIdx * 13;
                const fromX = (seededRandom(seed) - 0.5) * 800;
                const fromY = (seededRandom(seed + 1) - 0.5) * 400;
                const fromRotate = (seededRandom(seed + 2) - 0.5) * 60;
                const delay = globalIdx * 0.055 + lineIdx * 0.04;

                return (
                  <motion.span
                    key={`${lineIdx}-${wordIdx}`}
                    className="font-serif text-xl md:text-2xl font-light text-white/85 inline-block"
                    initial={{
                      x: fromX,
                      y: fromY,
                      rotate: fromRotate,
                      opacity: 0,
                      scale: 0.5,
                      filter: "blur(8px)",
                    }}
                    animate={
                      assembled
                        ? {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                          }
                        : {}
                    }
                    transition={{
                      type: "spring",
                      stiffness: 140,
                      damping: 16,
                      delay,
                      opacity: { duration: 0.3, delay },
                      filter: { duration: 0.4, delay },
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Trailing decoration */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-14"
          initial={{ opacity: 0 }}
          animate={assembled ? { opacity: 1 } : {}}
          transition={{ delay: 2.4 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/25" />
          <div className="w-1 h-1 rounded-full bg-amber-400/40" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/25" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
