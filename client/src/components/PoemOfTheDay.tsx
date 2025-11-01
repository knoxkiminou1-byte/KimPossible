import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BookOpen } from "lucide-react";
import { Link } from "wouter";

interface Poem {
  title: string;
  text: string;
  sourceBook: string;
  rating: string;
}

export default function PoemOfTheDay() {
  // Start with a default poem so section is always visible
  const [poem, setPoem] = useState<Poem>({
    title: "Rising",
    text: "Every morning I decide\nTo stand when I could fall\nTo speak when I could hide\nTo answer destiny's call\n\nNot perfect, not without fear\nBut present, here, awake\nEach day another year\nOf choices that I make",
    sourceBook: "Black Boy Poems",
    rating: "General"
  });
  const containerRef = useScrollAnimation();

  useEffect(() => {
    async function loadPoem() {
      try {
        console.log('Loading poems from /poems.json...');
        const response = await fetch('/poems.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const poems: Poem[] = await response.json();
        console.log('Loaded poems:', poems.length);
        
        // Select poem based on day of year for daily rotation
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        
        // Use modulo to cycle through poems
        const poemIndex = dayOfYear % poems.length;
        console.log('Selected poem index:', poemIndex, 'Title:', poems[poemIndex].title);
        setPoem(poems[poemIndex]);
      } catch (error) {
        console.error('Failed to load poems:', error);
        // Keep the default poem on error
      }
    }

    loadPoem();
  }, []);

  return (
    <section id="poem-of-the-day" className="py-16 bg-muted/50" data-testid="poem-of-the-day">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div ref={containerRef} className="animate-on-scroll">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Poem of the Day
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-8" data-testid="poem-title">
              {poem.title}
            </h2>
          </div>

          <div className="relative">
            <div className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-lg">
              <div 
                className="poem-text text-lg md:text-xl leading-relaxed text-foreground whitespace-pre-line font-serif text-center max-h-96 overflow-y-auto"
                data-testid="poem-text"
              >
                {poem.text}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4" data-testid="poem-source">
                From the book <span className="font-medium text-foreground">{poem.sourceBook}</span> by Kiminou Knox
              </p>
              <Link 
                href="/books"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                data-testid="poem-read-book-link"
              >
                Read the Book →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
