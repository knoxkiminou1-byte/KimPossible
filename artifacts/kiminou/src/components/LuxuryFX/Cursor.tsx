import { useEffect, useRef, useState, useCallback } from "react";

interface LockFlash { id: number; x: number; y: number }

export default function LuxuryCursor() {
  const keyEl = useRef<HTMLDivElement>(null);
  const trailEl = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const trailPos = useRef({ x: posRef.current.x, y: posRef.current.y });
  const rafRef = useRef<number>(0);
  const spinRef = useRef(0);
  const [spinKey, setSpinKey] = useState(0);
  const [locks, setLocks] = useState<LockFlash[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    spinRef.current += 1;
    setSpinKey(k => k + 1);
    const id = Date.now();
    setLocks(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setLocks(prev => prev.filter(l => l.id !== id)), 900);
  }, []);

  useEffect(() => {
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (keyEl.current) {
        keyEl.current.style.left = e.clientX + "px";
        keyEl.current.style.top = e.clientY + "px";
      }
    };

    const tick = () => {
      trailPos.current.x += (posRef.current.x - trailPos.current.x) * 0.09;
      trailPos.current.y += (posRef.current.y - trailPos.current.y) * 0.09;
      if (trailEl.current) {
        trailEl.current.style.left = trailPos.current.x + "px";
        trailEl.current.style.top = trailPos.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("click", handleClick);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleClick]);

  return (
    <>
      {/* CSS animations */}
      <style>{`
        @keyframes keyTurn {
          0%   { transform: rotate(0deg) scale(1); }
          25%  { transform: rotate(130deg) scale(1.3); }
          60%  { transform: rotate(85deg) scale(1.18); }
          80%  { transform: rotate(108deg) scale(1.12); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes lockUnlock {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.4); }
          15%  { opacity: 1; transform: translate(-50%,-60%) scale(1.1); }
          40%  { opacity: 1; transform: translate(-50%,-60%) scale(1); }
          60%  { opacity: 1; transform: translate(-50%,-60%) scale(1); }
          100% { opacity: 0; transform: translate(-50%,-75%) scale(0.7); }
        }
        @keyframes shackleOpen {
          0%,30% { transform: translateY(0); }
          60%    { transform: translateY(-6px) rotate(-15deg); }
          100%   { transform: translateY(-6px) rotate(-15deg); }
        }
        @keyframes sparkle1 {
          0%   { opacity:0; transform: translate(0,0) scale(0); }
          30%  { opacity:1; transform: translate(-8px,-10px) scale(1); }
          100% { opacity:0; transform: translate(-14px,-18px) scale(0); }
        }
        @keyframes sparkle2 {
          0%   { opacity:0; transform: translate(0,0) scale(0); }
          30%  { opacity:1; transform: translate(9px,-11px) scale(1); }
          100% { opacity:0; transform: translate(16px,-20px) scale(0); }
        }
        @keyframes sparkle3 {
          0%   { opacity:0; transform: translate(0,0) scale(0); }
          30%  { opacity:1; transform: translate(-4px,10px) scale(1); }
          100% { opacity:0; transform: translate(-7px,18px) scale(0); }
        }
        @keyframes gemShine {
          0%,100% { opacity:0.7; }
          50%      { opacity:1; filter: brightness(1.5); }
        }
        .trail-ring {
          position: fixed; z-index: 9998; pointer-events: none;
          width: 44px; height: 44px;
          margin-left: -22px; margin-top: -22px;
          border-radius: 50%;
          border: 1px solid rgba(251,191,36,0.22);
          box-shadow: 0 0 14px rgba(251,191,36,0.1), inset 0 0 8px rgba(251,191,36,0.05);
          display: none;
        }
        @media (min-width: 768px) { .trail-ring { display: block; } }
        .key-cursor {
          position: fixed; z-index: 9999; pointer-events: none;
          margin-left: -12px; margin-top: -12px;
          display: none;
        }
        @media (min-width: 768px) { .key-cursor { display: block; } }
        .lock-flash {
          position: fixed; z-index: 10000; pointer-events: none;
          animation: lockUnlock 0.85s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>

      {/* Trailing amber ring */}
      <div ref={trailEl} className="trail-ring" />

      {/* Golden key */}
      <div ref={keyEl} className="key-cursor">
        <div
          key={spinKey}
          style={{ animation: spinKey > 0 ? "keyTurn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards" : "none" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gold gradient for key body */}
              <linearGradient id="goldKey" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="30%" stopColor="#F59E0B" />
                <stop offset="65%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#FCD34D" />
              </linearGradient>
              {/* Gem blue gradient */}
              <radialGradient id="gemBlue" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#BFDBFE" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </radialGradient>
              {/* Gem pink gradient */}
              <radialGradient id="gemPink" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#FDE8FF" />
                <stop offset="50%" stopColor="#E879F9" />
                <stop offset="100%" stopColor="#A21CAF" />
              </radialGradient>
              {/* Glow filter */}
              <filter id="keyGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="goldGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.5" result="glow" />
                <feColorMatrix in="glow" type="matrix"
                  values="1 0.6 0 0 0  0.7 0.4 0 0 0  0 0 0 0 0  0 0 0 0.8 0" result="gold" />
                <feMerge><feMergeNode in="gold" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <g filter="url(#goldGlow)">
              {/* Key shaft */}
              <line x1="13" y1="13" x2="25" y2="25" stroke="url(#goldKey)" strokeWidth="2.5" strokeLinecap="round" />
              {/* Tooth 1 */}
              <line x1="19.5" y1="19.5" x2="17.5" y2="21.5" stroke="url(#goldKey)" strokeWidth="2" strokeLinecap="round" />
              {/* Tooth 2 */}
              <line x1="22" y1="22" x2="20" y2="24" stroke="url(#goldKey)" strokeWidth="2" strokeLinecap="round" />

              {/* Key bow ring (ornate) */}
              <circle cx="9" cy="9" r="7" stroke="url(#goldKey)" strokeWidth="2.2" />
              {/* Inner ring detail */}
              <circle cx="9" cy="9" r="4.5" stroke="url(#goldKey)" strokeWidth="0.8" strokeDasharray="2 1.5" opacity="0.7" />
              {/* Inner hole */}
              <circle cx="9" cy="9" r="2.5" fill="rgba(0,0,0,0.6)" stroke="url(#goldKey)" strokeWidth="0.6" />

              {/* Main gem (diamond) at bow top */}
              <polygon
                points="9,2.5 11,4.5 9,6.5 7,4.5"
                fill="url(#gemBlue)"
                stroke="#BFDBFE"
                strokeWidth="0.4"
                style={{ animation: "gemShine 2.5s ease-in-out infinite" }}
              />
              {/* Gem shine facet */}
              <polygon points="9,2.5 10.2,4 9,3.8" fill="white" opacity="0.7" />

              {/* Small side gem left */}
              <polygon
                points="3,8 4.5,9.2 3,10.4 1.5,9.2"
                fill="url(#gemPink)"
                stroke="#FDE8FF"
                strokeWidth="0.3"
                style={{ animation: "gemShine 3.1s ease-in-out infinite 0.8s" }}
              />
              <polygon points="3,8 3.8,9 3,8.8" fill="white" opacity="0.65" />

              {/* Small side gem right */}
              <polygon
                points="15,8 16.5,9.2 15,10.4 13.5,9.2"
                fill="url(#gemBlue)"
                stroke="#BFDBFE"
                strokeWidth="0.3"
                style={{ animation: "gemShine 2.8s ease-in-out infinite 0.4s" }}
              />
              <polygon points="15,8 15.8,9 15,8.8" fill="white" opacity="0.65" />

              {/* Bottom gem */}
              <polygon
                points="9,15.5 10.3,16.5 9,17.5 7.7,16.5"
                fill="url(#gemPink)"
                stroke="#FDE8FF"
                strokeWidth="0.3"
                style={{ animation: "gemShine 3.5s ease-in-out infinite 1.2s" }}
              />
              <polygon points="9,15.5 9.9,16.3 9,16.1" fill="white" opacity="0.65" />

              {/* Tiny highlight star on shaft */}
              <circle cx="18" cy="18" r="0.9" fill="#FEF3C7" opacity="0.9" />
              <circle cx="21.5" cy="21.5" r="0.7" fill="#FCD34D" opacity="0.8" />
            </g>
          </svg>
        </div>
      </div>

      {/* Lock flashes at click positions */}
      {locks.map(lock => (
        <div key={lock.id} className="lock-flash" style={{ left: lock.x, top: lock.y }}>
          <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`lockGold${lock.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            {/* Lock body */}
            <rect x="4" y="16" width="22" height="18" rx="3" fill={`url(#lockGold${lock.id})`} opacity="0.95" />
            {/* Lock keyhole */}
            <circle cx="15" cy="24" r="3" fill="rgba(0,0,0,0.5)" />
            <rect x="13.5" y="24" width="3" height="5" rx="1" fill="rgba(0,0,0,0.5)" />
            {/* Shackle — animates up */}
            <g style={{ animation: "shackleOpen 0.85s ease-out forwards", transformOrigin: "4px 16px" }}>
              <path d="M7 16 L7 10 Q7 4 15 4 Q23 4 23 10 L23 16"
                stroke={`url(#lockGold${lock.id})`} strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
            {/* Sparkles */}
            <circle cx="15" cy="16" r="1.2" fill="#FEF3C7"
              style={{ animation: "sparkle1 0.85s ease-out forwards" }} />
            <circle cx="15" cy="16" r="1" fill="#FDE68A"
              style={{ animation: "sparkle2 0.85s ease-out forwards 0.05s" }} />
            <circle cx="15" cy="16" r="0.8" fill="#FCD34D"
              style={{ animation: "sparkle3 0.85s ease-out forwards 0.1s" }} />
          </svg>
        </div>
      ))}
    </>
  );
}
