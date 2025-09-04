export default function PressStrip() {
  const pressOutlets = [
    "The New York Times",
    "Harvard Business Review", 
    "Architectural Digest",
    "Sports Illustrated",
    "Forbes",
    "The Atlantic",
    "Dezeen",
    "Fast Company"
  ];

  return (
    <section className="py-16 bg-muted border-y border-border overflow-hidden" data-testid="press-strip">
      <div className="whitespace-nowrap">
        <div className="inline-block animate-marquee marquee-pause">
          <div className="inline-flex items-center space-x-16 text-2xl md:text-3xl font-serif text-muted-foreground">
            {pressOutlets.map((outlet, index) => (
              <span key={`first-${index}`} data-testid={`press-outlet-${index}`}>
                {outlet}
              </span>
            )).reduce((prev, curr, index) => [prev, <span key={`sep-first-${index}`}>•</span>, curr] as any)}
          </div>
        </div>
        <div className="inline-block animate-marquee marquee-pause">
          <div className="inline-flex items-center space-x-16 text-2xl md:text-3xl font-serif text-muted-foreground">
            {pressOutlets.map((outlet, index) => (
              <span key={`second-${index}`}>
                {outlet}
              </span>
            )).reduce((prev, curr, index) => [prev, <span key={`sep-second-${index}`}>•</span>, curr] as any)}
          </div>
        </div>
      </div>
    </section>
  );
}
