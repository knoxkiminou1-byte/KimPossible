import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blurAmount?: number;
  yOffset?: number;
}

export default function BlurReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  blurAmount = 14,
  yOffset = 20,
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: `blur(${blurAmount}px)`, y: yOffset }}
      animate={
        inView
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: `blur(${blurAmount}px)`, y: yOffset }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        filter: { duration: duration * 1.1, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
