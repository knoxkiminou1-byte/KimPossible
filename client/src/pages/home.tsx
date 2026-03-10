import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedBookPromo from "@/components/FeaturedBookPromo";
import WhoIsKiminou from "@/components/WhoIsKiminou";
import PhotoGallery from "@/components/PhotoGallery";
import Testimonials from "@/components/Testimonials";
import BookPreview from "@/components/BookPreview";
import PressStrip from "@/components/PressStrip";
import PoemOfTheDay from "@/components/PoemOfTheDay";
import Footer from "@/components/Footer";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kiminou Knox",
    url: "https://kiminouknox.com/",
    sameAs: ["https://x.com/KnoxKiminou", "https://x.com/KiminouKnox", "https://www.instagram.com/hofkiminou"],
    jobTitle: "Athlete, Author, Entrepreneur",
  };

  return (
    <>
      <Helmet>
        <title>Kiminou Knox - Athlete, Author, Entrepreneur</title>
        <meta
          name="description"
          content="Official website of Kiminou Knox. Athlete, published author, entrepreneur, and creative voice from the Bay Area."
        />
        <link rel="canonical" href="https://kiminouknox.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox - Athlete, Author, Entrepreneur" />
        <meta property="og:description" content="Athlete, published author, entrepreneur, and creative voice from the Bay Area." />
        <meta property="og:url" content="https://kiminouknox.com/" />
        <meta property="og:image" content="https://kiminouknox.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox - Athlete, Author, Entrepreneur" />
        <meta name="twitter:description" content="Athlete, published author, entrepreneur, and creative voice from the Bay Area." />
        <meta name="twitter:image" content="https://kiminouknox.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <div className="relative bg-background text-foreground font-sans antialiased">
        <Header />
        <Hero />
        <WhoIsKiminou />
        <FeaturedBookPromo />
        <BookPreview />
        <PoemOfTheDay />
        <PhotoGallery />
        <Testimonials />
        <PressStrip />
        <Footer />
      </div>
    </>
  );
}
