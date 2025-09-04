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
        title="Two-Sport Dominance"
        description="Standing at 6'7-6'8 and weighing 245-260 lbs, Kiminou excelled as a varsity basketball captain and football player. From Cristo Rey De La Salle to Ygnacio Valley High School, his athletic journey showcased versatility, leadership, and the discipline that shapes character both on and off the field."
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
        description="Kiminou has published four poetry collections exploring themes of love, faith, identity, and personal growth. From 'The Spirit Of Solomon' to 'Hopeless Romantic', his works showcase mature introspection and emotional depth, remarkable for someone so young. His writing style features vivid imagery and raw honesty."
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
        description="While balancing academics and athletics, Kiminou founded The Tee Shirt Teens, a youth-driven clothing brand focused on empowering young people through fashion and creativity. The brand's mission centers on helping youth express themselves with unique apparel while building authentic community connections."
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
        description="As a content creator and creative designer, Kiminou develops fashion concepts, community programs, and digital content that empowers youth. His design philosophy emphasizes creativity with purpose—building platforms for expression, identity, and truth through art, writing, and entrepreneurship."
        image="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
        imageAlt="Creative design and content creation"
        primaryButton="VIEW PORTFOLIO"
        secondaryButton="DESIGN PROCESS"
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
