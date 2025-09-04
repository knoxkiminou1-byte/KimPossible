export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const portfolioItems = [
    { name: "Athlete", href: "#athlete" },
    { name: "Author", href: "#author" },
    { name: "Entrepreneur", href: "#entrepreneur" },
    { name: "Architect", href: "#architect" }
  ];

  const resources = [
    { name: "Publications", href: "#" },
    { name: "Speaking", href: "#" },
    { name: "Consulting", href: "#" },
    { name: "Mentoring", href: "#" }
  ];

  const connect = [
    { name: "LinkedIn", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Contact", href: "#contact" }
  ];

  const legal = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Sitemap", href: "#" }
  ];

  return (
    <footer className="py-16 bg-primary text-primary-foreground" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold mb-4" data-testid="footer-title">
            KIMINOU KNOX
          </h2>
          <p className="text-lg opacity-90" data-testid="footer-subtitle">
            ATHLETE • AUTHOR • ENTREPRENEUR • ARCHITECT
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-medium mb-4 uppercase tracking-[0.1em]" data-testid="footer-portfolio-title">
              Portfolio
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              {portfolioItems.map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => scrollToSection(item.href)}
                    className="hover:opacity-100 transition-opacity"
                    data-testid={`footer-portfolio-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4 uppercase tracking-[0.1em]" data-testid="footer-resources-title">
              Resources
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              {resources.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="hover:opacity-100 transition-opacity"
                    data-testid={`footer-resource-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4 uppercase tracking-[0.1em]" data-testid="footer-connect-title">
              Connect
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              {connect.map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => item.href.startsWith('#') ? scrollToSection(item.href) : window.open(item.href)}
                    className="hover:opacity-100 transition-opacity"
                    data-testid={`footer-connect-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4 uppercase tracking-[0.1em]" data-testid="footer-legal-title">
              Legal
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              {legal.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="hover:opacity-100 transition-opacity"
                    data-testid={`footer-legal-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm opacity-80" data-testid="footer-copyright">
            © 2024 Kiminou Knox. All rights reserved. | Designed with excellence in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
