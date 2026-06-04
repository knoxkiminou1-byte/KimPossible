import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientAudio from "@/components/AmbientAudio";
import ContactForm from "@/components/ContactForm";

const AUDIENCES = ["All", "Schools", "Teams", "Youth", "Community", "Faith"];

const talks = [
  {
    num: "01",
    title: "Discipline and Faith in Daily Practice",
    full: "A practical talk on building habits that hold up under real pressure. It connects athletics, writing, structure, and spiritual grounding without turning discipline into performance.",
    tags: ["Schools", "Teams", "Faith"],
    audiences: ["Schools", "Teams", "Faith"],
    quote: "Show up. Do the work. Leave every space better than you found it.",
  },
  {
    num: "02",
    title: "Black Boy Voice and the Cost of Silence",
    full: "A conversation about identity, pressure, tenderness, and the language many young men are never given. The focus is honesty, not slogans.",
    tags: ["Youth", "Schools", "Community"],
    audiences: ["Youth", "Schools", "Community"],
    quote: "The most dangerous thing you can do is stay silent when you have something real to say.",
  },
  {
    num: "03",
    title: "Building Creative Work That Lasts",
    full: "A grounded session for young creators on developing a practice, finishing projects, sharing work, and keeping integrity in a fast moving digital world.",
    tags: ["Youth", "Community", "Schools"],
    audiences: ["Youth", "Community", "Schools"],
    quote: "Prepare seriously. Stay close to the people you serve. Finish what you start.",
  },
];

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

export default function Speaking() {
  const [audience, setAudience] = useState("All");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const filtered = audience === "All" ? talks : talks.filter(t => t.audiences.includes(audience));

  return (
    <>
      <Helmet>
        <title>Kiminou Knox | Speaker — Schools, Youth & Community Groups</title>
        <meta name="description" content="Book Kiminou Knox to speak at your school, team, or community event. Topics include discipline, faith, creative voice, Black boy identity, and building authentic work. Bay Area author and NCAA athlete." />
        <link rel="canonical" href="https://kiminouknox.com/speaking" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kiminouknox.com/speaking" />
        <meta property="og:title" content="Kiminou Knox | Speaker — Schools, Youth & Community" />
        <meta property="og:description" content="Book Kiminou Knox for schools, youth organizations, athletic teams, and community events. Author of 7 books and NCAA basketball athlete from the Bay Area." />
        <meta property="og:image" content="https://kiminouknox.com/kiminou-knox-social-share.png" />
        <meta property="og:image:alt" content="Kiminou Knox — Author, Athlete, Speaker" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KiminouKnox" />
        <meta name="twitter:title" content="Kiminou Knox | Speaker — Schools & Community" />
        <meta name="twitter:description" content="Book Kiminou Knox for schools, youth orgs, and athletic teams. Bay Area author of 7 books and NCAA athlete." />
        <meta name="twitter:image" content="https://kiminouknox.com/kiminou-knox-social-share.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://kiminouknox.com/#kiminouknox",
          "name": "Kiminou Knox",
          "url": "https://kiminouknox.com/speaking",
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Motivational Speaker",
            "description": "Speaks with schools, athletic teams, faith communities, and youth organizations on discipline, creative voice, Black identity, and authentic leadership."
          },
          "knowsAbout": ["Youth Leadership", "Creative Writing", "Discipline and Faith", "Black Boy Identity", "Basketball", "Entrepreneurship"]
        })}</script>
      </Helmet>
      <Header />

      <main className="min-h-screen bg-black text-white">

        {/* ─── CINEMATIC HERO ─── */}
        <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-[center_20%]"
            style={{ backgroundImage: "url('/kiminou-knox-author-athlete-bay-area.webp')", y: bgY, scale: 1.08 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          {/* Giant background word */}
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
            <span className="font-serif text-[22vw] font-light text-white/[0.03] leading-none select-none pr-8">
              SPEAKING
            </span>
          </div>

          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24 md:pb-36 w-full"
            style={{ opacity: heroOpacity }}>
            <motion.p className="text-xs uppercase tracking-[0.55em] text-amber-400/70 mb-6"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}>
              Speaking
            </motion.p>
            <motion.h1
              className="font-serif font-light leading-none mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] text-white"
                style={{ textShadow: "0 4px 40px rgba(0,0,0,0.9)" }}>
                Voices that
              </span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 italic">
                Move People
              </span>
            </motion.h1>
            <motion.div className="w-20 h-px bg-amber-400/60 mb-8"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.9 }} style={{ transformOrigin: "left" }} />
            <motion.p
              className="font-serif text-xl md:text-2xl text-white/65 font-light max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1 }}>
              I speak with schools, teams, and community groups on writing, discipline, faith, grief, and how young people can find a voice without performing one.
            </motion.p>
          </motion.div>
        </section>

        {/* ─── AUDIENCE FILTER ─── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-12">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4 font-medium">Talk Topics</p>
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <h2 className="font-serif text-4xl md:text-5xl font-light text-white">What I Speak On</h2>
                <div className="flex flex-wrap gap-2 md:ml-auto">
                  {AUDIENCES.map(a => (
                    <button key={a} onClick={() => setAudience(a)}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-all duration-300 ${
                        audience === a
                          ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                          : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"
                      }`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-12 h-px bg-amber-400/40 mt-6" />
            </Reveal>

            <div className="space-y-0">
              {filtered.map((t, i) => (
                <TalkCard key={t.num} talk={t} index={i} />
              ))}
              {filtered.length === 0 && (
                <div className="py-20 text-center">
                  <p className="font-serif text-xl text-white/30">No talks match this audience type.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── VIDEO REEL ─── */}
        <section className="py-20 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-12">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4 font-medium">Watch</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-2">
                See Kiminou Speak
              </h2>
              <div className="w-12 h-px bg-amber-400/40 mt-6" />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative group">
                <div className="relative w-full aspect-video bg-black border border-white/8 overflow-hidden">
                  <img
                    src="/kiminou-knox-author-athlete-bay-area.webp"
                    alt="Kiminou Knox speaking at a school or community event"
                    loading="lazy"
                    className="w-full h-full object-cover object-top opacity-40 group-hover:opacity-50 transition-opacity duration-500 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <a
                      href="https://www.youtube.com/@kiminouknox"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-4"
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full border border-amber-400/50 flex items-center justify-center bg-amber-400/10 backdrop-blur-sm hover:bg-amber-400/20 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-8 h-8 text-amber-300 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                      <div className="text-center">
                        <p className="font-serif text-2xl text-white/90 mb-1">Watch on YouTube</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-amber-400/60">@kiminouknox</p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-sm text-white/35 leading-relaxed max-w-xl">
                    Talks, interviews, and poetry readings on the YouTube channel. Full sessions, not highlights.
                  </p>
                  <a
                    href="https://www.youtube.com/@kiminouknox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400/60 hover:text-amber-300 transition-colors"
                  >
                    View Channel →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── BOOKING FORM ─── */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-12">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4 font-medium">Book Now</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
                Request an<br />
                <span className="italic text-amber-200/90">Engagement</span>
              </h2>
              <div className="w-12 h-px bg-amber-400/40 mt-6 mb-6" />
              <p className="text-white/45 leading-relaxed">
                Share the event, audience, and what you want the room to leave with. I'll get back to you personally.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="border border-white/8 bg-white/[0.02] p-8 md:p-12">
                <ContactForm
                  title=""
                  description=""
                  defaultInquiryType="speaking"
                  compact={true}
                  successMessage="Thank you. I'll be in touch soon to discuss your event."
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <AmbientAudio theme="cathedral" />
    </>
  );
}

function TalkCard({ talk, index }: { talk: typeof talks[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group border-t border-white/8 hover:border-amber-400/20 transition-colors duration-400">
      <button
        className="w-full text-left py-10 grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 items-start"
        onClick={() => setExpanded(e => !e)}>
        <span className="font-serif text-4xl text-white/6 font-light group-hover:text-amber-400/12 transition-colors duration-400 hidden md:block">
          {talk.num}
        </span>
        <div>
          <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-3 group-hover:text-amber-100 transition-colors duration-300">
            {talk.title}
          </h3>
          <p className="text-white/45 leading-relaxed max-w-2xl">{talk.full}</p>
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden">
            <div className="pt-6 space-y-4">
              <p className="text-white/60 leading-relaxed">{talk.full}</p>
              <div className="border-l-2 border-amber-400/30 pl-4">
                <p className="font-serif text-lg italic text-amber-300/70">"{talk.quote}"</p>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-wrap gap-2 mt-4">
            {talk.tags.map(tag => (
              <span key={tag} className="px-3 py-1 border border-white/8 text-xs uppercase tracking-[0.15em] text-white/30 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 hidden md:flex items-center justify-center w-10 h-10 border border-white/10 group-hover:border-amber-400/30 transition-colors duration-300 mt-1">
          <motion.span className="text-amber-400/50 text-lg leading-none"
            animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.3 }}>
            +
          </motion.span>
        </div>
      </button>
    </motion.div>
  );
}
