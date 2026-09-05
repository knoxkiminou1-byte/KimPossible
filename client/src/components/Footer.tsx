export default function Footer() {
  return (
    <footer className="py-16 bg-primary text-primary-foreground" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold mb-4" data-testid="footer-title">
            KIMINOU KNOX
          </h2>
          <p className="text-lg opacity-90 mb-8" data-testid="footer-subtitle">
            AUTHOR • POET • KIMYAPS
          </p>
          
          <div className="border-t border-white/20 pt-8">
            <p className="text-sm opacity-80" data-testid="footer-copyright">
              © 2025 Kiminou Knox. All rights reserved. | Bay Area raised, New Orleans based
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
