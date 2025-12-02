import { Link } from "wouter";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border" data-testid="header-main">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <nav className="flex flex-col items-center py-4 gap-4">
          {/* Logo */}
          <Link href="/" className="luxury-logo group relative overflow-hidden block" data-testid="logo-button">
            <span className="logo-text block text-xl md:text-2xl font-serif font-bold tracking-[0.15em] text-foreground transition-all duration-700 group-hover:tracking-[0.25em]">
              KIMINOU KNOX
            </span>
          </Link>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 md:gap-6 flex-wrap">
            <Link href="/" className="px-3 py-2 text-xs md:text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all font-medium" data-testid="nav-home">
              Home
            </Link>
            <Link href="/books" className="px-3 py-2 text-xs md:text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all font-medium" data-testid="nav-books">
              Books
            </Link>
            <Link href="/basketball" className="px-3 py-2 text-xs md:text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all font-medium" data-testid="nav-basketball">
              Basketball
            </Link>
            <Link href="/speaking" className="px-3 py-2 text-xs md:text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all font-medium" data-testid="nav-speaking">
              Speaking
            </Link>
            <Link href="/author" className="px-3 py-2 text-xs md:text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all font-medium" data-testid="nav-author">
              Author
            </Link>
            <Link href="/contact" className="px-3 py-2 text-xs md:text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all font-medium" data-testid="nav-contact">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
