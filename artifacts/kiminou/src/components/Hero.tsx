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

const DRIP_STREAMS = [
  { x: 145, y: 23, length: 120, width: 5, delay: 0.2, duration: 8.8, hue: "#FCD34D" },
  { x: 318, y: 18, length: 82, width: 3.5, delay: 1.8, duration: 9.5, hue: "#F59E0B" },
  { x: 534, y: 28, length: 142, width: 6, delay: 0.8, duration: 10.8, hue: "#FFE7A3" },
  { x: 724, y: 19, length: 156, width: 7, delay: 2.6, duration: 11.6, hue: "#FCD34D" },
  { x: 912, y: 30, length: 98, width: 4.5, delay: 1.2, duration: 9.8, hue: "#FBBF24" },
  { x: 1106, y: 22, length: 132, width: 5.5, delay: 3.2, duration: 12.4, hue: "#FFE7A3" },
  { x: 1296, y: 26, length: 86, width: 3.8, delay: 2.1, duration: 10.2, hue: "#F59E0B" },
];

function GoldDrips() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: "clamp(140px, 18vw, 190px)", display: "block" }}
      >
        <defs>
          <linearGradient id="moltenGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF7C2" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#FCD34D" stopOpacity="0.98" />
            <stop offset="58%" stopColor="#D97706" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#5B2300" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="moltenTrail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF7C2" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="liquidShine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFBEA" stopOpacity="0.9" />
            <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="dropBead" cx="45%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#FDE68A" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#D97706" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0.55" />
          </radialGradient>
          <filter id="moltenGlow" x="-10%" y="-25%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.9  0 0.62 0 0 0.28  0 0 0.2 0 0  0 0 0 0.78 0"
              result="goldGlow"
            />
            <feMerge>
              <feMergeNode in="goldGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="moltenClip">
            <path d="M0,18 C110,6 190,38 316,22 C470,3 575,45 720,24 C868,2 982,42 1118,25 C1250,8 1344,38 1440,21 L1440,0 L0,0 Z" />
          </clipPath>
        </defs>

        {/* Breathing molten-gold edge */}
        <motion.path
          filter="url(#moltenGlow)"
          fill="url(#moltenGold)"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: [0, 5, 1, 7, 0],
            d: [
              "M0,18 C110,6 190,38 316,22 C470,3 575,45 720,24 C868,2 982,42 1118,25 C1250,8 1344,38 1440,21 L1440,0 L0,0 Z",
              "M0,24 C118,10 205,44 326,19 C476,8 596,35 724,31 C858,12 982,48 1122,20 C1252,3 1340,43 1440,28 L1440,0 L0,0 Z",
              "M0,17 C132,1 218,35 334,26 C480,14 592,52 720,21 C856,0 1000,35 1126,31 C1268,14 1350,36 1440,18 L1440,0 L0,0 Z",
              "M0,22 C100,14 188,45 314,18 C462,0 582,42 718,29 C850,15 972,50 1116,22 C1238,7 1344,45 1440,23 L1440,0 L0,0 Z",
              "M0,18 C110,6 190,38 316,22 C470,3 575,45 720,24 C868,2 982,42 1118,25 C1250,8 1344,38 1440,21 L1440,0 L0,0 Z",
            ],
          }}
          transition={{
            opacity: { duration: 1.4, delay: 1.2 },
            y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
            d: { duration: 13.5, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Specular glass sweep, clipped inside the liquid edge */}
        <motion.rect
          x="-720"
          y="-8"
          width="520"
          height="88"
          fill="url(#liquidShine)"
          clipPath="url(#moltenClip)"
          initial={{ opacity: 0 }}
          animate={{ x: [-720, 1580], opacity: [0, 0.75, 0] }}
          transition={{ duration: 7.5, delay: 2.1, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
        />

        {/* Wet lip highlight */}
        <motion.path
          d="M0,21 C110,8 190,40 316,24 C470,5 575,47 720,26 C868,4 982,44 1118,27 C1250,10 1344,40 1440,23"
          stroke="rgba(255,250,220,0.78)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.95, 0.5] }}
          transition={{ duration: 5.8, delay: 1.65, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
        />

        {DRIP_STREAMS.map((drip, index) => {
          const mid = drip.y + drip.length * 0.55;
          const end = drip.y + drip.length;
          const sway = index % 2 === 0 ? 8 : -8;
          const path = `M${drip.x},${drip.y} C${drip.x + sway},${mid * 0.72} ${drip.x - sway * 0.55},${mid} ${drip.x},${end}`;

          return (
            <motion.g key={drip.x} filter="url(#moltenGlow)">
              <motion.path
                d={path}
                stroke="url(#moltenTrail)"
                strokeWidth={drip.width}
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 0.72, 1, 0.82, 0],
                  opacity: [0, 0.92, 1, 0.72, 0],
                }}
                transition={{
                  duration: drip.duration,
                  delay: 1.6 + drip.delay,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d={path}
                stroke="rgba(255,255,245,0.72)"
                strokeWidth={Math.max(1, drip.width * 0.24)}
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0.42, 0.58, 0], opacity: [0, 0.9, 0.6, 0] }}
                transition={{
                  duration: drip.duration * 0.72,
                  delay: 2 + drip.delay,
                  repeat: Infinity,
                  repeatDelay: 3.1,
                  ease: "easeInOut",
                }}
              />
              <motion.ellipse
                cx={drip.x}
                cy={drip.y}
                rx={drip.width * 1.45}
                ry={drip.width * 2.05}
                fill="url(#dropBead)"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  y: [0, drip.length * 0.5, drip.length + 16],
                  x: [0, sway * 0.16, -sway * 0.25],
                  scale: [0.35, 1, 0.72],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: drip.duration * 0.78,
                  delay: 2.2 + drip.delay,
                  repeat: Infinity,
                  repeatDelay: 2.25,
                  ease: "easeIn",
                }}
              />
              <motion.circle
                cx={drip.x - drip.width * 0.35}
                cy={drip.y - drip.width * 0.2}
                r={Math.max(1.1, drip.width * 0.34)}
                fill="white"
                initial={{ opacity: 0 }}
                animate={{
                  y: [0, drip.length * 0.5, drip.length + 16],
                  opacity: [0, 0.85, 0],
                }}
                transition={{
                  duration: drip.duration * 0.78,
                  delay: 2.2 + drip.delay,
                  repeat: Infinity,
                  repeatDelay: 2.25,
                  ease: "easeIn",
                }}
              />
            </motion.g>
          );
        })}
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
