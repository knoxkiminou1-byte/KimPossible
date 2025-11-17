import { Link } from "wouter";

export default function Footer() {

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "Basketball", href: "/basketball" },
    { name: "Speaking", href: "/speaking" },
    { name: "Contact", href: "/contact" }
  ];

  const connect = [
    { name: "Instagram @hofkiminou", href: "https://instagram.com/hofkiminou", external: true },
    { name: "X @KnoxKiminou", href: "https://x.com/KnoxKiminou", external: true },
    { name: "YouTube", href: "https://www.youtube.com/@KiminouKnoxVevo", external: true },
    { name: "Amazon Author Page", href: "https://www.amazon.com/stores/author/B0DGM5Z5Q8", external: true }
  ];

  return (
    <footer className="py-16 bg-primary text-primary-foreground" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold mb-4" data-testid="footer-title">
            KIMINOU KNOX
          </h2>
          <p className="text-lg opacity-90" data-testid="footer-subtitle">
            ATHLETE • AUTHOR • ENTREPRENEUR
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-4xl mx-auto">
          <div>
            <h3 className="font-medium mb-4 uppercase tracking-[0.1em]" data-testid="footer-navigation-title">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="hover:opacity-100 transition-opacity"
                    data-testid={`footer-nav-${item.name.toLowerCase()}`}
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
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="hover:opacity-100 transition-opacity"
                    data-testid={`footer-connect-${item.name.toLowerCase().replace(/[@\s]/g, '-')}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 uppercase tracking-[0.1em]" data-testid="footer-contact-title">
              Contact
            </h3>
            <p className="text-sm opacity-80">
              777-9311
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm opacity-80" data-testid="footer-copyright">
            © 2025 Kiminou Knox. All rights reserved. | Bay Area Renaissance • Class of 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
