import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Mic } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { podcastSchema, SITE_IMAGE, SITE_PODCAST_APPLE, SITE_PODCAST_SPOTIFY, SITE_URL } from "@/lib/seo";

const podcastStructuredData = podcastSchema();

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "KimYaps Podcast", item: `${SITE_URL}/podcast` },
  ],
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Podcast() {
  return (
    <>
      <Helmet>
        <title>KimYaps — Kiminou Knox Podcast | Faith, Purpose & Honest Conversations</title>
        <meta
          name="description"
          content="KimYaps is Kiminou Knox's podcast — honest conversations about navigating pain, finding purpose, and giving yourself (and others) a little extra grace. 26 episodes on Apple Podcasts and Spotify."
        />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/podcast`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/podcast`} />
        <meta property="og:title" content="KimYaps — Kiminou Knox Podcast | Faith, Purpose & Honest Conversations" />
        <meta
          property="og:description"
          content="KimYaps is Kiminou Knox's podcast — honest conversations about navigating pain, finding purpose, and giving yourself (and others) a little extra grace."
        />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <meta name="twitter:creator" content="@KnoxKiminou" />
        <meta name="twitter:title" content="KimYaps — Kiminou Knox Podcast" />
        <meta
          name="twitter:description"
          content="Honest conversations about navigating pain, finding purpose, and giving yourself a little extra grace. New episodes monthly."
        />
        <script type="application/ld+json">{JSON.stringify(podcastStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-background text-white pt-24 pb-32">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 lg:px-10 text-center mb-20">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mic className="w-5 h-5 text-amber-400" />
              <span className="text-xs uppercase tracking-[0.35em] text-amber-400/70 font-medium">
                KimYaps · Active Since 2024
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-white leading-tight mb-6">
              KimYaps
            </h1>
            <div className="w-10 h-px bg-amber-400/50 mx-auto mb-8" />
            <p className="text-lg text-white/55 leading-relaxed max-w-2xl mx-auto">
              Honest conversations about navigating pain, finding purpose, and giving yourself — and others — a little extra grace. Hosted by Kiminou Knox.
            </p>
          </Reveal>
        </section>

        {/* Stats strip */}
        <Reveal delay={0.1}>
          <div className="border-t border-b border-white/8 py-8 mb-20">
            <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
              {[
                { value: "26", label: "Episodes" },
                { value: "2024–", label: "Active Since" },
                { value: "2", label: "Platforms" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-amber-300 mb-1">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* About the show */}
        <Reveal delay={0.15}>
          <section className="max-w-3xl mx-auto px-6 lg:px-10 mb-20">
            <h2 className="font-serif text-2xl text-white mb-5">About the Show</h2>
            <div className="w-8 h-px bg-amber-400/40 mb-7" />
            <p className="text-white/55 leading-relaxed mb-4">
              KimYaps started as a simple idea: what if we actually talked about the things we're all feeling but pretending not to? Kiminou Knox brings his voice as an eight-time published author, athlete, and youth leader to real conversations — no filter, no performance.
            </p>
            <p className="text-white/55 leading-relaxed">
              Topics range from masculinity and mental health to faith, relationships, and what it means to grow up Black in America today. New episodes drop monthly.
            </p>
          </section>
        </Reveal>

        {/* Listen links */}
        <Reveal delay={0.2}>
          <section className="max-w-3xl mx-auto px-6 lg:px-10 mb-20">
            <h2 className="font-serif text-2xl text-white mb-5">Listen Now</h2>
            <div className="w-8 h-px bg-amber-400/40 mb-7" />
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={SITE_PODCAST_APPLE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-400 text-black font-semibold text-sm uppercase tracking-[0.14em] transition-all duration-300"
                whileHover={{ scale: 1.03, boxShadow: "0 16px 40px rgba(251,191,36,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink className="w-4 h-4" />
                Apple Podcasts
              </motion.a>
              <motion.a
                href={SITE_PODCAST_SPOTIFY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/70 text-sm uppercase tracking-[0.14em] hover:border-amber-400/50 hover:text-amber-300 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink className="w-4 h-4" />
                Spotify
              </motion.a>
            </div>
          </section>
        </Reveal>

        {/* Note to show notes */}
        <Reveal delay={0.25}>
          <section className="max-w-3xl mx-auto px-6 lg:px-10">
            <div className="border border-amber-400/20 bg-amber-400/4 p-6 text-sm text-white/50 leading-relaxed">
              <span className="text-amber-400/80 font-semibold uppercase tracking-wider text-xs">Note — </span>
              Some older episode show notes reference <span className="text-white/70">@Kiminou</span> on X/Twitter. The correct handle is{" "}
              <a
                href="https://x.com/KnoxKiminou"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline"
              >
                @KnoxKiminou
              </a>
              . The <span className="text-white/70">@Kiminou</span> handle belongs to an unrelated account.
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
