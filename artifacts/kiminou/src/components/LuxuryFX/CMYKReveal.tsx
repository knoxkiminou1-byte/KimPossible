import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

type LayerDef = { filter: string; dx: number; dy: number; delay: number };

const LAYERS: LayerDef[] = [
  { filter: "hue-rotate(180deg) saturate(2) brightness(0.9)", dx: -6, dy: -5, delay: 0 },
  { filter: "hue-rotate(300deg) saturate(2) brightness(0.9)", dx: 6, dy: -4, delay: 400 },
  { filter: "hue-rotate(60deg) saturate(3) brightness(0.9)", dx: -5, dy: 6, delay: 800 },
  { filter: "grayscale(1) contrast(1.4)", dx: 5, dy: 5, delay: 1200 },
];

export default function CMYKReveal({
  children,
  inViewTrigger = true,
}: {
  children: ReactNode;
  inViewTrigger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const converged = inViewTrigger && inView;

  return (
    <div ref={ref} className="relative">
      {/* Color separation layers — fade out once converged, revealing crisp child */}
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            filter: layer.filter,
            mixBlendMode: "screen",
            transform: converged
              ? "translate(0px, 0px)"
              : `translate(${layer.dx}px, ${layer.dy}px)`,
            opacity: converged ? 0 : 0.6,
            transition: `transform 600ms cubic-bezier(0.25,0.46,0.45,0.94) ${layer.delay}ms, opacity 500ms ease ${layer.delay + 600}ms`,
          }}
        >
          {children}
        </div>
      ))}

      {/* Final crisp layer */}
      <div
        style={{
          opacity: converged ? 1 : 0,
          transition: "opacity 500ms ease 1800ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}
