import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 8, suffix: "", label: "Published Books" },
  { value: 235, suffix: " lbs", label: "Athletic Build" },
  { value: 6, suffix: "'7\"", label: "On the Court" },
  { value: 5, suffix: "+", label: "Major Awards" },
  { value: 19, suffix: "", label: "Years of Age" },
  { value: 2025, suffix: "", label: "Class Of" },
];

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setDisplay(current);
      if (current >= value) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [active, value]);

  return (
    <span className="font-serif text-4xl md:text-5xl font-light text-white tabular-nums">
      {display.toLocaleString()}
      <span className="text-amber-300">{suffix}</span>
    </span>
  );
}

export default function StatsBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 border-y border-white/6 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.015)_0px,rgba(255,255,255,0.015)_1px,transparent_1px,transparent_120px)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.4em] text-amber-400/50 text-center mb-14 font-medium"
        >
          By the Numbers
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center text-center gap-2"
            >
              <Counter value={s.value} suffix={s.suffix} active={inView} />
              <span className="text-xs uppercase tracking-[0.2em] text-white/35 font-medium">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
