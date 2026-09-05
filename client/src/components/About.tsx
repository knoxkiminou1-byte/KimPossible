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
            Kiminou Knox is a Bay Area raised, New Orleans based author and poet. He writes books and essays about Black boyhood, faith, love, grief, masculinity, family, and becoming.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="about-description-2">
            He is the author of ten distinct original books and host of KimYaps. Athletics, speaking, music, AAFC, faith work, Social Following Studios, and technology work remain secondary public rooms rather than the first line of the author identity.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="about-description-3">
            His family serves as his compass. He is the son of Rashida Knox, a distinguished Bay Area marketer and presidential singer whose dedication to excellence shapes his approach to every endeavor. His grandmother, Dr. Faye McNair Knox, devoted her life to serving the One East Palo Alto community as its executive director, teaching him that service is a promise you renew each day.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="about-description-4">
            On the page, he explores Black boy life, faith, love, grief, masculinity, family, and becoming through verse and narrative. The principles remain constant: show up, do the work, leave every space better than you found it.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12" data-testid="about-description-5">
            His published books include poetry, faith-centered writing, love poems, Black boyhood, family, imagination, and legacy. As a speaker, he addresses craft, discipline, voice, and the cost of silence, collaborating with teams, schools, and community organizations to transform ideas into meaningful action.
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
                Stay updated on Kiminou's latest books, essays, speaking, and media.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
