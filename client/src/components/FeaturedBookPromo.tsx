import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BookOpen, ExternalLink, Star, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function FeaturedBookPromo() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useScrollAnimation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 dark:from-cyan-950 dark:via-blue-950 dark:to-teal-950 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-teal-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div ref={containerRef} className="animate-on-scroll">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 dark:bg-yellow-400/10 border border-yellow-400/30 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 uppercase tracking-wide">
                Latest Children's Book
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/covers/adventures-chua-kiminou.png"
                  alt="The Adventures of Kiminou the Great and Chua the Wise book cover"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Stars */}
              <div className="absolute -top-4 -right-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </motion.div>

            {/* Book Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground leading-tight" data-testid="featured-book-title">
                  The Adventures of Kiminou the Great and Chua the Wise
                </h2>
                <p className="text-xl text-cyan-600 dark:text-cyan-400 font-medium mb-6">
                  A Journey of Friendship and Discovery
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="featured-book-description">
                A whimsical tale of two friends learning that courage and wisdom work best together on life's greatest adventures. Perfect for young readers discovering the power of friendship, growth, and believing in themselves.
              </p>

              {/* Themes */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 rounded-full text-sm font-medium">
                  Friendship
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  Growth
                </span>
                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-sm font-medium">
                  Adventure
                </span>
              </div>

              {/* Publication Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Published 2023</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://www.amazon.com/Adventures-Kiminou-Great-Chua-Wise/dp/B0FH38DNQ5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
                  data-testid="featured-book-buy-amazon"
                >
                  <ExternalLink className="w-5 h-5" />
                  Buy on Amazon
                </a>
                <Link
                  href="/books/adventures-kiminou-chua"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-cyan-600 text-cyan-600 dark:text-cyan-400 dark:border-cyan-400 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-cyan-950 font-semibold rounded-lg transition-colors"
                  data-testid="featured-book-learn-more"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
