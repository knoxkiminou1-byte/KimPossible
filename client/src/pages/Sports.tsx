import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ExternalLink, Trophy, TrendingUp, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Sports() {

  return (
    <>
      <Helmet>
        <title>Sports & Athletics - Kiminou Knox</title>
        <meta name="description" content="Kiminou Knox's athletic profile, statistics, and achievements. NCAA registered athlete with profiles on NCSA, MaxPreps, and Prep Hoops." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.kiminouknox.com/sports" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sports & Athletics - Kiminou Knox" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta property="og:description" content="Athletic profile, statistics, and achievements" />
        <meta property="og:url" content="https://www.kiminouknox.com/sports" />
        <meta property="og:image" content="https://www.kiminouknox.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sports & Athletics - Kiminou Knox" />
        <meta name="twitter:description" content="Athletic profile and statistics" />
        <meta name="twitter:image" content="https://www.kiminouknox.com/og-image.png" />
      </Helmet>

      <Header />

      <section className="relative min-h-screen overflow-hidden pt-36 pb-20 text-white">
        <div className="section-backdrop" aria-hidden="true">
          <img
            src="/basketball-bg-feb-27-2026.jpg"
            alt=""
            className="section-backdrop-image"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(251,191,36,0.14),transparent_36%),radial-gradient(circle_at_78%_16%,rgba(245,158,11,0.08),transparent_28%)]" />
          <div className="section-backdrop-vignette" />
          <div className="section-backdrop-glow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-200/80">
              Athletic Profile
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Sports & Athletics
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-white/80">
              Multi-sport athlete with varsity experience and NCAA eligibility
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
              Physical Measurables
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-8 text-center">
                <TrendingUp className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <p className="mb-2 text-sm uppercase tracking-wider text-white/60">Height</p>
                <p className="text-3xl font-bold mb-2">6 feet 7 inches</p>
                <p className="text-xs text-white/60">
                  Source: <a href="https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox" target="_blank" rel="noopener noreferrer external" className="text-amber-200 hover:underline">NCSA</a>
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-8 text-center">
                <Target className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <p className="mb-2 text-sm uppercase tracking-wider text-white/60">Weight</p>
                <p className="text-4xl font-bold mb-2">235 lbs</p>
                <p className="text-xs text-white/60">
                  Source: <a href="https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox" target="_blank" rel="noopener noreferrer external" className="text-amber-200 hover:underline">NCSA</a>
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-8 text-center">
                <Trophy className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <p className="mb-2 text-sm uppercase tracking-wider text-white/60">Position</p>
                <p className="text-2xl font-bold mb-2">Forward/Center</p>
                <p className="text-xs text-white/60">
                  Source: <a href="https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2" target="_blank" rel="noopener noreferrer external" className="text-amber-200 hover:underline">MaxPreps</a>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
              Verified Profiles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox"
                target="_blank"
                rel="noopener noreferrer external"
                className="group rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-8 transition-all hover:bg-black/50 hover:shadow-lg"
                data-testid="link-profile-ncsa"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-200/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-amber-200" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-amber-200 transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-2">NCSA College Recruiting</h3>
                <p className="mb-4 text-white/70">
                  Complete athletic profile with stats, measurements, and recruiting information
                </p>
                <div className="inline-flex items-center gap-2 font-semibold text-amber-200">
                  View Profile
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              <a
                href="https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2"
                target="_blank"
                rel="noopener noreferrer external"
                className="group rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-8 transition-all hover:bg-black/50 hover:shadow-lg"
                data-testid="link-profile-maxpreps"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-200/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-amber-200" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-amber-200 transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-2">MaxPreps</h3>
                <p className="mb-4 text-white/70">
                  High school basketball statistics and team performance data
                </p>
                <div className="inline-flex items-center gap-2 font-semibold text-amber-200">
                  View Profile
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              <a
                href="https://prephoops.com/player/kiminou-knox/"
                target="_blank"
                rel="noopener noreferrer external"
                className="group rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-8 transition-all hover:bg-black/50 hover:shadow-lg"
                data-testid="link-profile-prephoops"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-200/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-amber-200" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-amber-200 transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Prep Hoops</h3>
                <p className="mb-4 text-white/70">
                  Player profile and recruiting coverage
                </p>
                <div className="inline-flex items-center gap-2 font-semibold text-amber-200">
                  View Profile
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
              Career Highlights
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Varsity Captain - Ygnacio Valley High School</h3>
                    <p className="text-white/70">
                      Led team as captain, demonstrating leadership and athletic excellence
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Redwood Christian MVP</h3>
                    <p className="text-white/70">
                      Most Valuable Player recognition for outstanding performance
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Pine Valley MVP</h3>
                    <p className="text-white/70">
                      Recognized as Most Valuable Player at Pine Valley
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">CaliHoop Top Team Player Selection</h3>
                    <p className="text-white/70">
                      Selected for CaliHoop team recognition
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">NCAA Eligibility</h3>
                    <p className="text-white/70">
                      Registered with NCAA eligibility for collegiate athletics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
