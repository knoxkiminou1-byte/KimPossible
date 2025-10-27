import { useEffect, useState } from "react";
import { ExternalLink, BookOpen, Download, Heart, ArrowRight } from "lucide-react";
import { Link } from "wouter";
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
    <section className="min-h-screen bg-background text-foreground py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="font-serif text-5xl font-bold tracking-tight">Published Works</h1>
          <p className="text-muted-foreground mt-4">Real covers, real links, sample poems from each collection.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {books.map(b => (
            <article key={b.id} className={`group relative rounded-2xl border border-border bg-card/60 backdrop-blur shadow-xl overflow-hidden ${b.featured ? "ring-2 ring-primary/30" : ""}`}>
              {b.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Heart className="w-3 h-3" /> Featured
                  </div>
                </div>
              )}
              <div className="aspect-[3/4] overflow-hidden">
                <img src={b.cover} alt={`${b.title} cover`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-wider uppercase text-primary/80">{b.year}{b.isbn ? ` • ISBN ${b.isbn}` : ""}</p>
                <h3 className="mt-1 font-serif text-2xl font-semibold leading-snug">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.subtitle}</p>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-4">{b.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {b.themes.map(t => <span key={t} className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">{t}</span>)}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOpen({ id: b.id, poems: b.samplePoems, title: b.title })}
                      className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      data-testid={`button-read-sample-${b.id}`}
                    >
                      <BookOpen className="w-4 h-4" /> Read Sample
                    </button>
                    <Link 
                      href={`/books/${b.id}`}
                      className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
                      data-testid={`link-view-details-${b.id}`}
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  {(b.buyLinks.amazon || b.buyLinks.googleBooks) && (
                    <a 
                      href={b.buyLinks.amazon || b.buyLinks.googleBooks || ""} 
                      target="_blank" 
                      rel="noopener noreferrer external"
                      className="block text-center px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg text-sm transition-colors"
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
      </div>

      {open && (
        <PoemModal
          title={open.title}
          poems={open.poems}
          open={!!open}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}