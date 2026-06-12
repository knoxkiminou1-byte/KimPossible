import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, BookOpen } from "lucide-react";

type Poem = { title: string; content: string };

interface Book {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  description: string;
  year: number;
  samplePoems: Poem[];
  buyLinks: {
    amazon?: string | null;
    googleBooks?: string | null;
    bookshop?: string | null;
  };
}

interface Props {
  book: Book;
  onClose: () => void;
}

export default function OpenBookOverlay({ book, onClose }: Props) {
  const [showBuy, setShowBuy] = useState(false);
  const buyLink =
    book.buyLinks.amazon ||
    book.buyLinks.googleBooks ||
    book.buyLinks.bookshop ||
    null;

  const firstPoem = book.samplePoems?.[0];

  useEffect(() => {
    const t = setTimeout(() => setShowBuy(true), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/92 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/50 transition-all rounded-full"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Label */}
      <motion.p
        className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-amber-400/50 font-medium"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        First Page Preview
      </motion.p>

      {/* Open Book */}
      <motion.div
        className="relative z-10 w-full max-w-4xl flex"
        style={{ perspective: "2000px" }}
        initial={{ opacity: 0, scale: 0.88, rotateX: 4 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.92, rotateX: 4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LEFT PAGE — Cover */}
        <div
          className="hidden md:block w-[38%] shrink-0 relative overflow-hidden rounded-l-sm"
          style={{
            boxShadow: "8px 0 40px rgba(0,0,0,0.7), -4px 0 12px rgba(0,0,0,0.4)",
            transformOrigin: "right center",
          }}
        >
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
            style={{ minHeight: 520 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />

          {/* Spine shadow (right edge) */}
          <div
            className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
            }}
          />

          {/* Top gloss */}
          <div
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.07) 0%, transparent 100%)",
            }}
          />

          {/* Year badge */}
          <div className="absolute top-4 left-4">
            <span className="px-2.5 py-1 bg-amber-400 text-black text-[10px] font-semibold uppercase tracking-[0.2em]">
              {book.year}
            </span>
          </div>
        </div>

        {/* Spine */}
        <div
          className="hidden md:block w-3 shrink-0 self-stretch"
          style={{
            background:
              "linear-gradient(to right, #1a1008 0%, #2d1f0a 30%, #1a1008 100%)",
            boxShadow: "inset -2px 0 6px rgba(0,0,0,0.4), inset 2px 0 6px rgba(0,0,0,0.4)",
          }}
        />

        {/* RIGHT PAGE — Paper */}
        <div
          className="flex-1 relative overflow-hidden rounded-r-sm flex flex-col"
          style={{
            background: "linear-gradient(135deg, #faf6ee 0%, #f0e8d4 60%, #e8ddc4 100%)",
            minHeight: 520,
            boxShadow: "4px 0 24px rgba(0,0,0,0.4), inset -4px 0 20px rgba(180,140,80,0.1)",
          }}
        >
          {/* Ruled lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 27px, #b89a60 27px, #b89a60 28px)",
              backgroundPosition: "0 52px",
            }}
          />
          {/* Left margin */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: 52, width: 1, background: "rgba(180,130,80,0.28)" }}
          />
          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Header bar */}
          <div className="relative z-10 flex items-center justify-between px-8 pt-5 pb-3 border-b border-amber-900/10">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" style={{ color: "rgba(120,80,40,0.45)" }} />
              <span
                className="text-[9px] uppercase tracking-[0.35em] font-medium"
                style={{ color: "rgba(120,80,40,0.45)" }}
              >
                {book.title}
              </span>
            </div>
            <span className="font-serif italic text-[11px]" style={{ color: "rgba(120,80,40,0.35)" }}>
              i
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 px-10 py-6 overflow-y-auto">
            {/* Book title */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <h2
                className="font-serif text-2xl md:text-3xl font-semibold leading-snug mb-1"
                style={{ color: "rgba(45,25,8,0.9)" }}
              >
                {book.title}
              </h2>
              <p
                className="font-serif italic text-sm mb-5"
                style={{ color: "rgba(100,65,25,0.6)" }}
              >
                {book.subtitle}
              </p>
              <div
                className="w-10 h-px mb-5"
                style={{ background: "rgba(180,130,80,0.4)" }}
              />
            </motion.div>

            {/* First poem */}
            {firstPoem ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.3em] font-medium mb-3"
                  style={{ color: "rgba(160,110,50,0.6)" }}
                >
                  {firstPoem.title}
                </p>
                <div
                  className="font-serif text-sm leading-loose whitespace-pre-line"
                  style={{ color: "rgba(50,28,8,0.75)", lineHeight: "2" }}
                >
                  {firstPoem.content.slice(0, 320)}
                  {firstPoem.content.length > 320 && (
                    <span style={{ color: "rgba(50,28,8,0.35)" }}>…</span>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <p
                  className="font-serif text-sm leading-relaxed"
                  style={{ color: "rgba(50,28,8,0.7)", lineHeight: "2" }}
                >
                  {book.description}
                </p>
              </motion.div>
            )}
          </div>

          {/* Buy Now — appears after 2.8s */}
          <AnimatePresence>
            {showBuy && (
              <motion.div
                className="relative z-10 px-10 pb-7 pt-4 border-t border-amber-900/10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-[9px] uppercase tracking-[0.3em] mb-3"
                  style={{ color: "rgba(120,80,40,0.45)" }}
                >
                  Continue reading
                </p>
                {buyLink ? (
                  <motion.a
                    href={buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 font-semibold text-xs uppercase tracking-[0.25em] transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #d4a535 0%, #f5c842 50%, #d4a535 100%)",
                      color: "#1a0f00",
                      boxShadow: "0 4px 20px rgba(212,165,53,0.4), 0 2px 8px rgba(212,165,53,0.2)",
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 32px rgba(212,165,53,0.6), 0 4px 16px rgba(212,165,53,0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Get the Full Book
                  </motion.a>
                ) : (
                  <p
                    className="text-center text-xs italic"
                    style={{ color: "rgba(120,80,40,0.5)" }}
                  >
                    Coming soon to major retailers
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Page curl shadow (bottom-right) */}
          <div
            className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at bottom right, rgba(180,140,80,0.15) 0%, transparent 70%)",
            }}
          />
        </div>
      </motion.div>

      {/* Mobile — single panel */}
      <style>{`
        @media (max-width: 767px) {
          .open-book-mobile-note {
            display: block;
          }
        }
      `}</style>
    </motion.div>
  );
}
