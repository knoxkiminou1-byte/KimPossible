import { useScroll, useTransform, motion } from "framer-motion";

const RADIUS = 22;
const STROKE = 3;
const SIZE = (RADIUS + STROKE) * 2 + 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollProgressArc() {
  const { scrollYProgress } = useScroll();

  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [CIRCUMFERENCE, 0]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{ opacity }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="rgba(251,191,36,0.12)"
          strokeWidth={STROKE}
        />
        {/* Progress arc */}
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#arcGold)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset }}
        />
        <defs>
          <linearGradient id="arcGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center percent dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-1.5 h-1.5 rounded-full bg-amber-400"
          style={{ boxShadow: "0 0 6px rgba(251,191,36,0.8)" }}
        />
      </div>
    </motion.div>
  );
}
