import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

export default function MilesHallFeature() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Award Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Award Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Recognition
              </span>
            </div>

            {/* Main Content */}
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Miles Hall Foundation
              <span className="block text-primary mt-2">Youth Summit Top Essay</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Kiminou was recognized by the Miles Hall Foundation for his powerful essay submitted to the Youth Summit, addressing mental health awareness, community advocacy, and social justice. His work stood out among submissions nationwide for its depth, authenticity, and call to action.
            </p>

            {/* Details List */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold">Top Essay Finalist</p>
                  <p className="text-sm text-muted-foreground">Selected from submissions across the nation</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold">Youth Mental Health Advocacy</p>
                  <p className="text-sm text-muted-foreground">Addressing critical issues affecting young people</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold">Community Impact</p>
                  <p className="text-sm text-muted-foreground">Contributing to meaningful social change</p>
                </div>
              </li>
            </ul>

            {/* Call to Action */}
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
          </motion.div>

          {/* Right Column - Video Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted">
              {/* Embedded Video from Miles Hall Foundation website */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.themileshallfoundation.org/post/youth-summit-essay-finalist"
                  title="Kiminou Knox - Miles Hall Foundation Youth Summit Essay Winner"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  data-testid="iframe-miles-hall-video"
                ></iframe>
              </div>

              {/* Decorative Border Glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 pointer-events-none"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Structured Data for the Recognition */}
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
    </section>
  );
}
