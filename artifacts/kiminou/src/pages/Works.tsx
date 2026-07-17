import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

interface Book {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  datePublished: string;
  isbn: string;
  cover: string;
  description: string;
  buyLinks: Record<string, string>;
}

export default function Works() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/books-full.json')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Failed to load books:', err));
  }, []);

  const bookSchemas = books.map(book => ({
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `https://www.kiminouknox.com/works#${book.id}`,
    "name": book.title,
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
        <title>10 Published Works by Kiminou Knox</title>
        <meta name="description" content="Explore all 10 published works by Kiminou Knox, including The Spirit of Solomon, Poems From A Black Boy, Boys Raised In Silence, WHY DID YOU GHOST ME, and 7.16.74: An Ode to Rashida." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/works" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="10 Published Works by Kiminou Knox" />
        <meta property="og:description" content="The official 10-work catalog of author and poet Kiminou Knox." />
        <meta property="og:url" content="https://www.kiminouknox.com/works" />
        <meta property="og:image" content="https://www.kiminouknox.com/og/works.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="10 Published Works by Kiminou Knox" />
        <meta name="twitter:description" content="The official 10-work catalog of author and poet Kiminou Knox." />
        <meta name="twitter:image" content="https://www.kiminouknox.com/og/works.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Works", url: `${SITE_URL}/works` },
            ]),
          )}
        </script>
        
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
              The official catalog of 10 poetry collections and stories exploring faith, identity, love, family, imagination, and the Black experience.
            </p>
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
                      onClick={() => window.open(book.buyLinks.amazon, '_blank')}
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
