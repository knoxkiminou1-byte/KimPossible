const row1 = [
  "Miles Hall Foundation",
  "National Honor Society",
  "Breaking Barriers Youth Summit",
  "NCSA Sports",
  "MaxPreps",
  "BookShop.org",
  "The Tee Shirt Teens",
];

const row2 = [
  "2020 U.S. Census Campaign",
  "East Palo Alto Community",
  "Cristo Rey De La Salle",
  "Ygnacio Valley High School",
  "AAFC Director",
  "8 Published Books",
  "Class of 2025",
];

function MarqueeRow({ items, reverse = false, speed = 40 }: { items: string[]; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items, ...items];
  const duration = items.length * speed;

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-${reverse ? "reverse" : "forward"} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-8 shrink-0">
            <span
              className={`font-serif text-lg md:text-xl tracking-wide ${
                reverse ? "text-white/25" : "text-white/40"
              } hover:text-amber-300/70 transition-colors duration-300`}
            >
              {item}
            </span>
            <span className="text-amber-500/30 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PressStrip() {
  return (
    <section
      className="py-10 border-y border-white/5 overflow-hidden bg-background"
      data-testid="press-strip"
    >
      <style>{`
        @keyframes marquee-forward {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <div className="space-y-4">
        <MarqueeRow items={row1} speed={45} />
        <MarqueeRow items={row2} reverse speed={50} />
      </div>
    </section>
  );
}
