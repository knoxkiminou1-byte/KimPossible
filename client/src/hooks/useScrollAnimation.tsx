import { useEffect, useRef } from "react";

interface UseScrollAnimationOptions {
  delay?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { delay = 0, distance = 36, threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--reveal-delay", `${delay}ms`);
    element.style.setProperty("--reveal-distance", `${distance}px`);

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
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, distance, once, threshold]);

  return ref;
}
