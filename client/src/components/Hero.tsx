import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-36 text-white lg:px-10" data-testid="hero-section">
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

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: 0.08 }}
        >
          <motion.p variants={fadeUp} className="luxury-kicker mb-6">
            Athlete • Author • Entrepreneur
          </motion.p>

          <motion.h1 variants={fadeUp} className="luxury-heading mb-6 font-serif text-5xl font-light md:text-7xl lg:text-8xl" data-testid="hero-title">
            Kiminou Knox
          </motion.h1>

          <motion.p variants={fadeUp} className="mb-8 max-w-2xl text-base leading-relaxed text-amber-50/84 md:text-xl" data-testid="hero-intro">
            I write from faith. I train with discipline. I build for legacy. This is a living body of work where literature,
            athletic excellence, and spiritual conviction meet.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link href="/books" className="luxury-button inline-flex items-center rounded-full border border-amber-100/20 bg-amber-100/95 px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-black" data-testid="button-read-work">
              Read the Work
            </Link>
            <Link href="/contact" className="luxury-button inline-flex items-center rounded-full border border-amber-100/35 bg-black/35 px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-50" data-testid="button-work-with-me">
              Work With Me
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center lg:justify-end"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.45, delay: 0.15 }}
        >
          <div className="relative">
            <div className="hero-sigil" aria-hidden="true">
              <img src="/k-logo-3d.png" alt="" className="hero-sigil-image" />
            </div>
            <p className="mt-5 text-center text-[0.62rem] uppercase tracking-[0.32em] text-amber-100/70">
              Box K Monogram
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
