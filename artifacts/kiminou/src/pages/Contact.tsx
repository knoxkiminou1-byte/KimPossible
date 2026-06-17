import { Helmet } from "react-helmet";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import MessageBottle from "@/components/LuxuryFX/MessageBottle";
import { ExternalLink } from "lucide-react";
import { KIMINOU_IMAGES } from "@/lib/kiminouMedia";

const channels = [
  { label: "Twitter / X", href: "https://x.com/KnoxKiminou", handle: "@KnoxKiminou", desc: "Public conversation" },
  { label: "Email", href: "mailto:knoxkiminou1@gmail.com", handle: "knoxkiminou1@gmail.com", desc: "Best for formal requests" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kiminou-knox-50691a394/", handle: "Kiminou Knox", desc: "Professional connections" },
];

const PROCESS = [
  { step: "01", title: "Submit", desc: "Fill out the form with your inquiry type, event details, and what you hope to achieve." },
  { step: "02", title: "Review", desc: "I personally review every message. Expect a response within 3–5 business days." },
  { step: "03", title: "Connect", desc: "We get on a call, align on scope, and build something meaningful together." },
];

const INQUIRY_TYPES = [
  { label: "Speaking", desc: "Schools, teams, youth orgs, faith spaces" },
  { label: "Press & Media", desc: "Interviews, features, editorial coverage" },
  { label: "Book Collaboration", desc: "Projects, endorsements, partnerships" },
  { label: "AAFC Builders", desc: "Web design, digital infrastructure, brand systems" },
  { label: "Youth Programs", desc: "TeeShirtTeens, AAFC mentorship, community" },
  { label: "Other", desc: "Anything else. Reach out." },
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

export default function Contact() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Helmet>
        <title>Contact - Kiminou Knox</title>
        <meta name="description" content="Reach out to Kiminou Knox for speaking engagements, media inquiries, book collaborations, AAFC Builders projects, or youth program partnerships." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Contact", url: `${SITE_URL}/contact` },
            ]),
          )}
        </script>
      </Helmet>
      <Header />

      <main className="min-h-screen bg-black text-white">

        {/* ─── SPLIT-SCREEN HERO ─── */}
        <section ref={heroRef} className="min-h-screen grid lg:grid-cols-2">

          {/* Left — Photo + mission */}
          <motion.div
            className="relative overflow-hidden min-h-[50vh] lg:min-h-screen"
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${KIMINOU_IMAGES.officialHeadshot.src}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />

            {/* AAFC Mission */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.5 }}>
                <p className="text-[10px] uppercase tracking-[0.45em] text-amber-400/60 mb-4">AAFC Mission</p>
                <div className="w-8 h-px bg-amber-400/40 mb-5" />
                <p className="font-serif text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-sm italic">
                  "Artists and Athletes For Change. Uniting creatives and athletes to make meaningful community impact."
                </p>
                <p className="text-xs text-white/30 mt-4 uppercase tracking-[0.2em]">Kiminou Knox, Director</p>
              </motion.div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-8 left-8">
              <div className="w-6 h-6 border-t border-l border-amber-400/40" />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-28 lg:pt-12 pb-12"
            initial={{ opacity: 0, x: 40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <p className="text-xs uppercase tracking-[0.55em] text-amber-400/60 mb-5">Get in Touch</p>
            <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight mb-4" data-testid="contact-heading">
              Let's<br />
              <span className="italic text-amber-200/90">Connect</span>
            </h1>
            <div className="w-12 h-px bg-amber-400/40 mb-8" />
            <p className="text-white/45 leading-relaxed mb-10 max-w-sm">
              Reach out for speaking engagements, media inquiries, book collaborations, or any other opportunity. I respond personally.
            </p>

            {/* Direct channels */}
            <div className="space-y-0 mb-10">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/20 mb-4">Direct Channels</p>
              {channels.map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center justify-between border-t border-white/8 py-4 hover:border-amber-400/25 transition-colors duration-300">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/25 group-hover:text-amber-400/60 transition-colors duration-300 block">{c.label}</span>
                    <span className="text-xs text-white/20 mt-0.5">{c.desc}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/55 group-hover:text-amber-300 transition-colors duration-300">{c.handle}</span>
                    <ExternalLink className="w-3 h-3 text-white/15 group-hover:text-amber-400/50 transition-colors" />
                  </div>
                </a>
              ))}
              <div className="border-t border-white/6" />
            </div>
          </motion.div>
        </section>

        {/* ─── INQUIRY TYPES ─── */}
        <section className="py-20 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-14">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4">What I Work On</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Inquiry Types</h2>
              <div className="w-12 h-px bg-amber-400/40 mt-6" />
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/6">
              {INQUIRY_TYPES.map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="bg-black p-7 group hover:bg-white/[0.03] transition-colors duration-400 h-full">
                    <div className="w-5 h-px bg-amber-400/25 mb-4 group-hover:w-8 transition-all duration-400" />
                    <h3 className="font-serif text-lg text-white mb-2">{item.label}</h3>
                    <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="py-20 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-14">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4">How It Works</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">The Process</h2>
              <div className="w-12 h-px bg-amber-400/40 mt-6" />
            </Reveal>
            <div className="grid md:grid-cols-3 gap-0">
              {PROCESS.map((step, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div className="relative group p-8 md:p-10 border-t md:border-t-0 md:border-l border-white/8 first:border-l-0 first:border-t-0 hover:bg-white/[0.02] transition-colors duration-400">
                    <span className="font-serif text-6xl text-white/5 font-light absolute top-8 right-8 group-hover:text-amber-400/8 transition-colors duration-400">
                      {step.step}
                    </span>
                    <div className="w-6 h-px bg-amber-400/35 mb-6" />
                    <h3 className="font-serif text-2xl text-white mb-3">{step.title}</h3>
                    <p className="text-white/45 leading-relaxed text-sm">{step.desc}</p>
                    {i < PROCESS.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                        <span className="text-amber-400/25 text-xl">→</span>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FORM ─── */}
        <section className="py-24 border-t border-white/6">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-12">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4 font-medium">Send a Message</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
                Start the<br />
                <span className="italic text-amber-200/90">Conversation</span>
              </h2>
              <div className="w-12 h-px bg-amber-400/40 mt-6" />
            </Reveal>
            <Reveal delay={0.1}>
              <MessageBottle>
                <div className="border border-white/8 bg-white/[0.02] p-8 md:p-12">
                  <ContactForm
                    title=""
                    description=""
                    defaultInquiryType="other"
                    successMessage="Thank you for reaching out. I'll get back to you personally within 3–5 days."
                  />
                </div>
              </MessageBottle>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
