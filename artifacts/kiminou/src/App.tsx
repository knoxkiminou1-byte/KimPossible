import { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIdleReady } from "@/hooks/useIdleReady";
import { useShouldReduceEffects } from "@/hooks/useReducedMotion";

const LuxuryCursor = lazy(() => import("@/components/LuxuryFX/Cursor"));
const LiteraryTrail = lazy(() => import("@/components/LuxuryFX/LiteraryTrail"));
const ScrollProgress = lazy(() => import("@/components/ScrollProgress"));
const ScrollProgressArc = lazy(() => import("@/components/ScrollProgressArc"));
const BackToTop = lazy(() => import("@/components/LuxuryFX/BackToTop"));
const PageTransition = lazy(() => import("@/components/LuxuryFX/PageTransition"));
const CursorSpotlight = lazy(() => import("@/components/LuxuryFX/CursorSpotlight"));
const SectionDotNav = lazy(() => import("@/components/SectionDotNav"));
const FirstEditionOverlay = lazy(() => import("@/components/FirstEditionOverlay"));

const Splash = lazy(() => import("@/pages/Splash"));
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/About"));
const Works = lazy(() => import("@/pages/Works"));
const Contact = lazy(() => import("@/pages/Contact"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Speaking = lazy(() => import("@/pages/Speaking"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Books = lazy(() => import("@/pages/Books"));
const BookDetail = lazy(() => import("@/pages/BookDetail"));
const Press = lazy(() => import("@/pages/Press"));
const Sports = lazy(() => import("@/pages/Sports"));
const Author = lazy(() => import("@/pages/Author"));
const ReadingList = lazy(() => import("@/pages/ReadingList"));

const POEM_FRAGMENTS = [
  "They called me wise before I learned what wisdom cost.",
  "Black boy. Bay Area. Eight books before twenty.",
  "Faith is the question and the answer in the same breath.",
  "The court and the page demand the same thing — truth.",
  "I write from silence. I play from fire.",
  "What is love to a man made to destroy it?",
  "Every book is a letter I couldn't deliver any other way.",
  "Roots don't grow without pressure and dark.",
];

function PageFallback() {
  const [fragmentIdx, setFragmentIdx] = useState(() => Math.floor(Math.random() * POEM_FRAGMENTS.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setFragmentIdx(i => (i + 1) % POEM_FRAGMENTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md px-8">
        <div className="w-px h-16 bg-amber-400/20 mx-auto mb-8 animate-pulse" />
        <p className="font-serif italic text-white/30 text-sm leading-relaxed">
          "{POEM_FRAGMENTS[fragmentIdx]}"
        </p>
        <p className="text-[9px] uppercase tracking-[0.4em] text-amber-400/20 mt-6 animate-pulse">
          Kiminou Knox
        </p>
      </div>
    </div>
  );
}

function DeferredChrome() {
  const ready = useIdleReady();
  const reduceEffects = useShouldReduceEffects();

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <FirstEditionOverlay />
      <LiteraryTrail />
      <ScrollProgress />
      <ScrollProgressArc />
      {!reduceEffects && <LuxuryCursor />}
      <BackToTop />
      <PageTransition />
      {!reduceEffects && <CursorSpotlight />}
      <SectionDotNav />
    </Suspense>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/splash" component={Splash} />
        <Route path="/home">
          <Redirect to="/" />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/works" component={Works} />
        <Route path="/speaking" component={Speaking} />
        <Route path="/contact" component={Contact} />
        <Route path="/press-kit">
          <Redirect to="/press" />
        </Route>
        <Route path="/presskit">
          <Redirect to="/press" />
        </Route>
        <Route path="/press" component={Press} />
        <Route path="/sports" component={Sports} />
        <Route path="/basketball">
          <Redirect to="/sports" />
        </Route>
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/books" component={Books} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/author" component={Author} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/reading-list" component={ReadingList} />
        <Route path="/podcast">
          <Redirect to="/speaking" />
        </Route>
        <Route path="/kimyaps">
          <Redirect to="/speaking" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-black focus:text-sm focus:font-semibold focus:uppercase focus:tracking-widest"
          >
            Skip to content
          </a>
          <DeferredChrome />
          <div className="grain"></div>
          <Toaster />
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
