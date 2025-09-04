import { useState, useRef, useEffect } from "react";
import { Palette, Menu, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { Theme } from "@/hooks/useTheme";

interface HeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function Header({ theme, onThemeChange }: HeaderProps) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300");
  
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const menuItems = [
    { name: "ATHLETE", href: "#athlete", preview: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" },
    { name: "AUTHOR", href: "#author", preview: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" },
    { name: "ENTREPRENEUR", href: "#entrepreneur", preview: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" },
    { name: "DESIGNER", href: "#designer", preview: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" }
  ];

  const themes = [
    { name: "Maison", value: "maison" as Theme },
    { name: "Noir", value: "noir" as Theme },
    { name: "Editorial", value: "editorial" as Theme },
    { name: "Street", value: "street" as Theme }
  ];

  const openMegaMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const closeMegaMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150);
  };

  const handleMenuItemHover = (preview: string) => {
    setPreviewImage(preview);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
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
            <button 
              onClick={() => scrollToSection('#hero')}
              className="luxury-logo group relative overflow-hidden"
              data-testid="logo-button"
            >
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
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            <div className="relative group">
              <button 
                className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium"
                onMouseEnter={openMegaMenu}
                onMouseLeave={closeMegaMenu}
                aria-haspopup="true"
                aria-expanded={isMegaMenuOpen}
                data-testid="portfolio-trigger"
              >
                PORTFOLIO
              </button>
              
              {/* Mega Menu */}
              <div 
                ref={megaMenuRef}
                className={`mega-menu absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[600px] ${isMegaMenuOpen ? 'active' : ''}`}
                onMouseEnter={openMegaMenu}
                onMouseLeave={closeMegaMenu}
                role="menu"
                data-testid="mega-menu"
              >
                <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
                  <div className="grid grid-cols-2 gap-0">
                    {/* Image Preview */}
                    <div className="bg-muted p-6">
                      <img 
                        src={previewImage}
                        alt="Portfolio preview" 
                        className="w-full h-48 object-cover rounded-md transition-opacity duration-300"
                        loading="lazy"
                        data-testid="menu-preview"
                      />
                    </div>
                    
                    {/* Menu Links */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        {menuItems.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => scrollToSection(item.href)}
                            onMouseEnter={() => handleMenuItemHover(item.preview)}
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-medium w-full text-left"
                            role="menuitem"
                            data-testid={`menu-item-${item.name.toLowerCase()}`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-border">
                        <button 
                          onClick={() => scrollToSection('#lookbook')}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                          role="menuitem"
                          data-testid="menu-item-lookbook"
                        >
                          LOOKBOOK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => scrollToSection('#about')}
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium"
              data-testid="nav-about"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium"
              data-testid="nav-contact"
            >
              CONTACT
            </button>
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
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium w-full text-left"
                data-testid={`mobile-menu-${item.name.toLowerCase()}`}
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('#about')}
              className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium w-full text-left"
              data-testid="mobile-menu-about"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium w-full text-left"
              data-testid="mobile-menu-contact"
            >
              CONTACT
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
