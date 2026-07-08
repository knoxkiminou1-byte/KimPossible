import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface VariableFontWaveProps {
  children: string;
  className?: string;
  triggerOnHover?: boolean;
  triggerOnView?: boolean;
  loop?: boolean;
  waveSpeed?: number;
  minWeight?: number;
  maxWeight?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
}

export default function VariableFontWave({
  children,
  className = "",
  triggerOnHover = true,
  triggerOnView = true,
  loop = false,
  waveSpeed = 80,
  minWeight = 200,
  maxWeight = 800,
  as: Tag = "span",
}: VariableFontWaveProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (triggerOnView && inView) {
      setActive(true);
      if (!loop) {
        const total = children.replace(/\s/g, "").length * waveSpeed + 900;
        const t = setTimeout(() => setActive(false), total);
        return () => clearTimeout(t);
      }
    }
    return undefined;
  }, [inView, triggerOnView, loop, children, waveSpeed]);

  const isAnimating = active || (triggerOnHover && hovered);

  const chars = children.split("").map((char, i) => {
    if (char === " ") return <span key={i}>&nbsp;</span>;
    const delay = i * waveSpeed;
    return (
      <span
        key={i}
        style={{
          display: "inline-block",
          fontWeight: isAnimating ? undefined : minWeight,
          animation: isAnimating
            ? `vfw-wave 0.75s ease-in-out ${delay}ms ${loop ? "infinite" : "1"} alternate`
            : "none",
          transition: "font-weight 0.4s ease",
          "--vfw-min": minWeight,
          "--vfw-max": maxWeight,
        } as React.CSSProperties}
      >
        {char}
      </span>
    );
  });

  return (
    <>
      <style>{`
        @keyframes vfw-wave {
          0% { font-weight: var(--vfw-min, 200); }
          100% { font-weight: var(--vfw-max, 800); }
        }
      `}</style>
      <Tag
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className={className}
        onMouseEnter={() => triggerOnHover && setHovered(true)}
        onMouseLeave={() => triggerOnHover && setHovered(false)}
        style={{ letterSpacing: "inherit" }}
      >
        {chars}
      </Tag>
    </>
  );
}
