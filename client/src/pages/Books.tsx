import { useEffect, useState } from "react";
import { ExternalLink, BookOpen, Download, Heart, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
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
    bn?: string | null 
  };
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState<{id: string, poems: Poem[], title: string} | null>(null);

  useEffect(() => {
    fetch("/books.json")
      .then(r => r.json())
      .then(setBooks)
      .catch(() => setBooks([]));
  }, []);

  return (
    <>
      <Helmet>
        <title>Published Books - Kiminou Knox</title>
        <meta name="description" content="Explore published books by Kiminou Knox including poetry collections and stories on faith, identity, love, and finding voice." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.kiminouknox.com/books" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Published Books - Kiminou Knox" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta property="og:description" content="Published works of poetry and stories" />
        <meta property="og:url" content="https://www.kiminouknox.com/books" />
        <meta property="og:image" content="https://www.kiminouknox.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Published Books - Kiminou Knox" />
        <meta name="twitter:description" content="Published works of poetry and stories" />
        <meta name="twitter:image" content="https://www.kiminouknox.com/og-image.png" />
      </Helmet>

      <Header />

      <section className="relative min-h-screen overflow-hidden pt-36 pb-20 text-white">
      <div className="section-backdrop" aria-hidden="true">
        <img
          src="/published-works-bg-feb-27-2026.jpg"
          alt=""
          className="section-backdrop-image"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(251,191,36,0.12),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(245,158,11,0.08),transparent_26%)]" />
        <div className="section-backdrop-vignette" />
        <div className="section-backdrop-glow" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="font-serif text-5xl font-bold tracking-tight">Published Works</h1>
          <p className="mt-4 text-white/75">Real covers, real links, sample poems from each collection.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {books.map((b) => (
            <article key={b.id} className={`group relative overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-xl backdrop-blur-md ${b.featured ? "ring-2 ring-amber-200/30" : ""}`}>
              {b.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 rounded-full bg-amber-200 px-3 py-1 text-xs font-medium text-black">
                    <Heart className="w-3 h-3" /> Featured
                  </div>
                </div>
              )}
              <div className="aspect-[3/4] overflow-hidden">
                <img src={b.cover} alt={`${b.title} cover`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-wider uppercase text-amber-200/80">{b.year}{b.isbn ? ` • ISBN ${b.isbn}` : ""}</p>
                <h3 className="mt-1 font-serif text-2xl font-semibold leading-snug">{b.title}</h3>
                <p className="text-sm text-white/70">{b.subtitle}</p>
                <p className="mt-3 line-clamp-4 text-sm text-white/70">{b.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {b.themes.map((t) => <span key={t} className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/70">{t}</span>)}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOpen({ id: b.id, poems: b.samplePoems, title: b.title })}
                      className="group inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                      data-testid={`button-read-sample-${b.id}`}
                    >
                      <BookOpen className="w-4 h-4" /> Read Sample
                    </button>
                    <Link 
                      href={`/books/${b.id}`}
                      className="group inline-flex items-center justify-center gap-2 rounded-md bg-amber-200 px-4 py-2 text-sm text-black transition-colors hover:bg-amber-100"
                      data-testid={`link-view-details-${b.id}`}
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  {Object.values(b.buyLinks).some(Boolean) && (
                    <a 
                      href={Object.values(b.buyLinks).find(Boolean) || ""}
                      target="_blank" 
                      rel="noopener noreferrer external"
                      className="block rounded-md border border-amber-200 px-4 py-2 text-center text-sm text-amber-200 transition-colors hover:bg-amber-200 hover:text-black"
                      data-testid={`button-buy-quick-${b.id}`}
                    >
                      <ExternalLink className="w-4 h-4 inline mr-2" /> Buy Now
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {open && (
          <PoemModal
            title={open.title}
            poems={open.poems}
            open={!!open}
            onClose={() => setOpen(null)}
          />
        )}
      </div>
      </section>

      <Footer />
    </>
  );
}
