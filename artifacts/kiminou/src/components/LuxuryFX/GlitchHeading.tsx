import { useState, useRef, useCallback } from "react";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  intensity?: number;
}

export default function GlitchHeading({ children, className = "", as: Tag = "h2", intensity = 1 }: Props) {
  const [active, setActive] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ r: { x: 0, y: 0 }, b: { x: 0, y: 0 } });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startGlitch = useCallback(() => {
    setActive(true);
    intervalRef.current = setInterval(() => {
      setGlitchOffset({
        r: { x: (Math.random() - 0.5) * 6 * intensity, y: (Math.random() - 0.5) * 2 * intensity },
        b: { x: (Math.random() - 0.5) * 6 * intensity, y: (Math.random() - 0.5) * 2 * intensity },
      });
    }, 80);
  }, [intensity]);

  const stopGlitch = useCallback(() => {
    setActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setGlitchOffset({ r: { x: 0, y: 0 }, b: { x: 0, y: 0 } });
  }, []);

  const style: React.CSSProperties = { position: "relative", display: "inline-block" };

  return (
    <div
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={startGlitch}
      onMouseLeave={stopGlitch}
    >
      <Tag
        aria-hidden="true"
        style={{
          ...style,
          position: "absolute",
          inset: 0,
          color: "rgba(255,40,40,0.75)",
          clipPath: "inset(0 0 55% 0)",
          transform: `translate(${glitchOffset.r.x}px, ${glitchOffset.r.y}px)`,
          transition: active ? "none" : "transform 0.15s ease",
          opacity: active ? 1 : 0,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Tag>
      <Tag
        aria-hidden="true"
        style={{
          ...style,
          position: "absolute",
          inset: 0,
          color: "rgba(40,100,255,0.75)",
          clipPath: "inset(55% 0 0 0)",
          transform: `translate(${glitchOffset.b.x}px, ${glitchOffset.b.y}px)`,
          transition: active ? "none" : "transform 0.15s ease",
          opacity: active ? 1 : 0,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Tag>
      <Tag style={{ position: "relative" }}>{children}</Tag>
    </div>
  );
}
