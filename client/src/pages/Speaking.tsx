import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const speakingTopics = [
  {
    title: "Discipline and faith in daily practice",
    description:
      "How to build sustainable creative habits that honor both craft and spirit. Drawn from years in writing and competitive athletics.",
  },
  {
    title: "Black boy voice and the cost of silence",
    description:
      "A direct conversation on identity, authorship, and what it takes to tell the truth when silence is expected.",
  },
  {
    title: "Building creative work that lasts",
    description:
      "A practical framework for young creators to develop process, integrity, audience, and long-term impact.",
  },
];

export default function Speaking() {
  return (
    <>
      <Helmet>
        <title>Speaking - Kiminou Knox</title>
        <meta
          name="description"
          content="Book Kiminou Knox for speaking engagements on craft, discipline, voice, and legacy."
        />
        <link rel="canonical" href="https://kiminouknox.com/speaking" />
      </Helmet>

      <Header />

      <main className="relative min-h-screen overflow-hidden pb-20 pt-40 text-white">
        <div className="section-backdrop" aria-hidden="true">
          <img src="/speaking-bg-feb-27-2026.png" alt="" className="section-backdrop-image" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/76 to-black/92" />
          <div className="section-backdrop-vignette" />
          <div className="section-backdrop-glow" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          <section className="mb-14 max-w-3xl">
            <p className="luxury-kicker mb-4">Speaking</p>
            <h1 className="luxury-heading mb-6 font-serif text-5xl font-light md:text-6xl" data-testid="speaking-heading">
              Invite A Voice With Weight
            </h1>
            <p className="luxury-body text-base md:text-xl">
              For schools, teams, and communities looking for a speaker who brings substance, presence, and lived discipline.
            </p>
          </section>

          <section className="mb-14 grid gap-5">
            {speakingTopics.map((topic) => (
              <article key={topic.title} className="luxury-surface rounded-2xl p-7 md:p-9">
                <h2 className="mb-3 font-serif text-2xl text-amber-50">{topic.title}</h2>
                <p className="luxury-body text-base leading-relaxed">{topic.description}</p>
              </article>
            ))}
          </section>

          <section className="luxury-surface rounded-3xl p-7 md:p-10">
            <ContactForm
              title="Request a Speaking Engagement"
              description="Share event details, audience context, and desired outcomes."
              defaultInquiryType="speaking"
              showSpeakingFields={true}
              successMessage="Thank you for your interest. We will be in touch soon to discuss your speaking engagement."
            />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
