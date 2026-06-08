import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "left" | "right";
}

export default function GoldUnmask({ children, delay = 0, className = "", direction = "right" }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to right, rgba(251,191,36,1) 0%, rgba(253,224,71,0.95) 50%, rgba(245,158,11,1) 100%)",
          transformOrigin: direction === "right" ? "right center" : "left center",
        }}
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.72, delay, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}
