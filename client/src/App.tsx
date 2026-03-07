import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    restDelta: 0.0005,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.015, 0.03], [0, 0.65, 1]);

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, opacity }}
      aria-hidden="true"
    />
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        className="page-transition-shell"
        initial={{ opacity: 0, y: 28, scale: 0.995, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, scale: 0.995, filter: "blur(10px)" }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="route-transition-veil"
          initial={{ opacity: 0.24, scaleX: 1 }}
          animate={{ opacity: 0, scaleX: 1.04 }}
          exit={{ opacity: 0.18, scaleX: 1.01 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <Switch location={location}>
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
        <ScrollProgress />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
