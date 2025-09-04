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
      />
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
        title="Two-Sport Dominance"
        description="Standing at 6 feet 8 inches and weighing 300 lbs, Kiminou dominated as a varsity basketball captain and football lineman. His transfer to Ygnacio Valley High School brought experience and leadership to rebuild the program, showcasing the versatility that defines elite two-sport athletes."
        image="https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
        imageAlt="Multi-sport athlete in basketball and football"
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
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
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
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
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
        image="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
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
  );
}
