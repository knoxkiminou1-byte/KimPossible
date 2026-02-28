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
        <meta name="description" content="Kiminou Knox's athletic profile, statistics, and achievements. NCAA registered athlete with verified stats and profiles on NCSA, MaxPreps, and 247Sports." />
        <link rel="canonical" href="https://kiminouknox.com/sports" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sports & Athletics - Kiminou Knox" />
        <meta property="og:description" content="Athletic profile, statistics, and achievements" />
        <meta property="og:url" content="https://kiminouknox.com/sports" />
        <meta property="og:image" content="https://kiminouknox.com/og/sports.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sports & Athletics - Kiminou Knox" />
        <meta name="twitter:description" content="Athletic profile and statistics" />
        <meta name="twitter:image" content="https://kiminouknox.com/og/sports.jpg" />
      </Helmet>

      <Header />

      <section className="relative min-h-screen overflow-hidden pt-36 pb-20 text-white">
        <div className="section-backdrop" aria-hidden="true">
          <img
            src="/basketball-bg-feb-27-2026.png"
            alt=""
            className="section-backdrop-image"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/52 via-black/68 to-black/84" />
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
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-200/85">
              Athletic Profile
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Sports & Athletics
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-white/78">
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
              <div className="rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-8 text-center">
                <TrendingUp className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <p className="mb-2 text-sm uppercase tracking-wider text-white/60">Height</p>
                <p className="text-3xl font-bold mb-2">6 feet 7 inches</p>
                <p className="text-xs text-white/55">
                  Source: <a href="https://www.ncsasports.org" target="_blank" rel="noopener noreferrer external" className="text-amber-200 hover:underline">NCSA</a>
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-8 text-center">
                <Target className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <p className="mb-2 text-sm uppercase tracking-wider text-white/60">Weight</p>
                <p className="text-4xl font-bold mb-2">235 lbs</p>
                <p className="text-xs text-white/55">
                  Source: <a href="https://www.ncsasports.org" target="_blank" rel="noopener noreferrer external" className="text-amber-200 hover:underline">NCSA</a>
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-8 text-center">
                <Trophy className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <p className="mb-2 text-sm uppercase tracking-wider text-white/60">Position</p>
                <p className="text-2xl font-bold mb-2">Forward/Center</p>
                <p className="text-xs text-white/55">
                  Source: <a href="https://www.maxpreps.com" target="_blank" rel="noopener noreferrer external" className="text-amber-200 hover:underline">MaxPreps</a>
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
                href="https://www.ncsasports.org"
                target="_blank"
                rel="noopener noreferrer external"
                className="group rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-8 transition-all hover:bg-black/55 hover:shadow-lg"
                data-testid="link-profile-ncsa"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-200/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-amber-200" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-amber-200 transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-2">NCSA College Recruiting</h3>
                <p className="mb-4 text-white/72">
                  Complete athletic profile with stats, measurements, and recruiting information
                </p>
                <div className="inline-flex items-center gap-2 font-semibold text-amber-200">
                  View Profile
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              <a
                href="https://www.maxpreps.com"
                target="_blank"
                rel="noopener noreferrer external"
                className="group rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-8 transition-all hover:bg-black/55 hover:shadow-lg"
                data-testid="link-profile-maxpreps"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-200/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-amber-200" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-amber-200 transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-2">MaxPreps</h3>
                <p className="mb-4 text-white/72">
                  High school basketball statistics and team performance data
                </p>
                <div className="inline-flex items-center gap-2 font-semibold text-amber-200">
                  View Profile
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              <a
                href="https://247sports.com"
                target="_blank"
                rel="noopener noreferrer external"
                className="group rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-8 transition-all hover:bg-black/55 hover:shadow-lg"
                data-testid="link-profile-247sports"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-200/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-amber-200" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-amber-200 transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-2">247Sports</h3>
                <p className="mb-4 text-white/72">
                  Rankings, news, and recruiting analysis for high school athletes
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
              <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Varsity Captain - Ygnacio Valley High School</h3>
                    <p className="text-white/72">
                      Led team as captain, demonstrating leadership and athletic excellence
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Redwood Christian MVP</h3>
                    <p className="text-white/72">
                      Most Valuable Player recognition for outstanding performance
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Pine Valley MVP</h3>
                    <p className="text-white/72">
                      Recognized as Most Valuable Player at Pine Valley
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">CaliHoop Top Team Player Selection</h3>
                    <p className="text-white/72">
                      Selected for elite team recognition by CaliHoop
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-amber-200"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">NCAA Eligibility</h3>
                    <p className="text-white/72">
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
