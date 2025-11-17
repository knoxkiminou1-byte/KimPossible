import { motion } from "framer-motion";

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

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Kiminou Speaks on the
            <span className="block text-primary mt-2">Miles Hall Foundation Youth Summit</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted">
            {/* YouTube Shorts Embed */}
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}> {/* 9:16 aspect ratio for Shorts */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/o2E5_LOn15s"
                title="Kiminou Knox talks about Miles Hall Foundation Youth Summit"
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
    </section>
  );
}
