import { Link } from "wouter";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/author", label: "Bio" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-amber-500/20" data-testid="header-main">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <nav className="flex flex-col items-center py-4 gap-4">
          {/* Logo */}
          <Link href="/" className="group relative overflow-hidden block" data-testid="logo-button">
            <motion.span 
              className="block text-xl md:text-2xl font-serif font-bold tracking-[0.15em] bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              KIMINOU KNOX
            </motion.span>
          </Link>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-1 md:gap-2 flex-wrap">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href} data-testid={`nav-${item.label.toLowerCase()}`}>
                <motion.span
                  className="px-3 py-2 text-xs md:text-sm uppercase tracking-[0.15em] text-amber-300/70 hover:text-amber-300 rounded-lg transition-all font-medium cursor-pointer inline-block relative overflow-hidden group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: "0 0 20px rgba(251,191,36,0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
