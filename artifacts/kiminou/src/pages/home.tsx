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

export default function Home() {
  const [paperMode, setPaperMode] = useState(false);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kiminou Knox",
    "url": "https://kiminouknox.com/",
    "sameAs": [
      "https://x.com/KnoxKiminou",
      "https://x.com/KiminouKnox",
      "https://www.instagram.com/hofkiminou"
    ],
    "jobTitle": "Athlete, Author, Entrepreneur"
  };

  return (
    <>
      <Helmet>
        <title>Kiminou Knox | Author, Athlete & Entrepreneur — Bay Area</title>
        <meta name="description" content="Kiminou Knox is a 19-year-old Bay Area author of 7 published poetry books, NCAA basketball athlete, and entrepreneur. Creator of the Black Boy Lie universe — Black Boy Poems, The Spirit of Solomon, Our Father?, Hopeless Romantic, and more." />
        <meta name="keywords" content="Kiminou Knox, Black Boy Poems, Spirit of Solomon, Our Father, Hopeless Romantic, Boys Raised in Silence, Bay Area author, Black poetry, basketball athlete, youth entrepreneur, Black Boy Lie universe, African American author" />
        <link rel="canonical" href="https://kiminouknox.com/" />

        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Kiminou Knox | Author, Athlete & Entrepreneur — Bay Area" />
        <meta property="og:description" content="19-year-old Bay Area author of 7 published poetry books, NCAA basketball athlete, and entrepreneur. Creator of the Black Boy Lie universe." />
        <meta property="og:url" content="https://kiminouknox.com/" />
        <meta property="og:image" content="https://kiminouknox.com/kiminou-knox-social-share.png" />
        <meta property="og:image:alt" content="Kiminou Knox — Author, Athlete, Entrepreneur from the Bay Area" />
        <meta property="og:site_name" content="Kiminou Knox" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KiminouKnox" />
        <meta name="twitter:creator" content="@KiminouKnox" />
        <meta name="twitter:title" content="Kiminou Knox | Author, Athlete & Entrepreneur" />
        <meta name="twitter:description" content="19-year-old Bay Area author of 7 poetry books, NCAA basketball athlete, entrepreneur. Creator of the Black Boy Lie universe." />
        <meta name="twitter:image" content="https://kiminouknox.com/kiminou-knox-social-share.png" />
        <meta name="twitter:image:alt" content="Kiminou Knox — Author, Athlete, Entrepreneur" />

        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <div className={`${paperMode ? "paper-realm-shell" : ""} bg-background text-foreground font-sans antialiased relative`}>
      <ParticleEffect 
        density={60} 
        effects={['sparkle', 'dust', 'star']}
        colors={["#F59E0B", "#FDE68A", "#FFFBEB", "#D97706"]}
        className="z-0"
      />
      <div id="main-content" className="relative z-10">
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
