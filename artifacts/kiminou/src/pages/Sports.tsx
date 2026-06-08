import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import { ExternalLink, Trophy, TrendingUp, Target, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientAudio from "@/components/AmbientAudio";

const LockerRoom = lazy(() => import("@/components/LuxuryFX/LockerRoom"));
import { KIMINOU_IMAGES, KIMINOU_SPORTS_IMAGES } from "@/lib/kiminouMedia";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

const measurables = [
  { label: "Height", value: "6'7\"", sub: "Forward / Center", icon: TrendingUp, source: "NCSA", sourceUrl: "https://www.ncsasports.org" },
  { label: "Weight", value: "235 lbs", sub: "Elite Athletic Build", icon: Target, source: "NCSA", sourceUrl: "https://www.ncsasports.org" },
  { label: "Position", value: "F / C", sub: "Cristo Rey De La Salle", icon: Trophy, source: "MaxPreps", sourceUrl: "https://www.maxpreps.com" },
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
  { name: "247Sports", desc: "Rankings, news, and recruiting analysis for high school athletes", href: "https://247sports.com", testId: "link-profile-247sports" },
];

function RevealCard({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Sports() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Helmet>
        <title>Kiminou Knox — Basketball Athlete Profile | NCAA Registered, 6'7" Forward/Center</title>
        <meta name="description" content={'Kiminou Knox is a 6\'7" 235lb NCAA-registered basketball athlete (Forward/Center) at Cristo Rey De La Salle. Varsity captain, CaliHoop top-team selection. Verified on MaxPreps, NCSA Sports, and Prep Hoops.'} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/sports" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox — Basketball Athlete Profile" />
        <meta property="og:description" content={'6\'7" NCAA-registered Forward/Center. Varsity captain. Verified on MaxPreps, NCSA Sports, and Prep Hoops.'} />
        <meta property="og:url" content="https://www.kiminouknox.com/sports" />
        <meta property="og:image" content={`${SITE_URL}${KIMINOU_IMAGES.basketballJumpShot.src}`} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <meta name="twitter:title" content="Kiminou Knox — Basketball Athlete Profile" />
        <meta name="twitter:description" content={'6\'7" NCAA-registered Forward/Center. Verified on MaxPreps, NCSA, and Prep Hoops.'} />
        <meta name="twitter:image" content={`${SITE_URL}${KIMINOU_IMAGES.basketballJumpShot.src}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            "name": "Kiminou Knox",
            "url": `${SITE_URL}/sports`,
            "description": "NCAA-registered basketball athlete, 6'7\" Forward/Center at Cristo Rey De La Salle. Varsity captain, CaliHoop top-team selection, and eight-time published author.",
            "height": "6 feet 7 inches",
            "sport": "Basketball",
            "affiliation": [
              { "@type": "SportsTeam", "name": "Cristo Rey De La Salle Basketball", "sport": "Basketball" }
            ],
            "memberOf": [
              { "@type": "Organization", "name": "NCAA", "url": "https://www.ncaa.org" }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Sports & Athletics", url: `${SITE_URL}/sports` },
            ]),
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "@id": `${SITE_URL}/sports#image-gallery`,
            name: "Kiminou Knox sports photos",
            about: { "@id": `${SITE_URL}/#person` },
            image: KIMINOU_SPORTS_IMAGES.map((image) => ({
              "@type": "ImageObject",
              url: `${SITE_URL}${image.src}`,
              name: image.title,
              caption: image.caption,
              width: image.width,
              height: image.height,
            })),
          })}
        </script>
      </Helmet>
      <Header />

      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative pt-40 pb-24 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/4 rounded-full blur-[160px]" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.012)_0px,rgba(255,255,255,0.012)_1px,transparent_1px,transparent_100px),repeating-linear-gradient(0deg,rgba(255,255,255,0.012)_0px,rgba(255,255,255,0.012)_1px,transparent_1px,transparent_100px)]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Athletic Profile</p>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-light leading-none mb-6" data-testid="sports-heading">
                Sports &<br />
                <span className="italic text-amber-200/90">Athletics</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-lg text-white/50 max-w-xl leading-relaxed">
                Multi-sport athlete with varsity experience, NCAA eligibility, and verified profiles on every major recruiting platform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Visual Athletics */}
        <section className="py-20 border-y border-white/6 bg-white/[0.015]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <RevealCard className="mb-12">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Visual Record</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Basketball, Football, Discipline</h2>
            </RevealCard>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {KIMINOU_SPORTS_IMAGES.map((image, i) => (
                <RevealCard
                  key={image.src}
                  delay={i * 0.06}
                  className={`${i === 0 ? "md:col-span-5 md:row-span-2" : i === 4 ? "md:col-span-7" : "md:col-span-4"}`}
                >
                  <figure className="group relative overflow-hidden border border-white/8 bg-white/[0.025] h-full min-h-[280px]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </figure>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* Measurables */}
        <section className="py-20 border-y border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <RevealCard className="mb-14">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Measurables</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Physical Profile</h2>
            </RevealCard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {measurables.map((m, i) => {
                const Icon = m.icon;
                return (
                  <RevealCard key={m.label} delay={i * 0.1} className="border border-white/8 bg-white/[0.03] p-10 flex flex-col gap-4 hover:border-amber-400/30 transition-colors duration-500 group">
                    <Icon className="w-7 h-7 text-amber-400/60 group-hover:text-amber-400 transition-colors duration-300" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/35 mb-2">{m.label}</p>
                      <p className="font-serif text-4xl md:text-5xl font-light text-white mb-1">{m.value}</p>
                      <p className="text-sm text-white/45">{m.sub}</p>
                    </div>
                    <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400/50 hover:text-amber-400 transition-colors duration-200 mt-auto">
                      Verified by {m.source} →
                    </a>
                  </RevealCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* Locker Room 3D */}
        <Suspense fallback={null}>
          <LockerRoom />
        </Suspense>

        {/* Career Timeline */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <RevealCard className="mb-16">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Career</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Highlights</h2>
            </RevealCard>
            <div className="relative">
              <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-white/8 hidden md:block" />
              <div className="space-y-0">
                {highlights.map((h, i) => (
                  <RevealCard key={i} delay={i * 0.08} className="group">
                    <div className="flex gap-8 items-start border-t border-white/6 py-8 hover:border-amber-400/20 transition-colors duration-400">
                      <span className="font-serif text-sm text-amber-400/50 w-20 shrink-0 pt-1 text-right group-hover:text-amber-400/80 transition-colors duration-300 hidden md:block">
                        {h.year}
                      </span>
                      <div className="hidden md:flex items-center justify-center w-3 h-3 rounded-full border border-white/20 bg-black mt-1.5 shrink-0 group-hover:border-amber-400/60 group-hover:bg-amber-400/10 transition-all duration-300 relative z-10" />
                      <div className="flex-1">
                        <span className="text-xs text-amber-400/50 mb-2 block md:hidden">{h.year}</span>
                        <h3 className="font-serif text-xl md:text-2xl font-light text-white mb-2 group-hover:text-amber-100 transition-colors duration-300" data-testid={`highlight-${i}`}>
                          {h.title}
                        </h3>
                        <p className="text-sm text-white/45 leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  </RevealCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recruiting Profiles */}
        <section className="py-20 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <RevealCard className="mb-14">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Recruiting</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Verified Profiles</h2>
            </RevealCard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {profiles.map((p, i) => (
                <RevealCard key={p.name} delay={i * 0.1}>
                  <motion.a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="group block border border-white/8 bg-white/[0.025] p-8 hover:border-amber-400/30 hover:bg-white/[0.05] transition-all duration-400"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    data-testid={p.testId}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <Zap className="w-6 h-6 text-amber-400/50 group-hover:text-amber-400 transition-colors duration-300" />
                      <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-amber-400/60 transition-colors duration-300" />
                    </div>
                    <h3 className="font-serif text-xl font-light text-white mb-3 group-hover:text-amber-100 transition-colors duration-300">{p.name}</h3>
                    <p className="text-sm text-white/40 leading-relaxed mb-5">{p.desc}</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-amber-400/60 group-hover:text-amber-400 transition-colors duration-300">View Profile →</span>
                  </motion.a>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AmbientAudio theme="sports" />
    </>
  );
}
