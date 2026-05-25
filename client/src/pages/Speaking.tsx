import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Speaking() {

  return (
    <>
      <Helmet>
        <title>Speaking - Kiminou Knox</title>
        <meta name="description" content="Book Kiminou Knox for talks with schools, teams, and community groups on writing, discipline, faith, grief, and voice." />
        <link rel="canonical" href="https://kiminouknox.com/speaking" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Speaking - Kiminou Knox" />
        <meta property="og:description" content="Talks for schools, teams, and community groups." />
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(251,191,36,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.08),transparent_28%)]" />
          <div className="section-backdrop-vignette" />
          <div className="section-backdrop-glow" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="mb-6 font-serif text-5xl font-bold lg:text-6xl" data-testid="speaking-heading">
              Speaking
            </h1>
            <p className="text-lg text-white/75">
              I speak with schools, teams, and community groups about writing, discipline, faith, grief, and the work it takes to tell the truth without performing it.
            </p>
          </div>

          <div className="space-y-12 mb-16">
            <div className="border-l-4 border-amber-200 pl-6">
              <h2 className="mb-3 font-serif text-2xl font-bold text-white">
                Discipline and faith in daily practice
              </h2>
              <p className="leading-relaxed text-white/75">
                A practical talk on building habits that can hold up under real pressure. It connects athletics, writing, structure, and spiritual grounding without turning discipline into performance.
              </p>
            </div>

            <div className="border-l-4 border-amber-200 pl-6">
              <h2 className="mb-3 font-serif text-2xl font-bold text-white">
                Black boy voice and honest expression
              </h2>
              <p className="leading-relaxed text-white/75">
                A conversation about identity, pressure, tenderness, and the language many young men are never given. The focus is honesty, not slogans.
              </p>
            </div>

            <div className="border-l-4 border-amber-200 pl-6">
              <h2 className="mb-3 font-serif text-2xl font-bold text-white">
                Building creative work that lasts
              </h2>
              <p className="leading-relaxed text-white/75">
                A grounded session for young creators on developing a practice, finishing projects, sharing work, and keeping integrity in a fast-moving digital world.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/40 p-8 backdrop-blur-md">
            <ContactForm
              title="Contact"
              description="Share the event, audience, and what you want the room to leave with."
              defaultInquiryType="speaking"
              showSpeakingFields={true}
              successMessage="Thank you for reaching out. I will be in touch soon."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
