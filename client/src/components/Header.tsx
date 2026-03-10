import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/sports", label: "Athletics" },
  { href: "/speaking", label: "Speaking" },
  { href: "/author", label: "Bio" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("kk-reduce-motion") === "1";
    const system = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enabled = stored || system;

    setReduceMotion(enabled);
    document.documentElement.dataset.motion = enabled ? "reduce" : "full";
    document.body.classList.toggle("motion-reduce", enabled);
  }, []);

  const toggleMotion = () => {
    const next = !reduceMotion;
    setReduceMotion(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("kk-reduce-motion", next ? "1" : "0");
    }
    document.documentElement.dataset.motion = next ? "reduce" : "full";
    document.body.classList.toggle("motion-reduce", next);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-100/10 bg-black/65 backdrop-blur-xl" data-testid="header-main">
      <div className="mx-auto w-full max-w-7xl px-5 py-3 lg:px-10">
        <div className="mb-3 flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3" data-testid="logo-button">
            <img src="/k-logo-3d.png" alt="" className="h-9 w-9 opacity-90 drop-shadow-[0_0_14px_rgba(223,175,95,0.45)]" />
            <div className="leading-none">
              <p className="font-serif text-xl tracking-[0.14em] text-amber-50">KIMINOU KNOX</p>
              <p className="text-[0.56rem] uppercase tracking-[0.34em] text-amber-100/65">Legacy in Motion</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={toggleMotion}
            className="inline-flex items-center rounded-full border border-amber-100/20 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-amber-100/75 transition hover:text-amber-50"
            aria-pressed={reduceMotion}
            data-testid="motion-toggle"
          >
            {reduceMotion ? "Motion Off" : "Motion On"}
          </button>
        </div>

        <nav className="flex items-center justify-start gap-1 overflow-x-auto pb-1 md:justify-center" aria-label="Primary">
          {navItems.map((item) => {
            const active = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} data-testid={`nav-${item.label.toLowerCase()}`}>
                <motion.span
                  className={`relative inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-[0.69rem] font-medium uppercase tracking-[0.22em] transition ${active ? "text-amber-100" : "text-amber-100/70 hover:text-amber-50"}`}
                  whileHover={reduceMotion ? undefined : { y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  {active && <span className="absolute inset-0 -z-10 rounded-full border border-amber-100/25 bg-white/[0.04]" />}
                </motion.span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
