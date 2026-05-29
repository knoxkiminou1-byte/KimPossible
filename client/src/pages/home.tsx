import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedBookPromo from "@/components/FeaturedBookPromo";
import WhoIsKiminou from "@/components/WhoIsKiminou";
import PhotoGallery from "@/components/PhotoGallery";
import BookPreview from "@/components/BookPreview";
import PressStrip from "@/components/PressStrip";
import PoemOfTheDay from "@/components/PoemOfTheDay";
import Footer from "@/components/Footer";
import ContactFAB from "@/components/ContactFAB";
export default function Home() {

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kiminou Knox",
    "url": "https://www.kiminouknox.com/",
    "sameAs": [
      "https://x.com/KnoxKiminou",
      "https://x.com/KiminouKnox",
      "https://www.instagram.com/hofkiminou"
    ],
    "jobTitle": "Writer, Athlete, Program Builder"
  };

  return (
    <>
      <Helmet>
        <title>Kiminou Knox | Writer, Athlete & Program Builder</title>
        <meta name="description" content="Official website of Kiminou Knox, a Bay Area writer, athlete, and program builder. Explore books, basketball, speaking, and community work." />
        <link rel="canonical" href="https://www.kiminouknox.com/" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox | Writer, Athlete & Program Builder" />
        <meta property="og:description" content="Books, basketball, speaking, and community work from the Bay Area." />
        <meta property="og:url" content="https://www.kiminouknox.com/" />
        <meta property="og:image" content="https://www.kiminouknox.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox | Writer, Athlete & Program Builder" />
        <meta name="twitter:description" content="Bay Area writer, athlete, and program builder." />
        <meta name="twitter:image" content="https://www.kiminouknox.com/og-image.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <div className="bg-background text-foreground font-sans antialiased relative">
      <div className="relative z-10">
        <Header />
        <Hero />
        <WhoIsKiminou />
        <PoemOfTheDay />
        <FeaturedBookPromo />
        <BookPreview />
        <PhotoGallery />
        <PressStrip />
        <Footer />
        <ContactFAB />
      </div>
    </div>
    </>
  );
}
