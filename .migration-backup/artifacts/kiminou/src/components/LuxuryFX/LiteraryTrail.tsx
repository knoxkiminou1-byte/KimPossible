import { useEffect, useRef } from "react";

const POEM_WORDS = [
  "rise", "gold", "crown", "wisdom", "love", "truth", "silence",
  "faith", "soul", "fire", "grace", "black", "boy", "light",
  "king", "blood", "roots", "voice", "dream", "power", "breath",
  "now", "art", "word", "bone", "vow", "glow", "rune", "ink",
  "free", "deep", "still", "real", "born", "pure", "mind", "brave",
  "loss", "hurt", "heal", "grow", "know", "see", "feel", "be",
];

interface Fragment {
  id: number;
  x: number;
  y: number;
  word: string;
  el: HTMLSpanElement;
  born: number;
}

let fragId = 0;

export default function LiteraryTrail() {
  const posRef = useRef({ x: 0, y: 0 });
  const lastSpawnRef = useRef({ x: 0, y: 0 });
  const fragsRef = useRef<Fragment[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9990;overflow:hidden;";
    document.body.appendChild(container);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const SPAWN_DIST = 90;
    const LIFE = 1800;

    function tick(now: number) {
      const { x, y } = posRef.current;
      const last = lastSpawnRef.current;
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > SPAWN_DIST) {
        lastSpawnRef.current = { x, y };
        const word = POEM_WORDS[Math.floor(Math.random() * POEM_WORDS.length)];
        const id = ++fragId;

        const el = document.createElement("span");
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 20;
        el.textContent = word;
        el.style.cssText = `
          position: absolute;
          left: ${x + offsetX}px;
          top: ${y + offsetY}px;
          transform: translate(-50%, -50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: ${10 + Math.random() * 8}px;
          font-style: italic;
          color: rgba(251,191,36,0.7);
          pointer-events: none;
          white-space: nowrap;
          user-select: none;
          will-change: transform, opacity;
          letter-spacing: 0.08em;
          transition: none;
        `;
        container.appendChild(el);
        fragsRef.current.push({ id, x: x + offsetX, y: y + offsetY, word, el, born: now });
      }

      fragsRef.current = fragsRef.current.filter(f => {
        const age = now - f.born;
        if (age > LIFE) {
          f.el.remove();
          return false;
        }
        const progress = age / LIFE;
        const opacity = Math.max(0, (1 - progress) * 0.7);
        const rise = progress * 35;
        const skew = (Math.random() - 0.5) * 0.5;
        f.el.style.opacity = String(opacity);
        f.el.style.transform = `translate(-50%, calc(-50% - ${rise}px)) skewX(${skew}deg)`;
        return true;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      container.remove();
    };
  }, []);

  return null;
}
