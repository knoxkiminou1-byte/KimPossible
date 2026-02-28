import { useEffect } from "react";

export default function Hero() {
  const scrollToWork = () => {
    window.location.href = '/books';
  };

  const scrollToContact = () => {
    window.location.href = '/contact';
  };

  useEffect(() => {}, []);

  const nameFirst = "KIMINOU";
  const nameLast = "KNOX";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Cinematic Image Background */}
      <div className="hero-media absolute inset-0" aria-hidden="true">
        <img
          src="/kiminou-hero.png"
          alt=""
          className="hero-image"
          loading="eager"
          decoding="async"
        />
        <div className="hero-gradient" />
        <div className="hero-vignette" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: `radial-gradient(circle, rgba(255,215,0,${Math.random() * 0.5 + 0.2}), transparent)`,
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: typeof window !== 'undefined' ? window.innerHeight + 10 : 800
            }}
            animate={{
              y: -10,
              opacity: [0, 1, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </motion.div>

      <motion.div 
        className="relative z-10 text-center text-white px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center gap-4"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent to-amber-300/60"
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <span className="text-sm md:text-base uppercase tracking-[0.4em] text-amber-200/90 font-light">
                  Athlete • Author • Entrepreneur
                </span>
                <motion.div
                  className="h-px bg-gradient-to-l from-transparent to-amber-300/60"
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
            </motion.div>

            <motion.h1 
              className="font-serif text-6xl md:text-8xl lg:text-9xl font-light mb-8"
              style={{ perspective: 800 }}
              data-testid="hero-title"
            >
              <span className="block overflow-hidden mb-2">
                {nameFirst.split("").map((letter, i) => (
                  <motion.span
                    key={`first-${i}`}
                    className="inline-block"
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden">
                {nameLast.split("").map((letter, i) => (
                  <motion.span
                    key={`last-${i}`}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200"
                    custom={i + nameFirst.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-8"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.4 }}
            />

            <motion.p 
              className="text-lg md:text-xl font-light mb-10 leading-relaxed max-w-3xl mx-auto text-white/90"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 1.2 }}
              data-testid="hero-intro"
            >
              I am a Bay Area writer and basketball athlete building a legacy through books, sport, and youth leadership.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.button 
                onClick={scrollToWork}
                className="group relative luxury-button px-10 py-4 bg-white text-black font-medium uppercase tracking-[0.15em] overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-read-work"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10">Read the Work</span>
              </motion.button>
              <motion.button 
                onClick={scrollToContact}
                className="luxury-button px-10 py-4 border-2 border-white/60 text-white font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,1)", boxShadow: "0 25px 50px rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-work-with-me"
              >
                Work With Me
              </motion.button>
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToNext}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/50 hover:text-white transition-colors duration-300" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
}
