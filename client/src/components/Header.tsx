import { useState, useRef, useEffect } from "react";
import { Palette, Menu } from "lucide-react";
import { Theme } from "@/hooks/useTheme";
import { Link } from "wouter";

interface HeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function Header({ theme, onThemeChange }: HeaderProps) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const themes = [
    { name: "Maison", value: "maison" as Theme },
    { name: "Noir", value: "noir" as Theme },
    { name: "Editorial", value: "editorial" as Theme },
    { name: "Street", value: "street" as Theme }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsThemeMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" data-testid="header-main">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/home">
              <a className="luxury-logo group relative overflow-hidden block" data-testid="logo-button">
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
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/home">
              <a className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-home">
                HOME
              </a>
            </Link>
            <Link href="/about">
              <a className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-about">
                ABOUT
              </a>
            </Link>
            <Link href="/works">
              <a className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-works">
                WORKS
              </a>
            </Link>
            <Link href="/press">
              <a className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-press">
                PRESS
              </a>
            </Link>
            <Link href="/speaking">
              <a className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-speaking">
                SPEAKING
              </a>
            </Link>
            <Link href="/contact">
              <a className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-contact">
                CONTACT
              </a>
            </Link>
          </div>

          {/* Theme Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <div className="relative" ref={themeMenuRef}>
              <button 
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 rounded-md bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors" 
                aria-label="Switch theme"
                data-testid="theme-trigger"
              >
                <Palette className="w-4 h-4" />
              </button>
              <div className={`absolute right-0 mt-2 w-40 bg-popover border border-border rounded-md shadow-lg transition-all duration-200 ${isThemeMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="py-2">
                  {themes.map((themeOption) => (
                    <button 
                      key={themeOption.value}
                      onClick={() => {
                        onThemeChange(themeOption.value);
                        setIsThemeMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      data-testid={`theme-${themeOption.value}`}
                    >
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
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
            <Link href="/home">
              <a className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-home-mobile">
                HOME
              </a>
            </Link>
            <Link href="/about">
              <a className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-about-mobile">
                ABOUT
              </a>
            </Link>
            <Link href="/works">
              <a className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-works-mobile">
                WORKS
              </a>
            </Link>
            <Link href="/press">
              <a className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-press-mobile">
                PRESS
              </a>
            </Link>
            <Link href="/speaking">
              <a className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-speaking-mobile">
                SPEAKING
              </a>
            </Link>
            <Link href="/contact">
              <a className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-contact-mobile">
                CONTACT
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
