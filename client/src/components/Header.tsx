import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/basketball", label: "Athletics" },
  { href: "/speaking", label: "Speaking" },
  { href: "/author", label: "Bio" },
  { href: "/contact", label: "Contact" },
];

const MOTION_KEY = "kk-reduce-motion";

export default function Header() {
  const [location] = useLocation();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(MOTION_KEY) === "1";
    setReduceMotion(stored);
    document.documentElement.dataset.motion = stored ? "reduce" : "full";
  }, []);

  const toggleMotion = () => {
    const next = !reduceMotion;
    setReduceMotion(next);
    window.localStorage.setItem(MOTION_KEY, next ? "1" : "0");
    document.documentElement.dataset.motion = next ? "reduce" : "full";
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[rgba(3,4,6,0.74)] backdrop-blur-xl" data-testid="header-main">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <nav className="flex items-center justify-between gap-4 py-4 md:py-5">
          <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-5">
            <Link href="/" className="group block" data-testid="logo-button">
              <div className="flex items-center gap-3">
                <img src="/k-logo-padded.png" alt="" className="hidden h-9 w-9 rounded-full border border-amber-100/15 bg-white/5 p-1.5 shadow-[0_0_30px_rgba(227,180,78,0.15)] md:block" />
                <div>
                  <motion.span
                    className="block font-serif text-lg font-semibold tracking-[0.26em] text-amber-50 md:text-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.28 }}
                  >
                    KIMINOU KNOX
                  </motion.span>
                  <span className="hidden text-[10px] uppercase tracking-[0.44em] text-amber-100/55 md:block">
                    Myth • Voice • Legacy
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] md:flex">
            {navItems.map((item) => {
              const active = location === item.href || (item.href === "/basketball" && location === "/sports");
              return (
                <Link key={item.href} href={item.href} data-testid={`nav-${item.label.toLowerCase()}`}>
                  <motion.span
                    className={`inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] transition-all ${active ? "bg-amber-100/12 text-amber-50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" : "text-amber-100/62 hover:bg-white/[0.05] hover:text-amber-50"}`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleMotion}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.26em] text-amber-100/72 transition hover:bg-white/[0.07] hover:text-amber-50"
            aria-pressed={reduceMotion}
            data-testid="toggle-motion"
          >
            {reduceMotion ? "Motion Off" : "Motion On"}
          </button>
        </nav>
      </div>
    </header>
  );
}
