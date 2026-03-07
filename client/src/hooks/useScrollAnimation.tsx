import { useEffect, useRef } from "react";

type RevealDirection = "up" | "down" | "left" | "right";

interface UseScrollAnimationOptions {
  delay?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  direction?: RevealDirection;
  scaleFrom?: number;
}

const axisByDirection: Record<RevealDirection, [number, number]> = {
  up: [0, 1],
  down: [0, -1],
  left: [1, 0],
  right: [-1, 0],
};

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    delay = 0,
    distance = 36,
    threshold = 0.15,
    once = true,
    direction = "up",
    scaleFrom = 0.985,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const [xAxis, yAxis] = axisByDirection[direction];
    element.style.setProperty("--reveal-delay", `${delay}ms`);
    element.style.setProperty("--reveal-x", `${xAxis * distance}px`);
    element.style.setProperty("--reveal-y", `${yAxis * distance}px`);
    element.style.setProperty("--reveal-scale", `${scaleFrom}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, direction, distance, once, scaleFrom, threshold]);

  return ref;
}
