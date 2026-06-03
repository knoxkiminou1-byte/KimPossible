import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GoldMarquee from "@/components/LuxuryFX/GoldMarquee";
import FeaturedBookPromo from "@/components/FeaturedBookPromo";
import WhoIsKiminou from "@/components/WhoIsKiminou";
import PhotoGallery from "@/components/PhotoGallery";
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
export default function Home() {

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
        <title>Kiminou Knox - Athlete, Author, Entrepreneur</title>
        <meta name="description" content="Official website of Kiminou Knox. 19 year old athlete, published author, entrepreneur, and creative from the Bay Area. Seven published works, NCAA registered athlete, and youth advocate." />
        <link rel="canonical" href="https://kiminouknox.com/" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox - Athlete, Author, Entrepreneur" />
        <meta property="og:description" content="19 year old athlete, published author, entrepreneur, and creative from the Bay Area" />
        <meta property="og:url" content="https://kiminouknox.com/" />
        <meta property="og:image" content="https://kiminouknox.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox - Athlete, Author, Entrepreneur" />
        <meta name="twitter:description" content="19 year old athlete, published author, entrepreneur, and creative" />
        <meta name="twitter:image" content="https://kiminouknox.com/og-image.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <div className="bg-background text-foreground font-sans antialiased relative">
      <ParticleEffect 
        density={60} 
        effects={['sparkle', 'dust', 'star']}
        colors={["#F59E0B", "#FDE68A", "#FFFBEB", "#D97706"]}
        className="z-0"
      />
      <div className="relative z-10">
        <Header />
        <Hero />
        <GoldMarquee />
        <WhoIsKiminou />
        <StatsBanner />
        <PoemOfTheDay />
        <PoemAssembler />
        <FeaturedBookPromo />
        <QuoteTypewriter />
        <BookPreview />
        <WordCloud />
        <PhotoGallery />
        <PressStrip />
        <Testimonials />
        <Footer />
        <ContactFAB />
      </div>
    </div>
    </>
  );
}
