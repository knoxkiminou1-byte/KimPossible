import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

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
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || reduceMotion) return;
    started.current = true;

    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = text.length * 4;

      interval = setInterval(() => {
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
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [inView, text, delay, speed, reduceMotion]);

  // Screen readers get the real text; the scrambling glyphs are decorative.
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
