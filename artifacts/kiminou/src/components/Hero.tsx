import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GoldParticles from "@/components/LuxuryFX/GoldParticles";
import MagneticElement from "@/components/LuxuryFX/MagneticElement";

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

function GoldDrips() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: "120px", display: "block" }}
      >
        <defs>
          <linearGradient id="goldDripGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldDripGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
          </linearGradient>
          <filter id="dripGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Base wave — the "liquid gold" edge */}
        <motion.path
          d="M0,30 C120,10 200,50 360,20 C520,-10 600,45 720,25 C840,5 950,55 1080,30 C1200,10 1320,50 1440,30 L1440,0 L0,0 Z"
          fill="url(#goldDripGrad)"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Drip 1 */}
        <motion.g filter="url(#dripGlow)">
          <motion.path
            d="M180,25 Q178,60 180,85 Q181,100 180,85"
            stroke="url(#goldDripGrad2)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.9, delay: 2.2, ease: "easeIn" }}
          />
          <motion.ellipse
            cx="180" cy="88" rx="4" ry="5"
            fill="#FBBF24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 0.3, delay: 3.1 }}
          />
        </motion.g>

        {/* Drip 2 */}
        <motion.g filter="url(#dripGlow)">
          <motion.path
            d="M420,18 Q419,55 421,78 Q422,92 420,78"
            stroke="url(#goldDripGrad2)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 0.8, delay: 2.5, ease: "easeIn" }}
          />
          <motion.ellipse
            cx="421" cy="81" rx="3.5" ry="4"
            fill="#F59E0B"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: 0.3, delay: 3.3 }}
          />
        </motion.g>

        {/* Drip 3 — longest */}
        <motion.g filter="url(#dripGlow)">
          <motion.path
            d="M720,22 Q718,70 720,105 Q721,118 720,105"
            stroke="url(#goldDripGrad2)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 2.0, ease: "easeIn" }}
          />
          <motion.ellipse
            cx="720" cy="108" rx="5" ry="6"
            fill="#FCD34D"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 3.1 }}
          />
        </motion.g>

        {/* Drip 4 */}
        <motion.g filter="url(#dripGlow)">
          <motion.path
            d="M950,28 Q949,62 951,84 Q952,95 950,84"
            stroke="url(#goldDripGrad2)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.85, delay: 2.7, ease: "easeIn" }}
          />
          <motion.ellipse
            cx="951" cy="87" rx="4" ry="4.5"
            fill="#F59E0B"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.3, delay: 3.55 }}
          />
        </motion.g>

        {/* Drip 5 */}
        <motion.g filter="url(#dripGlow)">
          <motion.path
            d="M1260,32 Q1259,58 1261,74 Q1262,83 1260,74"
            stroke="url(#goldDripGrad2)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.75 }}
            transition={{ duration: 0.75, delay: 2.9, ease: "easeIn" }}
          />
          <motion.ellipse
            cx="1261" cy="77" rx="3" ry="3.5"
            fill="#FBBF24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.75, scale: 1 }}
            transition={{ duration: 0.3, delay: 3.65 }}
          />
        </motion.g>
      </svg>
    </div>
  );
}

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
      {/* Loading bg */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      )}

      {/* Background photo */}
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

      {/* Base overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />

      {/* Gold vignette edge */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-amber-950/20 via-transparent to-transparent pointer-events-none z-[8]" />

      {/* Ambient golden glow ball */}
      <motion.div
        className="absolute pointer-events-none z-[6]"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gold dust particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <GoldParticles count={55} className="w-full h-full" />
      </div>

      {/* Main content */}
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
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
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
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              {/* KNOX with enhanced 3D gold effect */}
              <span
                className="block overflow-visible text-6xl md:text-8xl lg:text-[10rem] relative"
              >
                {nameLast.split("").map((letter, i) => (
                  <motion.span
                    key={`last-${i}`}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-600 relative"
                    custom={i + nameFirst.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      backgroundSize: "100% 200%",
                      backgroundPosition: "0% 0%",
                      filter: "drop-shadow(0 6px 24px rgba(251,191,36,0.7)) drop-shadow(0 2px 8px rgba(217,119,6,0.9))",
                      transformStyle: "preserve-3d",
                    }}
                    whileHover={{
                      filter: "drop-shadow(0 8px 32px rgba(251,191,36,0.9)) drop-shadow(0 4px 16px rgba(217,119,6,1))",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                {/* Shine sweep across KNOX */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,250,200,0.4) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 3.5, delay: 2.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                />
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
              <MagneticElement strength={0.3} radius={100}>
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
              </MagneticElement>
              <MagneticElement strength={0.3} radius={100}>
                <motion.a
                  href="/contact"
                  className="luxury-button px-12 py-4 border border-white/50 text-white font-semibold uppercase tracking-[0.18em] text-sm hover:bg-white hover:text-black transition-all duration-400 backdrop-blur-sm"
                  whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,1)", boxShadow: "0 20px 50px rgba(255,255,255,0.12)" }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="button-work-with-me"
                >
                  Work With Me
                </motion.a>
              </MagneticElement>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-7 h-7 text-white/40 hover:text-amber-300 transition-colors duration-300" />
        </motion.div>
      </motion.div>

      {/* Gold drips at the bottom edge */}
      <GoldDrips />

      {/* Fade to background */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[25]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.2 }}
      />
    </section>
  );
}
