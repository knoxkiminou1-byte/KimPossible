import { Link } from "wouter";

export default function Footer() {

  const portfolioItems = [
    { name: "Athlete", href: "/basketball" },
    { name: "Author", href: "/books" }
  ];

  const resources = [
    { name: "Poetry Books", href: "/books" },
    { name: "Speaking Engagements", href: "/speaking" },
    { name: "Athletic Achievements", href: "/basketball" }
  ];

  const connect = [
    { name: "Instagram @hofkiminou", href: "https://instagram.com/hofkiminou", external: true },
    { name: "X @KnoxKiminou", href: "https://x.com/KnoxKiminou", external: true },
    { name: "X @KiminouKnox", href: "https://x.com/KiminouKnox", external: true },
    { name: "YouTube", href: "https://www.youtube.com/@KiminouKnoxVevo", external: true },
    { name: "Amazon Author Page", href: "https://www.amazon.com/stores/author/B0DGM5Z5Q8", external: true },
    { name: "Business IG", href: "https://instagram.com/theteeshirteenss", external: true },
    { name: "The Tee Shirt Teens", href: "https://thett.shop", external: true },
    { name: "Contact", href: "/contact", external: false }
  ];

  const legal = [
    { name: "Speaking", href: "/speaking" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="py-16 bg-primary text-primary-foreground" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold mb-4" data-testid="footer-title">
            KIMINOU KNOX
          </h2>
          <p className="text-lg opacity-90" data-testid="footer-subtitle">
            ATHLETE • AUTHOR • ENTREPRENEUR • DESIGNER
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
                  <Link 
                    href={item.href}
                    className="hover:opacity-100 transition-opacity"
                    data-testid={`footer-portfolio-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
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
                  <Link 
                    href={item.href} 
                    className="hover:opacity-100 transition-opacity"
                    data-testid={`footer-resource-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </Link>
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
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer external"
                      className="hover:opacity-100 transition-opacity"
                      data-testid={`footer-connect-${item.name.toLowerCase().replace(/[@\s]/g, '-')}`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:opacity-100 transition-opacity"
                      data-testid={`footer-connect-${item.name.toLowerCase().replace(/[@\s]/g, '-')}`}
                    >
                      {item.name}
                    </Link>
                  )}
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
                  <Link 
                    href={item.href} 
                    className="hover:opacity-100 transition-opacity"
                    data-testid={`footer-legal-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <div className="mb-4">
            <p className="text-sm opacity-80 mb-2">
              Get in touch: <a href="mailto:knoxkiminou1@gmail.com" className="underline hover:opacity-100 transition-opacity" data-testid="footer-email">knoxkiminou1@gmail.com</a>
            </p>
          </div>
          <p className="text-sm opacity-80" data-testid="footer-copyright">
            © 2025 Kiminou Knox. All rights reserved. | Bay Area Renaissance • Class of 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
