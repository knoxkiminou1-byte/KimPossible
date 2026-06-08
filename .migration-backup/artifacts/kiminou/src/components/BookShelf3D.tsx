import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type Book = {
  id: string; title: string; subtitle: string; year: number;
  cover: string; themes: string[]; description: string;
  samplePoems: { title: string; content: string }[];
  buyLinks: { amazon?: string | null; googleBooks?: string | null };
};

function ShelfBook({
  book,
  index,
  onClick,
}: {
  book: Book;
  index: number;
  onClick: (b: Book) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const seed = book.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const height = 190 + (seed % 28);
  const SPINE_W = 18;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ perspective: "900px", width: 110, height: 240 }}
    >
      <motion.div
        className="absolute bottom-0 left-0"
        style={{
          width: 110,
          height,
          transformStyle: "preserve-3d",
          cursor: "pointer",
          transformOrigin: "bottom center",
        }}
        animate={{
          rotateY: hovered ? 4 : -22,
          y: hovered ? -18 : 0,
          scale: hovered ? 1.04 : 1,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick(book)}
      >
        {/* Cover front */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Left spine shadow on cover */}
          <div
            className="absolute left-0 top-0 h-full pointer-events-none"
            style={{
              width: SPINE_W,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, transparent 100%)",
            }}
          />
          {/* Glare */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/8 via-transparent to-transparent" />
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-end justify-center pb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="px-3 py-1 bg-amber-400 text-black text-[9px] uppercase tracking-[0.2em] font-bold">
                Open
              </span>
            </motion.div>
          )}
        </div>

        {/* Spine face */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: SPINE_W,
            height: "100%",
            transformOrigin: "left center",
            transform: `rotateY(-90deg) translateX(-${SPINE_W}px)`,
            background:
              "linear-gradient(180deg, #2d1a09 0%, #1a0d04 50%, #2d1a09 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              writingMode: "vertical-lr",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              color: "#f59e0b",
              fontSize: 8,
              letterSpacing: 2,
              fontFamily: "serif",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              padding: "0 2px",
            }}
          >
            {book.title}
          </span>
        </div>

        {/* Page edges top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 6,
            transformOrigin: "top center",
            transform: "rotateX(-90deg)",
            background: "#ede5d8",
          }}
        />
      </motion.div>

      {/* Ground shadow */}
      <motion.div
        className="absolute bottom-0 left-2 right-2 rounded-full pointer-events-none"
        style={{ height: 6, background: "rgba(0,0,0,0.5)", filter: "blur(4px)" }}
        animate={{ opacity: hovered ? 0.2 : 0.7 }}
      />
    </div>
  );
}

function Shelf({
  books,
  onBookClick,
  delay = 0,
}: {
  books: Book[];
  onBookClick: (b: Book) => void;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative mb-2">
      {/* Books on shelf */}
      <motion.div
        className="relative z-10 flex items-end gap-1.5 px-8 pt-8"
        style={{ minHeight: 260 }}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay, duration: 0.7 }}
      >
        {books.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + i * 0.08, duration: 0.55 }}
          >
            <ShelfBook book={book} index={i} onClick={onBookClick} />
          </motion.div>
        ))}
      </motion.div>

      {/* Shelf plank */}
      <div className="relative z-20" style={{ height: 18 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #a0652a 0%, #6b4220 30%, #3d2210 70%, #2a1608 100%)",
            boxShadow:
              "0 6px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,200,100,0.12)",
          }}
        >
          {/* Wood grain */}
          {[18, 34, 52, 68, 84].map((pct) => (
            <div
              key={pct}
              className="absolute top-0 bottom-0 opacity-20"
              style={{
                left: `${pct}%`,
                width: 1,
                background: "rgba(0,0,0,0.6)",
                transform: "skewX(3deg)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Shelf shadow */}
      <div
        style={{
          height: 12,
          background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function BookShelf3D({
  books,
  onBookClick,
}: {
  books: Book[];
  onBookClick: (b: Book) => void;
}) {
  const shelves: Book[][] = [];
  for (let i = 0; i < books.length; i += 4) {
    shelves.push(books.slice(i, i + 4));
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d0704 0%, #060302 100%)",
        boxShadow:
          "inset 0 0 80px rgba(0,0,0,0.9), 0 0 0 2px rgba(90,55,20,0.25)",
        padding: "12px 24px 0",
      }}
    >
      {/* Side panels */}
      {[
        { side: "left", style: { left: 0, top: 0, bottom: 0, width: 28 } },
        { side: "right", style: { right: 0, top: 0, bottom: 0, width: 28 } },
      ].map(({ side, style }) => (
        <div
          key={side}
          className="absolute"
          style={{
            ...style,
            background:
              side === "left"
                ? "linear-gradient(90deg, #2a1608, #4a2810)"
                : "linear-gradient(270deg, #2a1608, #4a2810)",
            boxShadow:
              side === "left"
                ? "2px 0 12px rgba(0,0,0,0.5)"
                : "-2px 0 12px rgba(0,0,0,0.5)",
          }}
        />
      ))}

      {/* Ambient warm light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "70%",
          height: 160,
          background:
            "radial-gradient(ellipse at top, rgba(251,191,36,0.05) 0%, transparent 100%)",
        }}
      />

      {shelves.map((shelfBooks, i) => (
        <Shelf
          key={i}
          books={shelfBooks}
          onBookClick={onBookClick}
          delay={i * 0.18}
        />
      ))}

      {/* Bottom base */}
      <div
        style={{
          height: 14,
          background:
            "linear-gradient(180deg, #2a1608 0%, #1a0d04 50%, #0f0803 100%)",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}
