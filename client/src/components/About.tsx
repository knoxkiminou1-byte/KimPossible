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
            Kiminou Knox is a 19 year old writer and athlete from the Oakland East Bay, telling stories that carry faith, grit, and love. Through books, poems, and youth focused projects, he creates work that helps people feel deeply and act with purpose.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="about-description-2">
            Standing at 6 feet 7 inches and weighing 235 lbs, Kiminou excelled as a varsity basketball captain and multi sport athlete. His accomplishments include 6 published works and recognition through 5 major awards. Academically, he scored 1380 on the SAT while maintaining excellence in both athletics and creative writing.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="about-description-3">
            His family serves as his compass. He is the son of Rashida Knox, a distinguished Bay Area marketer and presidential singer whose dedication to excellence shapes his approach to every endeavor. His grandmother, Dr. Faye McNair Knox, devoted her life to serving the One East Palo Alto community as its executive director, teaching him that service is a promise you renew each day.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="about-description-4">
            On the page, he explores Black boy life, love, and becoming through verse and narrative. On the court, he plays forward and center, bringing the same discipline to both arenas. The principles remain constant: show up, do the work, leave every space better than you found it.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12" data-testid="about-description-5">
            His published works include Black Boy Poems, Our Father, Boys Raised in Silence, The Spirit of Solomon, Hopeless Romantic, and The Adventures of Kiminou the Great and Chua the Wise. He is building an interconnected author universe that weaves together poems, stories, essays, visual media, and live performances into a cohesive body of work. As a speaker, he addresses craft, discipline, voice, and the cost of silence, collaborating with teams, schools, and community organizations to transform ideas into meaningful action.
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
