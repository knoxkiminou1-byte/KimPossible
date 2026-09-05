import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedBookPromo from "@/components/FeaturedBookPromo";
import WhoIsKiminou from "@/components/WhoIsKiminou";
import PhotoGallery from "@/components/PhotoGallery";
import Testimonials from "@/components/Testimonials";
import BookPreview from "@/components/BookPreview";
import ParticleEffect from "@/components/ParticleEffect";
import PressStrip from "@/components/PressStrip";
import PoemOfTheDay from "@/components/PoemOfTheDay";
import Footer from "@/components/Footer";
import ContactFAB from "@/components/ContactFAB";
export default function Home() {

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kiminou Knox",
    "url": "https://kiminouknox.com/",
    "sameAs": [
      "https://x.com/KnoxKiminou",
      "https://www.youtube.com/@KiminouKnoxOfficial",
      "https://www.tiktok.com/@kiminou.knox"
    ],
    "jobTitle": "Author and Poet"
  };

  return (
    <>
      <Helmet>
        <title>Kiminou Knox - Author and Poet</title>
        <meta name="description" content="Official website of Kiminou Knox, a Bay Area raised, New Orleans based author and poet with ten published books, essays, speaking, KimYaps, and selected media." />
        <link rel="canonical" href="https://kiminouknox.com/" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox - Author and Poet" />
        <meta property="og:description" content="Bay Area raised, New Orleans based author and poet. Ten books. Host of KimYaps." />
        <meta property="og:url" content="https://kiminouknox.com/" />
        <meta property="og:image" content="https://kiminouknox.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox - Author and Poet" />
        <meta name="twitter:description" content="Bay Area raised, New Orleans based author and poet. Ten books. Host of KimYaps." />
        <meta name="twitter:image" content="https://kiminouknox.com/og-image.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <div className="bg-background text-foreground font-sans antialiased relative">
      <ParticleEffect 
        density={120} 
        effects={['sparkle', 'glow', 'star', 'dust']}
        colors={["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899"]}
        className="z-0"
      />
      <div className="relative z-10">
        <Header />
        <Hero />
        <WhoIsKiminou />
        <PoemOfTheDay />
        <FeaturedBookPromo />
        <BookPreview />
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
