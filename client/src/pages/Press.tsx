import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ExternalLink, Award, Trophy, Newspaper } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Press() {
  return (
    <>
      <Helmet>
        <title>Press & Features - Kiminou Knox</title>
        <meta name="description" content="Awards, recognition, and media features highlighting Kiminou Knox's achievements in athletics, literature, and community advocacy." />
        <link rel="canonical" href="https://kiminouknox.com/press" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Press & Features - Kiminou Knox" />
        <meta property="og:description" content="Awards, recognition, and media features highlighting Kiminou Knox's achievements" />
        <meta property="og:url" content="https://kiminouknox.com/press" />
        <meta property="og:image" content="https://kiminouknox.com/og/press.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Press & Features - Kiminou Knox" />
        <meta name="twitter:description" content="Awards, recognition, and media features" />
        <meta name="twitter:image" content="https://kiminouknox.com/og/press.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "Miles Hall Foundation Youth Summit Top Essay",
            "publisher": {
              "@type": "Organization",
              "name": "Miles Hall Foundation"
            },
            "url": "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist"
          })}
        </script>
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
              Recognition & Media
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Press & Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Awards, recognition, and media coverage highlighting achievements in athletics, literature, and community advocacy
            </p>
          </motion.div>

          {/* Featured Recognition - Miles Hall Foundation */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 rounded-3xl border border-border bg-card/60 backdrop-blur overflow-hidden shadow-2xl"
            data-testid="article-miles-hall-foundation"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Column - Content */}
              <div className="p-8 lg:p-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Featured Recognition
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  Miles Hall Foundation Youth Summit
                </h2>
                <p className="text-lg text-primary/80 font-semibold mb-6">
                  Top Essay Finalist
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Kiminou was recognized by the Miles Hall Foundation for his powerful essay addressing mental health awareness, community advocacy, and social justice. His work stood out among submissions nationwide for its depth, authenticity, and call to action.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-foreground">National Recognition</p>
                      <p className="text-sm text-muted-foreground">Selected among top essays nationwide</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-foreground">Youth Mental Health Advocacy</p>
                      <p className="text-sm text-muted-foreground">Addressing critical issues affecting young people</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.themileshallfoundation.org/post/youth-summit-essay-finalist"
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold transition-colors"
                    data-testid="link-miles-hall-essay"
                  >
                    Read Full Essay
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.themileshallfoundation.org"
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:bg-accent rounded-lg font-semibold transition-colors"
                    data-testid="link-miles-hall-foundation"
                  >
                    Visit Foundation
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Structured Data */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "CreativeWork",
                  "name": "Miles Hall Foundation Youth Summit Top Essay",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Miles Hall Foundation"
                  },
                  "url": "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist"
                })}} />
              </div>

              {/* Right Column - Instagram Reel Embed */}
              <div className="bg-muted/30 p-8 lg:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                    {/* Instagram Reel Embed - Replace with actual Instagram post URL */}
                    <blockquote 
                      className="instagram-media" 
                      data-instgrm-permalink="https://www.instagram.com/reel/YOUR_REEL_ID_HERE/"
                      data-instgrm-version="14"
                      style={{
                        background: '#FFF',
                        border: 0,
                        borderRadius: '3px',
                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                        margin: '1px',
                        maxWidth: '540px',
                        minWidth: '326px',
                        padding: 0,
                        width: 'calc(100% - 2px)'
                      }}
                    >
                    </blockquote>
                    <script async src="//www.instagram.com/embed.js"></script>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Follow <a href="https://www.instagram.com/themileshallfoundation/" target="_blank" rel="noopener noreferrer external" className="text-primary hover:underline">@themileshallfoundation</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Athletic Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-primary" />
              Athletic Recognition
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ygnacio Valley High School */}
              <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Newspaper className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ygnacio Valley High School</h3>
                    <p className="text-muted-foreground mb-3">
                      Varsity team captain and key contributor to team success. Recognized in school and district announcements for athletic achievement and leadership.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Source:</span> Ygnacio Valley High School Athletics Department
                    </p>
                  </div>
                </div>
              </div>

              {/* PrepHoops & 247Sports */}
              <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">National Sports Media</h3>
                    <p className="text-muted-foreground mb-3">
                      Featured in PrepHoops and 247Sports for standout performances as Redwood Christian MVP and Pine Valley MVP.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Source:</span> PrepHoops, 247Sports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Media Coverage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
              Additional Coverage
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card/40 p-6 hover:bg-card/60 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">2020 Census PSA Commercial</h3>
                    <p className="text-muted-foreground">
                      Participated in public service announcement commercials promoting civic engagement and census participation
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card/40 p-6 hover:bg-card/60 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Political Campaign Contributions</h3>
                    <p className="text-muted-foreground">
                      Creative contributor to campaigns for Vivian Flowers and Regina Wallace-Jones
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
