import { Link } from "wouter";

export default function Footer() {
  const links = [
    ["/about", "About"],
    ["/books", "Books"],
    ["/essays", "Essays"],
    ["/kimyaps", "KimYaps"],
    ["/editorial", "Editorial"],
    ["/aafc-builders", "AAFC Builders"],
    ["/press", "Press"],
    ["/contact", "Contact"],
  ];

  return (
    <footer className="bg-black py-14 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2
            className="font-serif text-3xl font-bold mb-4 tracking-[0.08em]"
            data-testid="footer-title"
          >
            KIMINOU KNOX
          </h2>
          <p
            className="text-sm uppercase tracking-[0.16em] text-white/70 mb-8"
            data-testid="footer-subtitle"
          >
            Writer • Athlete • Program Builder • Author • Podcast Host
          </p>
          <nav className="mb-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-white/70">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="transition-colors hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
          
          <div className="border-t border-white/15 pt-8">
            <p className="text-sm opacity-80" data-testid="footer-copyright">
              © 2026 Kiminou Knox. Books, basketball, and community work from the Bay Area.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
