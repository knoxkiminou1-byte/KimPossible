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
    <section className="border-y border-border bg-muted py-14" data-testid="press-strip">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Selected links and references
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-foreground/75 md:grid-cols-3 lg:grid-cols-4">
          {pressOutlets.map((outlet, index) => (
            <span key={outlet} data-testid={`press-outlet-${index}`}>
              {outlet}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
