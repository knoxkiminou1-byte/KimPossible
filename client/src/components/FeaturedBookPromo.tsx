import { BookOpen, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function FeaturedBookPromo() {
  return (
    <section className="relative overflow-hidden py-24" data-testid="featured-book-section">
      <div className="absolute inset-0" aria-hidden="true">
        <img src="/published-works-bg-feb-27-2026.png" alt="" className="h-full w-full object-cover object-center" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/58 via-black/78 to-black/88" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="luxury-surface grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div className="overflow-hidden rounded-2xl border border-amber-100/16">
            <img
              src="/covers/adventures-chua-kiminou.png"
              alt="The Adventures of Kiminou the Great and Chua the Wise book cover"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="luxury-kicker mb-4">Flagship Title</p>
            <h2 className="mb-4 font-serif text-4xl font-light text-amber-50 md:text-5xl" data-testid="featured-book-title">
              The Adventures of Kiminou the Great and Chua the Wise
            </h2>
            <p className="mb-6 text-base leading-relaxed text-amber-50/78" data-testid="featured-book-description">
              A story of friendship, courage, and growth for young readers. Written with warmth, imagination, and moral
              clarity.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://play.google.com/store/books/details/Kiminou_Knox_The_Adventures_of_Kiminou_the_Great_a?id=CHyKEQAAQBAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-button inline-flex items-center gap-2 rounded-full border border-amber-100/22 bg-amber-100/95 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black"
                data-testid="featured-book-buy-google"
              >
                <ExternalLink className="h-4 w-4" />
                Buy on Google Books
              </a>
              <Link
                href="/books/adventures-kiminou-chua"
                className="luxury-button inline-flex items-center gap-2 rounded-full border border-amber-100/30 bg-black/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-50"
                data-testid="featured-book-learn-more"
              >
                <BookOpen className="h-4 w-4" />
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
