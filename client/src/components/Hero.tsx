import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToWork = () => {
    window.location.href = '/books';
  };

  const scrollToContact = () => {
    window.location.href = '/contact';
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    setIsVisible(true);
    const img = new Image();
    img.src = '/kiminou-splash-art.png';
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Loading State */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
          <motion.div 
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Background Image with Fade In */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{backgroundImage: "url('/kiminou-splash-art.png')"}}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: imageLoaded ? 1 : 0,
          scale: imageLoaded ? 1 : 1.1
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        data-testid="hero-background"
      />

      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: typeof window !== 'undefined' ? window.innerHeight + 10 : 800
            }}
            animate={{
              y: -10,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 lg:px-8 max-w-4xl mx-auto">
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-sm md:text-base uppercase tracking-[0.3em] text-white/80 font-light">
                Author • Poet • KimYaps
              </span>
            </motion.div>

            <motion.h1 
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-light mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              data-testid="hero-title"
            >
              <span className="block">KIMINOU</span>
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                KNOX
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl font-light mb-8 leading-relaxed max-w-3xl mx-auto text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              data-testid="hero-intro"
            >
              I am a Bay Area raised, New Orleans based author and poet writing books and essays about Black boyhood, faith, love, grief, masculinity, family, and becoming.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.button 
                onClick={scrollToWork}
                className="luxury-button px-8 py-4 bg-white text-black font-medium uppercase tracking-[0.1em] hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-read-work"
              >
                Read the Work
              </motion.button>
              <motion.button 
                onClick={scrollToContact}
                className="luxury-button px-8 py-4 border-2 border-white text-white font-medium uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-work-with-me"
              >
                Work With Me
              </motion.button>
            </motion.div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity }
        }}
        onClick={scrollToNext}
      >
        <ChevronDown className="w-8 h-8 text-white/70 hover:text-white transition-colors" />
      </motion.div>
    </section>
  );
}
