import { Switch, Route, Redirect, useLocation } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Splash from "@/pages/Splash";
import Home from "@/pages/home";
import About from "@/pages/About";
import Works from "@/pages/Works";
import Speaking from "@/pages/Speaking";
import Contact from "@/pages/Contact";
import Portfolio from "@/pages/Portfolio";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import BlogAdmin from "@/pages/BlogAdmin";
import Books from "@/pages/Books";
import BookDetail from "@/pages/BookDetail";
import Press from "@/pages/Press";
import Sports from "@/pages/Sports";
import Author from "@/pages/Author";
import NotFound from "@/pages/not-found";
import LuxuryCursor from "@/components/LuxuryFX/Cursor";
import WelcomeVideoOverlay from "@/components/WelcomeVideoOverlay";

function Router() {
  return (
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
        <Redirect to="/contact" />
      </Route>
      <Route path="/presskit">
        <Redirect to="/contact" />
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
      <Route path="/admin/blog" component={BlogAdmin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AnimatedRouter() {
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = document.querySelector("main");
    if (!root) return;

    const revealTargets = Array.from(
      root.querySelectorAll<HTMLElement>(
        ":scope > *, section > *, article > *, .grid > *, .prose > *"
      )
    );

    if (!revealTargets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("site-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealTargets.forEach((element, index) => {
      element.classList.add("site-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 420)}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14, filter: "blur(10px)" }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, filter: "blur(8px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Router />
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WelcomeVideoOverlay />
        <LuxuryCursor />
        <div className="grain"></div>
        <Toaster />
        <AnimatedRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
