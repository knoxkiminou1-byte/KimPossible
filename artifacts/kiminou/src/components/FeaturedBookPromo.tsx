import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function FeaturedBookPromo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative py-28 md:py-40 bg-background overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] -translate-y-1/2 bg-amber-500/4 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] -translate-y-1/2 bg-white/2 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center lg:justify-start"
          >
            <div className="relative" style={{ perspective: "1200px" }}>
              <motion.div
                className="relative w-[260px] md:w-[300px]"
                initial={{ rotateY: -25 }}
                animate={inView ? { rotateY: -12 } : { rotateY: -25 }}
                whileHover={{ rotateY: 5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute left-0 top-2 bottom-2 w-5 rounded-l-sm origin-right"
                  style={{
                    background: "linear-gradient(to right, #111, #222)",
                    transform: "rotateY(-90deg) translateX(-10px)",
                    transformOrigin: "left center",
                  }}
                />
                <img
                  src="/covers/kiminou-knox-hopeless-romantic-poetry.jpg"
                  alt="Hopeless Romantic by Kiminou Knox"
                  className="w-full h-auto rounded-r-sm shadow-[0_32px_80px_rgba(0,0,0,0.7),0_8px_20px_rgba(0,0,0,0.5)]"
                  style={{ backfaceVisibility: "hidden" }}
                />
                <div className="absolute inset-0 rounded-r-sm bg-gradient-to-tr from-transparent via-white/6 to-white/12 pointer-events-none" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/40 blur-xl rounded-full"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-7"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/70 mb-5 font-medium">
                Most-Read · 145 Ratings
              </p>
              <h2
                className="font-serif text-3xl md:text-4xl xl:text-5xl font-light leading-tight text-white mb-4"
                data-testid="featured-book-title"
              >
                <span className="italic text-amber-200/90">Hopeless Romantic</span>
              </h2>
              <div className="w-10 h-px bg-amber-400/50 mb-6" />
            </div>

            <p
              className="text-base text-white/55 leading-relaxed"
              data-testid="featured-book-description"
            >
              An intimate, emotionally charged collection on longing, closure, and the courage to stay tender. Kiminou's most-read work — 145 ratings on Google Play Books.
            </p>

            <div className="flex flex-wrap gap-2">
              {["Love", "Heartbreak", "Healing", "Poetry"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-white/10 text-white/50 text-xs uppercase tracking-[0.15em] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="https://play.google.com/store/books/details/Kiminou_Knox_Hopeless_Romantic?id=AdZrEQAAQBAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 bg-amber-400 text-black font-semibold text-sm uppercase tracking-[0.14em] transition-all duration-300"
                whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(251,191,36,0.3)" }}
                whileTap={{ scale: 0.97 }}
                data-testid="featured-book-buy-google"
              >
                <ExternalLink className="w-4 h-4" />
                Buy on Google Books
              </motion.a>
              <Link href="/books/hopeless-romantic">
                <motion.span
                  className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 text-white/70 text-sm uppercase tracking-[0.14em] cursor-pointer hover:border-amber-400/50 hover:text-amber-300 transition-all duration-300"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="featured-book-learn-more"
                >
                  Read More →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
