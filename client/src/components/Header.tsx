import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" data-testid="header-main">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="luxury-logo group relative overflow-hidden block" data-testid="logo-button">
              <span className="logo-text block text-2xl font-serif font-bold tracking-[0.15em] text-foreground transition-all duration-700 group-hover:tracking-[0.3em] group-hover:scale-110">
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-2px] animation-delay-0">K</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[2px] animation-delay-75">I</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-2px] animation-delay-150">M</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[2px] animation-delay-225">I</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-2px] animation-delay-300">N</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[2px] animation-delay-375">O</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-2px] animation-delay-450">U</span>
                <span className="inline-block mx-2"> </span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[2px] animation-delay-525">K</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-2px] animation-delay-600">N</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[2px] animation-delay-675">O</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-2px] animation-delay-750">X</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-home">
              HOME
            </Link>
            <Link href="/books" className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-books">
              BOOKS
            </Link>
            <Link href="/basketball" className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-basketball">
              BASKETBALL
            </Link>
            <Link href="/speaking" className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-speaking">
              SPEAKING
            </Link>
            <a href="https://thett.shop" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-brand">
              BRAND
            </a>
            <Link href="/contact" className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-contact">
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors" 
              aria-label="Toggle mobile menu"
              data-testid="mobile-menu-trigger"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border" data-testid="mobile-menu">
          <div className="px-6 py-4 space-y-4">
            <Link href="/" className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-home-mobile">
              HOME
            </Link>
            <Link href="/books" className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-books-mobile">
              BOOKS
            </Link>
            <Link href="/basketball" className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-basketball-mobile">
              BASKETBALL
            </Link>
            <Link href="/speaking" className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-speaking-mobile">
              SPEAKING
            </Link>
            <a href="https://thett.shop" target="_blank" rel="noopener noreferrer" className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-brand-mobile">
              BRAND
            </a>
            <Link href="/contact" className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-contact-mobile">
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
