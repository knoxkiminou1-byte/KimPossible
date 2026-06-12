import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const QUOTES = [
  {
    text: "I built kingdoms on foundations of borrowed time.",
    source: "The Spirit of Solomon",
  },
  {
    text: "Between right and easy, I chose comfort. Between truth and peace, I chose silence.",
    source: "The Spirit of Solomon",
  },
  {
    text: "Love was always the only currency that mattered. And I spent it all on things that couldn't love me back.",
    source: "The Spirit of Solomon",
  },
  {
    text: "I wake up Black every morning, check the mirror to make sure it's still me looking back.",
    source: "Poems from a Black Boy",
  },
  {
    text: "Maybe faith was never meant to be comfortable, never meant to fit in the boxes we build for things we think we understand.",
    source: "Our Father?",
  },
  {
    text: "Seeking is its own form of finding.",
    source: "Our Father?",
  },
];

const TYPING_SPEED = 38;
const DELETING_SPEED = 18;
const PAUSE_AFTER_TYPE = 2400;
const PAUSE_AFTER_DELETE = 500;

export default function QuoteTypewriter() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("waiting");
  const [cursorVisible, setCursorVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const started = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuote = QUOTES[quoteIdx];

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const tick = useCallback(() => {
    setPhase((prev) => {
      if (prev === "waiting") return "typing";
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    timerRef.current = setTimeout(() => setPhase("typing"), 600);
    return clearTimer;
  }, [inView]);

  useEffect(() => {
    clearTimer();

    if (phase === "typing") {
      const full = currentQuote.text;
      if (displayed.length < full.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(full.slice(0, displayed.length + 1));
        }, TYPING_SPEED);
      } else {
        timerRef.current = setTimeout(() => setPhase("pausing"), PAUSE_AFTER_TYPE);
      }
    } else if (phase === "pausing") {
      timerRef.current = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
        }, DELETING_SPEED);
      } else {
        timerRef.current = setTimeout(() => {
          setQuoteIdx((i) => (i + 1) % QUOTES.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE);
      }
    }

    return clearTimer;
  }, [phase, displayed, currentQuote]);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden bg-black"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/4 rounded-full blur-[120px]" />
      </div>

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.p
          className="text-[10px] uppercase tracking-[0.45em] text-amber-400/50 mb-12 font-medium"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Words from the work
        </motion.p>

        {/* Quote dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                clearTimer();
                setDisplayed("");
                setQuoteIdx(i);
                setPhase("typing");
              }}
              className={`transition-all duration-400 rounded-full ${
                i === quoteIdx
                  ? "w-6 h-1.5 bg-amber-400"
                  : "w-1.5 h-1.5 bg-white/15 hover:bg-white/35"
              }`}
            />
          ))}
        </div>

        {/* The quote */}
        <div className="relative min-h-[120px] md:min-h-[100px] flex items-center justify-center">
          <blockquote
            className="font-serif text-2xl md:text-4xl font-light text-white/90 leading-relaxed tracking-wide"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            <span className="text-amber-300/60 text-4xl md:text-6xl leading-none font-serif select-none mr-2">
              "
            </span>
            {displayed}
            <span
              className="inline-block w-0.5 h-7 md:h-9 bg-amber-400 ml-1 align-middle"
              style={{
                opacity: cursorVisible ? 1 : 0,
                boxShadow: "0 0 8px rgba(251,191,36,0.8)",
                transition: "opacity 0.1s",
              }}
            />
            <span className="text-amber-300/60 text-4xl md:text-6xl leading-none font-serif select-none ml-1">
              "
            </span>
          </blockquote>
        </div>

        {/* Source */}
        <AnimatePresence mode="wait">
          <motion.p
            key={quoteIdx}
            className="mt-8 text-xs uppercase tracking-[0.3em] text-amber-400/45 font-medium"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            — {currentQuote.source}
          </motion.p>
        </AnimatePresence>

        {/* Decorative rule */}
        <motion.div
          className="mt-14 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/30" />
          <div className="w-1 h-1 rounded-full bg-amber-400/40" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/30" />
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
    </section>
  );
}
