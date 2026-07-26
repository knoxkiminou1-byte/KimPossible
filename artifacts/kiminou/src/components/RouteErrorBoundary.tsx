import { Component, type ErrorInfo, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";

/* =========================================================================
   RouteErrorBoundary

   Without a boundary, React unmounts the entire tree when any component
   throws during render — the visitor gets a blank black screen and crawlers
   render an empty <body>. That is exactly how a single missing field in
   books.json took /books and /press off the site.

   This boundary keeps the failure local: the rest of the chrome stays up and
   the visitor still gets real, crawlable HTML with working navigation, so a
   content bug degrades one page instead of the whole site.
   ========================================================================= */

const LINKS: [string, string][] = [
  ["/", "Home"],
  ["/books", "Books"],
  ["/author", "Author"],
  ["/sports", "Sports"],
  ["/speaking", "Speaking"],
  ["/blog", "Journal"],
  ["/contact", "Contact"],
];

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class RouteErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[RouteErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <main id="main-content" className="min-h-screen bg-black text-white flex items-center">
          <div className="max-w-2xl mx-auto px-6 py-24">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-6">Kiminou Knox</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-6">
              This page is catching its breath.
            </h1>
            <p className="text-white/50 leading-relaxed mb-10">
              Something on this page failed to load. Everything else on the site is still here —
              pick up wherever you like.
            </p>
            <nav aria-label="Primary" className="flex flex-wrap gap-x-6 gap-y-3">
              {LINKS.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="text-xs uppercase tracking-[0.25em] text-amber-400/80 hover:text-amber-300 transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </main>
      </>
    );
  }
}
