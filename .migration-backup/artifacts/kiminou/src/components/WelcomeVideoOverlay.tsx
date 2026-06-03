import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeVideoOverlay() {
  const [showVideo, setShowVideo] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const played = sessionStorage.getItem("welcomeVideoPlayed");
    if (played) {
      setHasPlayed(true);
    }
  }, []);

  useEffect(() => {
    if (hasPlayed) return;

    const handleClick = (e: MouseEvent) => {
      if (!hasPlayed) {
        e.preventDefault();
        e.stopPropagation();
        setShowVideo(true);
        setHasPlayed(true);
        sessionStorage.setItem("welcomeVideoPlayed", "true");
      }
    };

    document.addEventListener("click", handleClick, { once: true, capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [hasPlayed]);

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <video
            ref={videoRef}
            src="/welcome-video.mp4"
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-contain"
          />
          <motion.button
            onClick={handleSkip}
            className="absolute top-6 right-6 px-6 py-3 bg-white/10 backdrop-blur-md text-white text-sm font-medium uppercase tracking-[0.15em] rounded-full border border-white/20 hover:bg-white/20 transition-all"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
