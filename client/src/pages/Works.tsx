import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Book {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  datePublished: string;
  isbn?: string | null;
  cover: string;
  description: string;
  buyLinks: Record<string, string | null | undefined>;
}

export default function Works() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Failed to load books:', err));
  }, []);

  const bookSchemas = books.map(book => ({
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `https://www.kiminouknox.com/books/${book.id}#book`,
    "name": book.title,
    "url": `https://www.kiminouknox.com/books/${book.id}`,
    "image": book.cover.startsWith("http") ? book.cover : `https://www.kiminouknox.com${book.cover}`,
    "author": { "@id": "https://www.kiminouknox.com/#person" },
    "workExample": [
      { "@type": "Book", "bookFormat": "https://schema.org/EBook", "url": book.buyLinks.amazon || book.buyLinks.googleBooks || "" },
      { "@type": "Book", "bookFormat": "https://schema.org/Paperback", "url": book.buyLinks.amazon || "" }
    ],
    "offers": {
      "@type": "Offer",
      "url": book.buyLinks.amazon || "",
      "availability": "https://schema.org/InStock"
    }
  }));

  return (
    <>
      <Helmet>
        <title>Works by Kiminou Knox - Books, Essays, KimYaps, Editorial & Digital Projects</title>
        <meta name="description" content="A creative hub for Kiminou Knox across authored books, essays, KimYaps, editorial credits, in-development literary worlds, and AAFC Builders digital work." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.kiminouknox.com/works" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Works - Kiminou Knox" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta property="og:description" content="Published works and books by writer Kiminou Knox" />
        <meta property="og:url" content="https://www.kiminouknox.com/works" />
        <meta property="og:image" content="https://www.kiminouknox.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Works - Kiminou Knox" />
        <meta name="twitter:description" content="Published books and poetry collections" />
        <meta name="twitter:image" content="https://www.kiminouknox.com/og-image.png" />
        
        {bookSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="works-heading">
              Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A creative hub across authored books, essays, KimYaps, editorial credits, in-development literary worlds, and AAFC Builders digital work.
            </p>
          </div>

          <div className="mb-12 grid gap-4 md:grid-cols-4">
            {[
              ["/books", "Authored Books"],
              ["/essays", "Essays"],
              ["/kimyaps", "KimYaps"],
              ["/editorial", "Editorial"],
              ["/aafc-builders", "AAFC Builders"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-lg border border-border bg-card p-4 text-center font-medium hover:border-primary">
                {label}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div 
                key={book.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                data-testid={`book-card-${book.id}`}
              >
                <div className="aspect-[3/4] bg-muted overflow-hidden">
                  <img 
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-serif font-bold mb-2 text-foreground" data-testid={`book-title-${book.id}`}>
                    {book.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    {book.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {book.year}
                  </p>
                  {book.buyLinks.amazon && (
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => window.open(book.buyLinks.amazon ?? undefined, '_blank')}
                      data-testid={`buy-button-${book.id}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Book
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
