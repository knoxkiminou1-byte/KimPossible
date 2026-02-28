import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Speaking() {

  return (
    <>
      <Helmet>
        <title>Speaking - Kiminou Knox</title>
        <meta name="description" content="Book Kiminou Knox for speaking engagements on craft discipline voice and the cost of silence. Available for teams schools and community groups." />
        <link rel="canonical" href="https://kiminouknox.com/speaking" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Speaking - Kiminou Knox" />
        <meta property="og:description" content="Speaking engagements on craft discipline and creative work" />
        <meta property="og:url" content="https://kiminouknox.com/speaking" />
        <meta property="og:image" content="https://kiminouknox.com/og/speaking.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Speaking - Kiminou Knox" />
        <meta name="twitter:description" content="Book speaking engagements" />
        <meta name="twitter:image" content="https://kiminouknox.com/og/speaking.jpg" />
      </Helmet>

      <Header />

      <main className="relative min-h-screen overflow-hidden pt-40 pb-20 text-white">
        <div className="section-backdrop" aria-hidden="true">
          <img
            src="/speaking-bg-feb-27-2026.png"
            alt=""
            className="section-backdrop-image"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/36 via-black/62 to-black/84" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(251,191,36,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.08),transparent_28%)]" />
          <div className="section-backdrop-vignette" />
          <div className="section-backdrop-glow" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="mb-6 font-serif text-5xl font-bold lg:text-6xl" data-testid="speaking-heading">
              Speaking
            </h1>
            <p className="text-lg text-white/76">
              I speak on craft discipline voice and the cost of silence. I work with teams schools and community groups to turn ideas into action.
            </p>
          </div>

          <div className="space-y-12 mb-16">
            <div className="border-l-4 border-amber-200 pl-6">
              <h2 className="mb-3 font-serif text-2xl font-bold text-white">
                Discipline and faith in daily practice
              </h2>
              <p className="leading-relaxed text-white/74">
                How to build sustainable creative habits that honor both your craft and your wellbeing. Drawing from athletics and writing this talk explores the intersection of discipline structure and spiritual grounding to create work that lasts.
              </p>
            </div>

            <div className="border-l-4 border-amber-200 pl-6">
              <h2 className="mb-3 font-serif text-2xl font-bold text-white">
                Black boy voice and the cost of silence
              </h2>
              <p className="leading-relaxed text-white/74">
                A conversation about finding your authentic voice when the world expects you to stay quiet. This talk addresses identity authenticity and the courage required to tell your truth especially when that truth challenges dominant narratives.
              </p>
            </div>

            <div className="border-l-4 border-amber-200 pl-6">
              <h2 className="mb-3 font-serif text-2xl font-bold text-white">
                Building creative work that lasts
              </h2>
              <p className="leading-relaxed text-white/74">
                Practical strategies for young creators to develop their craft build an audience and create meaningful work that stands the test of time. This talk covers everything from creative process to publishing to maintaining integrity in a fast paced digital world.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/42 p-8 backdrop-blur-md">
            <ContactForm
              title="Request a Speaking Engagement"
              description="Tell us about your event audience and what you hope to achieve. I'll get back to you as soon as possible."
              defaultInquiryType="speaking"
              showSpeakingFields={true}
              successMessage="Thank you for your interest. We will be in touch soon to discuss your speaking engagement."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
