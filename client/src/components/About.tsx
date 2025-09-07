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
            About Kiminou Knox
          </h2>
          <div className="h-px w-24 bg-accent mb-12 mx-auto"></div>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8" data-testid="about-description-1">
            Kiminou Knox is an 18-year-old multi-talented individual from the Bay Area of California, distinguished as an athlete, published author, entrepreneur, and creative designer. Standing at 6'7", he excelled in basketball throughout high school.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="about-description-2">
            The grandson of the late Dr. Faye McNair-Knox—a respected community leader and former executive director of One East Palo Alto—Kiminou carries forward a legacy of advocacy and community engagement. A National Honor Society member and four-time Honor Roll student, he graduated from Ygnacio Valley High School in 2025.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12" data-testid="about-description-3">
            Beyond athletics, Kiminou has authored four published poetry books and founded The Tee Shirt Teens clothing brand. His journey represents the intersection of athletic discipline, literary expression, entrepreneurial vision, and creative design—a unique perspective on pursuing excellence across multiple domains.
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
                  className="luxury-button px-6 py-3 bg-primary text-primary-foreground font-medium uppercase tracking-[0.1em] rounded-r-md hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                  data-testid="newsletter-submit-button"
                >
                  SUBSCRIBE
                </button>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="newsletter-description">
                Stay updated on Kiminou's latest books, athletic achievements, and business ventures.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
