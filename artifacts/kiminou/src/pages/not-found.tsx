import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Find Your Way Back — Kiminou Knox</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400/40 mb-6">404</p>
          <h1 className="font-serif text-5xl font-light text-white mb-6">Every page leads somewhere</h1>
          <p className="text-white/40 mb-8 max-w-sm mx-auto">
            This one has moved on. The rest of the story is still here — pick up where it continues.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-amber-400/60 hover:text-amber-300 transition-colors text-xs uppercase tracking-[0.3em]">
            <ArrowLeft className="w-3 h-3" /> Return home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
