import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

type Book = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  year: number;
  description: string;
};

const UNIVERSE_CATEGORIES = [
  {
    name: "Faith",
    caption: "Prayer, doubt, and what's left when certainty runs out.",
    bookIds: ["our-father"],
  },
  {
    name: "Wisdom",
    caption: "The cost of having it all, and what discipline actually buys.",
    bookIds: ["spirit-solomon"],
  },
  {
    name: "Black Boyhood",
    caption: "Identity, heritage, and the weight carried before it's understood.",
    bookIds: ["poems-black-boy", "black-boy-poems"],
  },
  {
    name: "Voice",
    caption: "What gets said once silence finally breaks.",
    bookIds: ["boys-raised-in-silence"],
  },
  {
    name: "Love",
    caption: "Longing, closure, and staying tender anyway.",
    bookIds: ["hopeless-romantic"],
  },
  {
    name: "Imagination",
    caption: "Play, friendship, and worlds built for the beginning of a life.",
    bookIds: ["adventures-kiminou-chua", "world-of-imagination"],
  },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function CategoryCluster({ category, books, index }: { category: (typeof UNIVERSE_CATEGORIES)[number]; books: Book[]; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.08} className="border border-white/8 bg-white/[0.015] hover:border-amber-400/20 transition-colors duration-500">
      <div className="p-7 md:p-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/50 mb-3">
          {String(index + 1).padStart(2, "0")} · {books.length} {books.length === 1 ? "Book" : "Books"}
        </p>
        <h2 className="font-serif text-3xl font-light text-white mb-3">{category.name}</h2>
        <p className="text-sm text-white/40 leading-relaxed mb-6">{category.caption}</p>
        <div className="space-y-3">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <span className="group flex items-center gap-4 border-t border-white/8 pt-3 first:border-t-0 first:pt-0 cursor-pointer">
                <span className="w-10 h-14 flex-shrink-0 overflow-hidden border border-white/10">
                  <img src={book.cover} alt={`${book.title} cover`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm text-white/80 group-hover:text-amber-200 transition-colors duration-300 leading-snug">
                    {book.title}
                  </span>
                  <span className="block text-xs text-white/30 mt-0.5">{book.year}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/15 group-hover:text-amber-400/60 transition-colors duration-300 flex-shrink-0" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function BookUniverse() {
  const [books, setBooks] = useState<Book[]>([]);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    fetch("/books.json").then((r) => r.json()).then(setBooks).catch(() => setBooks([]));
  }, []);

  const byId = new Map(books.map((b) => [b.id, b]));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Book Universe Map — Kiminou Knox",
    "url": `${SITE_URL}/books/universe`,
    "itemListElement": UNIVERSE_CATEGORIES.map((cat, i) => ({
      "@type": "ItemList",
      "position": i + 1,
      "name": cat.name,
      "itemListElement": cat.bookIds
        .map((id) => byId.get(id))
        .filter(Boolean)
        .map((book, j) => ({
          "@type": "ListItem",
          "position": j + 1,
          "name": book!.title,
          "url": `${SITE_URL}/books/${book!.id}`,
        })),
    })),
  };

  return (
    <>
      <Helmet>
        <title>Book Universe Map — Kiminou Knox</title>
        <meta
          name="description"
          content="Every book by Kiminou Knox grouped by the world it belongs to: Faith, Wisdom, Black Boyhood, Voice, Love, and Imagination."
        />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/books/universe`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Book Universe Map — Kiminou Knox" />
        <meta property="og:description" content="Every book grouped by the world it belongs to: Faith, Wisdom, Black Boyhood, Voice, Love, and Imagination." />
        <meta property="og:url" content={`${SITE_URL}/books/universe`} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Books", url: `${SITE_URL}/books` },
            { name: "Universe Map", url: `${SITE_URL}/books/universe` },
          ]))}
        </script>
        {books.length > 0 && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="relative pt-40 pb-20 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/4 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <Link href="/books" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/30 hover:text-amber-400/60 transition-colors duration-300 mb-8">
                <ArrowLeft className="w-3 h-3" /> All Books
              </Link>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Six Worlds</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6">
                Book <span className="italic text-amber-200/90">Universe</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Every book belongs to a world. This is the map — faith, wisdom, boyhood, voice, love, and imagination — and how they connect.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-28 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16">
            {books.length === 0 ? (
              <div className="flex items-center justify-center py-32">
                <motion.div className="w-10 h-10 border-2 border-amber-400/20 border-t-amber-400/60 rounded-full"
                  animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {UNIVERSE_CATEGORIES.map((category, i) => {
                  const categoryBooks = category.bookIds.map((id) => byId.get(id)).filter(Boolean) as Book[];
                  if (categoryBooks.length === 0) return null;
                  return <CategoryCluster key={category.name} category={category} books={categoryBooks} index={i} />;
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
