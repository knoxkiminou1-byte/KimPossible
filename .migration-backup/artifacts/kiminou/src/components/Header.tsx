import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/books", label: "Books" },
  { href: "/basketball", label: "Athletics" },
  { href: "/speaking", label: "Voice" },
  { href: "/author", label: "Bio" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

const THEME_KEY = "kiminou-theme";

function useInkPaper() {
  const [isPaper, setIsPaper] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(THEME_KEY) === "paper";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isPaper) {
      root.setAttribute("data-theme", "paper");
      localStorage.setItem(THEME_KEY, "paper");
    } else {
      root.setAttribute("data-theme", "noir");
      localStorage.setItem(THEME_KEY, "noir");
    }
  }, [isPaper]);

  return { isPaper, toggle: () => setIsPaper(p => !p) };
}

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

function InkPaperToggle({ isPaper, onToggle }: { isPaper: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      title={isPaper ? "Switch to Ink (dark)" : "Switch to Paper (light)"}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-amber-400/30 transition-all duration-300 group ml-2"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <AnimatePresence mode="wait">
        {isPaper ? (
          <motion.span
            key="ink"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[8px] uppercase tracking-[0.35em] text-amber-900/70 group-hover:text-amber-800"
          >
            ◼ Ink
          </motion.span>
        ) : (
          <motion.span
            key="paper"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[8px] uppercase tracking-[0.35em] text-white/30 group-hover:text-amber-400/60"
          >
            ◻ Paper
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { isPaper, toggle } = useInkPaper();

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
          scrolled
            ? isPaper
              ? "bg-amber-50/95 backdrop-blur-xl border-b border-amber-900/10"
              : "bg-black/95 backdrop-blur-xl border-b border-amber-500/10"
            : "bg-transparent"
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
                className={`font-serif text-base md:text-lg tracking-[0.25em] uppercase font-semibold cursor-pointer ${
                  isPaper
                    ? "text-amber-900"
                    : "bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent"
                }`}
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
              <InkPaperToggle isPaper={isPaper} onToggle={toggle} />
            </nav>

            <button
              className={`md:hidden transition-colors p-1 ${isPaper ? "text-amber-900/70 hover:text-amber-900" : "text-white/70 hover:text-white"}`}
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
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 ${
              isPaper ? "bg-amber-50" : "bg-black"
            }`}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <span className={`font-serif text-2xl tracking-[0.25em] uppercase ${isPaper ? "text-amber-900" : "text-amber-300"}`}>
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
                  <span className={`text-xl uppercase tracking-[0.25em] transition-colors cursor-pointer ${
                    isPaper ? "text-amber-800/80 hover:text-amber-900" : "text-white/80 hover:text-amber-300"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
            <button
              onClick={toggle}
              className={`text-sm uppercase tracking-[0.3em] mt-4 ${isPaper ? "text-amber-800/50" : "text-white/30"}`}
            >
              {isPaper ? "◼ Switch to Ink" : "◻ Switch to Paper"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
