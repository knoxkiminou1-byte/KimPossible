import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { KIMINOU_IMAGES, pickImages } from "@/lib/kiminouMedia";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { AUTHOR_SHORT_BIO, CANONICAL_BOOK_TITLES, CATALOG_EDITION_NOTE } from "@/content/authorProfile";

const recognition = [
  {
    date: "May 5, 2025",
    source: "Miles Hall Foundation",
    headline: "Essay Recognition: Youth Advocacy & Mental Health",
    detail: "Essay recognition announcement tied to youth advocacy and mental health. Top essay finalist selected from the Youth Summit cohort.",
    link: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist",
    featured: true,
  },
  {
    date: "February 2025",
    source: "Miles Hall Foundation Youth Summit",
    headline: "Top Essay Finalist: Breaking Barriers",
    detail: "Top essay finalist recognition for mental health advocacy, addressing community issues through personal narrative and lived experience.",
    link: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist",
    featured: false,
  },
];

const verificationGroups = [
  {
    label: "Books",
    items: [
      { name: "Amazon Author Store", desc: "Author storefront and retail listings", url: "https://www.amazon.com/author/kiminou" },
      { name: "Goodreads Author Profile", desc: "Reader-facing author profile and book records, including numeric public author ID", url: "https://www.goodreads.com/author/show/55621683.Kiminou_Knox" },
      { name: "Google Play Books Listings", desc: "Search results for Kiminou Knox books on Google", url: "https://play.google.com" },
    ],
  },
  {
    label: "Basketball",
    items: [
      { name: "MaxPreps Basketball Profile", desc: "Public career profile and high school basketball record", url: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc" },
      { name: "NCSA Recruiting Profile", desc: "Basketball recruiting profile with measurements, position, school, and varsity athletic record.", url: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox" },
      { name: "Prep Hoops Profile", desc: "Basketball profile and player listing", url: "https://prephoops.com/player/kiminou-knox/" },
    ],
  },
  {
    label: "Podcast & Public Voice",
    items: [
      { name: "KimYaps on Apple Podcasts", desc: "Public podcast profile for KimYaps. Topics: faith, discipline, identity, culture, relationships.", url: "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308" },
      { name: "YouTube — @KiminouKnoxOfficial", desc: "Official YouTube channel for Kiminou Knox — talks, interviews, and poetry readings.", url: "https://www.youtube.com/@KiminouKnoxOfficial" },
      { name: "Read Kiminou Knox essays on Medium", desc: "Medium author profile and public essay archive. Topics: faith, resilience, love, healing, Black boy life.", url: "https://medium.com/@knoxkiminou1" },
      { name: "KimYaps on Spotify", desc: "Spotify show profile", url: "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg?si=743c2b2226084348" },
      { name: "KimYaps on Amazon Music", desc: "Amazon Music podcast profile", url: "https://music.amazon.com/podcasts/3db7d37c-3071-4eba-9fea-cadc50f5c543/kimyaps" },
    ],
  },
  {
    label: "Program / Builder Work",
    items: [
      { name: "View AAFC Builders", desc: "kiminouknox.com. Web design and digital infrastructure lane.", url: "https://www.kiminouknox.com" },
      { name: "View Kiminou Knox Portfolio", desc: "kiminouknox.com. Portfolio and build work overview.", url: "/portfolio" },
    ],
  },
  {
    label: "Profiles",
    items: [
      { name: "LinkedIn", desc: "Professional profile", url: "https://www.linkedin.com/in/kiminou-knox-50691a394/" },
      { name: "TikTok", desc: "Official short-form video profile", url: "https://www.tiktok.com/@kiminou.knox" },
      { name: "About.me", desc: "Public profile page", url: "https://about.me/kiminou" },
      { name: "Wikidata", desc: "Public entity record", url: "https://www.wikidata.org/wiki/Q137260299" },
    ],
  },
];

const TICKER_ITEMS = [
  "Miles Hall Foundation", "Amazon Author Store", "Goodreads", "MaxPreps", "NCSA Sports",
  "Prep Hoops", "Apple Podcasts", "Spotify", "Amazon Music", "YouTube", "Medium", "LinkedIn",
  "Bookshop.org", "Google Play Books", "TikTok", "About.me", "Wikidata",
];

const creativeWorkSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Miles Hall Foundation Youth Summit Top Essay",
  publisher: { "@type": "Organization", name: "Miles Hall Foundation" },
  url: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist",
};

// `bwPortrait` was retired from the image catalog; `pickImages` resolves ids
// safely so a stale one can never throw during render again.
const pressImages = pickImages(
  "smilingBlazerPortrait",
  "casualOutdoorPortrait",
  "taunHallEvent",
);

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}>
      {children}
    </motion.div>
  );
}

export default function Press() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Helmet>
        <title>Kiminou Knox — Press, Recognition & Public References</title>
        <meta name="description" content="Press coverage, awards, and public verification for Kiminou Knox: Miles Hall Foundation Youth Summit Top Essay Finalist (2025), verified profiles on Amazon, Goodreads, MaxPreps, NCSA, Apple Podcasts, and more." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/press" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox — Press, Recognition & Public References" />
        <meta property="og:description" content="Miles Hall Foundation Youth Summit Top Essay Finalist (2025). Verified on Amazon, Goodreads, MaxPreps, NCSA, Apple Podcasts, and LinkedIn." />
        <meta property="og:url" content="https://www.kiminouknox.com/press" />
        <meta property="og:image" content={`${SITE_URL}${KIMINOU_IMAGES.officialHeadshot?.src ?? "/og-image.png"}`} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <meta name="twitter:title" content="Kiminou Knox — Press & Recognition" />
        <meta name="twitter:description" content="Miles Hall Foundation Youth Summit Top Essay Finalist (2025). Verified across Amazon, Goodreads, MaxPreps, NCSA, and Apple Podcasts." />
        <meta name="twitter:image" content={`${SITE_URL}${KIMINOU_IMAGES.officialHeadshot?.src ?? "/og-image.png"}`} />
        <script type="application/ld+json">{JSON.stringify(creativeWorkSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "@id": `${SITE_URL}/press#press-images`,
            name: "Kiminou Knox press images",
            about: { "@id": `${SITE_URL}/#person` },
            image: pressImages.map((image) => ({
              "@type": "ImageObject",
              url: `${SITE_URL}${image.src}`,
              name: image.title,
              caption: image.caption,
              width: image.width,
              height: image.height,
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Press", url: `${SITE_URL}/press` },
            ]),
          )}
        </script>
      </Helmet>
      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">

        {/* ─── HERO ─── */}
        <section className="relative pt-40 pb-24 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}>
              <p className="text-xs uppercase tracking-[0.55em] text-amber-400/60 mb-5 font-medium">Verification</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6" data-testid="press-heading">
                Press, Recognition<br />
                <span className="italic text-amber-200/90">& Public References</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Public sources for books, basketball, recognition, and profile verification. Media and booking requests can go through the{" "}
                <Link href="/contact">
                  <span className="text-amber-400/70 hover:text-amber-300 transition-colors cursor-pointer underline underline-offset-4">contact form</span>
                </Link>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── PRESS IMAGES ─── */}
        <section className="py-16 border-y border-white/6 bg-white/[0.015]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-10">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4">Media Images</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Author, Athlete, Strategist</h2>
              <div className="w-12 h-px bg-amber-400/40 mt-6" />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3 max-w-5xl">
              {pressImages.map((image, index) => (
                <Reveal key={image.src} delay={index * 0.08}>
                  <figure className="group relative min-h-[360px] overflow-hidden border border-white/8 bg-white/[0.025]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SCROLLING TICKER ─── */}
        <div className="border-y border-white/6 py-4 overflow-hidden relative">
          <div className="flex gap-0" style={{ animation: "tickerScroll 30s linear infinite" }}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="flex-shrink-0 text-xs uppercase tracking-[0.3em] text-white/20 px-8 flex items-center gap-8">
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/30 inline-block" />
              </span>
            ))}
          </div>
          <style>{`
            @keyframes tickerScroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-33.33%); }
            }
          `}</style>
        </div>

        {/* ─── FEATURED: MILES HALL FOUNDATION ─── */}
        <section className="py-20 border-b border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-10">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4">Recognition</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Featured Recognition</h2>
              <div className="w-12 h-px bg-amber-400/40 mt-6" />
            </Reveal>

            <div className="space-y-5">
              {recognition.map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`group border p-8 md:p-10 hover:border-amber-400/25 transition-all duration-500 relative overflow-hidden ${
                    item.featured ? "border-amber-400/20 bg-amber-400/[0.03]" : "border-white/8"
                  }`}>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-400/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {item.featured && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-400/50" />
                    )}
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/50 mb-2 italic">{item.date}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/35 mb-3">{item.source}</p>
                          <h3 className="font-serif text-xl md:text-2xl text-white font-light group-hover:text-amber-100 transition-colors duration-300">
                            {item.headline}
                          </h3>
                        </div>
                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400/50 hover:text-amber-400 transition-colors flex-shrink-0 group/link">
                          Read feature
                          <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                      <p className="text-white/45 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VERIFICATION LINKS BY CATEGORY ─── */}
        <section className="py-20 pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-14">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4">Verification Links</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Public Records</h2>
              <div className="w-12 h-px bg-amber-400/40 mt-6" />
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {verificationGroups.map((group, gi) => (
                <Reveal key={gi} delay={gi * 0.08}>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/50 mb-5 border-b border-white/6 pb-3">
                      {group.label}
                    </p>
                    <div className="space-y-4">
                      {group.items.map((item, ii) => (
                        <a key={ii}
                          href={item.url.startsWith("/") ? item.url : item.url}
                          target={item.url.startsWith("/") ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                          className="group flex items-start justify-between gap-3 py-3 border-b border-white/5 hover:border-amber-400/15 transition-colors duration-300">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white/65 group-hover:text-amber-200 transition-colors duration-300 leading-snug mb-1">
                              {item.name}
                            </p>
                            <p className="text-xs text-white/25 leading-snug line-clamp-2">{item.desc}</p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-white/15 group-hover:text-amber-400/50 transition-colors duration-300 flex-shrink-0 mt-0.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        {/* ─── PRESS KIT DOWNLOAD ─── */}
        <section className="py-20 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-10">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4">Press Kit</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Download Press Kit</h2>
              <div className="w-12 h-px bg-amber-400/40 mt-6" />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-amber-400/15 bg-amber-400/[0.02] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-white mb-3">Official Press Kit — Kiminou Knox</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-4">
                    Full bio, headshot credits, book details, speaking topics, athletic profile, and media contact. Use freely for event programs, press coverage, and editorial mentions.
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-white/30">
                    <span>Bio (Short & Long)</span>
                    <span>·</span>
                    <span>Ten Published Books · Multiple Available Editions</span>
                    <span>·</span>
                    <span>Athletic Measurables</span>
                    <span>·</span>
                    <span>Speaking Topics</span>
                    <span>·</span>
                    <span>Media Contact</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <motion.button
                    onClick={() => {
                      const kit = `KIMINOU KNOX — OFFICIAL PRESS KIT
Generated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ABOUT KIMINOU KNOX
──────────────────
Kiminou Knox is an author, poet, athlete, and creative from the San Francisco Bay Area. Of African American, Jamaican, and Congolese descent, Knox is the creator of the Black Boy Lie universe — a body of poetic work that explores identity, faith, silence, love, and the interior lives of young Black men.

Son of Rashida Knox, grandson of Faye McNair Knox, great-grandson of Sarah Lee Williams and Elisha Bonepart McNair.

SHORT BIO
─────────
${AUTHOR_SHORT_BIO}

CANONICAL TEN-BOOK BIBLIOGRAPHY
──────────────────────────────
${CANONICAL_BOOK_TITLES.map((title, index) => `${index + 1}. ${title}`).join("\n")}

CATALOG NOTE
────────────
${CATALOG_EDITION_NOTE}

REMASTERED EDITIONS — 2026
──────────────────────────
• The Spirit of Solomon: Remastered Edition
  Amazon: https://www.amazon.com/dp/B0H9K2VXMS
  Google Play: https://play.google.com/store/books/details?id=7UP2EQAAQBAJ
• Our Father? Remastered Edition
  Google Play: https://play.google.com/store/books/details?id=DUT2EQAAQBAJ
• Hopeless Romantic: Remastered Edition
• Poems From A Black Boy: Remastered Edition
• Boys Raised by Silence: Remastered Edition
• Why Did You Ghost Me? Remastered Edition
• 7.16.74: An Ode to Rashida

ATHLETIC PROFILE
────────────────
Height: 6'7" | Weight: 235 lbs | Position: Forward / Center
School: Cristo Rey De La Salle (formerly Ygnacio Valley)
Status: Varsity Athlete
MaxPreps: https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc
NCSA: https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox

SPEAKING TOPICS
───────────────
• Discipline and Faith in Daily Practice
• Black Boy Voice and the Cost of Silence
• Building Creative Work That Lasts

Audiences: Schools, teams, youth programs, community groups, faith-based organizations

RECOGNITION
───────────
• Miles Hall Foundation Youth Summit — Top Essay Finalist (2025)
  Topic: Youth Advocacy & Mental Health
  https://www.themileshallfoundation.org/post/youth-summit-essay-finalist

MEDIA & DIGITAL PRESENCE
─────────────────────────
Website: https://www.kiminouknox.com
Twitter/X: @KnoxKiminou
YouTube: https://www.youtube.com/@KiminouKnoxOfficial
TikTok: https://www.tiktok.com/@kiminou.knox
Medium: https://medium.com/@knoxkiminou1
Podcast (KimYaps): https://podcasts.apple.com/us/podcast/kimyaps/id1850364308
Spotify: https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg
Amazon Music: https://music.amazon.com/podcasts/3db7d37c-3071-4eba-9fea-cadc50f5c543/kimyaps
Goodreads: https://www.goodreads.com/author/show/55621683.Kiminou_Knox
Amazon Author Store: https://www.amazon.com/author/kiminou
LinkedIn: https://www.linkedin.com/in/kiminou-knox-50691a394/
About.me: https://about.me/kiminou

MEDIA CONTACT
─────────────
Email: knoxkiminou1@gmail.com
Booking & Speaking Inquiries: https://www.kiminouknox.com/contact
Official Site: https://www.kiminouknox.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© 2026 Kiminou Knox. All rights reserved.
Press assets and headshots available on request via email.`;

                      const blob = new Blob([kit], { type: "text/plain;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "kiminou-knox-press-kit.txt";
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-amber-400 text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-amber-300 transition-colors duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Press Kit
                  </motion.button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
