import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact - Kiminou Knox</title>
        <meta
          name="description"
          content="Contact Kiminou Knox for speaking engagements, media, partnerships, and collaborative opportunities."
        />
        <link rel="canonical" href="https://kiminouknox.com/contact" />
      </Helmet>

      <Header />

      <main className="relative min-h-screen overflow-hidden pb-20 pt-40 text-white">
        <div className="section-backdrop" aria-hidden="true">
          <img src="/speaking-bg-feb-27-2026.png" alt="" className="section-backdrop-image" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/62 via-black/82 to-black/92" />
          <div className="section-backdrop-vignette" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="luxury-kicker mb-4">Contact</p>
            <h1 className="luxury-heading mb-5 font-serif text-5xl font-light md:text-6xl" data-testid="contact-heading">
              Start The Conversation
            </h1>
            <p className="luxury-body text-base md:text-lg">
              For speaking, media, partnerships, and serious collaboration requests.
            </p>
          </div>

          <div className="luxury-surface rounded-3xl p-7 md:p-10">
            <ContactForm
              title="Send a Message"
              description="Share context, goals, and timing."
              defaultInquiryType="other"
              successMessage="Thank you for reaching out. I will get back to you soon."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
