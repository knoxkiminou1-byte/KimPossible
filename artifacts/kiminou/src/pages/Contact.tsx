import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const channels = [
  { label: "Instagram", href: "https://www.instagram.com/hofkiminou", handle: "@hofkiminou" },
  { label: "Twitter / X", href: "https://x.com/KnoxKiminou", handle: "@KnoxKiminou" },
  { label: "Email", href: "mailto:knoxkiminou1@gmail.com", handle: "knoxkiminou1@gmail.com" },
];

export default function Contact() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  return (
    <>
      <Helmet>
        <title>Contact - Kiminou Knox</title>
        <meta name="description" content="Get in touch with Kiminou Knox for speaking engagements, media inquiries, or collaboration opportunities." />
        <link rel="canonical" href="https://kiminouknox.com/contact" />
      </Helmet>
      <Header />

      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative pt-40 pb-20 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 bg-amber-500/4 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Get in Touch</p>
                <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6" data-testid="contact-heading">
                  Let's<br />
                  <span className="italic text-amber-200/90">Connect</span>
                </h1>
                <div className="w-12 h-px bg-amber-400/50 mb-8" />
                <p className="text-base text-white/50 leading-relaxed max-w-sm">
                  Reach out for speaking engagements, media inquiries, book collaborations, or any other opportunity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="space-y-5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/25 font-medium mb-6">Direct Channels</p>
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-t border-white/8 pt-4 hover:border-amber-400/30 transition-colors duration-300"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] text-white/30 group-hover:text-amber-400/60 transition-colors duration-300">{c.label}</span>
                    <span className="text-sm text-white/60 group-hover:text-amber-300 transition-colors duration-300">{c.handle} →</span>
                  </a>
                ))}
                <div className="border-t border-white/6" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-20 border-t border-white/6" ref={formRef}>
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Send a Message</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Start the Conversation</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="border border-white/8 bg-white/[0.025] p-8 md:p-10"
            >
              <ContactForm
                title=""
                description=""
                defaultInquiryType="other"
                successMessage="Thank you for reaching out. I will get back to you soon."
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
