import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";

interface Poem {
  title: string;
  text: string;
  sourceBook: string;
  rating: string;
}

export default function PoemOfTheDay() {
  const [poem, setPoem] = useState<Poem>({
    title: "Rising",
    text: "Every morning I decide\nTo stand when I could fall\nTo speak when I could hide\nTo answer destiny's call\n\nNot perfect, not without fear\nBut present, here, awake\nEach day another year\nOf choices that I make",
    sourceBook: "Black Boy Poems",
    rating: "General",
  });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    async function loadPoem() {
      try {
        const response = await fetch("/poems.json");
        if (!response.ok) return;
        const poems: Poem[] = await response.json();
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
        setPoem(poems[dayOfYear % poems.length]);
      } catch {}
    }
    loadPoem();
  }, []);

  const lines = poem.text.split("\n");

  return (
    <section
      id="poem-of-the-day"
      className="relative py-28 md:py-40 overflow-hidden bg-black"
      data-testid="poem-of-the-day"
      ref={ref}
    >
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span
          className="absolute -top-10 -left-6 font-serif text-[28rem] font-bold leading-none text-white/[0.025] select-none"
          aria-hidden
        >
          "
        </span>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-3 font-medium">
            Poem of the Day
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white/90 italic">
            {poem.title}
          </h2>
          <div className="w-8 h-px bg-amber-400/40 mt-5" />
        </motion.div>

        <div className="space-y-1 mb-14">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: line === "" ? 0 : 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`font-serif text-lg md:text-2xl font-light leading-snug ${
                line === ""
                  ? "h-4"
                  : "text-white/75 hover:text-white/95 transition-colors duration-300 cursor-default"
              }`}
            >
              {line || " "}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-1">From</p>
            <p className="font-serif text-sm text-amber-300/80 italic">{poem.sourceBook}</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <Link href="/books">
            <span className="text-xs uppercase tracking-[0.25em] text-white/40 hover:text-amber-300 transition-colors duration-300 cursor-pointer">
              View All Books →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
