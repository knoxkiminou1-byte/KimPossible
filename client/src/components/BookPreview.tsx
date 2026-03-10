import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Book, X, ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import PoemModal from "@/components/PDFModal";

interface Poem {
  title: string;
  content: string;
}

interface BookData {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  samplePoems: Poem[];
  year: number;
  isbn?: string | null;
  themes: string[];
  description: string;
  buyLinks: {
    amazon?: string | null;
    googleBooks?: string | null;
    bookshop?: string | null;
    bn?: string | null;
  };
  featured?: boolean;
}

export default function BookPreview() {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [books, setBooks] = useState<BookData[]>([]);
  const [poemModal, setPoemModal] = useState<{ id: string; poems: Poem[]; title: string } | null>(null);

  useEffect(() => {
    fetch("/books.json")
      .then((r) => r.json())
      .then(setBooks)
      .catch(() => setBooks([]));
  }, []);

  const openPreview = (book: BookData) => {
    setSelectedBook(book);
    document.body.style.overflow = "hidden";
  };

  const closePreview = () => {
    setSelectedBook(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <section className="relative overflow-hidden py-24" data-testid="book-preview-section">
        <div className="absolute inset-0" aria-hidden="true">
          <img src="/published-works-bg-feb-27-2026.png" alt="" className="h-full w-full object-cover object-center" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/64 via-black/80 to-black/92" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="luxury-kicker mb-4">Books</p>
            <h2 className="mb-5 font-serif text-4xl font-light text-amber-50 md:text-5xl" data-testid="books-title">
              Published Works
            </h2>
            <p className="mx-auto max-w-2xl text-base text-amber-50/76" data-testid="books-subtitle">
              Poetry and narrative collections exploring faith, identity, love, and voice.
            </p>
            <div className="mt-5">
              <Link href="/books" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-amber-200" data-testid="view-all-books">
                <span>View All Books</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {books.map((book, index) => (
              <article
                key={book.id}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-amber-100/14 bg-black/38 backdrop-blur-sm transition hover:-translate-y-1 hover:border-amber-100/26"
                onClick={() => openPreview(book)}
                data-testid={`book-card-${index}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={book.cover} alt={`${book.title} book cover`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/45">
                    <div className="opacity-0 transition group-hover:opacity-100">
                      <Book className="mx-auto mb-1 h-7 w-7 text-amber-100" />
                      <p className="text-xs uppercase tracking-[0.2em] text-amber-100">Preview</p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="mb-2 font-serif text-2xl text-amber-50">{book.title}</h3>
                  <p className="mb-3 text-sm text-amber-100/66">{book.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {book.themes.slice(0, 3).map((theme) => (
                      <span key={theme} className="rounded-full border border-amber-100/16 px-2 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-amber-100/72">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://bookshop.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-button inline-flex items-center gap-2 rounded-full border border-amber-100/22 bg-amber-100/95 px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black"
              data-testid="books-shop-link"
            >
              <ExternalLink className="h-4 w-4" />
              Shop All Books
            </a>
          </div>
        </div>
      </section>

      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4" data-testid="book-modal">
          <div className="relative max-h-full max-w-4xl overflow-hidden rounded-2xl border border-amber-100/16 bg-[#0a0b10]">
            <button
              onClick={closePreview}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-amber-100 transition hover:bg-black/80"
              data-testid="book-modal-close"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid max-h-[90vh] grid-cols-1 overflow-y-auto md:grid-cols-2">
              <img src={selectedBook.cover} alt={`${selectedBook.title} book cover`} className="h-full w-full object-cover" />

              <div className="p-8">
                <h2 className="mb-2 font-serif text-4xl text-amber-50">{selectedBook.title}</h2>
                <p className="mb-4 text-amber-100/70">{selectedBook.subtitle}</p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {selectedBook.themes.map((theme) => (
                    <span key={theme} className="rounded-full border border-amber-100/16 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber-100/70">
                      {theme}
                    </span>
                  ))}
                </div>

                <p className="mb-6 text-sm leading-relaxed text-amber-50/78">{selectedBook.description}</p>
                <p className="mb-8 text-xs uppercase tracking-[0.2em] text-amber-100/60">
                  Published {selectedBook.year} {selectedBook.isbn ? `• ISBN ${selectedBook.isbn}` : ""}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={selectedBook.buyLinks.amazon || selectedBook.buyLinks.googleBooks || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-amber-100/22 bg-amber-100/95 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black"
                    data-testid="book-buy-link"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Purchase
                  </a>
                  <button
                    onClick={() => setPoemModal({ id: selectedBook.id, poems: selectedBook.samplePoems, title: selectedBook.title })}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-amber-100/24 bg-black/35 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-50"
                    data-testid="book-sample-poems"
                  >
                    <BookOpen className="h-4 w-4" />
                    Read Sample
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {poemModal && <PoemModal title={poemModal.title} poems={poemModal.poems} open={!!poemModal} onClose={() => setPoemModal(null)} />}
    </>
  );
}
