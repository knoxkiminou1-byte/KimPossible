import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface OutlineTextProps {
  children: string;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
  fillOnHover?: boolean;
  fillOnView?: boolean;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export default function OutlineText({
  children,
  className = "",
  strokeColor = "rgba(251,191,36,0.7)",
  fillColor = "#fbbf24",
  strokeWidth = "1px",
  fillOnHover = true,
  fillOnView = false,
  delay = 0,
  as: Tag = "span",
}: OutlineTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const shouldFill = fillOnView ? inView : false;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative inline-block group ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <Tag
        style={{
          WebkitTextStroke: `${strokeWidth} ${strokeColor}`,
          color: shouldFill ? fillColor : "transparent",
          transition: "color 0.5s ease",
          display: "block",
        }}
        className={fillOnHover ? "group-hover:text-amber-400 transition-colors duration-500" : ""}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
