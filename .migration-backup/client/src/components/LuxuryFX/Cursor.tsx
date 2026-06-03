import { useEffect, useRef } from "react";

export default function LuxuryCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;

    const move = (e: MouseEvent) => { 
      x = e.clientX; 
      y = e.clientY; 
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`; 
    };
    
    const tick = () => {
      rx += (x - rx) * 0.12; 
      ry += (y - ry) * 0.12;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(tick);
    };
    
    requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 h-12 w-12 mix-blend-difference hidden md:block" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white h-1.5 w-1.5 mix-blend-difference hidden md:block" />
    </>
  );
}