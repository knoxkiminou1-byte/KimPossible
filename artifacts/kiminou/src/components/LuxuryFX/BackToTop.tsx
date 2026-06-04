import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const spinCount = useRef(0);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    spinCount.current += 1;
    setSpinning(true);
    setTimeout(() => setSpinning(false), 700);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-[9990] hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-amber-400/30 bg-black/70 backdrop-blur-md hover:border-amber-400/70 hover:bg-black/90 transition-colors duration-300 group"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ boxShadow: "0 0 20px rgba(251,191,36,0.08)" }}
        >
          <div
            key={spinCount.current}
            style={{
              animation: spinning ? "backKeyTurn 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards" : "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:scale-110 transition-transform duration-200"
            >
              <defs>
                <linearGradient id="btgGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="40%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FCD34D" />
                </linearGradient>
                <filter id="btgGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.2" result="g" />
                  <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <g filter="url(#btgGlow)">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="url(#btgGold)" strokeWidth="2" />
                <circle cx="8.5" cy="8.5" r="2" fill="rgba(0,0,0,0.5)" stroke="url(#btgGold)" strokeWidth="0.7" />
                <line x1="12.5" y1="12.5" x2="20" y2="20" stroke="url(#btgGold)" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="16" y1="16" x2="14.5" y2="17.5" stroke="url(#btgGold)" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="18" y1="18" x2="16.5" y2="19.5" stroke="url(#btgGold)" strokeWidth="1.8" strokeLinecap="round" />
                <polygon points="8.5,4 10,6 8.5,8 7,6" fill="#60A5FA" stroke="#BFDBFE" strokeWidth="0.4" opacity="0.9" />
                <polygon points="8.5,4 9.4,5.5 8.5,5.3" fill="white" opacity="0.7" />
              </g>
            </svg>
          </div>
          <style>{`
            @keyframes backKeyTurn {
              0%   { transform: rotate(0deg) scale(1); }
              30%  { transform: rotate(-140deg) scale(1.3); }
              65%  { transform: rotate(-85deg) scale(1.15); }
              100% { transform: rotate(0deg) scale(1); }
            }
          `}</style>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
