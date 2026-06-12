import { Helmet } from "react-helmet-async";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, lazy, Suspense, useCallback, useEffect } from "react";
import { ExternalLink, Headphones, Mic, Pause, Play, Radio } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientAudio from "@/components/AmbientAudio";
import ContactForm from "@/components/ContactForm";
import SeoFaqSection from "@/components/SeoFaqSection";
import GreenRoomStage from "@/components/LuxuryFX/GreenRoomStage";
import RadioDial from "@/components/LuxuryFX/RadioDial";
import { breadcrumbSchema, faqSchema, podcastSchema, SITE_URL } from "@/lib/seo";

const ApplausePhysics = lazy(() => import("@/components/LuxuryFX/ApplausePhysics"));

const PODCAST_APPLE = "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308";
const PODCAST_SPOTIFY = "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg";
const SPOTIFY_SHOW_EMBED_URL = "https://open.spotify.com/embed/show/4TB8QKI52yaGIFDOCCkrYg?utm_source=generator&theme=0";

const LOCAL_PODCAST_EPISODES = [
  {
    title: "Kiminou 09: Kiminou's Studio",
    label: "Auto-play episode",
    duration: "35 min",
    src: "/audio/kimyaps-kiminou-09-studio.m4a",
  },
  {
    title: "Magic Episode 01",
    label: "Riverside studio cut",
    duration: "32 min",
    src: "/audio/kimyaps-magic-episode-01.m4a",
  },
];

const POPULAR_SPOTIFY_EPISODES = [
  {
    rank: "01",
    title: "Proverbs 21 Bible Study",
    duration: "31 min",
    episodeId: "6xZ8JRKeIFuQtp1HWTf7Zs",
  },
  {
    rank: "02",
    title: "Why Do You Want to Be Mad at Me?",
    duration: "21 min",
    episodeId: "2Y7yeqvUSR16KUV9FQv2IL",
  },
  {
    rank: "03",
    title: "When Pain Becomes Your Personality",
    duration: "21 min",
    episodeId: "0b7VIQBAtZpBZrVR8ZtQD8",
  },
];

function spotifyEpisodeEmbed(episodeId: string) {
  return `https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=0`;
}

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

const speakingFaq = [
  { question: "What kinds of events does Kiminou speak at?", answer: "School assemblies, team events, youth programs, community gatherings, and faith-centered conversations are all a fit when the room wants a direct and grounded message." },
  { question: "What does a typical talk cover?", answer: "Most talks connect discipline, identity, faith, writing, grief, and the work of finding a voice without performing one." },
  { question: "How do you book Kiminou Knox?", answer: "Use the booking form on this page. Include the audience, date window, and what you want the room to leave with." },
  { question: "What is KimYaps?", answer: "KimYaps is Kiminou's podcast — honest conversations about navigating pain, finding purpose, and giving yourself and others a little extra grace. Available on Apple Podcasts and Spotify." },
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

function TalkCard({ talk, index }: { talk: typeof talks[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group border-t border-white/8 hover:border-amber-400/20 transition-colors duration-400">
      <button className="w-full text-left py-10 grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 items-start"
        onClick={() => setExpanded(e => !e)}>
        <span className="font-serif text-4xl text-white/6 font-light group-hover:text-amber-400/12 transition-colors duration-400 hidden md:block">{talk.num}</span>
        <div>
          <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-3 group-hover:text-amber-100 transition-colors duration-300">{talk.title}</h3>
          <p className="text-white/45 leading-relaxed max-w-2xl">{talk.full}</p>
          <motion.div initial={false} animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
            <div className="pt-6 space-y-4">
              <div className="border-l-2 border-amber-400/30 pl-4">
                <p className="font-serif text-lg italic text-amber-300/70">"{talk.quote}"</p>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-wrap gap-2 mt-4">
            {talk.tags.map(tag => (
              <span key={tag} className="px-3 py-1 border border-white/8 text-xs uppercase tracking-[0.15em] text-white/30 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 hidden md:flex items-center justify-center w-10 h-10 border border-white/10 group-hover:border-amber-400/30 transition-colors duration-300 mt-1">
          <motion.span className="text-amber-400/50 text-lg leading-none" animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.3 }}>+</motion.span>
        </div>
      </button>
    </motion.div>
  );
}

/* ─── Station metadata for non-KimYaps presets ─────────────── */
const STATION_INFO: Record<string, { label: string; genre: string; desc: string; color: string }> = {
  "88.5":  { label: "KQED",  genre: "Public Radio · NPR",  color: "#3b82f6",
    desc: "Bay Area news, arts, and public affairs from the nation's leading public broadcaster." },
  "93.7":  { label: "Wild",  genre: "Hip-Hop · R&B",       color: "#ec4899",
    desc: "The Bay's hottest hip-hop, trap, and R&B — keeping it real 24/7." },
  "102.1": { label: "KBLX",  genre: "R&B · Soul",          color: "#f59e0b",
    desc: "Classic and contemporary R&B and soul for the grown and sexy." },
  "107.7": { label: "KSAN",  genre: "Classic Rock",        color: "#ef4444",
    desc: "The Bone — Bay Area's home of classic rock legends." },
};

/* ─── The Radio Station Section ─────────────────────────────── */
function RadioStation() {
  const [tuned, setTuned] = useState(false);
  const [lockedFreq, setLockedFreq] = useState<string | null>(null);
  const [lockCount, setLockCount] = useState(0);
  const [activeLocalEpisode, setActiveLocalEpisode] = useState(LOCAL_PODCAST_EPISODES[0]);
  const [localPlaying, setLocalPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const kimYapsLocked = tuned && lockedFreq === "97.3";

  const handleLock = useCallback((locked: boolean, freq: string) => {
    setTuned(locked);
    setLockedFreq(locked ? freq : null);
    if (locked && freq === "97.3") {
      setActiveLocalEpisode(LOCAL_PODCAST_EPISODES[0]);
      setLockCount(c => c + 1);
    } else {
      localAudioRef.current?.pause();
    }
  }, []);

  const playLocalEpisode = useCallback((episode: typeof LOCAL_PODCAST_EPISODES[number]) => {
    setActiveLocalEpisode(episode);
    window.setTimeout(() => {
      localAudioRef.current?.play().catch(() => setLocalPlaying(false));
    }, 0);
  }, []);

  const pauseLocalForSpotify = useCallback(() => {
    localAudioRef.current?.pause();
  }, []);

  useEffect(() => {
    if (!kimYapsLocked) return;
    localAudioRef.current?.play().catch(() => setLocalPlaying(false));
  }, [kimYapsLocked, lockCount, activeLocalEpisode.src]);

  return (
    <section className="py-28 border-t border-white/6 relative overflow-hidden">
      {/* Ambient broadcast glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: tuned ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={sectionRef}>
        <Reveal className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <Radio className="w-5 h-5 text-amber-400/60" />
            <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 font-medium">KimYaps · Live Broadcast</p>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-4">
            Tune In to<br />
            <span className="italic text-amber-200/90">KimYaps FM</span>
          </h2>
          <div className="w-12 h-px bg-amber-400/40 mt-6" />
          <p className="text-white/40 max-w-lg mt-5 leading-relaxed">
            Drag the dial to 97.3 to unlock the broadcast. Honest conversations about pain, purpose, and grace — hosted by Kiminou Knox.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Radio receiver */}
          <Reveal delay={0.1}>
            <RadioDial onLock={handleLock} />

            {/* Platform links below the radio */}
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a href={PODCAST_APPLE} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-black font-semibold text-xs uppercase tracking-[0.14em] transition-all duration-300"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(251,191,36,0.35)" }}
                whileTap={{ scale: 0.97 }}>
                <ExternalLink className="w-3.5 h-3.5" /> Apple Podcasts
              </motion.a>
              <motion.a href={PODCAST_SPOTIFY} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/60 text-xs uppercase tracking-[0.14em] hover:border-amber-400/50 hover:text-amber-300 transition-all duration-300"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <ExternalLink className="w-3.5 h-3.5" /> Spotify
              </motion.a>
            </div>

            {/* About copy */}
            <div className="mt-8 space-y-3">
              {[
                { val: "26+", label: "Episodes" },
                { val: "2024–", label: "Active Since" },
                { val: "2", label: "Platforms" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-4 border-b border-white/6 pb-3">
                  <span className="font-serif text-2xl text-amber-300/80 w-16 shrink-0">{s.val}</span>
                  <span className="text-xs uppercase tracking-[0.25em] text-white/35">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right — Embedded player (revealed when tuned) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {tuned && lockedFreq === "97.3" ? (
                /* ── KimYaps FM — Local audio first, Spotify embeds available ── */
                <motion.div
                  key="kimyaps"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div className="w-2 h-2 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                    <span className="text-xs uppercase tracking-[0.35em] text-green-400/80 font-medium">On Air · KimYaps FM 97.3</span>
                  </div>
                  <div
                    className="relative overflow-hidden border border-white/8 bg-white/[0.025] p-5"
                    style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.55), 0 0 40px rgba(34,197,94,0.06)" }}
                  >
                    <div className="flex items-start justify-between gap-5 mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/60 mb-2">
                          Now Playing
                        </p>
                        <h3 className="font-serif text-2xl text-white/90 font-light">
                          {activeLocalEpisode.title}
                        </h3>
                        <p className="text-xs uppercase tracking-[0.24em] text-white/25 mt-2">
                          {activeLocalEpisode.label} · {activeLocalEpisode.duration}
                        </p>
                      </div>
                      <div className="shrink-0 w-11 h-11 border border-green-400/25 bg-green-400/10 flex items-center justify-center">
                        {localPlaying ? <Pause className="w-4 h-4 text-green-300" /> : <Play className="w-4 h-4 text-green-300" />}
                      </div>
                    </div>

                    <audio
                      key={`${activeLocalEpisode.src}-${lockCount}`}
                      ref={localAudioRef}
                      src={activeLocalEpisode.src}
                      controls
                      autoPlay
                      preload="metadata"
                      className="w-full"
                      onPlay={() => setLocalPlaying(true)}
                      onPause={() => setLocalPlaying(false)}
                      onEnded={() => setLocalPlaying(false)}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      {LOCAL_PODCAST_EPISODES.map((episode) => {
                        const active = episode.src === activeLocalEpisode.src;
                        return (
                          <button
                            key={episode.src}
                            type="button"
                            onClick={() => playLocalEpisode(episode)}
                            className={`min-h-14 text-left px-4 py-3 border transition-colors duration-300 ${
                              active
                                ? "border-amber-400/45 bg-amber-400/10 text-amber-100"
                                : "border-white/8 bg-black/25 text-white/45 hover:border-white/20 hover:text-white/70"
                            }`}
                          >
                            <span className="block text-[10px] uppercase tracking-[0.22em]">
                              {episode.duration}
                            </span>
                            <span className="block font-serif text-base leading-tight mt-1">
                              {episode.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Headphones className="w-4 h-4 text-amber-400/50" />
                      <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 font-medium">
                        Popular Episodes First
                      </p>
                    </div>
                    <div className="space-y-4">
                      {POPULAR_SPOTIFY_EPISODES.map((episode) => (
                        <div
                          key={episode.episodeId}
                          className="border border-white/8 bg-black/35 p-3"
                          onPointerDown={pauseLocalForSpotify}
                        >
                          <div className="flex items-center justify-between gap-4 mb-3 px-1">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="font-serif text-lg text-white/20 w-7 shrink-0">{episode.rank}</span>
                              <p className="text-sm text-white/65 leading-tight truncate">{episode.title}</p>
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 shrink-0">
                              {episode.duration}
                            </span>
                          </div>
                          <iframe
                            src={spotifyEpisodeEmbed(episode.episodeId)}
                            width="100%"
                            height="152"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title={`KimYaps Spotify episode: ${episode.title}`}
                            style={{ border: "none", display: "block", borderRadius: 2 }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 border border-white/8 bg-black/35 p-3" onPointerDown={pauseLocalForSpotify}>
                    <div className="flex items-center justify-between gap-4 mb-3 px-1">
                      <p className="text-sm text-white/50">Full KimYaps show</p>
                      <a href={PODCAST_SPOTIFY} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 hover:text-amber-300 transition-colors">
                        Spotify
                      </a>
                    </div>
                    <iframe
                      src={SPOTIFY_SHOW_EMBED_URL}
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title="KimYaps Podcast on Spotify"
                      style={{ border: "none", display: "block", borderRadius: 2 }}
                    />
                  </div>
                  <p className="text-xs text-white/25 leading-relaxed mt-4">
                    Also on{" "}
                    <a href={PODCAST_APPLE} target="_blank" rel="noopener noreferrer" className="text-amber-400/60 hover:text-amber-300 transition-colors">Apple Podcasts</a>
                    . New episodes monthly.
                  </p>
                  <div className="mt-5 border border-amber-400/15 bg-amber-400/4 p-4 text-xs text-white/40 leading-relaxed">
                    <span className="text-amber-400/70 font-semibold uppercase tracking-wider text-[10px]">Note — </span>
                    Some older episodes reference <span className="text-white/60">@Kiminou</span> on X. The correct handle is{" "}
                    <a href="https://x.com/KnoxKiminou" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">@KnoxKiminou</a>.
                  </div>
                </motion.div>
              ) : tuned && lockedFreq && STATION_INFO[lockedFreq] ? (
                /* ── Other live station card ── */
                (() => {
                  const info = STATION_INFO[lockedFreq]!;
                  return (
                    <motion.div
                      key={`station-${lockedFreq}`}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                      {/* On-air indicator */}
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div className="w-2 h-2 rounded-full"
                          style={{ background: info.color }}
                          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                        <span className="text-xs uppercase tracking-[0.35em] font-medium"
                          style={{ color: info.color + "cc" }}>
                          Live · {lockedFreq} FM
                        </span>
                      </div>

                      {/* Station card */}
                      <div className="border border-white/8 p-8"
                        style={{ background: "rgba(255,255,255,0.015)", boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${info.color}10` }}>
                        <p className="font-serif text-5xl md:text-6xl mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                          {info.label}
                        </p>
                        <p className="text-xs uppercase tracking-[0.35em] mb-8" style={{ color: info.color + "99" }}>
                          {info.genre}
                        </p>

                        {/* Animated waveform bars */}
                        <div className="flex items-end justify-center gap-1 mb-8" style={{ height: 48 }}>
                          {Array.from({ length: 22 }, (_, i) => (
                            <motion.div key={i} className="w-1.5 rounded-sm"
                              style={{ background: info.color + "70" }}
                              animate={{ height: [`${10 + Math.sin(i * 0.8) * 8}px`, `${22 + Math.sin(i * 1.2) * 14}px`] }}
                              transition={{
                                duration: 0.35 + (i % 5) * 0.09,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: i * 0.04,
                              }} />
                          ))}
                        </div>

                        <p className="text-sm text-white/35 leading-relaxed max-w-xs mx-auto text-center">
                          {info.desc}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/15 mt-5 text-center">
                          Streaming through the receiver
                        </p>
                      </div>
                    </motion.div>
                  );
                })()
              ) : (
                /* ── Untuned placeholder ── */
                <motion.div
                  key="untuned"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[352px] border border-white/8 flex flex-col items-center justify-center gap-6 text-center p-12"
                  style={{ background: "rgba(255,255,255,0.015)" }}
                >
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {[1, 2, 3].map((i) => (
                      <motion.div key={i} className="absolute rounded-full border border-amber-400/20"
                        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2.4, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
                        style={{ width: 40, height: 40 }} />
                    ))}
                    <Radio className="w-8 h-8 text-amber-400/40" />
                  </div>
                  <div>
                    <p className="font-serif text-xl text-white/30 mb-2">Signal not found</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/18">Drag the dial to tune in</p>
                  </div>
                  <motion.div className="w-32 h-px"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(245,158,11,0.4),transparent)" }}
                    animate={{ x: [-64, 64, -64] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────── */
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
        <title>Kiminou Knox — Speaking & KimYaps Podcast | Voice, Faith & Purpose</title>
        <meta name="description" content="Book Kiminou Knox for speaking engagements and tune into KimYaps on the Voice page, with local studio audio and popular Spotify episodes about faith, purpose, pain, and grace." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/speaking" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Speaking & KimYaps — Kiminou Knox" />
        <meta property="og:description" content="Speaker for schools, youth programs, and community groups. Host of KimYaps podcast. Topics: discipline, identity, faith, and Black boy voice." />
        <meta property="og:url" content="https://www.kiminouknox.com/speaking" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <meta name="twitter:title" content="Speaking & KimYaps — Kiminou Knox" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Kiminou Knox", url: `${SITE_URL}/speaking`, hasOccupation: { "@type": "Occupation", name: "Public Speaker", occupationLocation: { "@type": "Country", name: "United States" }, description: "Youth speaker on discipline, identity, Black boy voice, faith, and creative work." } })}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Speaking & KimYaps", url: `${SITE_URL}/speaking` }]))}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema(speakingFaq))}</script>
        <script type="application/ld+json">{JSON.stringify(podcastSchema())}</script>
      </Helmet>
      <Header />

      <GreenRoomStage>
        <main className="min-h-screen bg-black text-white">

          {/* ─── HERO ─── */}
          <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
            <motion.div className="absolute inset-0 bg-cover bg-center bg-[center_20%]"
              style={{ backgroundImage: "url('/kiminou-splash-art.png')", y: bgY, scale: 1.08 }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* Giant background words */}
            <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
              <span className="font-serif text-[18vw] font-light text-white/[0.025] leading-none select-none pr-8 text-right">
                VOICE<br />& SIGNAL
              </span>
            </div>

            <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24 md:pb-36 w-full"
              style={{ opacity: heroOpacity }}>
              <motion.div className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}>
                <Mic className="w-4 h-4 text-amber-400/60" />
                <p className="text-xs uppercase tracking-[0.55em] text-amber-400/70">Speaking · KimYaps Podcast</p>
              </motion.div>
              <motion.h1 className="font-serif font-light leading-none mb-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <span className="block text-6xl md:text-8xl lg:text-[9rem] text-white" style={{ textShadow: "0 4px 40px rgba(0,0,0,0.9)" }}>Voices that</span>
                <span className="block text-6xl md:text-8xl lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 italic">Move People</span>
              </motion.h1>
              <motion.div className="w-20 h-px bg-amber-400/60 mb-8"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.9 }} style={{ transformOrigin: "left" }} />
              <motion.p className="font-serif text-xl md:text-2xl text-white/65 font-light max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1 }}>
                I speak with schools, teams, and communities on writing, discipline, and faith — and host KimYaps, a podcast about the conversations we all need to have.
              </motion.p>
            </motion.div>
          </section>

          {/* ─── RADIO / PODCAST ─── */}
          <RadioStation />

          {/* ─── TALKS ─── */}
          <section className="py-20 border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <Reveal className="mb-12">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4 font-medium">Talk Topics</p>
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  <h2 className="font-serif text-4xl md:text-5xl font-light text-white">What I Speak On</h2>
                  <div className="flex flex-wrap gap-2 md:ml-auto">
                    {AUDIENCES.map(a => (
                      <button key={a} onClick={() => setAudience(a)}
                        className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-all duration-300 ${audience === a ? "border-amber-400/60 bg-amber-400/10 text-amber-300" : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-12 h-px bg-amber-400/40 mt-6" />
              </Reveal>
              <div className="space-y-0">
                {filtered.map((t, i) => <TalkCard key={t.num} talk={t} index={i} />)}
                {filtered.length === 0 && (
                  <div className="py-20 text-center">
                    <p className="font-serif text-xl text-white/30">No talks match this audience type.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ─── SPEAKING VISUAL ─── */}
          <section className="py-20 border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <Reveal className="mb-12">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4 font-medium">In The Room</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-2">See Kiminou Speak</h2>
                <div className="w-12 h-px bg-amber-400/40 mt-6" />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  {/* Real photo — Taun Hall youth summit */}
                  <div className="relative group overflow-hidden border border-white/8">
                    <img
                      src="/photos/kiminou-knox/kiminou-knox-speaking-taun-hall-youth-summit-event-2025.jpg"
                      alt="Kiminou Knox speaking alongside Taun Hall at a youth summit event in 2025"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ maxHeight: "520px" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70 mb-1">Live Event · 2025</p>
                      <p className="font-serif text-lg text-white/90 font-light">Youth Summit — with Taun Hall</p>
                    </div>
                  </div>

                  {/* YouTube CTA */}
                  <div className="flex flex-col gap-6">
                    <div className="relative group border border-white/8 overflow-hidden bg-black/40">
                      <img src="/kiminou-splash-art.png" alt="Kiminou Knox on stage" loading="lazy"
                        className="w-full object-cover object-top opacity-35 group-hover:opacity-45 transition-opacity duration-500"
                        style={{ maxHeight: "250px" }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <a href="https://www.youtube.com/@KiminouKnoxOfficial" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3">
                          <motion.div className="w-16 h-16 rounded-full border border-amber-400/50 flex items-center justify-center bg-amber-400/10 backdrop-blur-sm hover:bg-amber-400/20 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <svg className="w-6 h-6 text-amber-300 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </motion.div>
                          <div className="text-center">
                            <p className="font-serif text-xl text-white/90 mb-0.5">More on YouTube</p>
                            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/60">@KiminouKnoxOfficial</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Caption block */}
                    <div className="border border-white/6 p-6 bg-white/[0.02]">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/50 mb-3">Speaking Format</p>
                      <p className="text-white/50 text-sm leading-relaxed">
                        Kiminou speaks directly and without performance — on discipline, identity, faith, and the cost of silence. Assemblies, team events, community gatherings.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ─── BOOKING ─── */}
          <section className="py-24 border-t border-white/6">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
              <Reveal className="mb-12">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4 font-medium">Book Now</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
                  Request an<br /><span className="italic text-amber-200/90">Engagement</span>
                </h2>
                <div className="w-12 h-px bg-amber-400/40 mt-6 mb-6" />
                <p className="text-white/45 leading-relaxed">
                  Share the event, audience, and what you want the room to leave with. I'll get back to you personally.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="border border-white/8 bg-white/[0.02] p-8 md:p-12">
                  <ContactForm title="" description="" defaultInquiryType="speaking" compact={true}
                    successMessage="Thank you. I'll be in touch soon to discuss your event." />
                </div>
              </Reveal>
            </div>
          </section>

          <SeoFaqSection title="Speaking & Podcast questions"
            intro="These are the questions people usually ask before they book a session or tune in for the first time."
            items={speakingFaq} />
        </main>
      </GreenRoomStage>

      <Suspense fallback={null}><ApplausePhysics /></Suspense>
      <Footer />
      <AmbientAudio theme="cathedral" />
    </>
  );
}
