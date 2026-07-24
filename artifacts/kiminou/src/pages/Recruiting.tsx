import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Download, ExternalLink, Trophy } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { KIMINOU_IMAGES } from "@/lib/kiminouMedia";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

const MEASURABLES = [
  { label: "Height", value: "6'8\"", source: "NCSA" },
  { label: "Weight", value: "235 lbs", source: "NCSA" },
  { label: "Position", value: "Forward / Center", source: "MaxPreps" },
  { label: "Class", value: "2025", source: "NCSA" },
  { label: "School", value: "Cristo Rey De La Salle", source: "MaxPreps" },
  { label: "Status", value: "NCAA Registered & Eligible", source: "NCSA" },
];

const HIGHLIGHTS = [
  { year: "2025", title: "NCAA Eligibility", desc: "Registered with NCAA eligibility for collegiate athletics." },
  { year: "2024", title: "Varsity Captain", desc: "Led Cristo Rey De La Salle as captain, on and off the court." },
  { year: "2024", title: "CaliHoop Top Team Selection", desc: "Selected for elite team recognition by CaliHoop, a premier AAU evaluation platform." },
  { year: "2023", title: "Redwood Christian MVP", desc: "Most Valuable Player recognition for outstanding individual performance." },
  { year: "2023", title: "Pine Valley MVP", desc: "Recognized as Most Valuable Player at the Pine Valley tournament." },
  { year: "2022", title: "Multi-Sport Athlete", desc: "Competing in basketball and football, elite versatility and conditioning." },
];

const VERIFIED_PROFILES = [
  { name: "NCSA Recruiting Profile", desc: "Measurements, position, school, and NCAA eligibility signal", url: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox" },
  { name: "MaxPreps Career Profile", desc: "Public career profile, stats, and game log", url: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc" },
  { name: "Prep Hoops Profile", desc: "Rankings, scouting notes, and recruiting analysis", url: "https://prephoops.com/player/kiminou-knox/" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Recruiting() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "@id": `${SITE_URL}/sports/recruiting#profile`,
    "athlete": {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      "name": "Kiminou Knox",
    },
  };

  return (
    <>
      <Helmet>
        <title>Athlete Recruiting Packet — Kiminou Knox</title>
        <meta
          name="description"
          content="Kiminou Knox recruiting profile: measurables, school, verified NCSA/MaxPreps/Prep Hoops profiles, athletic highlights, and coach contact information."
        />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/sports/recruiting`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Athlete Recruiting Packet — Kiminou Knox" />
        <meta property="og:description" content="Measurables, verified profiles, athletic highlights, and coach contact information." />
        <meta property="og:url" content={`${SITE_URL}/sports/recruiting`} />
        <meta property="og:image" content={KIMINOU_IMAGES.basketballJumpShot.src} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Athletics", url: `${SITE_URL}/sports` },
            { name: "Recruiting Packet", url: `${SITE_URL}/sports/recruiting` },
          ]))}
        </script>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="relative pt-40 pb-16 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/4 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <Link href="/sports" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/30 hover:text-amber-400/60 transition-colors duration-300 mb-8">
                <ArrowLeft className="w-3 h-3" /> Athletic Profile
              </Link>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Recruiting Packet</p>
              <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-6">
                Kiminou <span className="italic text-amber-200/90">Knox</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Forward / Center · Cristo Rey De La Salle · NCAA Registered & Eligible. Measurables, verified profiles, and direct contact for coaches and recruiters.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── MEASURABLES ── */}
        <section className="pb-20 border-t border-white/6">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-16">
            <Reveal className="mb-10">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/40 mb-2">Measurables</p>
              <div className="w-8 h-px bg-amber-400/30 mt-4" />
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/6">
              {MEASURABLES.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.06}>
                  <div className="bg-black p-6 h-full">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/25 mb-2">{m.label}</p>
                    <p className="font-serif text-2xl text-white/90">{m.value}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/40 mt-2">Source: {m.source}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HIGHLIGHTS ── */}
        <section className="pb-20 border-t border-white/6">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-16">
            <Reveal className="mb-10">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/40 mb-2">Highlights</p>
              <div className="w-8 h-px bg-amber-400/30 mt-4" />
            </Reveal>
            <div className="space-y-0">
              {HIGHLIGHTS.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.05}>
                  <div className="flex items-start gap-6 py-6 border-t border-white/8 first:border-t-0">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400/50 w-16 flex-shrink-0 pt-1">
                      <Trophy className="w-3.5 h-3.5" /> {h.year}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-white/90 mb-1">{h.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FILM ── */}
        <section className="pb-20 border-t border-white/6">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-16">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/40 mb-2">Film</p>
              <div className="w-8 h-px bg-amber-400/30 mt-4 mb-8" />
              <div className="border border-white/8 bg-white/[0.015] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <p className="text-sm text-white/40 leading-relaxed max-w-xl">
                  Game film and cut-ups available on request. For the fastest response, include your program and what you're looking for in the message below.
                </p>
                <a
                  href="https://www.youtube.com/@KiminouKnoxOfficial"
                  target="_blank"
                  rel="noopener noreferrer external"
                  className="flex items-center gap-2 px-6 py-3 border border-amber-400/30 text-amber-300/80 text-xs uppercase tracking-[0.2em] hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300 flex-shrink-0"
                >
                  YouTube Channel <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── VERIFIED PROFILES ── */}
        <section className="pb-20 border-t border-white/6">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-16">
            <Reveal className="mb-10">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/40 mb-2">Verified Profiles</p>
              <div className="w-8 h-px bg-amber-400/30 mt-4" />
            </Reveal>
            <div className="grid md:grid-cols-3 gap-4">
              {VERIFIED_PROFILES.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.08}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="group block border border-white/8 bg-white/[0.015] p-6 h-full hover:border-amber-400/25 hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-serif text-lg text-white/90 group-hover:text-amber-100 transition-colors duration-300">{p.name}</h3>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-amber-400/60 transition-colors duration-300 flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-xs text-white/35 leading-relaxed">{p.desc}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOWNLOAD + COACH CTA ── */}
        <section className="pb-28">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <Reveal className="grid md:grid-cols-2 gap-4">
              <a
                href="/press/kiminou-knox-recruiting-packet.pdf"
                download
                className="group flex items-center justify-between gap-4 border border-amber-400/15 bg-amber-400/[0.02] p-8 hover:border-amber-400/35 hover:bg-amber-400/[0.05] transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-400/60 mb-2">Download</p>
                  <h3 className="font-serif text-xl text-white">Recruiting Packet PDF</h3>
                </div>
                <Download className="w-5 h-5 text-amber-400/60 group-hover:text-amber-300 transition-colors duration-300 flex-shrink-0" />
              </a>
              <Link href="/contact?type=basketball">
                <div className="group flex items-center justify-between gap-4 border border-white/8 bg-white/[0.015] p-8 hover:border-amber-400/25 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer h-full">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-2">Coaches & Recruiters</p>
                    <h3 className="font-serif text-xl text-white">Contact Directly</h3>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/25 group-hover:text-amber-400/60 transition-colors duration-300 flex-shrink-0" />
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
