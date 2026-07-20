const DEFAULT_ITEMS = [
  "Kiminou Knox",
  "Author",
  "Athlete",
  "Entrepreneur",
  "Black Boy Lie",
  "Spirit of Solomon",
  "East Palo Alto",
  "7 Remastered Editions",
  "Youth Advocate",
  "AAFC Director",
];

interface Props {
  items?: string[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  separator?: string;
}

export default function GoldMarquee({
  items = DEFAULT_ITEMS,
  speed = 32,
  direction = "left",
  className = "",
  separator = "·",
}: Props) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden border-y border-amber-400/12 py-3.5 relative ${className}`}>
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, black, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, black, transparent)" }} />

      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mr-3">
            <span className="text-[10px] uppercase tracking-[0.35em] font-medium text-white/30 hover:text-amber-400/70 transition-colors duration-300">
              {item}
            </span>
            <span className="text-amber-400/30 text-xs">{separator}</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
