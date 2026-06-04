import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "who-is-kiminou", label: "Who Is Kiminou" },
  { id: "section-stats", label: "By The Numbers" },
  { id: "section-poem", label: "Poem of the Day" },
  { id: "section-poem-assembler", label: "The Poem" },
  { id: "section-featured", label: "Featured Work" },
  { id: "section-quotes", label: "Words" },
  { id: "section-books", label: "Books" },
  { id: "section-wordcloud", label: "Themes" },
  { id: "section-gallery", label: "Gallery" },
  { id: "section-press", label: "Press" },
  { id: "section-testimonials", label: "Testimonials" },
];

export default function SectionDotNav() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);

      const viewportMiddle = window.scrollY + window.innerHeight * 0.4;

      let closest = 0;
      let closestDist = Infinity;

      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const dist = Math.abs(top - viewportMiddle);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActive(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 12 }}
      transition={{ duration: 0.4 }}
    >
      {SECTIONS.map((s, i) => {
        const isActive = i === active;
        const isHovered = i === hoveredIdx;

        return (
          <div
            key={s.id}
            className="relative flex items-center justify-end gap-2"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => scrollTo(s.id)}
            style={{ cursor: "pointer" }}
          >
            {/* Label */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute right-6 whitespace-nowrap"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] bg-black/90 border border-white/10 text-white/60 backdrop-blur-sm">
                    {s.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              className="rounded-full flex-shrink-0"
              animate={{
                width: isActive ? 10 : isHovered ? 7 : 5,
                height: isActive ? 10 : isHovered ? 7 : 5,
                background: isActive
                  ? "#f59e0b"
                  : isHovered
                  ? "rgba(251,191,36,0.6)"
                  : "rgba(255,255,255,0.2)",
                boxShadow: isActive ? "0 0 8px rgba(251,191,36,0.7)" : "none",
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        );
      })}
    </motion.div>
  );
}
