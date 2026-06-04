import { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LuxuryCursor from "@/components/LuxuryFX/Cursor";
import LiteraryTrail from "@/components/LuxuryFX/LiteraryTrail";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollProgressArc from "@/components/ScrollProgressArc";
import BackToTop from "@/components/LuxuryFX/BackToTop";
import PageTransition from "@/components/LuxuryFX/PageTransition";
import CursorSpotlight from "@/components/LuxuryFX/CursorSpotlight";
import SectionDotNav from "@/components/SectionDotNav";
import AdminGate from "@/components/AdminGate";
import FirstEditionOverlay from "@/components/FirstEditionOverlay";
import { motion, AnimatePresence } from "framer-motion";

import Splash from "@/pages/Splash";
import Home from "@/pages/home";
import About from "@/pages/About";
import Works from "@/pages/Works";
import Contact from "@/pages/Contact";
import Portfolio from "@/pages/Portfolio";
import BlogAdmin from "@/pages/BlogAdmin";
import NotFound from "@/pages/not-found";

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
  "Black boy. Bay Area. Seven books before twenty.",
  "Faith is the question and the answer in the same breath.",
  "The court and the page demand the same thing — truth.",
  "I write from silence. I play from fire.",
  "What is love to a man made to destroy it?",
  "Every book is a letter I couldn't deliver any other way.",
  "Roots don't grow without pressure and dark.",
];

function PageFallback() {
  const [fragmentIdx, setFragmentIdx] = useState(() => Math.floor(Math.random() * POEM_FRAGMENTS.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setFragmentIdx(i => (i + 1) % POEM_FRAGMENTS.length);
        setVisible(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md px-8">
        <motion.div
          className="w-px h-16 bg-amber-400/20 mx-auto mb-8"
          animate={{ opacity: [0.2, 0.6, 0.2], scaleY: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={fragmentIdx}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: visible ? 1 : 0, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.5 }}
            className="font-serif italic text-white/30 text-sm leading-relaxed"
          >
            "{POEM_FRAGMENTS[fragmentIdx]}"
          </motion.p>
        </AnimatePresence>
        <motion.p
          className="text-[9px] uppercase tracking-[0.4em] text-amber-400/20 mt-6"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Kiminou Knox
        </motion.p>
      </div>
    </div>
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
        <Route path="/basketball" component={Sports} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/books" component={Books} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/author" component={Author} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/reading-list" component={ReadingList} />
        <Route path="/admin/blog">
          <AdminGate><BlogAdmin /></AdminGate>
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
          <FirstEditionOverlay />
          <LiteraryTrail />
          <ScrollProgress />
          <ScrollProgressArc />
          <LuxuryCursor />
          <BackToTop />
          <PageTransition />
          <CursorSpotlight />
          <SectionDotNav />
          <div className="grain"></div>
          <Toaster />
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
