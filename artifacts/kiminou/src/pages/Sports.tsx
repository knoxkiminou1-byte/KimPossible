import { Helmet } from "react-helmet-async";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef, Suspense, useEffect, useState, lazy } from "react";
import { ExternalLink, Trophy, TrendingUp, Target, Zap, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientAudio from "@/components/AmbientAudio";
import { KIMINOU_IMAGES, KIMINOU_SPORTS_IMAGES } from "@/lib/kiminouMedia";
import { breadcrumbSchema, SITE_URL, SITE_SAME_AS } from "@/lib/seo";

const LockerRoom3D = lazy(() => import("@/components/LuxuryFX/LockerRoom3D"));

/* ─── Data ──────────────────────────────────────────────── */
const measurables = [
  { label: "Height", value: "6'8\"", numericEnd: null, sub: "Forward / Center", icon: TrendingUp, source: "NCSA", sourceUrl: "https://www.ncsasports.org" },
  { label: "Weight", value: "235", numericEnd: 235, unit: "lbs", sub: "Elite Athletic Build", icon: Target, source: "NCSA", sourceUrl: "https://www.ncsasports.org" },
  { label: "Position", value: "F / C", numericEnd: null, sub: "Cristo Rey De La Salle", icon: Trophy, source: "MaxPreps", sourceUrl: "https://www.maxpreps.com" },
];

const highlights = [
  { year: "2025", title: "NCAA Eligibility", desc: "Registered with NCAA eligibility for collegiate athletics" },
  { year: "2024", title: "Varsity Captain at Cristo Rey De La Salle", desc: "Led team as captain, demonstrating leadership and athletic excellence on and off the court" },
  { year: "2024", title: "CaliHoop Top Team Selection", desc: "Selected for elite team recognition by CaliHoop, one of the premier AAU evaluation platforms" },
  { year: "2023", title: "Redwood Christian MVP", desc: "Most Valuable Player recognition for outstanding individual performance" },
  { year: "2023", title: "Pine Valley MVP", desc: "Recognized as Most Valuable Player at Pine Valley tournament" },
  { year: "2022", title: "Multi-Sport Athlete", desc: "Competing in basketball and football, demonstrating elite versatility and conditioning" },
];

const profiles = [
  { name: "NCSA Sports", desc: "Complete athletic profile with stats, measurements, and recruiting information", href: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox", testId: "link-profile-ncsa" },
  { name: "MaxPreps", desc: "Public career profile and high school basketball record", href: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc", testId: "link-profile-maxpreps" },
  { name: "Prep Hoops", desc: "Rankings, news, and recruiting analysis for high school athletes", href: "https://prephoops.com/player/kiminou-knox/", testId: "link-profile-prephoops" },
];

/* ─── Particle Mote ──────────────────────────────────────────── */
function Mote({ delay }: { delay: number }) {
  const startX = Math.random() * 100;
  const drift = (Math.random() - 0.5) * 120;
  const size = 1 + Math.random() * 2.5;
  const dur = 8 + Math.random() * 12;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: `${startX}%`, bottom: "-4px",
        background: `rgba(245,158,11,${0.15 + Math.random() * 0.45})`,
        boxShadow: `0 0 ${size * 3}px rgba(245,158,11,0.4)`,
      }}
      animate={{ y: [0, -(900 + Math.random() * 600)], x: [0, drift], opacity: [0, 0.9, 0.7, 0], scale: [0.5, 1.2, 0.8, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: Math.random() * 6, ease: "easeOut" }}
    />
  );
}

function Particles() {
  const motes = Array.from({ length: 22 }, (_, i) => i);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {motes.map((i) => <Mote key={i} delay={i * 0.5} />)}
    </div>
  );
}

/* ─── Scanlines ─────────────────────────────────────────────── */
function Scanlines() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 4,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

/* ─── Glitch Title ────────────────────────────────────────────── */
function GlitchTitle({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 120);
    }, 3400 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);
  return (
    <span className="relative inline-block">
      {text}
      {glitching && (
        <>
          <span className="absolute inset-0 text-red-400/60 pointer-events-none select-none" style={{ clipPath: "inset(20% 0 50% 0)", transform: "translateX(-3px)" }} aria-hidden>{text}</span>
          <span className="absolute inset-0 text-cyan-400/60 pointer-events-none select-none" style={{ clipPath: "inset(55% 0 20% 0)", transform: "translateX(3px)" }} aria-hidden>{text}</span>
        </>
      )}
    </span>
  );
}

/* ─── Character Stagger ─────────────────────────────────────────── */
function CharReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -60 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.55, delay: delay + i * 0.032, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ display: "inline-block", perspective: "600px" }}
          aria-hidden
        >
          {ch === " " ? "\u00a0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Counter Number ──────────────────────────────────────────── */
function CounterNum({ end, duration = 2 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, end, { duration, ease: [0.25, 0.46, 0.45, 0.94], onUpdate: (v) => setDisplay(Math.round(v).toString()) });
    return ctrl.stop;
  }, [inView, end, duration, mv]);
  return <span ref={ref}>{display}</span>;
}

/* ─── Reveal Card ────────────────────────────────────────────── */
function RevealCard({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "scale" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants = {
    up: { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.82 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants[direction]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.75, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Self-drawing Timeline Line ──────────────────────────────────────── */
function TimelineLine() {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });
  return (
    <div ref={wrapRef} className="absolute left-[5.5rem] top-0 bottom-0 w-px hidden md:block">
      <motion.div
        className="absolute top-0 left-0 w-px bg-gradient-to-b from-amber-400/60 to-amber-400/10"
        initial={{ height: 0 }}
        animate={inView ? { height: "100%" } : {}}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

/* ─── Dark overlay section wrapper ─────────────────────────────────── */
function DarkSection({ children, className = "", opacity = 0.65 }: { children: React.ReactNode; className?: string; opacity?: number }) {
  return (
    <section className={`relative ${className}`}>
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${opacity})`, backdropFilter: "blur(2px)" }} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/* ─── MAIN PAGE ────────────────────────────────────────────────────── */
export default function Sports() {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Helmet>
        <title>Kiminou Knox — Basketball Athlete Profile | NCAA Registered, 6'8" Forward/Center</title>
        <meta name="description" content={"Kiminou Knox is a 6'8\" 235lb NCAA-registered basketball athlete (Forward/Center) at Cristo Rey De La Salle. Varsity captain, CaliHoop top-team selection."} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/sports" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.kiminouknox.com/sports" />
        <meta property="og:title" content="Kiminou Knox — Basketball Athlete Profile | NCAA Registered" />
        <meta property="og:description" content={"Kiminou Knox is a 6'8\" 235lb NCAA-registered basketball athlete at Cristo Rey De La Salle. Varsity captain, CaliHoop top-team selection."} />
        <meta property="og:image" content={`${SITE_URL}${KIMINOU_IMAGES.basketballJumpShot.src}`} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <meta name="twitter:creator" content="@KnoxKiminou" />
        <meta name="twitter:title" content="Kiminou Knox — Basketball Athlete Profile" />
        <meta name="twitter:description" content={"6'8\" NCAA-registered athlete. Varsity captain. CaliHoop top-team selection. Cristo Rey De La Salle."} />
        <meta name="twitter:image" content={`${SITE_URL}${KIMINOU_IMAGES.basketballJumpShot.src}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "Person",
            "@id": `${SITE_URL}/#person`, name: "Kiminou Knox",
            url: `${SITE_URL}/sports`, sport: "Basketball",
            height: { "@type": "QuantitativeValue", value: 80, unitCode: "INH" },
            affiliation: [{ "@type": "SportsTeam", name: "Cristo Rey De La Salle Basketball" }],
            memberOf: [{ "@type": "Organization", name: "NCAA", url: "https://www.ncaa.org" }],
            sameAs: SITE_SAME_AS,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Sports & Athletics", url: `${SITE_URL}/sports` }]))}
        </script>
      </Helmet>

      {/* ── 3D locker room canvas (fixed, behind everything) ── */}
      <Suspense fallback={
        <div className="fixed inset-0 bg-[#080a0c]" style={{ zIndex: 0 }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.008)_0px,rgba(255,255,255,0.008)_1px,transparent_1px,transparent_80px),repeating-linear-gradient(0deg,rgba(255,255,255,0.008)_0px,rgba(255,255,255,0.008)_1px,transparent_1px,transparent_80px)]" />
        </div>
      }>
        <LockerRoom3D />
      </Suspense>

      {/* ── Ambient overlays ── */}
      <Scanlines />
      <Particles />

      <Header />

      <div ref={containerRef} className="relative" style={{ zIndex: 2 }}>
        <main className="min-h-screen text-white">

          {/* ══════════════════════════════════════
              HERO — full viewport, glass overlay
          ══════════════════════════════════════ */}
          <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
          >
            {/* Subtle dark pool in center so text is legible */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
            />

            {/* Corner brackets */}
            {["top-28 left-6 lg:left-10", "top-28 right-6 lg:right-10"].map((pos, i) => (
              <motion.div key={i} className={`absolute ${pos} w-10 h-10 pointer-events-none`}
                initial={{ opacity: 0, scale: 0 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}>
                <div className={`absolute top-0 ${i === 0 ? "left-0" : "right-0"} w-full h-[1.5px] bg-amber-400/60`} />
                <div className={`absolute top-0 ${i === 0 ? "left-0" : "right-0"} w-[1.5px] h-full bg-amber-400/60`} />
              </motion.div>
            ))}

            <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-40 pb-32">
              {/* Label */}
              <motion.p className="text-xs uppercase tracking-[0.5em] text-amber-400/70 mb-8 font-medium"
                initial={{ opacity: 0, x: -20 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}>
                ◆ Athletic Profile ◆
              </motion.p>

              {/* Giant heading */}
              <h1 className="font-serif font-light leading-none mb-6" style={{ fontSize: "clamp(4rem,12vw,10rem)" }} data-testid="sports-heading">
                <span className="block overflow-hidden">
                  <CharReveal text="Sports &" className="text-white" delay={0.35} />
                </span>
                <span className="block overflow-hidden">
                  <CharReveal text="Athletics" className="italic text-amber-200/90" delay={0.6} />
                </span>
              </h1>

              {/* Animated gold rule */}
              <motion.div className="flex items-center gap-3 mb-10"
                initial={{ opacity: 0, scaleX: 0 }} animate={heroInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 1.0 }} style={{ transformOrigin: "left center" }}>
                <div className="w-20 h-px bg-gradient-to-r from-amber-400 to-amber-400/30" />
                <div className="w-2 h-2 rounded-full bg-amber-400/60" />
              </motion.div>

              <motion.p className="text-lg text-white/55 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 1.15 }}>
                Multi-sport athlete with varsity experience, NCAA eligibility, and verified profiles on every major recruiting platform.
              </motion.p>

              {/* Stat pills */}
              <motion.div className="flex flex-wrap gap-4 mt-10"
                initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 1.3 }}>
                {["6'8\"", "235 lbs", "F / C", "NCAA Eligible"].map((badge) => (
                  <motion.span key={badge}
                    className="px-4 py-1.5 border border-amber-400/35 text-amber-300/80 text-xs uppercase tracking-[0.2em] font-medium"
                    style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
                    whileHover={{ scale: 1.06, borderColor: "rgba(245,158,11,0.7)", color: "rgba(245,215,60,1)" }}
                    transition={{ type: "spring", stiffness: 300 }}>
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              style={{ opacity: scrollIndicatorOpacity }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 2, duration: 0.6 }}>
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">Scroll</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                <ChevronDown className="w-4 h-4 text-amber-400/50" />
              </motion.div>
            </motion.div>
          </section>

          {/* ══════════════════════════════════════
              VISUAL RECORD — photo grid
          ══════════════════════════════════════ */}
          <DarkSection opacity={0.72} className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <RevealCard className="mb-14">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-3 font-medium">Visual Record</p>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-white">
                  <GlitchTitle text="Basketball, Football, Discipline" />
                </h2>
                <div className="w-12 h-px bg-amber-400/40 mt-5" />
              </RevealCard>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {KIMINOU_SPORTS_IMAGES.map((image, i) => {
                  const spans = ["md:col-span-5 md:row-span-2", "md:col-span-4", "md:col-span-3", "md:col-span-7", "md:col-span-5"];
                  const dirs: Array<"up" | "left" | "right" | "scale"> = ["scale", "right", "up", "left", "up"];
                  return (
                    <RevealCard key={image.src} delay={i * 0.08} direction={dirs[i] ?? "up"} className={spans[i] ?? "md:col-span-4"}>
                      <motion.figure className="group relative overflow-hidden border border-white/10 bg-black min-h-[280px] h-full"
                        whileHover={{ scale: 1.015 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                        <motion.img src={image.src} alt={image.alt} width={image.width} height={image.height}
                          loading={i === 0 ? "eager" : "lazy"} decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                          whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: "easeOut" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-[9px] uppercase tracking-[0.25em] text-amber-400/80 truncate">{image.title}</p>
                        </div>
                      </motion.figure>
                    </RevealCard>
                  );
                })}
              </div>
            </div>
          </DarkSection>

          {/* ══════════════════════════════════════
              MEASURABLES
          ══════════════════════════════════════ */}
          <DarkSection opacity={0.6} className="py-28">
            {/* Animated horizontal scan lines */}
            {[0, 50, 100].map((pct, i) => (
              <motion.div key={i} className="absolute left-0 right-0 h-px pointer-events-none"
                style={{ top: `${pct}%`, background: "linear-gradient(90deg,transparent,rgba(245,158,11,0.08),transparent)" }}
                animate={{ opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }} />
            ))}
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <RevealCard className="mb-16">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-3 font-medium">Measurables</p>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-white">Physical Profile</h2>
                <div className="w-12 h-px bg-amber-400/40 mt-5" />
              </RevealCard>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {measurables.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <RevealCard key={m.label} delay={i * 0.12} direction="scale" className="group">
                      <motion.div className="relative border border-white/10 p-10 flex flex-col gap-4 overflow-hidden cursor-default"
                        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(16px)" }}
                        whileHover={{ borderColor: "rgba(245,158,11,0.5)", boxShadow: "0 0 30px rgba(245,158,11,0.08)" }}
                        transition={{ duration: 0.3 }}>
                        <motion.div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                          style={{ background: "radial-gradient(circle,rgba(245,158,11,0.12),transparent 70%)" }} />
                        <Icon className="w-7 h-7 text-amber-400/50 group-hover:text-amber-400 transition-colors duration-300" />
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-2">{m.label}</p>
                          <p className="font-serif font-light text-white mb-1" style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
                            {m.numericEnd != null ? (
                              <><CounterNum end={m.numericEnd} />{(m as { unit?: string }).unit && <span className="text-2xl text-white/60 ml-1">{(m as { unit?: string }).unit}</span>}</>
                            ) : m.value}
                          </p>
                          <p className="text-sm text-white/40">{m.sub}</p>
                        </div>
                        <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-amber-400/45 hover:text-amber-400 transition-colors duration-200 mt-auto">
                          Verified by {m.source} →
                        </a>
                        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400/60 to-transparent"
                          initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.15 }} />
                      </motion.div>
                    </RevealCard>
                  );
                })}
              </div>
            </div>
          </DarkSection>

          {/* ══════════════════════════════════════
              LOCKER ROOM QUOTE — transparent section
              (no overlay — lets 3D breathe through)
          ══════════════════════════════════════ */}
          <section className="relative py-40 flex flex-col items-center justify-center text-center px-8">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%,rgba(0,0,0,0.7) 0%,transparent 100%)" }} />
            <div className="relative z-10">
              <motion.p className="text-xs uppercase tracking-[0.45em] text-amber-400/60 mb-5"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}>In The Locker Room</motion.p>
              <motion.h2 className="font-serif font-light text-white leading-tight max-w-3xl"
                style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}>
                "The work is<br /><span className="italic text-amber-200/90">the prayer."</span>
              </motion.h2>
              <motion.div className="w-16 h-px bg-amber-400/50 mt-8 mx-auto"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }} style={{ transformOrigin: "center" }} />
              <motion.p className="text-sm text-white/30 mt-4 uppercase tracking-[0.3em]"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}>
                Kiminou Knox — Ygnacio Valley
              </motion.p>
            </div>
          </section>

          {/* ══════════════════════════════════════
              CAREER TIMELINE
          ══════════════════════════════════════ */}
          <DarkSection opacity={0.7} className="py-28">
            {[15, 45, 75].map((left, i) => (
              <motion.div key={i} className="absolute top-0 bottom-0 pointer-events-none overflow-hidden" style={{ left: `${left}%`, width: 1 }}>
                <motion.div className="absolute top-0 w-px bg-gradient-to-b from-transparent via-amber-400/8 to-transparent"
                  style={{ height: "100%" }}
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 6, delay: i * 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }} />
              </motion.div>
            ))}
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <RevealCard className="mb-16">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-3 font-medium">Career</p>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-white">Highlights</h2>
                <div className="w-12 h-px bg-amber-400/40 mt-5" />
              </RevealCard>
              <div className="relative">
                <TimelineLine />
                <div className="space-y-0">
                  {highlights.map((h, i) => (
                    <RevealCard key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                      <motion.div className="group flex gap-8 items-start border-t border-white/8 py-8"
                        whileHover={{ borderColor: "rgba(245,158,11,0.3)" }} transition={{ duration: 0.25 }}>
                        <span className="font-serif text-sm text-amber-400/45 w-20 shrink-0 pt-1 text-right group-hover:text-amber-400/90 transition-colors duration-300 hidden md:block">{h.year}</span>
                        <motion.div className="hidden md:flex items-center justify-center w-3 h-3 rounded-full border border-white/20 bg-black mt-1.5 shrink-0 relative z-10"
                          whileHover={{ borderColor: "rgba(245,158,11,0.8)", backgroundColor: "rgba(245,158,11,0.15)", scale: 1.5 }}
                          transition={{ type: "spring", stiffness: 300 }} />
                        <div className="flex-1">
                          <span className="text-xs text-amber-400/50 mb-2 block md:hidden">{h.year}</span>
                          <h3 className="font-serif text-xl md:text-2xl font-light text-white mb-2 group-hover:text-amber-100 transition-colors duration-300" data-testid={`highlight-${i}`}>{h.title}</h3>
                          <p className="text-sm text-white/40 leading-relaxed">{h.desc}</p>
                        </div>
                      </motion.div>
                    </RevealCard>
                  ))}
                </div>
              </div>
            </div>
          </DarkSection>

          {/* ══════════════════════════════════════
              VERIFIED PROFILES
          ══════════════════════════════════════ */}
          <DarkSection opacity={0.75} className="py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <RevealCard className="mb-16">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-3 font-medium">Recruiting</p>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-white">Verified Profiles</h2>
                <div className="w-12 h-px bg-amber-400/40 mt-5" />
              </RevealCard>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {profiles.map((p, i) => (
                  <RevealCard key={p.name} delay={i * 0.12} direction="scale">
                    <motion.a href={p.href} target="_blank" rel="noopener noreferrer external"
                      className="group block p-8 relative overflow-hidden"
                      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}
                      whileHover={{ y: -8, borderColor: "rgba(245,158,11,0.5)", boxShadow: "0 20px 60px rgba(0,0,0,0.5),0 0 30px rgba(245,158,11,0.06)" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      data-testid={p.testId}>
                      <div className="flex items-start justify-between mb-5 relative z-10">
                        <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                          <Zap className="w-6 h-6 text-amber-400/50 group-hover:text-amber-400 transition-colors duration-300" />
                        </motion.div>
                        <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-amber-400/70 transition-colors duration-300" />
                      </div>
                      <h3 className="font-serif text-xl font-light text-white mb-3 group-hover:text-amber-100 transition-colors duration-300 relative z-10">{p.name}</h3>
                      <p className="text-sm text-white/38 leading-relaxed mb-5 relative z-10">{p.desc}</p>
                      <div className="flex items-center gap-2 relative z-10">
                        <span className="text-xs uppercase tracking-[0.2em] text-amber-400/55 group-hover:text-amber-400 transition-colors duration-300">View Profile</span>
                        <motion.span className="text-amber-400/55 group-hover:text-amber-400"
                          animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>→</motion.span>
                      </div>
                      <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400/70 to-amber-400/20"
                        initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4 + i * 0.15 }} />
                    </motion.a>
                  </RevealCard>
                ))}
              </div>
            </div>
          </DarkSection>

        </main>
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <Footer />
      </div>
      <AmbientAudio theme="sports" />
    </>
  );
}
