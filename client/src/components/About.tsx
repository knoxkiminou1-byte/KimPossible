import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const [email, setEmail] = useState("");
  const contentRef = useScrollAnimation();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Newsletter subscription submitted! (This is a demo)');
    setEmail("");
  };

  return (
    <section id="about" className="py-32 bg-background" data-testid="about-section">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div ref={contentRef} className="animate-on-scroll">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-12" data-testid="about-title">
            The Intersection of Excellence
          </h2>
          <div className="h-px w-24 bg-accent mb-12 mx-auto"></div>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8" data-testid="about-description-1">
            At the crossroads where athletic discipline meets literary expression, where entrepreneurial vision intersects with architectural innovation, lies a unique perspective on what it means to pursue excellence across multiple domains.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12" data-testid="about-description-2">
            This journey is about more than individual achievements—it's about understanding how mastery in one field informs and elevates performance in all others, creating a symphony of skills that resonate far beyond their individual notes.
          </p>
          
          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto">
            <h3 className="font-serif text-2xl font-medium mb-6" data-testid="newsletter-title">
              Stay Connected
            </h3>
            <form className="space-y-4" onSubmit={handleNewsletterSubmit} data-testid="newsletter-form">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border border-border rounded-l-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                  aria-label="Email address"
                  data-testid="newsletter-email-input"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-primary text-primary-foreground font-medium uppercase tracking-[0.1em] rounded-r-md hover:bg-primary/90 transition-colors"
                  data-testid="newsletter-submit-button"
                >
                  SUBSCRIBE
                </button>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="newsletter-description">
                Get insights on the intersection of excellence across disciplines.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
