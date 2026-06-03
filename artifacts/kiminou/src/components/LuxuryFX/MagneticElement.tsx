import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  disabled?: boolean;
}

export default function MagneticElement({
  children,
  className = "",
  strength = 0.35,
  radius = 120,
  disabled = false,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.5 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const factor = (1 - dist / radius) * strength;
        rawX.set(dx * factor);
        rawY.set(dy * factor);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [disabled, radius, strength, rawX, rawY]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
}
