import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const CHAPTERS = [
  {
    id: "author",
    label: "Author",
    num: "01",
    headline: "The Black Boy Lie Universe",
    subline: "10 Original Works · 7 Remastered Editions",
    body: "Poetry that doesn't perform. Each collection is a confession — on faith, silence, love, identity, and what it costs to grow up Black, honest, and unafraid. From Bay Area corners to Waterstones London.",
    cta: { label: "Browse the Books", href: "/books" },
    accent: "from-amber-400 to-yellow-300",
    stat: "17",
    statLabel: "Catalog Editions",
  },
  {
    id: "athlete",
    label: "Athlete",
    num: "02",
    headline: "Elite on the Court",
    subline: "NCAA Eligible · 6'7\" · 235 lbs",
    body: "Forward. Center. Cristo Rey De La Salle. NCAA registered. The same discipline that makes a book makes a player — complete focus, no excuses, maximum output. Basketball is another language for the same story.",
    cta: { label: "See the Stats", href: "/sports" },
    accent: "from-blue-400 to-cyan-300",
    stat: "6'7\"",
    statLabel: "Forward / Center",
  },
  {
    id: "entrepreneur",
    label: "Entrepreneur",
    num: "03",
    headline: "Builder by Design",
    subline: "AAFC Builders · Digital Infrastructure",
    body: "Architecture before aesthetics. From web systems to creative enterprise — the same mindset that fills a page fills a business plan. Building things that outlast the moment they were made in.",
    cta: { label: "View Portfolio", href: "/portfolio" },
    accent: "from-emerald-400 to-teal-300",
    stat: "∞",
    statLabel: "Building",
  },
  {
    id: "faith",
    label: "Faith",
    num: "04",
    headline: "Spirit of Solomon",
    subline: "Faith · Doubt · Reckoning",
    body: "The work is spiritual before it's literary. Every book wrestles with something real — Our Father? is a question, not a title. The Spirit of Solomon is an honest look at the cost of wisdom. Faith is the through line.",
    cta: { label: "Read the Essays", href: "/blog" },
    accent: "from-purple-400 to-violet-300",
    stat: "∞",
    statLabel: "The Through Line",
  },
];

function ChapterPanel({ chapter, active }: { chapter: typeof CHAPTERS[0]; active: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <div
      ref={ref}
      className="flex-shrink-0 w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ scrollSnapAlign: "center" }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${chapter.accent} opacity-[0.03]`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-start justify-between mb-8">
            <span className={`font-serif text-8xl md:text-[9rem] font-light leading-none text-transparent bg-clip-text bg-gradient-to-br ${chapter.accent} opacity-20`}>
              {chapter.num}
            </span>
            <div className="text-right">
              <p className={`text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${chapter.accent} opacity-80`}>
                {chapter.stat}
              </p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/25 mt-1">{chapter.statLabel}</p>
            </div>
          </div>

          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-3 font-medium">{chapter.subline}</p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-white leading-tight mb-4">{chapter.headline}</h2>
          <div className={`w-10 h-px bg-gradient-to-r ${chapter.accent} mb-6 opacity-60`} />
          <p className="text-white/50 leading-relaxed text-base mb-8 max-w-lg">{chapter.body}</p>

          <Link href={chapter.cta.href}>
            <motion.span
              className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r ${chapter.accent} cursor-pointer`}
              whileHover={{ x: 6 }}
            >
              {chapter.cta.label} →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function ChapterScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const goTo = (i: number) => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    containerRef.current.scrollTo({ left: i * w, behavior: "smooth" });
    setActiveIndex(i);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveIndex(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative bg-black border-t border-white/5" style={{ height: "100svh" }}>
      {/* Section label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="w-8 h-px bg-amber-400/30" />
        <span className="text-[9px] uppercase tracking-[0.5em] text-amber-400/40 font-medium">
          Chapters
        </span>
        <div className="w-8 h-px bg-amber-400/30" />
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="w-full h-full flex overflow-x-auto overflow-y-hidden"
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {CHAPTERS.map((chapter, i) => (
          <ChapterPanel key={chapter.id} chapter={chapter} active={activeIndex === i} />
        ))}
      </div>

      {/* Nav dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {CHAPTERS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => goTo(i)}
            className="group flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ width: activeIndex === i ? 32 : 8, opacity: activeIndex === i ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              className="h-px bg-amber-400 rounded-full"
            />
            <span className={`text-[8px] uppercase tracking-[0.3em] transition-colors duration-300 ${
              activeIndex === i ? "text-amber-400/80" : "text-white/20 group-hover:text-white/40"
            }`}>
              {c.label}
            </span>
          </button>
        ))}
      </div>

      {/* Arrow hints */}
      <AnimatePresence>
        {activeIndex < CHAPTERS.length - 1 && (
          <motion.button
            key="next"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 border border-white/10 hover:border-amber-400/30 text-white/25 hover:text-amber-400/60 transition-all duration-300"
          >
            →
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeIndex > 0 && (
          <motion.button
            key="prev"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 border border-white/10 hover:border-amber-400/30 text-white/25 hover:text-amber-400/60 transition-all duration-300"
          >
            ←
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
