import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = [
  "I didn't start writing to be published.",
  "I started writing because nothing else told the truth.",
  "Ten published works. One question I keep asking:",
  "What does it cost to be honest in a world that rewards performance?",
  "My mother raised me to speak what I know.",
  "My lineage taught me that silence is its own inheritance.",
  "I write from both.",
  "Faith. Doubt. Reckoning. Basketball. Love. The court and the page are the same discipline:",
  "show up, do the work, refuse to perform for anyone who isn't ready for the real thing.",
  "This is who I am. This is where it comes from.",
  "Every book is a letter I couldn't deliver any other way.",
];

function TypewriterLine({ text, progress, threshold }: { text: string; progress: number; threshold: number }) {
  const visible = progress >= threshold;
  const localProgress = visible ? Math.min(1, (progress - threshold) / 0.06) : 0;
  const charCount = Math.floor(localProgress * text.length);
  const displayed = text.slice(0, charCount);
  const cursorVisible = localProgress < 0.99;

  return (
    <div className="min-h-[1.6em]">
      <span className="font-serif text-lg md:text-xl text-white/80 leading-relaxed">
        {displayed}
        {cursorVisible && charCount > 0 && (
          <span className="inline-block w-0.5 h-5 bg-amber-400/70 ml-0.5 align-middle animate-pulse" />
        )}
      </span>
    </div>
  );
}

export default function TypewriterConfessional() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.1"],
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  const thresholds = LINES.map((_, i) => i / LINES.length);

  return (
    <div ref={sectionRef} className="relative min-h-[220vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(251,191,36,0.5) 79px, rgba(251,191,36,0.5) 80px)",
        }} />

        <div className="relative z-10 max-w-3xl mx-auto px-8 lg:px-12 py-20 w-full">
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }}
          >
            <p className="text-[9px] uppercase tracking-[0.55em] text-amber-400/40 mb-8 font-medium">Confessional</p>

            <div className="space-y-4 mb-8">
              {LINES.map((line, i) => (
                <TypewriterLine
                  key={i}
                  text={line}
                  progress={progress}
                  threshold={thresholds[i]}
                />
              ))}
            </div>

            {progress > 0.88 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-10 flex items-center gap-4"
              >
                <div className="w-10 h-px bg-amber-400/40" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-amber-400/50 font-medium">
                  Kiminou Knox · Bay Area · 2025
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
