import { useState } from "react";
import { motion } from "framer-motion";
import booksData from "@/content/books.json";

type Book = {
  id: string;
  title: string;
  year: number;
  isbn?: string | null;
  themes: string[];
  buyLinks: {
    amazon?: string | null;
    googleBooks?: string | null;
    bookshop?: string | null;
    bn?: string | null;
  };
};

const books = booksData as Book[];

function ProvenanceCard({ book, lot }: { book: Book; lot: string }) {
  const [acquiring, setAcquiring] = useState(false);
  const buyHref =
    book.buyLinks.amazon || book.buyLinks.googleBooks || book.buyLinks.bookshop || "";

  const provenance = [
    `Published ${book.year}`,
    book.isbn ? `ISBN ${book.isbn}` : null,
    book.themes.join(" · "),
  ]
    .filter(Boolean)
    .join(" · ");

  const handleAcquire = () => {
    setAcquiring(true);
    window.setTimeout(() => {
      setAcquiring(false);
      if (buyHref) window.open(buyHref, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <div className="group relative border border-amber-400/15 bg-black/30 p-7 transition-colors duration-500 hover:border-amber-400/35">
      {/* white-glove hand */}
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="pointer-events-none absolute right-5 top-5 opacity-0 transition-opacity group-hover:opacity-100"
        initial={false}
        whileHover={{ y: -6, rotate: -8 }}
      >
        <path
          d="M16 30 V16 a3 3 0 016 0 v10 m0 -12 a3 3 0 016 0 v12 m0 -10 a3 3 0 016 0 v12 a8 8 0 01-8 8 h-4 a8 8 0 01-8-8 v-4"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </motion.svg>

      <p className="mb-4 font-serif text-[10px] uppercase tracking-[0.3em] text-amber-400/30">
        LOT {lot}
      </p>
      <h3 className="mb-3 font-serif text-2xl font-light leading-tight text-white">
        {book.title}
      </h3>
      <p className="mb-4 text-xs leading-relaxed text-white/40">{provenance}</p>
      <p className="mb-6 text-[10px] uppercase tracking-[0.25em] text-white/25">
        Condition: As New
      </p>

      {buyHref && (
        <button
          type="button"
          onClick={handleAcquire}
          className="relative inline-flex items-center gap-2 border border-amber-400/25 px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-amber-400/80 transition-colors hover:bg-amber-400 hover:text-black"
        >
          <motion.span
            animate={acquiring ? { y: [-2, -10, -2] } : { y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            ▲
          </motion.span>
          Acquire
        </button>
      )}
    </div>
  );
}

export default function AuctionProvenance() {
  return (
    <section className="relative overflow-hidden bg-[#080807] py-28">
      {/* drifting spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 20%, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
        }}
        animate={{ x: ["20%", "70%", "20%"] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <p className="mb-3 font-serif text-[11px] uppercase tracking-[0.4em] text-amber-400/20">
            From the Collection Of
          </p>
          <h2 className="font-serif text-4xl font-light text-white md:text-5xl">
            Kiminou Knox
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book, i) => (
            <ProvenanceCard
              key={book.id}
              book={book}
              lot={String(i + 1).padStart(3, "0")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
