import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestReleases from "@/components/LatestReleases";
import MilesHallFeature from "@/components/MilesHallFeature";
import Doors from "@/components/Doors";
import Timeline from "@/components/Timeline";
import StatsShowcase from "@/components/StatsShowcase";
import PhotoGallery from "@/components/PhotoGallery";
import Testimonials from "@/components/Testimonials";
import BookPreview from "@/components/BookPreview";
import MediaKit from "@/components/MediaKit";
import ParticleEffect from "@/components/ParticleEffect";
import BrandStory from "@/components/BrandStory";
import Section from "@/components/Section";
import Lookbook from "@/components/Lookbook";
import PressStrip from "@/components/PressStrip";
import About from "@/components/About";
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
        <LatestReleases />
        <Doors />
        <Timeline />
        <StatsShowcase />
        <PhotoGallery />
        <BookPreview />
        <Testimonials />
        <Section 
          id="athlete"
          eyebrow="ATHLETE"
          title="Basketball Excellence"
          description="Standing at 6 feet 7 inches and 235 lbs, Kiminou is a multi sport athlete who served as varsity captain at Ygnacio Valley High School. Featured in PrepHoops and 247Sports as Redwood Christian MVP and Pine Valley MVP, he is registered with NCAA eligibility and earned CaliHoop Top Team Player Selection."
          image="/photos/athletic-pose.jpg"
          imageAlt="Basketball athlete in athletic pose"
          primaryButton="VIEW SPORTS CAREER"
          secondaryButton="READ ATHLETIC STORY"
          imageLeft={false}
          background="bg-muted/30"
        />
        <Section 
          id="author"
        eyebrow="AUTHOR"
        title="Six Books by Age 19"
        description="Six published works by age 19: Black Boy Poems, Our Father, Boys Raised in Silence, The Spirit of Solomon, Hopeless Romantic, and The Adventures of Kiminou the Great and Chua the Wise. His work explores faith, identity, love, and the Black experience with remarkable depth and authentic voice that resonates with readers worldwide."
        image="/photos/brown-suit-author.jpg"
        imageAlt="Published poetry books and writing"
          primaryButton="VIEW BOOKS"
          secondaryButton="READ EXCERPTS"
          imageLeft={true}
          background="bg-background"
        />
        <Section 
          id="entrepreneur"
        eyebrow="ENTREPRENEUR"
        title="The Tee Shirt Teens"
        description="Co Owner of The TeeShirtTeens, a youth run apparel brand that he founded while maintaining his demanding athletic and academic schedule. This platform for authentic youth expression combines fashion with purpose, featuring original designs ranging from playful humor to inspirational art that empowers the next generation."
        image="/photos/entrepreneur-style.jpg"
        imageAlt="The Tee Shirt Teens clothing brand"
          primaryButton="VISIT STORE"
          secondaryButton="BRAND STORY"
          imageLeft={false}
          background="bg-muted/30"
        />
        <Section 
          id="designer"
        eyebrow="DESIGNER"
        title="Creative Vision in Action"
        description="Beyond sports and literature, Kiminou channels creativity into media production and content creation. He has contributed to political campaigns for Vivian Flowers and Regina Wallace Jones, participated in 2020 Census PSA commercials, and creates original music and spoken word content that bridges traditional and digital media to amplify youth voices."
        image="/photos/creative-designer.jpg"
        imageAlt="Creative design and content creation"
          primaryButton="VIEW PORTFOLIO"
          secondaryButton="DESIGN PROCESS"
          imageLeft={true}
          background="bg-background"
        />
        <Lookbook />
        <MilesHallFeature />
        <PressStrip />
        <BrandStory />
        <MediaKit />
        <About />
        <Contact />
        <Footer />
        <ContactFAB />
      </div>
    </div>
    </>
  );
}
