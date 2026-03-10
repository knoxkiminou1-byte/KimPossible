export default function PressStrip() {
  const pressOutlets = [
    "Miles Hall Foundation",
    "National Honor Society",
    "Breaking Barriers Youth Summit",
    "NCSA Sports",
    "MaxPreps",
    "Bookshop.org",
    "The Tee Shirt Teens",
    "2020 U.S. Census Campaign",
    "East Palo Alto Community",
    "Cristo Rey De La Salle",
    "Ygnacio Valley High School",
  ];

  return (
    <section className="border-y border-amber-100/10 bg-[#090a10] py-10 overflow-hidden" data-testid="press-strip">
      <div className="whitespace-nowrap text-amber-100/65">
        <div className="inline-block animate-marquee marquee-pause">
          <div className="inline-flex items-center space-x-12 font-serif text-xl md:text-2xl">
            {pressOutlets
              .map((outlet, index) => (
                <span key={`first-${index}`} data-testid={`press-outlet-${index}`}>
                  {outlet}
                </span>
              ))
              .reduce((prev, curr, index) => [prev, <span key={`sep-first-${index}`}>•</span>, curr] as any)}
          </div>
        </div>
        <div className="inline-block animate-marquee marquee-pause">
          <div className="inline-flex items-center space-x-12 font-serif text-xl md:text-2xl">
            {pressOutlets
              .map((outlet, index) => <span key={`second-${index}`}>{outlet}</span>)
              .reduce((prev, curr, index) => [prev, <span key={`sep-second-${index}`}>•</span>, curr] as any)}
          </div>
        </div>
      </div>
    </section>
  );
}
