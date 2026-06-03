import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/books", label: "Books" },
  { href: "/basketball", label: "Athletics" },
  { href: "/speaking", label: "Speaking" },
  { href: "/author", label: "Bio" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

function MagneticNavLink({ href, label, active, index }: { href: string; label: string; active: boolean; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const rawX = useSpring(0, { stiffness: 380, damping: 28 });
  const rawY = useSpring(0, { stiffness: 380, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 7;
    const y = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 4;
    rawX.set(x);
    rawY.set(y);
  };

  const onLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <Link href={href} data-testid={`nav-${label.toLowerCase()}`}>
      <motion.span
        ref={ref}
        className={`relative text-xs uppercase tracking-[0.18em] font-medium cursor-pointer transition-colors duration-300 inline-block ${
          active ? "text-amber-300" : "text-white/60 hover:text-white"
        }`}
        style={{ x: rawX, y: rawY }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {label}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-px bg-amber-300 origin-left"
          initial={{ scaleX: active ? 1 : 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.25 }}
          style={{ width: "100%" }}
        />
      </motion.span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/95 backdrop-blur-xl border-b border-amber-500/10" : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        data-testid="header-main"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" data-testid="logo-button">
              <motion.span
                className="font-serif text-base md:text-lg tracking-[0.25em] bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent uppercase font-semibold cursor-pointer"
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                Kiminou Knox
              </motion.span>
            </Link>

            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navItems.map((item, i) => (
                <MagneticNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={location === item.href}
                  index={i}
                />
              ))}
            </nav>

            <button
              className="md:hidden text-white/70 hover:text-white transition-colors p-1"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <span className="font-serif text-2xl tracking-[0.25em] text-amber-300 uppercase">
                Kiminou Knox
              </span>
            </Link>
            <div className="w-12 h-px bg-amber-300/40 mx-auto" />
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              >
                <Link href={item.href}>
                  <span className="text-xl uppercase tracking-[0.25em] text-white/80 hover:text-amber-300 transition-colors cursor-pointer">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
