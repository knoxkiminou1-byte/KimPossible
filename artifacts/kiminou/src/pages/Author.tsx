import { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Trophy, Mic, Users, ExternalLink, ChevronDown, Play } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TypewriterConfessional from "@/components/LuxuryFX/TypewriterConfessional";
import GlitchHeading from "@/components/LuxuryFX/GlitchHeading";
import GoldUnmask from "@/components/LuxuryFX/GoldUnmask";

const CHAPTERS = [
  { id: "portrait", label: "Profile" },
  { id: "lineage", label: "Lineage" },
  { id: "literary", label: "Literary Work" },
  { id: "faith", label: "Faith & Mind" },
  { id: "athletics", label: "Athletics" },
  { id: "leadership", label: "Leadership" },
  { id: "universe", label: "The Universe" },
  { id: "connect", label: "Connect" },
];

const CREDENTIALS = [
  { label: "7×", sub: "Published Author" },
  { label: "19", sub: "Years Old" },
  { label: "NCAA", sub: "Eligible Athlete" },
  { label: "AAFC", sub: "Director" },
  { label: "6'7\"", sub: "On The Court" },
  { label: "EPA", sub: "East Palo Alto" },
];

const SOCIAL_LINKS = [
  { name: "Goodreads", url: "https://www.goodreads.com/author/show/Kiminou_Knox" },
  { name: "MaxPreps", url: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2" },
  { name: "NCSA", url: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox" },
  { name: "Prep Hoops", url: "https://prephoops.com/player/kiminou-knox/" },
  { name: "Instagram", url: "https://www.instagram.com/hofkiminou" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/kiminou-knox-50691a394/" },
  { name: "Spotify", url: "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg?si=743c2b2226084348" },
];

const BOOKS = [
  { title: "Poems From A Black Boy", desc: "Early poems tracing the inner life of a young Black boy learning how to pray, love, and tell the truth." },
  { title: "Black Boy Poems", desc: "A collection documenting the full spectrum of Black boyhood with unflinching emotional precision." },
  { title: "Hopeless Romantic", desc: "A lyric study of love, heartbreak, and healing written from the point of view of a young man who wants to stay tender." },
  { title: "The Spirit of Solomon", desc: "Prophetic reflection on wisdom, discipline, and the sacred weight of a life lived with intention." },
  { title: "Our Father", desc: "A meditation on fatherhood, faith, and the God who watches boys become men in cities that weren't built for them." },
  { title: "Boys Raised In Silence", desc: "Poems for the boys who were never allowed to feel, and the men they grow into when they finally learn to speak." },
  { title: "Children's Storybook", desc: "Written with his younger brother, a story of imagination, family, and the stories we pass down." },
];

const PULL_QUOTES: { text: string; author: string; source?: string }[] = [
  {
    text: "Every crown weighs heavy on a head that knows the price of being loved for what you own.",
    author: "Kiminou Knox",
    source: "The Spirit of Solomon",
  },
  {
    text: "Not everything that is faced can be changed, but nothing can be changed until it is faced.",
    author: "James Baldwin",
  },
  {
    text: "Wear your skin like the crown it is. Speak your truth like the prophecy it is. Love yourself like the revolution it is.",
    author: "Kiminou Knox",
    source: "Poems from a Black Boy",
  },
];

function useActiveChapter() {
  const [active, setActive] = useState("portrait");
  useEffect(() => {
    const ids = CHAPTERS.map(c => c.id);
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);
  return active;
}

function StatBar({ label, value, pct, index }: { label: string; value: string; pct: number; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs mb-2">
        <span className="uppercase tracking-[0.2em] text-white/40">{label}</span>
        <span className="text-amber-300/80 font-medium">{value}</span>
      </div>
      <div className="h-px bg-white/8">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400/60 to-amber-300/30"
          initial={{ width: "0%" }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function PullQuote({ quote, delay = 0 }: { quote: { text: string; author: string; source?: string }; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative py-16 md:py-24 border-y border-amber-400/15 my-16 overflow-hidden">
      <span className="absolute -top-8 left-0 font-serif text-[10rem] leading-none text-amber-400/8 select-none pointer-events-none">"</span>
      <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-white/85 leading-relaxed italic max-w-4xl relative z-10">
        {quote.text}
      </p>
      <div className="mt-8 flex items-center gap-4">
        <div className="w-8 h-px bg-amber-400/50" />
        <p className="text-xs uppercase tracking-[0.25em] text-amber-400/70">
          {quote.author}{quote.source && <span className="text-white/30 normal-case not-italic tracking-normal font-sans ml-2">· {quote.source}</span>}
        </p>
      </div>
    </motion.div>
  );
}

function TreeNode({ role, name, delay = 0, center = false, featured = false }: {
  role: string; name: string; delay?: number; center?: boolean; featured?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${center ? "w-48 md:w-56" : "w-40 md:w-48"} ${featured ? "border-amber-400/60 bg-amber-400/5" : "border-white/12 bg-black"} border px-4 py-3 text-center relative`}
    >
      {featured && (
        <div className="absolute -inset-px border border-amber-400/30 pointer-events-none" />
      )}
      <p className={`text-[9px] uppercase tracking-[0.3em] mb-1.5 ${featured ? "text-amber-400" : "text-amber-400/50"}`}>
        {role}
      </p>
      <p className={`font-serif leading-snug ${featured ? "text-base text-amber-100" : "text-sm text-white/80"}`}>
        {name}
      </p>
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="mb-12">
      <p className="text-xs uppercase tracking-[0.45em] text-amber-400/60 mb-4 font-medium">{eyebrow}</p>
      <GlitchHeading as="h2" className="font-serif text-4xl md:text-5xl font-light text-white leading-tight">{title}</GlitchHeading>
      <div className="w-12 h-px bg-amber-400/50 mt-6" />
    </motion.div>
  );
}

export default function Author() {
  const active = useActiveChapter();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 700], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>Kiminou Knox | Author Profile</title>
        <meta name="description" content="Kiminou Knox is a poet, novelist, athlete, and builder from East Palo Alto whose work follows Black boys wrestling with God, grief, desire, and the courage to stay soft in a hard city." />
        <link rel="canonical" href="https://kiminouknox.com/author" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Kiminou Knox | Author Profile" />
        <meta property="og:description" content="Author of poetry collections, a children's storybook, and a growing universe of psychological and spiritual fiction." />
        <meta property="og:image" content="https://kiminouknox.com/author-kiminou.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <Header />

        {/* ─── CINEMATIC HERO ─────────────────────────────── */}
        <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
          {/* Parallax photo */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/author-kiminou.jpg')", y: heroBgY, scale: 1.08 }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />

          {/* Floating credential chips */}
          <motion.div className="absolute top-40 right-8 md:right-16 flex flex-col gap-3 z-20"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {CREDENTIALS.map((c, i) => (
              <motion.div key={c.label}
                className="bg-black/60 backdrop-blur-md border border-amber-400/25 px-4 py-2 text-right"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                whileHover={{ borderColor: "rgba(251,191,36,0.6)", x: -4 }}>
                <div className="font-serif text-xl text-amber-300 font-light leading-none">{c.label}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-0.5">{c.sub}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero content */}
          <motion.div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 pb-20 md:pb-32 w-full"
            style={{ opacity: heroOpacity }}>
            <motion.p className="text-xs uppercase tracking-[0.55em] text-amber-400/70 mb-6"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}>
              Author Profile
            </motion.p>
            <motion.h1
              className="font-serif font-light leading-none mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] text-white"
                style={{ textShadow: "0 4px 40px rgba(0,0,0,0.9)" }}>
                {"Kiminou".split("").map((l, i) => (
                  <motion.span key={i} className="inline-block"
                    initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.06, ease: [0.215, 0.61, 0.355, 1] }}>
                    {l}
                  </motion.span>
                ))}
              </span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300"
                style={{ filter: "drop-shadow(0 4px 24px rgba(251,191,36,0.4))" }}>
                {"Knox".split("").map((l, i) => (
                  <motion.span key={i} className="inline-block"
                    initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.05 + i * 0.07, ease: [0.215, 0.61, 0.355, 1] }}>
                    {l}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.div className="w-20 h-px bg-gradient-to-r from-amber-400 to-transparent mb-8"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.6 }} style={{ transformOrigin: "left" }} />

            <motion.p
              className="font-serif text-xl md:text-2xl text-white/70 font-light max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.7 }}>
              Poet, novelist, athlete, and builder from East Palo Alto. Creator of The Black Boy Lie universe.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2 }}>
              {["Author", "Poet", "Athlete", "Director", "Podcaster"].map((tag, i) => (
                <motion.span key={tag}
                  className="px-4 py-1.5 border border-white/15 text-xs uppercase tracking-[0.2em] text-white/50 hover:border-amber-400/50 hover:text-amber-300 transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 + i * 0.08 }}>
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-white/30" />
            </motion.div>
          </motion.div>
        </section>


        <main className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* ─── PULL QUOTE 1 ───────────────────────────────── */}
          <PullQuote quote={PULL_QUOTES[0]} />

          {/* ─── LINEAGE ────────────────────────────────────── */}
          <section id="lineage" className="py-20 scroll-mt-16">
            <SectionHeading eyebrow="Roots & Inheritance" title="Early Life and Lineage" />

            {/* Family Tree */}
            <Reveal>
              <div className="flex flex-col items-center gap-0 select-none">

                {/* Great-Grandparents row */}
                <div className="flex items-end gap-0 w-full justify-center">
                  <TreeNode role="Great-Grandmother" name="Sarah Lee Williams" delay={0} />
                  {/* horizontal bridge */}
                  <div className="flex flex-col items-center" style={{ marginBottom: "1.25rem" }}>
                    <div className="h-px w-12 md:w-20 bg-amber-400/50" />
                  </div>
                  <TreeNode role="Great-Grandfather" name="Elisha Bonepart McNair" delay={0.1} />
                </div>

                {/* Line down from bridge center */}
                <div className="w-px h-10 bg-amber-400/40" />
                <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                <div className="w-px h-8 bg-amber-400/40" />

                {/* Grandmother */}
                <TreeNode role="Grandmother" name="Faye McNair Knox" delay={0.2} center />

                <div className="w-px h-8 bg-amber-400/40" />
                <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                <div className="w-px h-8 bg-amber-400/40" />

                {/* Mother */}
                <TreeNode role="Mother" name="Rashida Knox" delay={0.3} center />

                <div className="w-px h-8 bg-amber-400/40" />
                <div className="w-2 h-2 rounded-full bg-amber-400/70" />
                <div className="w-px h-8 bg-amber-400/40" />

                {/* Kiminou — featured */}
                <TreeNode role="The Voice" name="Kiminou Knox" delay={0.4} center featured />
              </div>
            </Reveal>
          </section>

          {/* ─── PULL QUOTE 2 ───────────────────────────────── */}
          <PullQuote quote={PULL_QUOTES[1]} delay={0.1} />

          {/* ─── LITERARY WORK ──────────────────────────────── */}
          <section id="literary" className="py-20 scroll-mt-16">
            <SectionHeading eyebrow="Seven Published Works" title="Literary Work & Themes" />
            <div className="grid md:grid-cols-2 gap-10">
              <Reveal>
                <p className="text-white/60 text-lg leading-relaxed">
                  By nineteen, Knox has authored seven books that form a literary universe centered on the interior lives of Black boys and young Black men. His work moves fluidly across poetry, psychological fiction, and prophetic reflection.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-white/60 text-lg leading-relaxed">
                  His pages are filled with faith, mental health, generational trauma, masculinity, family fracture, love, and longing, all rendered with clinical honesty and lyrical precision. Knox refuses to sand down pain into something easy to consume.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="text-white/60 text-lg leading-relaxed mt-8 max-w-3xl">
                Across his body of work, Black boys are not symbols or headlines; they are complex, vulnerable, searching human beings whose emotions are allowed to be expansive and exact. In a culture that often demands performance, Knox writes toward the parts of life that usually remain unspoken.
              </p>
            </Reveal>

            <div className="mt-16 space-y-4">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/50 mb-8">Voice, Form & Craft</p>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Emotional Precision", desc: "Every line accounts for its weight. Nothing performed, everything lived." },
                  { title: "Spiritual Seriousness", desc: "Faith as a lived framework for wrestling with doubt and grace." },
                  { title: "Formal Freedom", desc: "Each project chooses its own container: tight poems, interior monologue, prophetic reflection." },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="border border-white/8 p-6 hover:border-amber-400/25 transition-colors duration-500 group">
                      <div className="w-8 h-px bg-amber-400/40 mb-5 group-hover:w-12 transition-all duration-500" />
                      <h4 className="font-serif text-lg text-white mb-3">{item.title}</h4>
                      <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ─── PULL QUOTE 3 ───────────────────────────────── */}
          <PullQuote quote={PULL_QUOTES[2]} delay={0.1} />

          {/* ─── TYPEWRITER CONFESSIONAL ─────────────────────── */}
          <TypewriterConfessional />

          {/* ─── FAITH & MENTAL HEALTH ──────────────────────── */}
          <section id="faith" className="py-20 scroll-mt-16">
            <SectionHeading eyebrow="Interior Life" title="Faith, Masculinity & Mental Health" />
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "✦",
                  title: "Faith",
                  desc: "Raised within the Black church, Knox carries Christianity as a lived framework for wrestling with doubt, desire, discipline, and grace. His work faces spiritual confusion head-on, asking hard questions without rushing to easy answers.",
                },
                {
                  icon: "◈",
                  title: "Masculinity",
                  desc: "Masculinity, in his pages, is something to be interrogated and rebuilt, not merely inherited. He writes about boys taught to be durable before they are allowed to be gentle, and about men who must learn how to name what hurts.",
                },
                {
                  icon: "◇",
                  title: "Mental Health",
                  desc: "Mental health is not a side topic in his work; it is central. Knox makes space for therapy, breakdown, loneliness, and recovery, insisting that serious literature for Black boys must also be serious about their psychological well-being.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className="relative p-8 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/8 hover:border-amber-400/20 transition-all duration-500 group h-full">
                    <span className="text-amber-400/40 text-3xl font-serif mb-6 block group-hover:text-amber-400/70 transition-colors duration-500">
                      {item.icon}
                    </span>
                    <h3 className="font-serif text-2xl text-white mb-4">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed text-[15px]">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* KimYaps Podcast */}
            <Reveal delay={0.2} className="mt-16">
              <div className="border border-white/8 p-8 md:p-12 hover:border-amber-400/20 transition-colors duration-500">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                      <Play className="w-6 h-6 text-amber-400 ml-1" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3">Podcast</p>
                    <h3 className="font-serif text-3xl text-white mb-4">KimYaps</h3>
                    <p className="text-white/55 leading-relaxed max-w-2xl">
                      Knox extends his literary sensibility into audio, a space where he speaks with the same intimacy and conviction that animate his writing. Episodes address Christianity, love, relationships, identity, emotional growth, and the costly truths people negotiate in private but rarely speak in public.
                    </p>
                    <a href="https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg?si=743c2b2226084348"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-[0.25em] text-amber-300 hover:text-amber-200 transition-colors group">
                      Listen on Spotify
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ─── ATHLETICS ──────────────────────────────────── */}
          <section id="athletics" className="py-20 scroll-mt-16">
            <SectionHeading eyebrow="Cristo Rey De La Salle" title="Athletics & Discipline" />
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <Reveal>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  A multi-sport athlete, Knox brings long-view intention and disciplined rigor to his physical training that mirrors his commitment to the page. For him, athletics is not simply competition; it is a practice of stewardship over body, mind, and focus.
                </p>
                <p className="text-white/60 text-lg leading-relaxed">
                  The same internal standards that govern his literary craft: consistency, resilience, and a refusal to cut corners, shape how he moves through weight rooms, fields, and courts.
                </p>
                <Link href="/basketball">
                  <motion.span className="inline-flex items-center gap-2 mt-8 text-xs uppercase tracking-[0.3em] text-amber-300 hover:text-amber-200 transition-colors cursor-pointer group"
                    whileHover={{ x: 4 }}>
                    View Athletic Profile
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </motion.span>
                </Link>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="space-y-3">
                  {[
                    { label: "Height", value: "6'7\"", pct: 92 },
                    { label: "Weight", value: "235 lbs", pct: 78 },
                    { label: "Position", value: "F / C", pct: 85 },
                    { label: "Sports", value: "Basketball · Football", pct: 100 },
                    { label: "Eligibility", value: "NCAA Registered", pct: 100 },
                  ].map((stat, i) => (
                    <StatBar key={i} label={stat.label} value={stat.value} pct={stat.pct} index={i} />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ─── LEADERSHIP ─────────────────────────────────── */}
          <section id="leadership" className="py-20 scroll-mt-16">
            <SectionHeading eyebrow="Institutions & Impact" title="Leadership & Youth Development" />
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  org: "The TeeShirtTeens",
                  role: "Founder",
                  desc: "A serious developmental platform for youth, helping them convert expression into opportunity and raw vision into documented, transferable work.",
                },
                {
                  org: "Artists and Athletes For Change",
                  role: "Director (AAFC)",
                  desc: "Uniting creatives and athletes to make meaningful community impact, refusing to treat young creators as content or spectacle.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className="group p-8 border border-white/8 hover:border-amber-400/25 transition-all duration-500 relative overflow-hidden">
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/50 mb-3 relative z-10">{item.role}</p>
                    <h3 className="font-serif text-2xl text-white mb-4 relative z-10">{item.org}</h3>
                    <p className="text-white/50 leading-relaxed relative z-10">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="border-l-2 border-amber-400/30 pl-8 py-2">
                <p className="font-serif text-xl text-white/75 leading-relaxed italic">
                  "Under his leadership, these initiatives refuse to treat young creators and athletes as content or spectacle. Instead, they invest in them as whole people, offering pathways, mentorship, and accountability that translate creativity and discipline into something durable and real."
                </p>
              </div>
            </Reveal>
          </section>
        </main>

        {/* ─── THE UNIVERSE (full bleed) ──────────────────── */}
        <section id="universe" className="py-24 border-t border-white/6 scroll-mt-16 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 mb-12">
            <SectionHeading eyebrow="Seven Published Works" title="The Black Boy Lie Universe" />
          </div>
          <div className="relative">
            {/* Horizontal scroll container */}
            <div className="flex gap-5 px-6 md:px-10 overflow-x-auto pb-6 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
              {BOOKS.map((book, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <motion.div
                    className="flex-shrink-0 w-64 border border-white/8 p-6 hover:border-amber-400/30 transition-all duration-500 group cursor-default"
                    style={{ scrollSnapAlign: "start" }}
                    onHoverStart={() => setHoveredBook(i)}
                    onHoverEnd={() => setHoveredBook(null)}
                    whileHover={{ y: -4 }}>
                    {/* Book cover placeholder */}
                    <div className="aspect-[2/3] mb-6 bg-gradient-to-b from-amber-400/8 to-amber-900/5 border border-amber-400/10 flex items-end p-4 relative overflow-hidden group-hover:border-amber-400/25 transition-colors duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-black/50" />
                      <div className="absolute top-3 left-3 w-4 h-px bg-amber-400/40" />
                      <div className="absolute top-3 right-3 w-4 h-px bg-amber-400/40" />
                      <span className="font-serif text-amber-400/30 text-[40px] leading-none relative z-10">{i + 1}</span>
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/50 mb-2">Vol. {String(i + 1).padStart(2, "0")}</p>
                    <h4 className="font-serif text-base text-white leading-snug mb-3 group-hover:text-amber-100 transition-colors duration-300">{book.title}</h4>
                    <p className="text-white/35 text-xs leading-relaxed">{book.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
              {/* View all CTA card */}
              <Reveal delay={0.5}>
                <Link href="/books">
                  <div className="flex-shrink-0 w-48 border border-amber-400/20 p-6 flex flex-col items-center justify-center gap-4 hover:border-amber-400/50 hover:bg-amber-400/5 transition-all duration-500 cursor-pointer h-full min-h-[340px]">
                    <div className="w-10 h-10 rounded-full border border-amber-400/30 flex items-center justify-center">
                      <span className="text-amber-400 text-lg">→</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 text-center">View All Books</span>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── PHILOSOPHY ─────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <section className="py-20 border-t border-white/6">
            <SectionHeading eyebrow="Operating Standard" title="Philosophy & Legacy" />
            <div className="grid md:grid-cols-2 gap-16">
              <Reveal>
                <p className="text-white/60 text-lg leading-relaxed">
                  Every arena Knox enters: literature, media, leadership, athletics. Each receives the same operating standard: excellence with substance and ambition grounded in soul. He is less interested in momentary visibility than in building a life and body of work that will still matter when trends pass.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="space-y-6">
                  {[
                    "Truth retains power.",
                    "Presence transforms lives.",
                    "Black boys deserve serious literature and serious investment.",
                    "Legacy is not postponed. It is written early, built deliberately, designed to last.",
                  ].map((line, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50 mt-2 flex-shrink-0" />
                      <p className="text-white/65 leading-relaxed">{line}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ─── CONNECT ────────────────────────────────────── */}
          <section id="connect" className="py-20 border-t border-white/6 scroll-mt-16">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Trophy, title: "Athlete", desc: "Cristo Rey De La Salle forward. NCAA registered. Multi-sport.", link: "/basketball", cta: "Athletic Profile" },
                { icon: Mic, title: "Speaker", desc: "Talks on discipline, Black boy voice, and creative work that lasts.", link: "/speaking", cta: "Speaking Info" },
                { icon: Users, title: "Director", desc: "Director of Artists & Athletes For Change. Youth development.", link: "/contact", cta: "Connect" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <Link href={item.link}>
                    <motion.div className="group p-8 border border-white/8 hover:border-amber-400/25 transition-all duration-500 cursor-pointer relative overflow-hidden h-full"
                      whileHover={{ y: -2 }}>
                      <motion.div className="absolute inset-0 bg-gradient-to-b from-amber-400/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <item.icon className="w-5 h-5 text-amber-400/50 mb-6 group-hover:text-amber-400 transition-colors duration-300 relative z-10" />
                      <h3 className="font-serif text-xl text-white mb-3 relative z-10">{item.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed mb-6 relative z-10">{item.desc}</p>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/50 group-hover:text-amber-300 transition-colors duration-300 relative z-10">
                        {item.cta} →
                      </span>
                    </motion.div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* All links */}
            <Reveal delay={0.2} className="mt-16">
              <p className="text-xs uppercase tracking-[0.4em] text-white/20 mb-6">Find Kiminou Online</p>
              <div className="flex flex-wrap gap-6">
                {SOCIAL_LINKS.map(l => (
                  <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.2em] text-white/30 hover:text-amber-300 transition-colors duration-300 flex items-center gap-1.5 group">
                    {l.name}
                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </Reveal>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}
