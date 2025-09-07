import Header from "@/components/Header";
import Hero from "@/components/Hero";
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

  return (
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
        description="Standing at 6 feet 7 inches, Kiminou excelled as a varsity basketball captain at Ygnacio Valley High School, bringing exceptional leadership and court presence to rebuild the program with his dedication to excellence."
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
        title="Four Books by Age 18"
        description="Four published poetry collections by age 18: The Spirit Of Solomon, Our Father?, Poems from a Black Boy, and Hopeless Romantic. His work explores faith, identity, love, and the Black experience with remarkable depth and authentic voice that resonates with readers worldwide."
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
        description="Founded The Tee Shirt Teens while maintaining his demanding athletic schedule—a testament to entrepreneurial vision and time management. The brand serves as a platform for authentic youth expression, combining fashion with purpose to build community and empower the next generation."
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
        description="Beyond sports and literature, Kiminou channels creativity into visual design and content creation. His work bridges traditional and digital media, developing community programs and creative content that amplifies youth voices and builds authentic connections across diverse audiences."
        image="/photos/creative-designer.jpg"
        imageAlt="Creative design and content creation"
          primaryButton="VIEW PORTFOLIO"
          secondaryButton="DESIGN PROCESS"
          imageLeft={true}
          background="bg-background"
        />
        <Lookbook />
        <PressStrip />
        <BrandStory />
        <MediaKit />
        <About />
        <Contact />
        <Footer />
        <ContactFAB />
      </div>
    </div>
  );
}
