import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestReleases from "@/components/LatestReleases";
import MilesHallFeature from "@/components/MilesHallFeature";
import WhoIsKiminou from "@/components/WhoIsKiminou";
import StatsShowcase from "@/components/StatsShowcase";
import PhotoGallery from "@/components/PhotoGallery";
import Testimonials from "@/components/Testimonials";
import BookPreview from "@/components/BookPreview";
import MediaKit from "@/components/MediaKit";
import ParticleEffect from "@/components/ParticleEffect";
import PressStrip from "@/components/PressStrip";
import PoemOfTheDay from "@/components/PoemOfTheDay";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContactFAB from "@/components/ContactFAB";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  const { theme, changeTheme } = useTheme();

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
        <meta name="description" content="Official website of Kiminou Knox. 19 year old athlete, published author, entrepreneur, and creative from the Bay Area. Six published works, NCAA registered athlete, and youth advocate." />
        <link rel="canonical" href="https://kiminouknox.com/home" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox - Athlete, Author, Entrepreneur" />
        <meta property="og:description" content="19 year old athlete, published author, entrepreneur, and creative from the Bay Area" />
        <meta property="og:url" content="https://kiminouknox.com/home" />
        <meta property="og:image" content="https://kiminouknox.com/og/home.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox - Athlete, Author, Entrepreneur" />
        <meta name="twitter:description" content="19 year old athlete, published author, entrepreneur, and creative" />
        <meta name="twitter:image" content="https://kiminouknox.com/og/home.jpg" />
        
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
        <Header theme={theme} onThemeChange={changeTheme} />
        <Hero />
        <WhoIsKiminou />
        <StatsShowcase />
        <PoemOfTheDay />
        <LatestReleases />
        <BookPreview />
        <PhotoGallery />
        <MilesHallFeature />
        <PressStrip />
        <Testimonials />
        <MediaKit />
        <Contact />
        <Footer />
        <ContactFAB />
      </div>
    </div>
    </>
  );
}
