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
    { name: "Designer", href: "#designer" }
  ];

  const resources = [
    { name: "Poetry Books", href: "#author" },
    { name: "Speaking Engagements", href: "#contact" },
    { name: "Athletic Achievements", href: "#athlete" },
    { name: "Youth Mentorship", href: "#contact" },
    { name: "Fashion Brand", href: "https://thett.shop" }
  ];

  const connect = [
    { name: "Instagram", href: "https://instagram.com/hofkiminou" },
    { name: "Twitter", href: "https://twitter.com/KnoxKiminou" },
    { name: "Business IG", href: "https://instagram.com/theteeshirteenss" },
    { name: "The Tee Shirt Teens", href: "https://thett.shop" },
    { name: "Contact", href: "#contact" }
  ];

  const legal = [
    { name: "Book Excerpts", href: "#author" },
    { name: "Athletic Stats", href: "#athlete" },
    { name: "Business Inquiries", href: "#contact" },
    { name: "Media Kit", href: "#contact" }
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
