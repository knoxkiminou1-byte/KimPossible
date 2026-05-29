import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BookOpen, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function FeaturedBookPromo() {
  const containerRef = useScrollAnimation();

  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={containerRef} className="animate-on-scroll">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-4 py-2">
              <BookOpen className="w-4 h-4 text-foreground" />
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Featured Book
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg border border-border bg-muted shadow-lg">
                <img 
                  src="/covers/adventures-chua-kiminou.jpg"
                  alt="The Adventures of Kiminou the Great and Chua the Wise book cover"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground leading-tight" data-testid="featured-book-title">
                  The Adventures of Kiminou the Great and Chua the Wise
                </h2>
                <p className="text-xl text-muted-foreground font-medium mb-6">
                  A story for young readers
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="featured-book-description">
                A children's story about friendship, courage, and learning from someone who sees the world differently.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                  Friendship
                </span>
                <span className="rounded-md bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                  Growth
                </span>
                <span className="rounded-md bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                  Adventure
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Published 2025</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://play.google.com/store/books/details/Kiminou_Knox_The_Adventures_of_Kiminou_the_Great_a?id=CHyKEQAAQBAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  data-testid="featured-book-buy-google"
                >
                  <ExternalLink className="w-5 h-5" />
                  Buy on Google Books
                </a>
                <Link
                  href="/books/adventures-kiminou-chua"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
                  data-testid="featured-book-learn-more"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
