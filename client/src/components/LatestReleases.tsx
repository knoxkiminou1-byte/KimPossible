import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type Book = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  cover: string;
  featured?: boolean;
  buyLinks: {
    amazon?: string | null;
    googleBooks?: string | null;
    [key: string]: string | null | undefined;
  };
};

export default function LatestReleases() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/books.json")
      .then(r => r.json())
      .then((data: Book[]) => {
        // Get the 3 most recent books (featured or by year)
        const latest = data
          .sort((a, b) => b.year - a.year)
          .slice(0, 3);
        setBooks(latest);
      })
      .catch(() => setBooks([]));
  }, []);

  if (books.length === 0) return null;

  return (
    <section className="relative py-8 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] uppercase text-primary/80 mb-4 font-semibold"
          >
            LATEST RELEASES
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight"
          >
            Published Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
          >
            Explore seven published works exploring faith, identity, love, and the human experience
          </motion.p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative"
            >
              {/* Book Cover */}
              <Link href={`/books/${book.id}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6 aspect-[3/4] bg-muted">
                  <img 
                    src={book.cover} 
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="px-6 py-3 bg-white text-black font-semibold rounded-full text-sm transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Details
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {book.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                </div>
              </Link>

              {/* Book Info */}
              <div className="text-center">
                <p className="text-xs tracking-wider uppercase text-primary/80 mb-2">
                  {book.year}
                </p>
                <h3 className="font-serif text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {book.subtitle}
                </p>

                {/* Quick Actions */}
                <div className="flex gap-2 justify-center">
                  <Link
                    href={`/books/${book.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm transition-colors"
                    data-testid={`link-latest-${book.id}`}
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                  {(book.buyLinks.amazon || book.buyLinks.googleBooks) && (
                    <a
                      href={book.buyLinks.amazon || book.buyLinks.googleBooks || ""}
                      target="_blank"
                      rel="noopener noreferrer external"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:bg-accent rounded-lg text-sm transition-colors"
                      data-testid={`link-buy-latest-${book.id}`}
                    >
                      <ExternalLink className="w-4 h-4" /> Buy
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Books Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-8 py-4 bg-muted hover:bg-accent border border-border rounded-lg text-sm font-medium transition-colors group"
            data-testid="link-view-all-books"
          >
            View All Books 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
