import { Switch, Route, Redirect, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="page-transition-shell"
      >
        <Switch location={location}>
          <Route path="/" component={Home} />
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
      </motion.main>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
