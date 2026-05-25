import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToWork = () => {
    window.location.href = "/books";
  };

  const scrollToContact = () => {
    window.location.href = "/contact";
  };

  const scrollToNext = () => {
    document.getElementById("who-is-kiminou")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      <div className="hero-media absolute inset-0" aria-hidden="true">
        <img
          src="/kiminou-hero-feb-27-2026.png"
          alt=""
          className="hero-image"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-gradient" />
        <div className="hero-vignette" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white lg:px-8"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="text-sm font-medium uppercase tracking-[0.24em] text-amber-100/90 md:text-base">
            Writer • Athlete • Program Builder
          </span>
        </motion.div>

        <motion.h1
          className="mb-6 font-serif text-5xl font-semibold leading-none md:text-7xl lg:text-8xl"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          data-testid="hero-title"
        >
          Kiminou Knox
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          data-testid="hero-intro"
        >
          Books, basketball, and youth-centered work from the Bay Area.
        </motion.p>

        <motion.div
          className="flex flex-col justify-center gap-4 sm:flex-row"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
        >
          <motion.button
            onClick={scrollToWork}
            className="rounded-md bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-amber-100"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            data-testid="button-read-work"
          >
            Books
          </motion.button>
          <motion.button
            onClick={scrollToContact}
            className="rounded-md border border-white/60 px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            data-testid="button-work-with-me"
          >
            Contact
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 cursor-pointer text-white/60 transition-colors duration-300 hover:text-white"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={scrollToNext}
        aria-label="Scroll to the next section"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-background to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </section>
  );
}
