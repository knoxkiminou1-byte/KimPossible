export default function PressStrip() {
  const pressOutlets = [
    "Miles Hall Foundation",
    "National Honor Society", 
    "Breaking Barriers Youth Summit",
    "NCSA Sports",
    "MaxPreps",
    "BookShop.org",
    "The Tee Shirt Teens",
    "2020 U.S. Census Campaign",
    "East Palo Alto Community",
    "Cristo Rey De La Salle",
    "Ygnacio Valley High School"
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
