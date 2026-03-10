export default function Footer() {
  return (
    <footer className="border-t border-amber-100/12 bg-[#05060a] py-14 text-amber-50" data-testid="footer">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <p className="luxury-kicker mb-3">Kiminou Knox</p>
        <h2 className="mb-4 font-serif text-3xl font-light tracking-[0.08em]" data-testid="footer-title">
          Athlete • Author • Entrepreneur
        </h2>
        <p className="mb-8 text-sm text-amber-100/70" data-testid="footer-subtitle">
          Bay Area legacy built through discipline, faith, and authored work.
        </p>
        <p className="border-t border-amber-100/10 pt-6 text-xs uppercase tracking-[0.18em] text-amber-100/55" data-testid="footer-copyright">
          © 2026 Kiminou Knox. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
