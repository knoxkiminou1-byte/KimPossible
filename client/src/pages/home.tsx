import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Doors from "@/components/Doors";
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
    <div className="bg-background text-foreground font-sans antialiased">
      <Header theme={theme} onThemeChange={changeTheme} />
      <Hero />
      <Doors />
      <Section 
        id="athlete"
        eyebrow="ATHLETE"
        title="Mastering the Art of Performance"
        description="From the football field to the boardroom, athletic discipline shapes every aspect of excellence. This journey explores how competitive sports forge character, build resilience, and create the foundation for success across all domains of life."
        image="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
        imageAlt="Athletic excellence in action"
        primaryButton="VIEW ACHIEVEMENTS"
        secondaryButton="READ THE STORY"
        imageLeft={false}
        background="bg-muted/30"
      />
      <Section 
        id="author"
        eyebrow="AUTHOR"
        title="Crafting Narratives That Inspire"
        description="Words have the power to transform minds and move hearts. Through carefully crafted narratives, complex ideas become accessible, and personal experiences become universal truths that resonate across cultures and generations."
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
        imageAlt="Literary works and writing environment"
        primaryButton="VIEW PUBLICATIONS"
        secondaryButton="READ EXCERPTS"
        imageLeft={true}
        background="bg-background"
      />
      <Section 
        id="entrepreneur"
        eyebrow="ENTREPRENEUR"
        title="Building Tomorrow's Solutions"
        description="Innovation requires the courage to challenge conventional wisdom and the persistence to turn vision into reality. Each venture represents a commitment to creating value that extends far beyond profit, touching lives and transforming industries."
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
        imageAlt="Entrepreneurial ventures and innovation"
        primaryButton="VIEW VENTURES"
        secondaryButton="READ CASE STUDIES"
        imageLeft={false}
        background="bg-muted/30"
      />
      <Section 
        id="architect"
        eyebrow="ARCHITECT"
        title="Designing Spaces That Elevate"
        description="Architecture is the art of organizing space to enhance human experience. Every line drawn and every material chosen serves to create environments that inspire, comfort, and connect us more deeply to our surroundings and to each other."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
        imageAlt="Architectural design and projects"
        primaryButton="VIEW PROJECTS"
        secondaryButton="DESIGN PHILOSOPHY"
        imageLeft={true}
        background="bg-background"
      />
      <Lookbook />
      <PressStrip />
      <About />
      <Contact />
      <Footer />
      <ContactFAB />
    </div>
  );
}
