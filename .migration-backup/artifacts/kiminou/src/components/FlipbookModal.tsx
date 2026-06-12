import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Poem = { title: string; content: string };

interface FlipbookModalProps {
  book: {
    title: string;
    subtitle: string;
    cover: string;
    samplePoems: Poem[];
  };
  onClose: () => void;
}

export default function FlipbookModal({ book, onClose }: FlipbookModalProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const pages = [
    { type: "cover" as const },
    ...book.samplePoems.slice(0, 3).map((poem, i) => ({
      type: "poem" as const,
      poem,
      pageNum: i + 1,
    })),
  ];

  const totalPages = pages.length;

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= totalPages) return;
    setDirection(idx > page ? 1 : -1);
    setPage(idx);
  };

  const pageVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      rotateY: dir > 0 ? 25 : -25,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      rotateY: dir > 0 ? -25 : 25,
      opacity: 0,
      scale: 0.92,
      transition: {
        duration: 0.35,
        ease: [0.55, 0.06, 0.68, 0.19] as const,
      },
    }),
  };

  const currentPage = pages[page];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/60">
              {page === 0 ? "Cover" : `Poem ${page} of ${totalPages - 1}`}
            </p>
            <p className="font-serif text-white/40 text-xs italic mt-0.5 truncate max-w-[220px]">
              {book.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Book */}
        <div
          className="relative w-full"
          style={{ height: 460, perspective: "1400px" }}
        >
          {/* Spine shadow */}
          <div className="absolute left-0 top-2 bottom-2 w-4 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.6), transparent)" }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {currentPage.type === "cover" ? (
                <CoverPage book={book} />
              ) : (
                <PoemPage
                  poem={currentPage.poem}
                  pageNum={currentPage.pageNum}
                  bookTitle={book.title}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Page edge stacking effect (right side) */}
          <div className="absolute right-0 top-2 bottom-2 flex flex-col justify-center gap-px pointer-events-none z-0">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-white/5 border-l border-white/5"
                style={{ transform: `translateX(${i * 1.5}px)` }}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/50 hover:border-amber-400/50 hover:text-amber-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === page
                    ? "w-6 h-1.5 bg-amber-400"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages - 1}
            className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/50 hover:border-amber-400/50 hover:text-amber-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {page === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-white/25 tracking-wide"
          >
            Tap ❯ to flip through sample poems
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

function CoverPage({ book }: { book: FlipbookModalProps["book"] }) {
  return (
    <div className="w-full h-full rounded-r-sm overflow-hidden relative shadow-2xl"
      style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.5), -4px 0 12px rgba(0,0,0,0.3)" }}
    >
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/80 mb-2 font-medium">
          Preview Edition
        </p>
        <p className="font-serif text-white text-xl font-light leading-snug mb-1">
          {book.title}
        </p>
        <p className="text-white/45 text-xs italic">{book.subtitle}</p>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-2"
        style={{ background: "linear-gradient(to left, rgba(255,255,255,0.06), transparent)" }}
      />
    </div>
  );
}

function PoemPage({
  poem,
  pageNum,
  bookTitle,
}: {
  poem: Poem;
  pageNum: number;
  bookTitle: string;
}) {
  return (
    <div
      className="w-full h-full rounded-r-sm overflow-hidden flex flex-col relative"
      style={{
        background: "linear-gradient(135deg, #faf6ef 0%, #f2ead8 100%)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.5), -4px 0 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Ruled lines */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, #c4a97a 27px, #c4a97a 28px)",
          backgroundPosition: "0 44px",
        }}
      />
      {/* Left margin line */}
      <div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{ left: 44, background: "rgba(210,160,120,0.35)" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-7 pt-5 pb-3 relative z-10 border-b border-amber-900/10">
        <span
          className="text-[9px] uppercase tracking-[0.3em] font-medium"
          style={{ color: "rgba(120,80,40,0.45)" }}
        >
          {bookTitle}
        </span>
        <span
          className="font-serif italic text-[11px]"
          style={{ color: "rgba(120,80,40,0.35)" }}
        >
          {pageNum}
        </span>
      </div>

      {/* Poem */}
      <div className="flex-1 px-8 py-5 overflow-y-auto relative z-10">
        <h3
          className="font-serif text-lg font-semibold mb-4 tracking-wide"
          style={{ color: "rgba(60,35,10,0.85)" }}
        >
          {poem.title}
        </h3>
        <div
          className="font-serif text-sm leading-relaxed whitespace-pre-line"
          style={{ color: "rgba(60,35,10,0.72)", lineHeight: "1.85" }}
        >
          {poem.content}
        </div>
      </div>

      {/* Bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-5 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(180,130,80,0.08), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-2 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(255,255,255,0.08), transparent)" }}
      />
    </div>
  );
}
