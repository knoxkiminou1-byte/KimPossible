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
    "image": "https://www.kiminouknox.com/author-kiminou.jpg",
    "sameAs": [
      "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2",
      "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
      "https://prephoops.com/player/kiminou-knox/",
      "https://www.goodreads.com/author/show/55621683.Kiminou_Knox",
      "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
      "https://www.instagram.com/kiminouknox",
      "https://www.linkedin.com/in/kiminou-knox-50691a394/",
      "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg"
    ],
    "jobTitle": "Author, Poet, Athlete, Speaker, Program Builder"
  };

  return (
    <>
      <Helmet>
        <title>Kiminou Knox | Author, Athlete & Program Builder</title>
        <meta name="description" content="Official website of Kiminou Knox, a Bay Area author, poet, athlete, speaker, and program builder. Explore books, basketball, speaking, and community work." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.kiminouknox.com/" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox | Author, Athlete & Program Builder" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta property="og:description" content="Books, basketball, speaking, and community work from the Bay Area." />
        <meta property="og:url" content="https://www.kiminouknox.com/" />
        <meta property="og:image" content="https://www.kiminouknox.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox | Author, Athlete & Program Builder" />
        <meta name="twitter:description" content="Bay Area author, poet, athlete, speaker, and program builder." />
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
