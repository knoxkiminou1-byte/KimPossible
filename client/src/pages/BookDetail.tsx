import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet";
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

export default function BookDetail() {
  const [, params] = useRoute("/books/:id");
  const [book, setBook] = useState<Book | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/books.json")
      .then(r => r.json())
      .then((books: Book[]) => {
        const found = books.find(b => b.id === params?.id);
        setBook(found || null);
      })
      .catch(() => setBook(null));
  }, [params?.id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Book not found</h1>
          <Link href="/books" className="text-primary hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Books
          </Link>
        </div>
      </div>
    );
  }

  const bookUrl = `https://kiminouknox.com/books/${book.id}`;
  const bookImage = `https://kiminouknox.com${book.cover}`;
  const retailerLinks = Object.entries(book.buyLinks).filter(
    (entry): entry is [string, string] => Boolean(entry[1])
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        "@id": `${bookUrl}#book`,
        "name": book.title,
        "alternateName": book.subtitle,
        "description": book.description,
        "image": bookImage,
        "url": bookUrl,
        "author": {
          "@type": "Person",
          "@id": "https://kiminouknox.com/#person",
          "name": "Kiminou Knox",
          "url": "https://kiminouknox.com/"
        },
        "publisher": {
          "@type": "Person",
          "@id": "https://kiminouknox.com/#person",
          "name": "Kiminou Knox"
        },
        "datePublished": book.datePublished || `${book.year}-01-01`,
        "copyrightYear": book.year,
        "inLanguage": "en-US",
        ...(book.isbn && { "isbn": book.isbn }),
        "sameAs": retailerLinks.map(([, url]) => url),
        "workExample": retailerLinks.map(([key, url]) => ({
          "@type": "Book",
          "bookFormat": key.includes("google") ? "EBook" : "Paperback",
          "url": url
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://kiminouknox.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Books",
            "item": "https://kiminouknox.com/books"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": book.title,
            "item": bookUrl
          }
        ]
      }
    ]
  };

  const availableRetailers = retailerLinks
    .map(([key, url]) => ({ key, url, name: retailerNames[key] || key }));

  return (
    <>
      <Helmet>
        <title>{book.title} - Kiminou Knox</title>
        <meta name="description" content={book.description} />
        <link rel="canonical" href={bookUrl} />
        
        <meta property="og:type" content="book" />
        <meta property="og:title" content={`${book.title} - Kiminou Knox`} />
        <meta property="og:description" content={book.description} />
        <meta property="og:url" content={bookUrl} />
        <meta property="og:image" content={bookImage} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${book.title} - Kiminou Knox`} />
        <meta name="twitter:description" content={book.description} />
        <meta name="twitter:image" content={bookImage} />
        
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <section className="min-h-screen bg-background text-foreground py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Link 
            href="/books" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            data-testid="link-back-to-books"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Books
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Book Cover */}
            <div className="relative">
              <img 
                src={book.cover} 
                alt={`${book.title} cover`}
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                data-testid="img-book-cover"
              />
              {book.featured && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                  Featured
                </div>
              )}
            </div>

            {/* Book Details */}
            <div>
              <div className="mb-6">
                <p className="text-sm tracking-wider uppercase text-primary/80 mb-2">
                  {book.year}{book.isbn ? ` • ISBN ${book.isbn}` : ""}
                </p>
                <h1 className="font-serif text-5xl font-bold leading-tight mb-3" data-testid="text-book-title">
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">{book.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              </div>

              {/* Themes */}
              <div className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
                  Themes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {book.themes.map(theme => (
                    <span 
                      key={theme} 
                      className="px-3 py-1 bg-muted text-foreground rounded-full text-sm"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Poems Button */}
              <div className="mb-8">
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-muted hover:bg-accent border border-border rounded-lg transition-colors"
                  data-testid="button-read-sample-poems"
                >
                  <BookOpen className="w-5 h-5" />
                  Read Sample Poems
                </button>
              </div>

              {/* Buy Links */}
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-4 text-muted-foreground">
                  Available At
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableRetailers.map(({ key, url, name }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer external"
                      className="inline-flex items-center justify-between gap-2 px-4 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors group"
                      data-testid={`link-buy-${key}`}
                    >
                      <span className="font-medium">{name}</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
