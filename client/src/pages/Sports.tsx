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

      <Header theme="maison" onThemeChange={() => {}} />

      <section className="min-h-screen bg-background text-foreground py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-primary/80 mb-4 font-semibold">
              Athletic Profile
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Sports & Athletics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Multi-sport athlete with varsity experience and NCAA eligibility
            </p>
          </motion.div>

          {/* Physical Stats */}
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
              <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-8 text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Height</p>
                <p className="text-3xl font-bold mb-2">6 feet 7 inches</p>
                <p className="text-xs text-muted-foreground">
                  Source: <a href="https://www.ncsasports.org" target="_blank" rel="noopener noreferrer external" className="text-primary hover:underline">NCSA</a>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-8 text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Weight</p>
                <p className="text-4xl font-bold mb-2">235 lbs</p>
                <p className="text-xs text-muted-foreground">
                  Source: <a href="https://www.ncsasports.org" target="_blank" rel="noopener noreferrer external" className="text-primary hover:underline">NCSA</a>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-8 text-center">
                <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Position</p>
                <p className="text-2xl font-bold mb-2">Forward/Center</p>
                <p className="text-xs text-muted-foreground">
                  Source: <a href="https://www.maxpreps.com" target="_blank" rel="noopener noreferrer external" className="text-primary hover:underline">MaxPreps</a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Athletic Profiles */}
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
              {/* NCSA */}
              <a
                href="https://www.ncsasports.org"
                target="_blank"
                rel="noopener noreferrer external"
                className="group rounded-2xl border border-border bg-card/60 backdrop-blur p-8 hover:bg-card transition-all hover:shadow-lg"
                data-testid="link-profile-ncsa"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-2">NCSA College Recruiting</h3>
                <p className="text-muted-foreground mb-4">
                  Complete athletic profile with stats, measurements, and recruiting information
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-semibold">
                  View Profile
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              {/* MaxPreps */}
              <a
                href="https://www.maxpreps.com"
                target="_blank"
                rel="noopener noreferrer external"
                className="group rounded-2xl border border-border bg-card/60 backdrop-blur p-8 hover:bg-card transition-all hover:shadow-lg"
                data-testid="link-profile-maxpreps"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-2">MaxPreps</h3>
                <p className="text-muted-foreground mb-4">
                  High school basketball statistics and team performance data
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-semibold">
                  View Profile
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              {/* 247Sports */}
              <a
                href="https://247sports.com"
                target="_blank"
                rel="noopener noreferrer external"
                className="group rounded-2xl border border-border bg-card/60 backdrop-blur p-8 hover:bg-card transition-all hover:shadow-lg"
                data-testid="link-profile-247sports"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-2">247Sports</h3>
                <p className="text-muted-foreground mb-4">
                  Rankings, news, and recruiting analysis for high school athletes
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-semibold">
                  View Profile
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            </div>
          </motion.div>

          {/* Career Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
              Career Highlights
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="rounded-xl border border-border bg-card/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Varsity Captain - Ygnacio Valley High School</h3>
                    <p className="text-muted-foreground">
                      Led team as captain, demonstrating leadership and athletic excellence
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Redwood Christian MVP</h3>
                    <p className="text-muted-foreground">
                      Most Valuable Player recognition for outstanding performance
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Pine Valley MVP</h3>
                    <p className="text-muted-foreground">
                      Recognized as Most Valuable Player at Pine Valley
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">CaliHoop Top Team Player Selection</h3>
                    <p className="text-muted-foreground">
                      Selected for elite team recognition by CaliHoop
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">NCAA Eligibility</h3>
                    <p className="text-muted-foreground">
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
