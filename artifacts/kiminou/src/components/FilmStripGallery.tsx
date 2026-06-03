import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  { src: "/photos/athletic-pose.jpg", title: "Court Dominance", category: "Athlete" },
  { src: "/photos/author-reading-book.jpg", title: "Literary Creation", category: "Author" },
  { src: "/photos/entrepreneur-style.jpg", title: "Brand Vision", category: "Entrepreneur" },
  { src: "/photos/creative-designer.jpg", title: "Visual Storytelling", category: "Director" },
  { src: "/photos/author-portrait.jpg", title: "The Poet", category: "Author" },
  { src: "/photos/athletic-pose.jpg", title: "Athletic Excellence", category: "Athlete" },
  { src: "/photos/youth-leader-portrait.jpg", title: "Youth Leader", category: "Community" },
];

const PERFORATION_COUNT = 9;

function Perforations() {
  return (
    <div className="flex items-center justify-around px-2" style={{ height: 20 }}>
      {[...Array(PERFORATION_COUNT)].map((_, i) => (
        <div
          key={i}
          className="rounded-sm"
          style={{ width: 14, height: 10, background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
        />
      ))}
    </div>
  );
}

export default function FilmStripGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const CARD_W = 280;
  const GAP = 12;
  const totalW = IMAGES.length * (CARD_W + GAP);
  const dragLeft =
    typeof window === "undefined"
      ? 0
      : Math.min(0, -(totalW - window.innerWidth + 40));

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden bg-black"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-amber-400/50 mb-3 font-medium">
            Visual Journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
            The Archive
          </h2>
        </motion.div>
      </div>

      {/* Film strip container */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Film strip background */}
        <div
          className="relative"
          style={{ background: "linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)", paddingBottom: 8 }}
        >
          <Perforations />

          {/* Draggable strip */}
          <div ref={constraintsRef} className="overflow-hidden relative" style={{ height: 300 }}>
            <motion.div
              className="flex items-center gap-3 absolute left-0 top-0 h-full"
              style={{ width: totalW, paddingLeft: 20, paddingRight: 20, cursor: "grab" }}
              drag="x"
              dragConstraints={{ left: dragLeft, right: 0 }}
              dragElastic={0.08}
              whileDrag={{ cursor: "grabbing" }}
            >
              {IMAGES.map((img, i) => (
                <motion.div
                  key={i}
                  className="relative flex-shrink-0 overflow-hidden"
                  style={{ width: CARD_W, height: 260, borderRadius: 2 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-amber-400/70 mb-1">
                      {img.category}
                    </p>
                    <p className="text-sm font-serif font-light text-white">
                      {img.title}
                    </p>
                  </div>
                  {/* Frame number */}
                  <div className="absolute top-3 right-3 text-[9px] text-white/20 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Perforations />
        </div>
      </motion.div>

      {/* Drag hint */}
      <motion.p
        className="text-center text-[9px] uppercase tracking-[0.3em] text-white/20 mt-5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        ← drag to explore →
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
            <button
              onClick={() => setLightbox((p) => (p! > 0 ? p! - 1 : IMAGES.length - 1))}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-amber-400 transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <motion.img
              key={lightbox}
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].title}
              className="max-w-[80vw] max-h-[80vh] object-contain"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            />
            <button
              onClick={() => setLightbox((p) => (p! < IMAGES.length - 1 ? p! + 1 : 0))}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-amber-400 transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-1">
                {IMAGES[lightbox].category}
              </p>
              <p className="font-serif text-xl text-white">{IMAGES[lightbox].title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
