import { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/About"));
const Works = lazy(() => import("@/pages/Works"));
const Speaking = lazy(() => import("@/pages/Speaking"));
const Contact = lazy(() => import("@/pages/Contact"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const BlogAdmin = lazy(() => import("@/pages/BlogAdmin"));
const Books = lazy(() => import("@/pages/Books"));
const BookDetail = lazy(() => import("@/pages/BookDetail"));
const Press = lazy(() => import("@/pages/Press"));
const Sports = lazy(() => import("@/pages/Sports"));
const Author = lazy(() => import("@/pages/Author"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageFallback() {
  return <div className="min-h-screen bg-background" aria-busy="true" aria-live="polite" />;
}

function Router() {
  const [location] = useLocation();

  return (
    <main className="page-transition-shell">
      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
    </main>
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
