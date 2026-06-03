import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GoldParticles from "@/components/LuxuryFX/GoldParticles";

const ROLE_WORDS = [
  { word: "ATHLETE", from: { x: -340, y: 0, rotate: -8, filter: "blur(18px)" }, delay: 0.0 },
  { word: "AUTHOR", from: { x: 0, y: -180, rotate: 6, filter: "blur(18px)" }, delay: 0.18 },
  { word: "ENTREPRENEUR", from: { x: 340, y: 0, rotate: -5, filter: "blur(18px)" }, delay: 0.34 },
];

function KineticRoles() {
  return (
    <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap">
      {ROLE_WORDS.map(({ word, from, delay }, idx) => (
        <div key={word} className="flex items-center gap-3 md:gap-5">
          <motion.span
            className="text-[10px] md:text-xs uppercase tracking-[0.38em] text-amber-200/85 font-semibold will-change-transform"
            initial={{ ...from, opacity: 0, scale: 1.35 }}
            animate={{ x: 0, y: 0, rotate: 0, filter: "blur(0px)", opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 13,
              delay: 0.3 + delay,
              opacity: { duration: 0.18, delay: 0.3 + delay },
              filter: { duration: 0.28, delay: 0.3 + delay },
              scale: { type: "spring", stiffness: 280, damping: 11, delay: 0.3 + delay },
            }}
          >
            {word}
          </motion.span>
          {idx < ROLE_WORDS.length - 1 && (
            <motion.span
              className="text-amber-400/40 text-[10px] select-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 + delay, duration: 0.4, ease: "backOut" }}
            >
              ·
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 90, rotateX: -90, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 95 - i * 2.5,
      damping: 11 + i * 0.4,
      delay: 0.4 + i * 0.058,
    },
  }),
};

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 160]);
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.12]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.45, 0.92]);
  const contentY = useTransform(scrollY, [0, 500], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 360], [1, 0]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x: cx, y: cy });
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const img = new Image();
    img.src = "/kiminou-splash-art.png";
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);

    const el = sectionRef.current;
    el?.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const nameFirst = "KIMINOU";
  const nameLast = "KNOX";

  const tiltX = mouse.y * -12;
  const tiltY = mouse.x * 12;
  const bgOffsetX = mouse.x * -18;
  const bgOffsetY = mouse.y * -10;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
      style={{ perspective: "1200px" }}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 border-2 border-amber-400/30 border-t-amber-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/kiminou-splash-art.png')",
          y: bgY,
          scale: bgScale,
          x: bgOffsetX,
          translateY: bgOffsetY,
          rotateX: tiltX * 0.3,
          rotateY: tiltY * 0.3,
        }}
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 1.15 }}
        transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        data-testid="hero-background"
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />

      {/* Floating gold dust particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <GoldParticles count={45} className="w-full h-full" />
      </div>

      <motion.div
        className="relative z-10 text-center text-white px-6 lg:px-8 max-w-5xl mx-auto"
        style={{
          y: contentY,
          opacity: contentOpacity,
          rotateX: tiltX * 0.15,
          rotateY: tiltY * 0.15,
          transformStyle: "preserve-3d",
        }}
      >
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.15 }}
              className="mb-10"
            >
              <KineticRoles />
            </motion.div>

            <motion.h1
              className="font-serif font-light mb-8 leading-none"
              style={{ perspective: 1000 }}
              data-testid="hero-title"
            >
              <span
                className="block overflow-hidden mb-1 text-6xl md:text-8xl lg:text-[10rem]"
                style={{ textShadow: "0 4px 32px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5)" }}
              >
                {nameFirst.split("").map((letter, i) => (
                  <motion.span
                    key={`first-${i}`}
                    className="inline-block text-white"
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span
                className="block overflow-hidden text-6xl md:text-8xl lg:text-[10rem]"
                style={{ textShadow: "0 4px 32px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)" }}
              >
                {nameLast.split("").map((letter, i) => (
                  <motion.span
                    key={`last-${i}`}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300"
                    custom={i + nameFirst.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      backgroundSize: "200% 200%",
                      filter: "drop-shadow(0 4px 16px rgba(251,191,36,0.6))",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.div
              className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.3 }}
            />

            <motion.p
              className="text-base md:text-xl font-light mb-12 leading-relaxed max-w-2xl mx-auto text-white/90"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 1.2 }}
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}
              data-testid="hero-intro"
            >
              A Bay Area writer and basketball athlete building a legacy through books, sport, and youth leadership.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.5 }}
            >
              <motion.a
                href="/books"
                className="group relative luxury-button px-12 py-4 bg-white text-black font-semibold uppercase tracking-[0.18em] text-sm overflow-hidden"
                whileHover={{ scale: 1.04, boxShadow: "0 20px 60px rgba(255,255,255,0.22)" }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-read-work"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.35 }}
                />
                <span className="relative z-10">Read the Work</span>
              </motion.a>
              <motion.a
                href="/contact"
                className="luxury-button px-12 py-4 border border-white/50 text-white font-semibold uppercase tracking-[0.18em] text-sm hover:bg-white hover:text-black transition-all duration-400 backdrop-blur-sm"
                whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,1)", boxShadow: "0 20px 50px rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-work-with-me"
              >
                Work With Me
              </motion.a>
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-7 h-7 text-white/40 hover:text-amber-300 transition-colors duration-300" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.2 }}
      />
    </section>
  );
}
