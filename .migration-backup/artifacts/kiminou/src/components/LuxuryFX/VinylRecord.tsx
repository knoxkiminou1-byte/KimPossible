import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Square, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Poems from "Poems from a Black Boy" ────────────────── */
const POEMS = [
  {
    title: "Morning Mirrors",
    lines: [
      "I wake up Black",
      "every morning,",
      "check the mirror",
      "to make sure",
      "it's still me",
      "looking back.",
      "",
      "Some days I see my father's strength,",
      "my mother's grace,",
      "my grandmother's wisdom",
      "woven into the curve",
      "of my smile,",
      "the fire in my eyes.",
      "",
      "Other days I see the weight",
      "of expectations,",
      "the burden of representation,",
      "the beautiful responsibility",
      "of carrying ancestors' dreams",
      "in every step I take.",
      "",
      "But every morning,",
      "I choose to see",
      "not just survival,",
      "but the art",
      "of becoming",
      "who I was meant to be.",
    ],
  },
  {
    title: "Heritage",
    lines: [
      "They tried to erase us",
      "from textbooks,",
      "redline us out of neighborhoods,",
      "code-switch us",
      "into silence.",
      "",
      "But we are the children",
      "of people who turned",
      "scraps into feasts,",
      "songs into resistance,",
      "pain into power.",
      "",
      "We carry kingdoms",
      "in our DNA,",
      "carry rhythms",
      "older than oppression,",
      "carry light",
      "that no darkness",
      "can diminish.",
      "",
      "I am not broken.",
      "I am not angry.",
      "I am not less than.",
      "",
      "I am heir",
      "to a legacy",
      "of overcomers,",
      "and their strength",
      "runs through my veins",
      "like liquid gold.",
    ],
  },
  {
    title: "Future Tense",
    lines: [
      "To the Black boys",
      "who come after me:",
      "",
      "You are not a statistic.",
      "You are not a threat.",
      "You are not less than",
      "what they see",
      "when they look at you",
      "with fear in their eyes.",
      "",
      "You are possibility.",
      "You are brilliance.",
      "You are the answer",
      "to prayers your ancestors",
      "whispered in the dark.",
      "",
      "Wear your skin",
      "like the crown it is.",
      "Speak your truth",
      "like the prophecy it is.",
      "Love yourself",
      "like the revolution it is.",
      "",
      "The world is waiting",
      "for what only you",
      "can give it.",
      "",
      "Don't keep us waiting",
      "too long.",
    ],
  },
];

const GROOVES = "repeating-radial-gradient(circle, rgba(255,255,255,0.025) 0px, rgba(0,0,0,0.85) 1.5px, rgba(0,0,0,0.85) 3.5px, rgba(255,255,255,0.025) 4px)";

/* ─── Web Speech API hook ──────────────────────────────────── */
function usePoemSpeech() {
  const [playing, setPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);
  const linesRef = useRef<string[]>([]);
  const lineIdxRef = useRef(0);
  const cancelledRef = useRef(false);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    window.speechSynthesis?.cancel();
    setPlaying(false);
    setCurrentLine(-1);
    lineIdxRef.current = 0;
  }, []);

  const speakLines = useCallback((lines: string[], startLine = 0) => {
    if (!window.speechSynthesis) return;
    cancelledRef.current = false;
    lineIdxRef.current = startLine;

    const readNext = () => {
      if (cancelledRef.current) return;
      const idx = lineIdxRef.current;
      if (idx >= lines.length) {
        setPlaying(false);
        setCurrentLine(-1);
        lineIdxRef.current = 0;
        return;
      }
      const line = lines[idx];
      if (!line.trim()) {
        lineIdxRef.current = idx + 1;
        setCurrentLine(idx);
        setTimeout(readNext, 300);
        return;
      }
      setCurrentLine(idx);
      const utt = new SpeechSynthesisUtterance(line);
      utt.rate = 0.78;
      utt.pitch = 0.9;
      utt.volume = 1;
      /* Try to find a warm voice */
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v =>
        /Daniel|Karen|Samantha|Alex|Google US|en-US/i.test(v.name) && v.lang.startsWith("en")
      ) || voices.find(v => v.lang.startsWith("en"));
      if (preferred) utt.voice = preferred;
      utt.onend = () => {
        if (cancelledRef.current) return;
        lineIdxRef.current = idx + 1;
        setTimeout(readNext, 180);
      };
      utt.onerror = () => {
        if (!cancelledRef.current) readNext();
      };
      uttRef.current = utt;
      window.speechSynthesis.speak(utt);
    };
    readNext();
  }, []);

  const play = useCallback((lines: string[]) => {
    if (!window.speechSynthesis) return;
    linesRef.current = lines;
    window.speechSynthesis.cancel();
    setPlaying(true);
    setCurrentLine(0);
    /* Wait a tick for voices to load */
    setTimeout(() => speakLines(lines, 0), 80);
  }, [speakLines]);

  const pause = useCallback(() => {
    if (window.speechSynthesis?.speaking) {
      window.speechSynthesis.pause();
      setPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis?.paused) {
      window.speechSynthesis.resume();
      setPlaying(true);
    }
  }, []);

  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  return { playing, currentLine, play, pause, resume, stop };
}

/* ─── Tone arm SVG ─────────────────────────────────────────── */
function ToneArm({ playing }: { playing: boolean }) {
  return (
    <motion.svg
      width="130" height="130" viewBox="0 0 130 130"
      className="absolute pointer-events-none"
      style={{ top: -18, right: -22, zIndex: 20, transformOrigin: "110px 20px" }}
      animate={{ rotate: playing ? 0 : -28 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Pivot circle */}
      <circle cx="110" cy="20" r="7" fill="rgba(180,140,60,0.7)" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
      <circle cx="110" cy="20" r="3" fill="rgba(245,158,11,0.9)" />
      {/* Arm tube */}
      <path d="M110 20 L64 74" stroke="rgba(210,170,80,0.6)" strokeWidth="5" strokeLinecap="round" />
      <path d="M110 20 L64 74" stroke="rgba(245,158,11,0.15)" strokeWidth="2" strokeLinecap="round" />
      {/* Head shell */}
      <rect x="56" y="68" width="14" height="18" rx="3"
        fill="rgba(180,140,60,0.8)" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
      {/* Stylus */}
      <line x1="63" y1="86" x2="63" y2="94" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="63" cy="94" r="1.5" fill="rgba(245,158,11,0.9)" />
    </motion.svg>
  );
}

/* ─── Main Component ───────────────────────────────────────── */
export default function VinylRecord() {
  const [poemIdx, setPoemIdx] = useState(0);
  const { playing, currentLine, play, pause, resume, stop } = usePoemSpeech();
  const poem = POEMS[poemIdx];
  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    stop();
    setPoemIdx(i => (i - 1 + POEMS.length) % POEMS.length);
  };
  const handleNext = () => {
    stop();
    setPoemIdx(i => (i + 1) % POEMS.length);
  };
  const handlePlay = () => {
    if (playing) pause();
    else if (window.speechSynthesis?.paused) resume();
    else play(poem.lines);
  };
  const handleStop = () => stop();

  /* Auto-scroll active line into view */
  useEffect(() => {
    if (currentLine < 0 || !scrollRef.current) return;
    const el = scrollRef.current.querySelector(`[data-line="${currentLine}"]`) as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentLine]);

  /* Stop when poem changes */
  useEffect(() => { stop(); }, [poemIdx]);

  const progress = currentLine >= 0 ? currentLine / Math.max(poem.lines.length - 1, 1) : 0;

  return (
    <section className="relative bg-black py-24 border-t border-white/6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 30% 50%, rgba(245,158,11,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/50 mb-2">Hear the Poems</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
              Poems from a Black Boy
            </h2>
            <div className="w-10 h-px bg-amber-400/40 mt-4" />
            <p className="text-sm text-white/30 mt-3 max-w-sm leading-relaxed">
              Press play to hear the poem read aloud. Each line highlights as it's spoken.
            </p>
          </div>
          {/* Poem selector */}
          <div className="hidden md:flex items-center gap-2">
            {POEMS.map((p, i) => (
              <button key={p.title} onClick={() => { stop(); setPoemIdx(i); }}
                className="px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] transition-all duration-300"
                style={{
                  border: `1px solid ${i === poemIdx ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.08)"}`,
                  background: i === poemIdx ? "rgba(245,158,11,0.07)" : "transparent",
                  color: i === poemIdx ? "rgba(245,158,11,0.8)" : "rgba(255,255,255,0.25)",
                }}>
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main record player layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — Record player */}
          <div className="flex flex-col items-center gap-8">
            {/* Turntable platter */}
            <div className="relative" style={{ width: 280, height: 280 }}>
              {/* Platter base */}
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #252a36, #0d0f18)",
                  boxShadow: "0 0 0 2px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
                }} />
              {/* Spinning record */}
              <motion.div
                className="absolute rounded-full overflow-hidden"
                style={{ inset: 10, background: GROOVES }}
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 2.2, ease: "linear", repeat: playing ? Infinity : 0 }}
              >
                {/* Center label — book cover */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden"
                  style={{ width: "58%", height: "58%", border: "2px solid rgba(0,0,0,0.6)" }}>
                  <img src="/covers/kiminou-knox-poems-from-black-boy.jpg"
                    alt="Poems from a Black Boy"
                    className="w-full h-full object-cover" />
                  {/* Center hole */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black" />
                </div>
                {/* Shimmer ring */}
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.02) 15%, transparent 30%)" }} />
              </motion.div>
              {/* Tone arm */}
              <ToneArm playing={playing} />
              {/* Progress ring */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="140" cy="140" r="134" fill="none" stroke="rgba(245,158,11,0.06)" strokeWidth="2" />
                <circle cx="140" cy="140" r="134" fill="none"
                  stroke="rgba(245,158,11,0.5)"
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 134}`}
                  strokeDashoffset={`${2 * Math.PI * 134 * (1 - progress)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.3s" }} />
              </svg>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              {/* Poem nav + play/stop row */}
              <div className="flex items-center gap-3">
                <motion.button onClick={handlePrev}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-amber-400/30 hover:text-amber-300 transition-all"
                  whileTap={{ scale: 0.9 }}>
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>

                <motion.button onClick={handlePlay}
                  className="w-16 h-16 rounded-full flex items-center justify-center relative"
                  style={{
                    background: playing ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.12)",
                    border: `2px solid ${playing ? "rgba(245,158,11,0.7)" : "rgba(245,158,11,0.3)"}`,
                    boxShadow: playing ? "0 0 30px rgba(245,158,11,0.2)" : "none",
                  }}
                  whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
                  {playing
                    ? <Pause className="w-6 h-6 text-amber-300" />
                    : <Play className="w-6 h-6 text-amber-300 ml-0.5" />}
                  {playing && (
                    <motion.div className="absolute inset-0 rounded-full border-2 border-amber-400/30"
                      animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity }} />
                  )}
                </motion.button>

                <motion.button onClick={handleNext}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-amber-400/30 hover:text-amber-300 transition-all"
                  whileTap={{ scale: 0.9 }}>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>

                <motion.button onClick={handleStop}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-red-400/30 hover:text-red-400 transition-all"
                  whileTap={{ scale: 0.9 }}>
                  <Square className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              {/* Now playing */}
              <div className="text-center">
                <p className="font-serif text-xl text-white/80 mb-0.5">{poem.title}</p>
                <p className="text-[9px] uppercase tracking-[0.35em] text-amber-400/50">
                  Poems from a Black Boy · {poemIdx + 1} of {POEMS.length}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-px bg-white/8 relative">
                <motion.div className="absolute left-0 top-0 h-full bg-amber-400/60"
                  style={{ width: `${progress * 100}%`, transition: "width 0.3s" }} />
              </div>

              {/* Mobile poem tabs */}
              <div className="flex md:hidden gap-2 flex-wrap justify-center">
                {POEMS.map((p, i) => (
                  <button key={p.title} onClick={() => { stop(); setPoemIdx(i); }}
                    className="px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] transition-all"
                    style={{
                      border: `1px solid ${i === poemIdx ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.08)"}`,
                      color: i === poemIdx ? "rgba(245,158,11,0.8)" : "rgba(255,255,255,0.25)",
                    }}>
                    {p.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Poem text with live highlighting */}
          <div className="relative">
            {/* Paper texture */}
            <div className="relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(20,22,30,0.95), rgba(10,12,18,0.98))",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)",
              }}>
              {/* Book spine accent */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ background: "linear-gradient(to bottom, rgba(245,158,11,0.4), rgba(245,158,11,0.1), rgba(245,158,11,0.4))" }} />

              {/* Header */}
              <div className="px-8 pt-7 pb-5 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.5em] text-amber-400/40 mb-1">Reading Now</p>
                    <h3 className="font-serif text-xl font-light text-white">{poem.title}</h3>
                  </div>
                  {playing && (
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-0.5 rounded-full bg-amber-400/70"
                          animate={{ height: [4, 12 + i * 4, 4] }}
                          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Poem lines */}
              <div ref={scrollRef} className="px-8 py-6 overflow-y-auto"
                style={{ maxHeight: 400, scrollbarWidth: "none" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={poemIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}>
                    {poem.lines.map((line, i) => (
                      <div key={i} data-line={i}
                        className="transition-all duration-200 leading-relaxed"
                        style={{
                          minHeight: line === "" ? "1.2em" : undefined,
                          padding: "1px 0",
                        }}>
                        {line === "" ? null : (
                          <motion.span
                            className="font-serif text-base block px-2 py-0.5 rounded-sm -mx-2 transition-all duration-150"
                            animate={currentLine === i
                              ? { backgroundColor: "rgba(245,158,11,0.1)", color: "rgba(255,246,220,1)", x: 4 }
                              : currentLine > i
                                ? { backgroundColor: "transparent", color: "rgba(255,255,255,0.32)", x: 0 }
                                : { backgroundColor: "transparent", color: "rgba(255,255,255,0.55)", x: 0 }
                            }
                            transition={{ duration: 0.15 }}
                          >
                            {currentLine === i && (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 mb-0.5 align-middle"
                                style={{ boxShadow: "0 0 6px rgba(245,158,11,0.8)" }} />
                            )}
                            {line}
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between">
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/20">
                  Kiminou Knox · 2024
                </p>
                <a href="https://www.amazon.com/Poems-Black-Boy-Kiminou-Knox/dp/B0FK8WPQR2"
                  target="_blank" rel="noopener noreferrer"
                  className="text-[8px] uppercase tracking-[0.25em] text-amber-400/50 hover:text-amber-300 transition-colors">
                  Get the Book →
                </a>
              </div>
            </div>

            {/* Browser TTS note */}
            {!window.speechSynthesis && (
              <p className="mt-3 text-[9px] text-white/20 text-center">
                Text-to-speech is not supported in this browser.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
