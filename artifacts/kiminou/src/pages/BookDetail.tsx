import { useEffect, useState, useRef } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoemModal from "@/components/PDFModal";

type Poem = {
  title: string;
  content: string;
};

type Book = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  isbn?: string | null;
  datePublished?: string;
  cover: string;
  samplePoems: Poem[];
  themes: string[];
  description: string;
  featured?: boolean;
  buyLinks: {
    amazon?: string | null;
    amazonUK?: string | null;
    googleBooks?: string | null;
    goodreads?: string | null;
    waterstones?: string | null;
    hatchards?: string | null;
    booksAMillion?: string | null;
    bookshop?: string | null;
    bn?: string | null;
  };
};

const retailerNames: Record<string, string> = {
  amazon: "Amazon US",
  amazonUK: "Amazon UK",
  googleBooks: "Google Play Books",
  goodreads: "Goodreads",
  waterstones: "Waterstones",
  hatchards: "Hatchards",
  booksAMillion: "Books-A-Million",
  bookshop: "Bookshop.org",
  bn: "Barnes & Noble"
};

const retailerIcons: Record<string, string> = {
  amazon: "A",
  amazonUK: "A",
  googleBooks: "G",
  goodreads: "GR",
  waterstones: "W",
  hatchards: "H",
  booksAMillion: "BAM",
  bookshop: "BS",
  bn: "BN"
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}>
      {children}
    </motion.div>
  );
}

export default function BookDetail() {
  const [, params] = useRoute("/books/:id");
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/books.json")
      .then(r => r.json())
      .then((books: Book[]) => {
        const found = books.find(b => b.id === params?.id);
        setBook(found || null);
      })
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [params?.id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-px h-20 bg-amber-400/30 mx-auto mb-6 animate-pulse" />
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/50">Loading</p>
          </div>
        </div>
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-400/40 mb-6">404</p>
            <h1 className="font-serif text-5xl font-light text-white mb-6">Book Not Found</h1>
            <Link href="/books" className="text-amber-400/60 hover:text-amber-300 transition-colors text-xs uppercase tracking-[0.3em] flex items-center gap-2 justify-center">
              <ArrowLeft className="w-3 h-3" /> Back to Books
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.title,
    "description": book.description,
    "author": {
      "@type": "Person",
      "name": "Kiminou Knox",
      "url": "https://kiminouknox.com",
      "@id": "https://kiminouknox.com/#kiminouknox"
    },
    "datePublished": book.datePublished || `${book.year}-01-01`,
    ...(book.isbn && { "isbn": book.isbn }),
    "url": `https://kiminouknox.com/books/${book.id}`,
    "image": `https://kiminouknox.com${book.cover}`,
    "genre": "Poetry",
    "inLanguage": "en",
    "bookFormat": "Paperback",
    "offers": Object.entries(book.buyLinks)
      .filter(([_, url]) => url)
      .map(([_, url]) => ({
        "@type": "Offer",
        "url": url,
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD"
      })),
    "workExample": Object.entries(book.buyLinks)
      .filter(([_, url]) => url)
      .map(([key, url]) => ({
        "@type": "Book",
        "bookFormat": key.includes("google") ? "EBook" : "Paperback",
        "url": url
      }))
  };

  const availableRetailers = Object.entries(book.buyLinks)
    .filter(([_, url]) => url)
    .map(([key, url]) => ({ key, url: url as string, name: retailerNames[key] || key, icon: retailerIcons[key] || "→" }));

  return (
    <>
      <Helmet>
        <title>{book.title} — Kiminou Knox | Poetry Collection</title>
        <meta name="description" content={`${book.description} Published ${book.year} by Kiminou Knox. Available at Amazon, Waterstones, Google Play Books, and more.`} />
        <link rel="canonical" href={`https://kiminouknox.com/books/${book.id}`} />

        <meta property="og:type" content="book" />
        <meta property="og:title" content={`${book.title} — Kiminou Knox`} />
        <meta property="og:description" content={book.description} />
        <meta property="og:url" content={`https://kiminouknox.com/books/${book.id}`} />
        <meta property="og:image" content={`https://kiminouknox.com${book.cover}`} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="900" />
        {book.isbn && <meta property="books:isbn" content={book.isbn} />}
        <meta property="books:author" content="https://kiminouknox.com/author" />
        <meta property="books:rating:value" content="5" />
        <meta property="books:rating:scale" content="5" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${book.title} — Kiminou Knox`} />
        <meta name="twitter:description" content={book.description} />
        <meta name="twitter:image" content={`https://kiminouknox.com${book.cover}`} />
        <meta name="twitter:creator" content="@KnoxKiminou" />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-black text-white">

        {/* ─── BACK NAV ─── */}
        <div className="pt-28 pb-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/30 hover:text-amber-400/60 transition-colors duration-300 group"
              data-testid="link-back-to-books"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              All Books
            </Link>
          </div>
        </div>

        {/* ─── HERO: Cover + Core Info ─── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">

              {/* Book Cover */}
              <Reveal>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-amber-400/4 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative">
                    {book.featured && (
                      <div className="absolute -top-3 -right-3 z-10">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 bg-black border border-amber-400/40 px-3 py-1.5">
                          Featured
                        </span>
                      </div>
                    )}
                    <img
                      src={book.cover}
                      alt={`${book.title} — Kiminou Knox`}
                      loading="lazy"
                      className="w-full shadow-2xl shadow-black/80 border border-white/5 group-hover:border-amber-400/15 transition-colors duration-500"
                      data-testid="img-book-cover"
                    />
                  </div>
                </div>
              </Reveal>

              {/* Book Details */}
              <div className="flex flex-col gap-8">
                <Reveal delay={0.1}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-amber-400/50 mb-3">
                      {book.year}{book.isbn ? ` · ISBN ${book.isbn}` : ""}
                    </p>
                    <h1
                      className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white mb-3"
                      data-testid="text-book-title"
                    >
                      {book.title}
                    </h1>
                    <div className="w-12 h-px bg-amber-400/40 my-5" />
                    <p className="font-serif text-xl text-amber-200/60 italic mb-6">{book.subtitle}</p>
                    <p className="text-white/50 leading-relaxed max-w-lg">{book.description}</p>
                  </div>
                </Reveal>

                {/* Themes */}
                <Reveal delay={0.2}>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-3">Themes</p>
                    <div className="flex flex-wrap gap-2">
                      {book.themes.map(theme => (
                        <span
                          key={theme}
                          className="px-3 py-1.5 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/35 hover:border-amber-400/25 hover:text-amber-200/60 transition-colors duration-300"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Sample Poems CTA */}
                <Reveal delay={0.25}>
                  <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center gap-3 w-fit px-6 py-3.5 border border-white/12 text-xs uppercase tracking-[0.25em] text-white/50 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-300 group"
                    data-testid="button-read-sample-poems"
                  >
                    <BookOpen className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform duration-300" />
                    Read Sample Poems
                  </button>
                </Reveal>

                {/* Buy Links */}
                <Reveal delay={0.3}>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-5">Available At</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {availableRetailers.map(({ key, url, name }) => (
                        <motion.a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer external"
                          whileHover={{ x: 4 }}
                          className="group/link flex items-center justify-between gap-3 px-5 py-3.5 border border-white/8 hover:border-amber-400/30 hover:bg-amber-400/[0.04] transition-all duration-300"
                          data-testid={`link-buy-${key}`}
                        >
                          <span className="text-sm text-white/55 group-hover/link:text-amber-200 transition-colors duration-300">
                            {name}
                          </span>
                          <ExternalLink className="w-3 h-3 text-white/15 group-hover/link:text-amber-400/50 transition-colors duration-300 flex-shrink-0" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SAMPLE POEM PREVIEW ─── */}
        {book.samplePoems && book.samplePoems.length > 0 && (
          <section className="py-20 border-t border-white/6">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/50 mb-4">A Taste</p>
                <h2 className="font-serif text-3xl font-light text-white mb-10">From The Pages</h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="relative border border-white/6 bg-white/[0.015] p-8 md:p-12">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-400/25" />
                  <p className="text-xs uppercase tracking-[0.4em] text-amber-400/40 mb-6">
                    {book.samplePoems[0].title}
                  </p>
                  <pre className="font-serif text-base md:text-lg text-white/65 leading-relaxed whitespace-pre-wrap">
                    {book.samplePoems[0].content}
                  </pre>
                  <button
                    onClick={() => setOpen(true)}
                    className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400/50 hover:text-amber-300 transition-colors"
                  >
                    Read more poems →
                  </button>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ─── BACK TO BOOKS ─── */}
        <section className="py-20 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-white/20 mb-6">Explore the collection</p>
              <Link href="/books">
                <motion.span
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400/60 hover:text-amber-300 transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: -4 }}
                >
                  <ArrowLeft className="w-3 h-3" />
                  View All Books
                </motion.span>
              </Link>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />

      {open && (
        <PoemModal
          title={book.title}
          poems={book.samplePoems}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
