import { useRef } from "react";

export default function MagneticButton({ children, className = "", ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); 
    if (!r) return;
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    ref.current!.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  };
  
  const onLeave = () => { 
    if (ref.current) ref.current.style.transform = `translate(0,0)`; 
  };
  
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`rounded-full px-6 py-3 transition-transform will-change-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}