import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$@&%";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function ScrambleText({ text, className = "", delay = 0, speed = 38 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = text.length * 4;

      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < Math.floor(frame / 4)) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        frame++;
        if (frame > totalFrames) {
          setDisplay(text);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, text, delay, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
