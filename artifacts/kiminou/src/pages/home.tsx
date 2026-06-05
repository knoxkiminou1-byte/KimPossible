import { Helmet } from "react-helmet";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GoldMarquee from "@/components/LuxuryFX/GoldMarquee";
import FeaturedBookPromo from "@/components/FeaturedBookPromo";
import WhoIsKiminou from "@/components/WhoIsKiminou";
import FilmStripGallery from "@/components/FilmStripGallery";
import Testimonials from "@/components/Testimonials";
import BookPreview from "@/components/BookPreview";
import ParticleEffect from "@/components/ParticleEffect";
import PressStrip from "@/components/PressStrip";
import PoemOfTheDay from "@/components/PoemOfTheDay";
import StatsBanner from "@/components/StatsBanner";
import Footer from "@/components/Footer";
import ContactFAB from "@/components/ContactFAB";
import QuoteTypewriter from "@/components/QuoteTypewriter";
import WordCloud from "@/components/WordCloud";
import PoemAssembler from "@/components/PoemAssembler";
import GenerativeArtPanel from "@/components/GenerativeArtPanel";
import ChapterScroll from "@/components/ChapterScroll";
import AmbientAudio from "@/components/AmbientAudio";
import PaperRealmPortal from "@/components/PaperRealmPortal";
import SeoFaqSection from "@/components/SeoFaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  personSchema,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_URL,
  websiteSchema,
} from "@/lib/seo";

export default function Home() {
  const [paperMode, setPaperMode] = useState(false);
  const homeFaq = [
    {
      question: "What does Kiminou Knox do?",
      answer:
        "Kiminou Knox is an athlete, author, speaker, and creative builder. The site brings together books, essays, speaking, athletics, and media in one place.",
    },
    {
      question: "How many books has Kiminou Knox published?",
      answer:
        "The site currently highlights seven published works across poetry, faith, identity, and love. Each book page includes covers, samples, and purchase links where available.",
    },
    {
      question: "What does he speak about?",
      answer:
        "Speaking topics include discipline, faith, identity, creativity, writing, Black boy life, and helping young people find a voice without performing one.",
    },
    {
      question: "How do you contact Kiminou Knox for a booking?",
      answer:
        "Use the contact form on the site for speaking, press, book, basketball, or other inquiries. The form routes requests through the same site you are viewing now.",
    },
    {
      question: "Where should I start on the site?",
      answer:
        "Start with the books, author, speaking, and press pages if you want the clearest search signals and the most direct view of the brand.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Kiminou Knox | Athlete, Author, Speaker</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="preload" as="image" href="/kiminou-splash-art.png" />
        <meta name="theme-color" content="#090705" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox | Athlete, Author, Speaker" />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={SITE_IMAGE} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox | Athlete, Author, Speaker" />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_IMAGE} />
        
        <script type="application/ld+json">
          {JSON.stringify(personSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
            ]),
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema(homeFaq))}
        </script>
      </Helmet>

      <div className={`${paperMode ? "paper-realm-shell" : ""} bg-background text-foreground font-sans antialiased relative`}>
      <ParticleEffect 
        density={60} 
        effects={['sparkle', 'dust', 'star']}
        colors={["#F59E0B", "#FDE68A", "#FFFBEB", "#D97706"]}
        className="z-0"
      />
      <div className="relative z-10">
        <Header />
        <button
          type="button"
          aria-pressed={paperMode}
          aria-label={paperMode ? "Return to regular site" : "Open 3D paper site"}
          onClick={() => setPaperMode((current) => !current)}
          className="fixed right-4 bottom-4 z-[120] h-12 w-12 border border-amber-300/50 bg-black/75 text-amber-200 backdrop-blur-md shadow-[0_0_35px_rgba(245,158,11,0.25)] hover:bg-amber-300 hover:text-black transition-colors"
        >
          3D
        </button>
        {paperMode ? (
          <>
            <PaperRealmPortal />
            <div id="section-books"><BookPreview /></div>
            <div id="section-gallery"><FilmStripGallery /></div>
            <GenerativeArtPanel />
          </>
        ) : (
          <>
            <div id="hero"><Hero /></div>
            <GoldMarquee />
            <ChapterScroll />
            <div id="who-is-kiminou"><WhoIsKiminou /></div>
            <div id="section-stats"><StatsBanner /></div>
            <div id="section-poem"><PoemOfTheDay /></div>
            <div id="section-poem-assembler"><PoemAssembler /></div>
            <div id="section-featured"><FeaturedBookPromo /></div>
            <div id="section-quotes"><QuoteTypewriter /></div>
            <div id="section-books"><BookPreview /></div>
            <div id="section-wordcloud"><WordCloud /></div>
            <div id="section-gallery"><FilmStripGallery /></div>
            <div id="section-press"><PressStrip /></div>
            <div id="section-testimonials"><Testimonials /></div>
            <SeoFaqSection
              title="A few common questions"
              intro="These are the search-intent questions people usually ask before they land on the books, speaking, or press pages."
              items={homeFaq}
            />
            <GenerativeArtPanel />
          </>
        )}
        <Footer />
        <ContactFAB />
        <AmbientAudio theme="noir" />
      </div>
      </div>
    </>
  );
}
