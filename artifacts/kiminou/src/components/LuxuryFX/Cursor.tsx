import { useEffect, useRef, useState } from "react";

export default function LuxuryCursor() {
  const keyEl = useRef<HTMLDivElement>(null);
  const trailEl = useRef<HTMLDivElement>(null);
  const [spin, setSpin] = useState(0);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const trailRef = useRef({ x: posRef.current.x, y: posRef.current.y });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (keyEl.current) {
        keyEl.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const tick = () => {
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.1;
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.1;
      if (trailEl.current) {
        trailEl.current.style.transform =
          `translate(${trailRef.current.x}px, ${trailRef.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });

    const onClick = () => setSpin(s => s + 1);
    window.addEventListener("click", onClick);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Trailing glow ring */}
      <div
        ref={trailEl}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            marginLeft: -21,
            marginTop: -21,
            borderRadius: "50%",
            border: "1px solid rgba(251,191,36,0.25)",
            boxShadow: "0 0 12px rgba(251,191,36,0.08)",
          }}
        />
      </div>

      {/* Golden key cursor */}
      <div
        ref={keyEl}
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          key={spin}
          style={{
            marginLeft: -10,
            marginTop: -10,
            animation: spin > 0 ? "keyTurn 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards" : "none",
          }}
        >
          {/* Key SVG */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 0 4px rgba(251,191,36,0.6))" }}
          >
            {/* Key bow (circle) */}
            <circle cx="8" cy="8" r="5" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="8" cy="8" r="2.5" fill="#F59E0B" fillOpacity="0.4" />
            {/* Key blade (shaft) */}
            <line x1="11.5" y1="11.5" x2="20" y2="20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            {/* Key teeth */}
            <line x1="16.5" y1="16.5" x2="15" y2="18" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18.5" y1="18.5" x2="17" y2="20" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes keyTurn {
          0%   { transform: rotate(0deg) scale(1); }
          30%  { transform: rotate(120deg) scale(1.25); }
          60%  { transform: rotate(88deg) scale(1.15); }
          80%  { transform: rotate(105deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1); }
        }
      `}</style>
    </>
  );
}
