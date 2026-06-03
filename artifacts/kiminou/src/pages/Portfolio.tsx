import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Twitter, ExternalLink, BookOpen, Trophy, Mic, Mail } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const books = [
  { title: "The Spirit of Solomon", year: 2024, status: "Published", genre: "Poetry" },
  { title: "Poems From A Black Boy", year: 2023, status: "Published", genre: "Poetry" },
  { title: "Hopeless Romantic", year: 2023, status: "Published", genre: "Poetry" },
  { title: "Boys Raised In Silence", year: 2024, status: "Published", genre: "Poetry" },
  { title: "The Adventures of Kiminou the Great and Chua the Wise", year: 2025, status: "Published", genre: "Children's" },
  { title: "The Black Boy Lie", year: 2025, status: "Coming Soon", genre: "Novel" },
];

const pillars = [
  { icon: BookOpen, label: "Author", value: "7 Published Works", sub: "Poetry & Children's Books", link: "/books" },
  { icon: Trophy, label: "Athlete", value: "6'7\" / 235 lbs", sub: "NCAA Eligible · Cristo Rey De La Salle", link: "/basketball" },
  { icon: Mic, label: "Speaker", value: "Award-Winning", sub: "Youth Summits & Schools", link: "/speaking" },
  { icon: Mail, label: "Director", value: "AAFC", sub: "Artists & Athletes For Change", link: "/contact" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/hofkiminou", handle: "@hofkiminou" },
  { icon: Twitter, label: "Twitter / X", href: "https://x.com/KnoxKiminou", handle: "@KnoxKiminou" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative pt-40 pb-28 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/4 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Portfolio</p>
                <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight mb-6">
                  Kiminou<br />
                  <span className="italic text-amber-200/90">Knox</span>
                </h1>
                <div className="w-12 h-px bg-amber-400/50 mb-8" />
                <p className="text-base text-white/55 leading-relaxed max-w-md mb-8">
                  Poet, novelist, athlete, and builder from East Palo Alto, California. My work follows Black boys wrestling with God, grief, desire, and the courage to stay soft in a hard city.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 border border-amber-400/25 text-xs uppercase tracking-[0.2em] text-amber-400/70">Bay Area</span>
                  <span className="px-3 py-1 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/40">Class of 2025</span>
                  <span className="px-3 py-1 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/40">NCAA Eligible</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="space-y-4"
              >
                {socials.map(s => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border border-white/8 p-5 hover:border-amber-400/30 hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5 text-white/30 group-hover:text-amber-400/70 transition-colors duration-300" />
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-0.5">{s.label}</p>
                          <p className="text-sm text-white/70 group-hover:text-amber-200 transition-colors duration-300">{s.handle}</p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/15 group-hover:text-amber-400/50 transition-colors duration-300" />
                    </a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 border-y border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-14">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Roles</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">What I Do</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.label} delay={i * 0.09}>
                    <Link href={p.link}>
                      <div className="group border border-white/8 bg-white/[0.025] p-7 hover:border-amber-400/25 hover:bg-white/[0.05] transition-all duration-400 cursor-pointer">
                        <Icon className="w-6 h-6 text-amber-400/50 group-hover:text-amber-400 transition-colors duration-300 mb-5" />
                        <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-2">{p.label}</p>
                        <p className="font-serif text-xl font-light text-white mb-1 group-hover:text-amber-100 transition-colors duration-300">{p.value}</p>
                        <p className="text-xs text-white/35">{p.sub}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Published Works */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-14">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Bibliography</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Published Works</h2>
            </Reveal>
            <div className="space-y-0">
              {books.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.07}>
                  <div className="group border-t border-white/8 py-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 md:gap-8 items-center hover:border-amber-400/20 transition-colors duration-400">
                    <span className="font-serif text-lg font-light text-white/80 group-hover:text-amber-100 transition-colors duration-300">{b.title}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/25">{b.genre}</span>
                    <span className="font-serif text-sm text-amber-400/50 italic">{b.year}</span>
                    <span className={`text-xs uppercase tracking-[0.15em] px-2.5 py-1 border ${
                      b.status === "Published"
                        ? "border-amber-400/25 text-amber-400/70"
                        : "border-white/10 text-white/30"
                    }`}>{b.status}</span>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-white/6" />
            </div>
            <Reveal delay={0.3} className="mt-10">
              <Link href="/books">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400/60 hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                  View All Books with Covers &amp; Buy Links →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-6 font-medium">Connect</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-8">
                Let's Build<br />
                <span className="italic text-amber-200/90">Something Together</span>
              </h2>
              <Link href="/contact">
                <motion.span
                  className="inline-flex items-center gap-3 px-10 py-4 border border-amber-400/40 text-amber-400/80 text-xs uppercase tracking-[0.2em] hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-400 cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get in Touch
                </motion.span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
