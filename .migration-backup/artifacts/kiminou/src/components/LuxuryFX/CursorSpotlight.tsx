import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorSpotlight() {
  const [visible, setVisible] = useState(false);
  const rawX = useSpring(0, { stiffness: 120, damping: 22 });
  const rawY = useSpring(0, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.3 } }}
    >
      <motion.div
        className="absolute"
        style={{
          x: rawX,
          y: rawY,
          translateX: "-50%",
          translateY: "-50%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.055) 0%, rgba(253,224,71,0.025) 35%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}
