import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.8 + t * 0.4) * Math.cos(y * 0.6 + t * 0.3) * 0.5 +
    Math.sin(x * 1.4 - y * 0.9 + t * 0.7) * 0.3 +
    Math.cos(x * 0.3 + y * 1.2 - t * 0.5) * 0.2
  );
}

export default function GenerativeArtPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, margin: "-100px" });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!inView) {
      cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const t = timeRef.current;

      ctx.fillStyle = "rgba(6,3,2,0.18)";
      ctx.fillRect(0, 0, W, H);

      const COLS = 36;
      const ROWS = 18;
      const cellW = W / COLS;
      const cellH = H / ROWS;

      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          const nx = col / COLS;
          const ny = row / ROWS;
          const n = noise(nx * 5, ny * 4, t);
          const angle = n * Math.PI * 2;

          const x = col * cellW + cellW / 2;
          const y = row * cellH + cellH / 2;
          const len = cellW * 0.55;

          const alpha = (n + 1) * 0.5;
          const gold = Math.max(0, Math.min(1, (n + 1) * 0.5));

          ctx.beginPath();
          ctx.moveTo(x - Math.cos(angle) * len * 0.4, y - Math.sin(angle) * len * 0.4);
          ctx.lineTo(x + Math.cos(angle) * len * 0.6, y + Math.sin(angle) * len * 0.6);

          const r = Math.round(251 * gold + 15 * (1 - gold));
          const g = Math.round(191 * gold + 10 * (1 - gold));
          const b = Math.round(36 * gold + 5 * (1 - gold));
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.45})`;
          ctx.lineWidth = 0.7 + gold * 1.2;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // Flowing light orbs
      for (let i = 0; i < 5; i++) {
        const ox = (Math.sin(t * 0.3 + i * 1.5) * 0.4 + 0.5) * W;
        const oy = (Math.cos(t * 0.25 + i * 2.1) * 0.4 + 0.5) * H;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 80 + i * 20);
        grad.addColorStop(0, `rgba(251,191,36,${0.03 + i * 0.005})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      timeRef.current += 0.008;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [inView]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: 360, background: "rgba(6,3,2,1)" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.p
          className="text-[10px] uppercase tracking-[0.5em] text-amber-400/40 mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Generative — Always Different
        </motion.p>
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-light text-white/20 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          The Art of Becoming
        </motion.h2>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent pointer-events-none" />
    </section>
  );
}
