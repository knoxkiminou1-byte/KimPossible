import { lazy, Suspense } from "react";
import { Switch, Route, Redirect, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LuxuryCursor from "@/components/LuxuryFX/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollProgressArc from "@/components/ScrollProgressArc";
import BackToTop from "@/components/LuxuryFX/BackToTop";
import PageTransition from "@/components/LuxuryFX/PageTransition";
import CursorSpotlight from "@/components/LuxuryFX/CursorSpotlight";
import SectionDotNav from "@/components/SectionDotNav";
import AdminGate from "@/components/AdminGate";

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

function PageFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-px h-20 bg-amber-400/30 mx-auto mb-6 animate-pulse" />
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400/30">Loading</p>
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
