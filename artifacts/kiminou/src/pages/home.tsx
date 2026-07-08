import { Helmet } from "react-helmet-async";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContactFAB from "@/components/ContactFAB";
import { useIdleReady } from "@/hooks/useIdleReady";
import { useShouldReduceEffects } from "@/hooks/useReducedMotion";
import {
  breadcrumbSchema,
  faqSchema,
  personSchema,
  podcastSchema,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TWITTER,
  SITE_URL,
  websiteSchema,
} from "@/lib/seo";

const GoldMarquee = lazy(() => import("@/components/LuxuryFX/GoldMarquee"));
const FeaturedBookPromo = lazy(() => import("@/components/FeaturedBookPromo"));
const WhoIsKiminou = lazy(() => import("@/components/WhoIsKiminou"));
const FilmStripGallery = lazy(() => import("@/components/FilmStripGallery"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const BookPreview = lazy(() => import("@/components/BookPreview"));
const ParticleEffect = lazy(() => import("@/components/ParticleEffect"));
const PressStrip = lazy(() => import("@/components/PressStrip"));
const PoemOfTheDay = lazy(() => import("@/components/PoemOfTheDay"));
const StatsBanner = lazy(() => import("@/components/StatsBanner"));
const QuoteTypewriter = lazy(() => import("@/components/QuoteTypewriter"));
const WordCloud = lazy(() => import("@/components/WordCloud"));
const PoemAssembler = lazy(() => import("@/components/PoemAssembler"));
const GenerativeArtPanel = lazy(() => import("@/components/GenerativeArtPanel"));
const ChapterScroll = lazy(() => import("@/components/ChapterScroll"));
const AmbientAudio = lazy(() => import("@/components/AmbientAudio"));
const PaperRealmPortal = lazy(() => import("@/components/PaperRealmPortal"));
const SeoFaqSection = lazy(() => import("@/components/SeoFaqSection"));
const GenerativeScore = lazy(() => import("@/components/LuxuryFX/GenerativeScore"));
const ImpossibleLoop = lazy(() => import("@/components/LuxuryFX/ImpossibleLoop"));

const PARTICLE_EFFECTS: ("sparkle" | "dust" | "star")[] = ["sparkle", "dust", "star"];
const PARTICLE_COLORS = ["#F59E0B", "#FDE68A", "#FFFBEB", "#D97706"];

const homeFaq = [
  {
    question: "What does Kiminou Knox do?",
    answer:
      "Kiminou Knox is an athlete, author, speaker, and creative builder. The site brings together books, essays, speaking, athletics, and media in one place.",
  },
  {
    question: "How many books has Kiminou Knox published?",
    answer:
      "Kiminou Knox has eight published works spanning poetry, faith, identity, and love. Titles include Poems from a Black Boy, Black Boy Poems, Hopeless Romantic, The Spirit of Solomon, Our Father?, Boys Raised in Silence, The Adventures of Kiminou the Great and Chua the Wise, and Kiminou's World of Imagination. Each book page includes covers, sample poems, and purchase links.",
  },
  {
    question: "What does he speak about?",
    answer:
      "Speaking topics include discipline, faith, identity, creativity, writing, Black boy life, and helping young people find a voice without performing one.",
  },
  {
    question: "How do you contact Kiminou Knox for a booking?",
    answer:
      "Use the contact form on the site for speaking, press, book, basketball, or other inquiries. The form routes requests through the same site you are viewing now.",
  },
  {
    question: "Where should I start on the site?",
    answer:
      "Start with the books, author, speaking, and press pages if you want the clearest search signals and the most direct view of the brand.",
  },
];

function IdleMount({ children, timeout = 1200 }: { children: ReactNode; timeout?: number }) {
  const ready = useIdleReady(timeout);

  return ready ? <Suspense fallback={null}>{children}</Suspense> : null;
}

function DeferredSection({
  id,
  children,
  minHeight,
  rootMargin = "1200px 0px",
}: {
  id?: string;
  children: ReactNode;
  minHeight: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={ref} id={id} style={!shouldRender ? { minHeight } : undefined}>
      {shouldRender ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}

export default function Home() {
  const [paperMode, setPaperMode] = useState(false);
  const reduceEffects = useShouldReduceEffects();

  return (
    <>
      <Helmet>
        <title>Kiminou Knox | Author, Athlete, Speaker, Podcast Host</title>
        <meta name="description" content="Official site of Kiminou Knox — eight-time published Bay Area poet, NCAA-registered basketball athlete, speaker, and host of KimYaps podcast. Explore books, essays, and booking info." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="preload" as="image" href="/kiminou-knox-author-athlete-bay-area.webp" />
        <meta name="theme-color" content="#090705" />
        
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Kiminou Knox | Author, Athlete, Speaker, Podcast Host" />
        <meta property="og:description" content="Eight-time published Bay Area poet, NCAA-registered basketball athlete, speaker, and host of KimYaps podcast." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Kiminou Knox" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_TWITTER} />
        <meta name="twitter:creator" content={SITE_TWITTER} />
        <meta name="twitter:title" content="Kiminou Knox | Author, Athlete, Speaker, Podcast Host" />
        <meta name="twitter:description" content="Eight-time published Bay Area poet, NCAA-registered basketball athlete, speaker, and host of KimYaps podcast." />
        <meta name="twitter:image" content={SITE_IMAGE} />
        
        <script type="application/ld+json">
          {JSON.stringify(personSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(podcastSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
            ]),
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema(homeFaq))}
        </script>
      </Helmet>

      <div className={`${paperMode ? "paper-realm-shell" : ""} bg-background text-foreground font-sans antialiased relative`}>
      {!reduceEffects && (
        <IdleMount>
          <ParticleEffect
            density={60}
            effects={PARTICLE_EFFECTS}
            colors={PARTICLE_COLORS}
            className="z-0"
          />
        </IdleMount>
      )}
      <div className="relative z-10">
        <Header />
        <button
          type="button"
          aria-pressed={paperMode}
          aria-label={paperMode ? "Return to regular site" : "Open 3D paper site"}
          onClick={() => setPaperMode((current) => !current)}
          className="fixed right-4 bottom-4 z-[120] h-12 w-12 border border-amber-300/50 bg-black/75 text-amber-200 backdrop-blur-md shadow-[0_0_35px_rgba(245,158,11,0.25)] hover:bg-amber-300 hover:text-black transition-colors"
        >
          3D
        </button>
        <main id="main-content">
        {paperMode ? (
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <PaperRealmPortal />
            <div id="section-books"><BookPreview /></div>
            <div id="section-gallery"><FilmStripGallery /></div>
            <GenerativeArtPanel />
          </Suspense>
        ) : (
          <>
            <Hero />
            <IdleMount timeout={1800}>
              <GenerativeScore />
            </IdleMount>
            <Suspense fallback={null}>
              <GoldMarquee />
            </Suspense>
            <DeferredSection minHeight={720}>
              <ChapterScroll />
            </DeferredSection>
            <DeferredSection id="who-is-kiminou" minHeight={760}>
              <WhoIsKiminou />
            </DeferredSection>
            <DeferredSection id="section-stats" minHeight={280}>
              <StatsBanner />
            </DeferredSection>
            <DeferredSection id="section-poem" minHeight={620}>
              <PoemOfTheDay />
            </DeferredSection>
            <DeferredSection id="section-poem-assembler" minHeight={640}>
              <PoemAssembler />
            </DeferredSection>
            <DeferredSection id="section-featured" minHeight={760}>
              <FeaturedBookPromo />
            </DeferredSection>
            <DeferredSection id="section-quotes" minHeight={460}>
              <QuoteTypewriter />
            </DeferredSection>
            <DeferredSection id="section-books" minHeight={960}>
              <BookPreview />
            </DeferredSection>
            <DeferredSection id="section-wordcloud" minHeight={560}>
              <WordCloud />
            </DeferredSection>
            <DeferredSection id="section-gallery" minHeight={860}>
              <FilmStripGallery />
            </DeferredSection>
            <DeferredSection id="section-press" minHeight={360}>
              <PressStrip />
            </DeferredSection>
            <DeferredSection id="section-testimonials" minHeight={760}>
              <Testimonials />
            </DeferredSection>
            <DeferredSection minHeight={620}>
              <SeoFaqSection
                title="A few common questions"
                intro="These are the search-intent questions people usually ask before they land on the books, speaking, or press pages."
                items={homeFaq}
              />
            </DeferredSection>
            <DeferredSection minHeight={720}>
              <GenerativeArtPanel />
            </DeferredSection>
            <IdleMount timeout={2000}>
              <ImpossibleLoop />
            </IdleMount>
          </>
        )}
        </main>
        <Footer />
        <ContactFAB />
        <IdleMount timeout={1800}>
          <AmbientAudio theme="noir" />
        </IdleMount>
      </div>
      </div>
    </>
  );
}
