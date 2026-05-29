import { Link } from "wouter";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/essays", label: "Essays" },
  { href: "/kimyaps", label: "KimYaps" },
  { href: "/aafc-builders", label: "Builders" },
  { href: "/speaking", label: "Speaking" },
  { href: "/press", label: "Press" },
  { href: "/about", label: "Bio" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md" data-testid="header-main">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <nav className="flex flex-col items-center gap-3 py-3 sm:flex-row sm:justify-between sm:py-4">
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-[0.12em] text-amber-100 transition-colors hover:text-white md:text-xl"
            data-testid="logo-button"
          >
            KIMINOU KNOX
          </Link>

          <div className="flex w-full flex-wrap items-center justify-center gap-1 sm:w-auto sm:justify-end md:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white/70 transition-colors hover:bg-white/10 hover:text-amber-100 md:text-sm"
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
