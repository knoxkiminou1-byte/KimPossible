import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { motion, useInView, AnimatePresence, useSpring } from "framer-motion";
import CMYKReveal from "@/components/LuxuryFX/CMYKReveal";

const VinylRecord = lazy(() => import("@/components/LuxuryFX/VinylRecord"));
const AuctionProvenance = lazy(() => import("@/components/LuxuryFX/AuctionProvenance"));
import FreeChapterCapture from "@/components/FreeChapterCapture";
import GlitchHeading from "@/components/LuxuryFX/GlitchHeading";
import GoldUnmask from "@/components/LuxuryFX/GoldUnmask";
import ScrambleText from "@/components/LuxuryFX/ScrambleText";
import { ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoemModal from "@/components/PDFModal";
import FlipbookModal from "@/components/FlipbookModal";
import OpenBookOverlay from "@/components/OpenBookOverlay";
import BookShelf3D from "@/components/BookShelf3D";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

type Poem = { title: string; content: string };
type Book = {
  id: string; title: string; subtitle: string; year: number;
  isbn?: string | null; cover: string; samplePoems: Poem[];
  themes: string[]; description: string; featured?: boolean;
  buyLinks: { amazon?: string | null; googleBooks?: string | null; bookshop?: string | null; bn?: string | null };
};

function BookCard({ book, index, onSample, onFlipbook, onOpenBook }: { book: Book; index: number; onSample: (b: Book) => void; onFlipbook: (b: Book) => void; onOpenBook: (b: Book) => void }) {
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
      data-testid={`book-card-${book.id}`}
    >
      {/* 3D Book Cover — click to open first-page overlay */}
      <div className="relative mb-5 cursor-pointer" style={{ perspective: "1000px" }} onClick={() => onOpenBook(book)}>
        <motion.div
          className="relative aspect-[3/4] overflow-hidden bg-black"
          initial={{ rotateY: -8 }}
          whileHover={{ rotateY: 4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {index < 3 ? (
            <CMYKReveal>
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </CMYKReveal>
          ) : (
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Preview hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-3 py-1.5 bg-black/70 border border-amber-400/40 text-amber-400 text-[10px] uppercase tracking-[0.25em] font-medium backdrop-blur-sm">
              Preview
            </span>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"
          />
          {book.featured && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 bg-amber-400 text-black text-xs font-semibold uppercase tracking-[0.15em]">
                Featured
              </span>
            </div>
          )}
        </motion.div>
        {/* Book shadow */}
        <div className="absolute -bottom-2 left-4 right-4 h-4 bg-black/30 blur-md rounded-full" />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400/60 mb-2">{book.year}{book.isbn ? ` · ISBN ${book.isbn}` : ""}</p>
        <h3 className="font-serif text-xl font-light text-white mb-1 group-hover:text-amber-100 transition-colors duration-300" data-testid={`book-title-${book.id}`}>
          {book.title}
        </h3>
        <p className="text-sm text-white/40 mb-3 italic">{book.subtitle}</p>
        <p className="text-sm text-white/40 leading-relaxed line-clamp-3 mb-4 flex-1">{book.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {book.themes.map(t => (
            <span key={t} className="px-2.5 py-1 border border-white/10 text-xs text-white/30 rounded-full tracking-wide">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSample(book)}
              className="py-2.5 border border-white/15 text-xs uppercase tracking-[0.15em] text-white/50 hover:border-amber-400/40 hover:text-amber-300 transition-all duration-300"
              data-testid={`button-read-sample-${book.id}`}
            >
              Read Sample
            </button>
            <Link href={`/books/${book.id}`}>
              <span
                className="block py-2.5 bg-amber-400/10 border border-amber-400/20 text-xs uppercase tracking-[0.15em] text-amber-400/80 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300 text-center cursor-pointer"
                data-testid={`link-view-details-${book.id}`}
              >
                View Details
              </span>
            </Link>
          </div>
          {(book.buyLinks.amazon || book.buyLinks.googleBooks) && (
            <a
              href={book.buyLinks.amazon || book.buyLinks.googleBooks || ""}
              target="_blank"
              rel="noopener noreferrer external"
              className="flex items-center justify-center gap-2 py-2.5 border border-white/8 text-xs uppercase tracking-[0.15em] text-white/35 hover:border-amber-400/30 hover:text-amber-400/70 transition-all duration-300"
              data-testid={`button-buy-quick-${book.id}`}
            >
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
  const [flipbook, setFlipbook] = useState<Book | null>(null);
  const [openBook, setOpenBook] = useState<Book | null>(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    fetch("/books.json").then(r => r.json()).then(setBooks).catch(() => setBooks([]));
  }, []);

  return (
    <>
      <Helmet>
        <title>Books by Kiminou Knox — Poetry Collections & Published Works</title>
        <meta name="description" content="Explore all 8 published works by Kiminou Knox including poetry collections on faith, identity, love, Black boyhood, and finding voice. Available on Amazon and Google Books." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/books" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Books by Kiminou Knox — Poetry Collections & Published Works" />
        <meta property="og:description" content="8 published poetry collections on faith, identity, love, and Black boyhood. Available on Amazon, Google Books, and more." />
        <meta property="og:url" content="https://www.kiminouknox.com/books" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <meta name="twitter:title" content="Books by Kiminou Knox — Poetry Collections & Published Works" />
        <meta name="twitter:description" content="8 published poetry collections on faith, identity, love, and Black boyhood." />
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Books", url: `${SITE_URL}/books` },
            ]),
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Books by Kiminou Knox",
            "description": "All published books and poetry collections by Kiminou Knox",
            "url": "https://www.kiminouknox.com/books",
            "numberOfItems": 8,
            "author": { "@id": "https://www.kiminouknox.com/#person" },
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "The Spirit of Solomon", "url": "https://www.kiminouknox.com/books/spirit-solomon" },
              { "@type": "ListItem", "position": 2, "name": "Our Father?", "url": "https://www.kiminouknox.com/books/our-father" },
              { "@type": "ListItem", "position": 3, "name": "Poems from a Black Boy", "url": "https://www.kiminouknox.com/books/poems-black-boy" },
              { "@type": "ListItem", "position": 4, "name": "Hopeless Romantic", "url": "https://www.kiminouknox.com/books/hopeless-romantic" },
              { "@type": "ListItem", "position": 5, "name": "Boys Raised in Silence", "url": "https://www.kiminouknox.com/books/boys-raised-in-silence" },
              { "@type": "ListItem", "position": 6, "name": "The Adventures of Kiminou the Great and Chua the Wise", "url": "https://www.kiminouknox.com/books/adventures-kiminou-chua" }
            ]
          })}
        </script>
      </Helmet>
      <Header />

      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative pt-40 pb-20 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-amber-500/4 rounded-full blur-[140px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">8 Published Works</p>
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

        {/* 3D Bookshelf */}
        <section className="pb-8 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12">
            {books.length === 0 ? (
              <div className="flex items-center justify-center py-32">
                <motion.div
                  className="w-10 h-10 border-2 border-amber-400/20 border-t-amber-400/60 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/40 mb-2">The Collection</p>
                  <p className="text-xs text-white/25">Hover a book to preview · Click to open</p>
                </motion.div>
                <BookShelf3D books={books} onBookClick={(book) => setOpenBook(book)} />
              </>
            )}
          </div>
        </section>

        {/* Auction House Provenance */}
        <Suspense fallback={null}>
          <AuctionProvenance />
        </Suspense>

        {/* Detail Grid */}
        <section className="pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/40 mb-2">Browse in Detail</p>
              <div className="w-8 h-px bg-amber-400/30" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {books.map((b, i) => (
                <BookCard
                  key={b.id}
                  book={b}
                  index={i}
                  onSample={(book) => setOpen({ id: book.id, poems: book.samplePoems, title: book.title })}
                  onFlipbook={(book) => setFlipbook(book)}
                  onOpenBook={(book) => setOpenBook(book)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Books as Vinyl Records */}
        <Suspense fallback={null}>
          <VinylRecord />
        </Suspense>

        {/* ─── FREE CHAPTER CAPTURE ─── */}
        <FreeChapterCapture />

      </main>

      {open && (
        <PoemModal title={open.title} poems={open.poems} open={!!open} onClose={() => setOpen(null)} />
      )}

      <AnimatePresence>
        {flipbook && (
          <FlipbookModal book={flipbook} onClose={() => setFlipbook(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openBook && (
          <OpenBookOverlay book={openBook} onClose={() => setOpenBook(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
