import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const talks = [
  {
    num: "01",
    title: "Discipline and Faith in Daily Practice",
    desc: "How to build sustainable creative habits that honor both your craft and your wellbeing. Drawing from athletics and writing, this talk explores the intersection of discipline, structure, and spiritual grounding to create work that lasts.",
    tags: ["Craft", "Faith", "Athletes"],
  },
  {
    num: "02",
    title: "Black Boy Voice and the Cost of Silence",
    desc: "A conversation about finding your authentic voice when the world expects you to stay quiet. This talk addresses identity, authenticity, and the courage required to tell your truth — especially when that truth challenges dominant narratives.",
    tags: ["Identity", "Youth", "Schools"],
  },
  {
    num: "03",
    title: "Building Creative Work That Lasts",
    desc: "Practical strategies for young creators to develop their craft, build an audience, and create meaningful work that stands the test of time. Covers creative process, publishing, and maintaining integrity in a fast-paced digital world.",
    tags: ["Entrepreneurship", "Creative", "Young People"],
  },
];

function RevealSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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

export default function Speaking() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Helmet>
        <title>Speaking - Kiminou Knox</title>
        <meta name="description" content="Book Kiminou Knox for speaking engagements on craft, discipline, voice, and the cost of silence." />
        <link rel="canonical" href="https://kiminouknox.com/speaking" />
      </Helmet>
      <Header />

      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative pt-40 pb-24 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-[140px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Speaking</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6" data-testid="speaking-heading">
                Voices that<br />
                <span className="italic text-amber-200/90">Move People</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-lg text-white/50 max-w-xl leading-relaxed">
                I speak on craft, discipline, voice, and the cost of silence. I work with teams, schools, and community groups to turn ideas into action.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pull Quote */}
        <section className="py-16 border-y border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <RevealSection>
              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-white/80 italic max-w-3xl leading-snug">
                "The most dangerous thing you can do is stay silent when you have something real to say."
              </blockquote>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/50 mt-6">— Kiminou Knox</p>
            </RevealSection>
          </div>
        </section>

        {/* Talks */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <RevealSection className="mb-16">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Talk Topics</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">What I Speak On</h2>
            </RevealSection>
            <div className="space-y-0">
              {talks.map((t, i) => (
                <RevealSection key={t.num} delay={i * 0.1}>
                  <div className="group border-t border-white/8 py-10 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 hover:border-amber-400/20 transition-colors duration-400">
                    <span className="font-serif text-3xl text-white/8 font-light group-hover:text-amber-400/15 transition-colors duration-400 hidden md:block">{t.num}</span>
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-4 group-hover:text-amber-100 transition-colors duration-300">
                        {t.title}
                      </h3>
                      <p className="text-base text-white/50 leading-relaxed mb-5 max-w-2xl">{t.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {t.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 border border-white/10 text-xs uppercase tracking-[0.15em] text-white/35 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-24 border-t border-white/6">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <RevealSection className="mb-12">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Book Now</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-4">Request a Speaking Engagement</h2>
              <p className="text-white/45 leading-relaxed">
                Tell us about your event, audience, and what you hope to achieve. I'll get back to you as soon as possible.
              </p>
            </RevealSection>
            <RevealSection delay={0.1} className="border border-white/8 bg-white/[0.025] p-8 md:p-10">
              <ContactForm
                title=""
                description=""
                defaultInquiryType="speaking"
                showSpeakingFields={true}
                successMessage="Thank you for your interest. We will be in touch soon to discuss your speaking engagement."
              />
            </RevealSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
