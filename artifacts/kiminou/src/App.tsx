import { Switch, Route, Redirect, Router as WouterRouter } from "wouter";
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <LuxuryCursor />
          <div className="grain"></div>
          <Toaster />
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
