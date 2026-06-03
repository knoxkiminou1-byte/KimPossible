import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  yOffset?: number;
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const itemVariants = (yOffset: number): Variants => ({
  hidden: { opacity: 0, y: yOffset, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
});

export function StaggerReveal({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  yOffset = 28,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 28,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}) {
  return (
    <motion.div className={className} variants={itemVariants(yOffset)}>
      {children}
    </motion.div>
  );
}
