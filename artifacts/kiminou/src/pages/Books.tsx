import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { motion, useInView, AnimatePresence, useSpring } from "framer-motion";
import CMYKReveal from "@/components/LuxuryFX/CMYKReveal";

const VinylRecord = lazy(() => import("@/components/LuxuryFX/VinylRecord"));
const PageHero3D = lazy(() => import("@/components/LuxuryFX/PageHero3D"));
import FreeChapterCapture from "@/components/FreeChapterCapture";
import GlitchHeading from "@/components/LuxuryFX/GlitchHeading";
import GoldUnmask from "@/components/LuxuryFX/GoldUnmask";
import ScrambleText from "@/components/LuxuryFX/ScrambleText";
import { ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoemModal from "@/components/PDFModal";
import OpenBookOverlay from "@/components/OpenBookOverlay";
import BookShelf3D from "@/components/BookShelf3D";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { CANONICAL_BOOK_TITLES, CATALOG_EDITION_NOTE } from "@/content/authorProfile";
import { useShouldReduceEffects } from "@/hooks/useReducedMotion";

type Poem = { title: string; content: string };
// Everything past `id` is optional on purpose: books.json is generated content
// and entries legitimately ship without sample poems or buy links. Treating
// those as required is what blanked this whole page — a single missing field
// threw during render and took the entire app down with it.
type Book = {
  id: string; title: string; subtitle?: string; year?: number;
  isbn?: string | null; edition?: string; numberOfPages?: number; cover?: string; samplePoems?: Poem[];
  themes?: string[]; description?: string; featured?: boolean;
  buyLinks?: { amazon?: string | null; googleBooks?: string | null; bookshop?: string | null; bn?: string | null };
};

function BookCard({ book, index, onSample, onOpenBook }: { book: Book; index: number; onSample: (b: Book) => void; onOpenBook: (b: Book) => void }) {
  const samplePoems = book.samplePoems ?? [];
  const themes = book.themes ?? [];
  const buyLinks = book.buyLinks ?? {};
  const cover = book.cover || "/og-image.png";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const springX = useSpring(0, { stiffness: 280, damping: 28 });
  const springY = useSpring(0, { stiffness: 280, damping: 28 });

  const onMouseMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    springX.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 6);
    springY.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * -6);
  };

  return (
    <motion.article
      ref={ref}
      key={book.id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { springX.set(0); springY.set(0); }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformPerspective: 900, transformStyle: "preserve-3d", rotateX: springX, rotateY: springY }}
      className="group flex flex-col"
    >
      <div
        className="relative mb-5 cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => onOpenBook(book)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenBook(book); } }}
        role="button"
        tabIndex={0}
        aria-label={`Preview ${book.title}`}
      >
        <motion.div
          className="relative aspect-[3/4] overflow-hidden bg-black"
          initial={{ rotateY: -8 }}
          whileHover={{ rotateY: 4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {index < 3 ? (
            <CMYKReveal>
              <img src={cover} alt={`${book.title} cover`}
                loading={index < 4 ? "eager" : "lazy"} decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </CMYKReveal>
          ) : (
            <img src={cover} alt={`${book.title} cover`}
              loading={index < 4 ? "eager" : "lazy"} decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-3 py-1.5 bg-black/70 border border-amber-400/40 text-amber-400 text-[10px] uppercase tracking-[0.25em] font-medium backdrop-blur-sm">
              Preview
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
          {book.featured && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 bg-amber-400 text-black text-xs font-semibold uppercase tracking-[0.15em]">Featured</span>
            </div>
          )}
        </motion.div>
        <div className="absolute -bottom-2 left-4 right-4 h-4 bg-black/30 blur-md rounded-full" />
      </div>

      <div className="flex flex-col flex-1">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400/60 mb-2">
          {book.year}{book.edition ? ` · ${book.edition}` : ""}{book.isbn ? ` · ISBN ${book.isbn}` : ""}
        </p>
        <h3 className="font-serif text-xl font-light text-white mb-1 group-hover:text-amber-100 transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-sm text-white/40 mb-3 italic">{book.subtitle}</p>
        <p className="text-sm text-white/40 leading-relaxed line-clamp-3 mb-4 flex-1">{book.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {themes.map(t => (
            <span key={t} className="px-2.5 py-1 border border-white/10 text-xs text-white/30 rounded-full tracking-wide">{t}</span>
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            {samplePoems.length > 0 && (
              <button onClick={() => onSample(book)}
                className="py-2.5 border border-white/15 text-xs uppercase tracking-[0.15em] text-white/50 hover:border-amber-400/40 hover:text-amber-300 transition-all duration-300">
                Read Sample
              </button>
            )}
            <Link href={`/books/${book.id}`}>
              <span className={`block py-2.5 bg-amber-400/10 border border-amber-400/20 text-xs uppercase tracking-[0.15em] text-amber-400/80 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300 text-center cursor-pointer ${samplePoems.length === 0 ? "col-span-2" : ""}`}>
                View Details
              </span>
            </Link>
          </div>
          {(buyLinks.amazon || buyLinks.googleBooks) && (
            <a href={buyLinks.amazon || buyLinks.googleBooks || ""}
              target="_blank" rel="noopener noreferrer external"
              className="flex items-center justify-center gap-2 py-2.5 border border-white/8 text-xs uppercase tracking-[0.15em] text-white/35 hover:border-amber-400/30 hover:text-amber-400/70 transition-all duration-300">
              <ExternalLink className="w-3.5 h-3.5" /> Buy Now
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState<{ id: string; poems: Poem[]; title: string } | null>(null);
  const [openBook, setOpenBook] = useState<Book | null>(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const reduceEffects = useShouldReduceEffects();

  useEffect(() => {
    // Guard the shape too — a bad deploy can serve the SPA shell for this path,
    // and `books.map` on a non-array would blank the page.
    fetch("/books.json")
      .then(r => r.json())
      .then(data => setBooks(Array.isArray(data) ? data.filter(b => b && b.id) : []))
      .catch(() => setBooks([]));
  }, []);

  return (
    <>
      <Helmet>
        <title>Books by Kiminou Knox — Poetry Collections & Published Works</title>
        <meta name="description" content="Explore the ten-book bibliography of Kiminou Knox, with original and remastered editions across poetry, faith, identity, love, Black boyhood, family, imagination, healing, and legacy." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/books" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Books by Kiminou Knox — Poetry Collections & Published Works" />
        <meta property="og:description" content="The canonical ten-book bibliography of Kiminou Knox, plus verified original and remastered formats." />
        <meta property="og:url" content="https://www.kiminouknox.com/books" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Books", url: `${SITE_URL}/books` }]))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Books by Kiminou Knox",
            "url": "https://www.kiminouknox.com/books",
            "numberOfItems": CANONICAL_BOOK_TITLES.length,
            "author": { "@id": "https://www.kiminouknox.com/#person" },
            "itemListElement": CANONICAL_BOOK_TITLES.map((title, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": title
            }))
          })}
        </script>
      </Helmet>
      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">
        {/* ── HERO ── */}
        <section className="relative pt-40 pb-20 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-amber-500/4 rounded-full blur-[140px]" />
          </div>
          {/* Foreground 3D hero — sits above the glow, behind the text (z-10). */}
          <Suspense fallback={null}>
            <PageHero3D variant="books" />
          </Suspense>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Ten Published Books · Original &amp; Remastered Editions</p>
              <GoldUnmask delay={0.1} className="inline-block mb-6">
                <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight">
                  <ScrambleText text="Published" className="block" delay={0.3} />
                  <GlitchHeading as="span" className="italic text-amber-200/90">Works</GlitchHeading>
                </h1>
              </GoldUnmask>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Real covers, real links, sample poems from each collection: faith, identity, love, and the Black experience.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 border border-amber-400/20 bg-amber-400/4 px-5 py-3 text-sm text-white/50">
                <span className="text-amber-400 font-semibold">145</span>
                <span>Google Play ratings on <span className="text-white/70 italic">Hopeless Romantic</span> — Kiminou's most-read collection</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/6 bg-white/[0.015] py-14" aria-labelledby="canonical-bibliography-heading">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/45 mb-3">Official Bibliography</p>
            <h2 id="canonical-bibliography-heading" className="font-serif text-3xl font-light text-white mb-8">The Canonical Ten Books</h2>
            <ol className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {CANONICAL_BOOK_TITLES.map((title, index) => (
                <li key={title} className="flex gap-4 border-b border-white/6 pb-3 text-white/65">
                  <span className="font-serif text-amber-400/45">{String(index + 1).padStart(2, "0")}</span>
                  <span>{title}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/40">{CATALOG_EDITION_NOTE}</p>
          </div>
        </section>

        {/* ── 3D BOOKSHELF ── */}
        {!reduceEffects && (
          <section className="pb-8 border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12">
              {books.length === 0 ? (
                <div className="flex items-center justify-center py-32">
                  <motion.div className="w-10 h-10 border-2 border-amber-400/20 border-t-amber-400/60 rounded-full"
                    animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                </div>
              ) : (
                <>
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/40 mb-2">The Collection</p>
                    <p className="text-xs text-white/25">Hover a book to preview · Click to open</p>
                  </motion.div>
                  <BookShelf3D books={books} onBookClick={(book) => setOpenBook(book)} />
                </>
              )}
            </div>
          </section>
        )}

        {/* ── RECORD PLAYER + POEM READER ── */}
        <Suspense fallback={null}>
          <VinylRecord />
        </Suspense>

        {/* ── FULL COLLECTION GRID ── */}
        <section className="pb-28 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }} className="mb-12">
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/40 mb-2">All Books</p>
              <h2 className="font-serif text-3xl font-light text-white">Browse the Collection</h2>
              <div className="w-8 h-px bg-amber-400/30 mt-4" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {books.map((b, i) => (
                <BookCard
                  key={b.id}
                  book={b}
                  index={i}
                  onSample={(book) => setOpen({ id: book.id, poems: book.samplePoems ?? [], title: book.title })}
                  onOpenBook={(book) => setOpenBook(book)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── UNIVERSE MAP CTA ── */}
        <section className="pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Link href="/books/universe">
              <div className="group relative overflow-hidden border border-amber-400/15 bg-amber-400/[0.02] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-amber-400/35 hover:bg-amber-400/[0.05] transition-all duration-500 cursor-pointer">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-3">Six Worlds</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-2">Explore the Book Universe Map</h2>
                  <p className="text-white/40 text-sm max-w-xl">Faith, wisdom, boyhood, voice, love, and imagination — see how every book connects.</p>
                </div>
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400/80 group-hover:text-amber-300 transition-colors duration-300 flex-shrink-0">
                  View Map <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* ── FREE CHAPTER ── */}
        <FreeChapterCapture />
      </main>

      {open && (
        <PoemModal title={open.title} poems={open.poems} open={!!open} onClose={() => setOpen(null)} />
      )}

      <AnimatePresence>
        {openBook && (
          <OpenBookOverlay book={openBook} onClose={() => setOpenBook(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
