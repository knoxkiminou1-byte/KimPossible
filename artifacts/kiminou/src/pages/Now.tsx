import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, BookOpen, Mic, PenLine, Trophy, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

const LAST_UPDATED = "July 2026";

type NowItem = {
  icon: typeof BookOpen;
  label: string;
  title: string;
  detail: string;
  link: { label: string; href: string; external?: boolean };
};

const NOW_ITEMS: NowItem[] = [
  {
    icon: BookOpen,
    label: "Latest Book",
    title: "Hopeless Romantic",
    detail: "The eighth published collection — an intimate, emotionally charged set on longing, closure, and staying tender. Currently the most-read of the eight.",
    link: { label: "Read the book", href: "/books/hopeless-romantic" },
  },
  {
    icon: PenLine,
    label: "Latest Essay",
    title: "Learning To Drive From The Passenger Seat",
    detail: "A new essay on Medium, published this year — on watching someone else figure things out and what it teaches you.",
    link: { label: "Read on Medium", href: "https://medium.com/@knoxkiminou1/learning-to-drive-from-the-passenger-seat-580a4a699a10", external: true },
  },
  {
    icon: Mic,
    label: "Podcast",
    title: "KimYaps",
    detail: "Honest conversations about pain, purpose, and grace — new episodes on Apple Podcasts, Spotify, and streaming live on KimYaps FM.",
    link: { label: "Listen now", href: "/speaking" },
  },
  {
    icon: Trophy,
    label: "Athletics",
    title: "Senior Season, NCAA Registered",
    detail: "Forward/center at Cristo Rey De La Salle. NCAA eligibility registered, focused on the recruiting process this season.",
    link: { label: "Athletic profile", href: "/sports" },
  },
  {
    icon: Users,
    label: "Building",
    title: "Director, AAFC",
    detail: "Directing Artists & Athletes For Change — youth development work that connects writing, sport, and community in one place.",
    link: { label: "See the work", href: "/press" },
  },
  {
    icon: Mic,
    label: "Speaking",
    title: "Currently Booking",
    detail: "Open for talks with schools, teams, and youth programs on discipline, faith, identity, and creative work. Speaking topics and booking below.",
    link: { label: "Book a talk", href: "/contact" },
  },
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

function NowCard({ item, index }: { item: NowItem; index: number }) {
  const Icon = item.icon;
  const inner = (
    <div className="group h-full border border-white/8 bg-white/[0.015] p-7 hover:border-amber-400/25 hover:bg-white/[0.03] transition-all duration-500 flex flex-col">
      <div className="flex items-center gap-3 mb-5">
        <Icon className="w-4 h-4 text-amber-400/60" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/50">{item.label}</p>
      </div>
      <h3 className="font-serif text-2xl text-white/90 mb-3 group-hover:text-amber-100 transition-colors duration-300">{item.title}</h3>
      <p className="text-sm text-white/40 leading-relaxed flex-1 mb-5">{item.detail}</p>
      <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-amber-400/60 group-hover:text-amber-300 transition-colors duration-300">
        {item.link.label} <ArrowUpRight className="w-3 h-3" />
      </span>
    </div>
  );

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      {item.link.external ? (
        <a href={item.link.href} target="_blank" rel="noopener noreferrer external" className="block h-full">
          {inner}
        </a>
      ) : (
        <Link href={item.link.href}>
          <div className="h-full cursor-pointer">{inner}</div>
        </Link>
      )}
    </Reveal>
  );
}

export default function Now() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Helmet>
        <title>Now — Kiminou Knox</title>
        <meta
          name="description"
          content="What Kiminou Knox is working on right now: latest book, latest essay, podcast, athletics, building, and speaking availability."
        />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/now`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Now — Kiminou Knox" />
        <meta property="og:description" content="What Kiminou Knox is working on right now — books, essays, podcast, athletics, and speaking." />
        <meta property="og:url" content={`${SITE_URL}/now`} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Now", url: `${SITE_URL}/now` },
          ]))}
        </script>
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="relative pt-40 pb-16 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/4 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Last updated · {LAST_UPDATED}</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6">
                Right <span className="italic text-amber-200/90">Now</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                What's current across the page, the court, the mic, and the work. Updated as things move.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-20 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {NOW_ITEMS.map((item, i) => (
                <NowCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Link href="/contact">
              <div className="group relative overflow-hidden border border-amber-400/15 bg-amber-400/[0.02] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-amber-400/35 hover:bg-amber-400/[0.05] transition-all duration-500 cursor-pointer">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-3">Get In Touch</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-2">Book a Talk or Say Hello</h2>
                  <p className="text-white/40 text-sm max-w-xl">Speaking, press, or just reaching out — the contact page gets you a real reply.</p>
                </div>
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400/80 group-hover:text-amber-300 transition-colors duration-300 flex-shrink-0">
                  Contact <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
