import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ambientParticles = [
  { left: "8%", top: "22%", size: 6, delay: 0.2, duration: 13 },
  { left: "18%", top: "70%", size: 4, delay: 0.8, duration: 11 },
  { left: "29%", top: "40%", size: 5, delay: 1.4, duration: 14 },
  { left: "42%", top: "18%", size: 4, delay: 2.1, duration: 12 },
  { left: "56%", top: "62%", size: 5, delay: 0.5, duration: 15 },
  { left: "68%", top: "32%", size: 6, delay: 2.7, duration: 10 },
  { left: "78%", top: "76%", size: 4, delay: 1.9, duration: 12 },
  { left: "88%", top: "24%", size: 5, delay: 3.1, duration: 14 },
];

const letterVariants = {
  hidden: { opacity: 0, y: 32, rotateX: -90 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.75,
      delay: 0.45 + index * 0.045,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToWork = () => {
    window.location.href = "/books";
  };

  const scrollToContact = () => {
    window.location.href = "/contact";
  };

  const scrollToNext = () => {
    document.getElementById("who-is-kiminou")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nameFirst = "KIMINOU";
  const nameLast = "KNOX";

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

      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {ambientParticles.map((particle, index) => (
            <motion.div
              key={`${particle.left}-${particle.top}`}
              className="absolute rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                background: "radial-gradient(circle, rgba(255,215,140,0.55), transparent 70%)",
              }}
              initial={{ opacity: 0.15, y: 0 }}
              animate={{ opacity: [0.15, 0.5, 0.2], y: [0, -14, -4] }}
              transition={{
                duration: particle.duration,
                delay: particle.delay + index * 0.1,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white lg:px-8"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {isVisible && (
          <>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-4">
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent to-amber-300/60"
                  initial={shouldReduceMotion ? false : { width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                />
                <span className="text-sm font-light uppercase tracking-[0.4em] text-amber-100/90 md:text-base">
                  Athlete • Author • Entrepreneur
                </span>
                <motion.div
                  className="h-px bg-gradient-to-l from-transparent to-amber-300/60"
                  initial={shouldReduceMotion ? false : { width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                />
              </div>
            </motion.div>

            <motion.h1
              className="mb-8 font-serif text-6xl font-light md:text-8xl lg:text-9xl"
              style={{ perspective: 800 }}
              data-testid="hero-title"
            >
              <span className="mb-2 block overflow-hidden">
                {nameFirst.split("").map((letter, index) => (
                  <motion.span
                    key={`first-${index}`}
                    className="inline-block"
                    custom={index}
                    variants={letterVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="visible"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden">
                {nameLast.split("").map((letter, index) => (
                  <motion.span
                    key={`last-${index}`}
                    className="inline-block bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-100 bg-clip-text text-transparent"
                    custom={index + nameFirst.length}
                    variants={letterVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="visible"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.div
              className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent"
              initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.05 }}
            />

            <motion.p
              className="mx-auto mb-10 max-w-3xl text-lg font-light leading-relaxed text-white/90 md:text-xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.9 }}
              data-testid="hero-intro"
            >
              I am a Bay Area writer and basketball athlete building a legacy through books, sport, and youth leadership.
            </motion.p>

            <motion.div
              className="flex flex-col justify-center gap-6 sm:flex-row"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <motion.button
                onClick={scrollToWork}
                className="group relative overflow-hidden px-10 py-4 font-medium uppercase tracking-[0.15em] text-black"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04, boxShadow: "0 25px 50px rgba(255,255,255,0.25)" }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                data-testid="button-read-work"
              >
                <span className="absolute inset-0 bg-white" />
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-400"
                  initial={shouldReduceMotion ? false : { x: "-100%" }}
                  whileHover={shouldReduceMotion ? undefined : { x: 0 }}
                  transition={{ duration: 0.35 }}
                />
                <span className="relative z-10">Read the Work</span>
              </motion.button>
              <motion.button
                onClick={scrollToContact}
                className="border-2 border-white/60 px-10 py-4 font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-white hover:text-black"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04, borderColor: "rgba(255,255,255,1)", boxShadow: "0 25px 50px rgba(255,255,255,0.15)" }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                data-testid="button-work-with-me"
              >
                Work With Me
              </motion.button>
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.button
        type="button"
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 cursor-pointer text-white/60 transition-colors duration-300 hover:text-white"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
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
