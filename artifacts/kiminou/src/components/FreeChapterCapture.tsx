import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Download, Sparkles, Check, Mail } from "lucide-react";

const SAMPLE_CHAPTER = `THE SPIRIT OF SOLOMON
A Sample Chapter — What is Love To A Man Made To Destroy It
By Kiminou Knox

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RISE

They called me wise before I learned
what wisdom cost—
before the gold turned cold
in hands that held too much.

I built kingdoms on foundations
of borrowed time,
thought I could master
what was meant to humble me.

But every crown weighs heavy
on a head that knows
the price of being loved
for what you own.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE WEIGHT OF CHOOSING

Between right and easy,
I chose comfort.
Between truth and peace,
I chose silence.

Now I sit in the ruins
of my careful compromises,
wondering if wisdom
was always meant to hurt this much.

Solomon had his temple;
I have my lessons,
both built from stones
of what we thought we knew.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT REMAINS

When the last applause fades,
when the crowds disperse,
when the mirrors show
only the man beneath the myth—

what remains?

Not the gold or glory,
not the songs they sang,
but the quiet truth
that love was always
the only currency that mattered.

And I spent it all
on things that couldn't love me back.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Get the full collection at:
https://www.kiminouknox.com/books/spirit-solomon

Medium: medium.com/@knoxkiminou1

© 2025 Kiminou Knox. All rights reserved.
`;

function downloadChapter(email: string) {
  const blob = new Blob([SAMPLE_CHAPTER], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kiminou-knox-spirit-of-solomon-sample.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  void email;
}

export default function FreeChapterCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    downloadChapter(email.trim());
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden border-t border-white/6"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/4 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_80px,rgba(255,200,0,0.012)_80px,rgba(255,200,0,0.012)_81px)]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-amber-400/60" />
            <span className="text-xs uppercase tracking-[0.4em] text-amber-400/60 font-medium">Free Download</span>
            <Sparkles className="w-4 h-4 text-amber-400/60" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
            Read a Free Chapter
          </h2>
          <div className="w-10 h-px bg-amber-400/50 mx-auto mb-6" />
          <p className="text-white/45 text-base leading-relaxed mb-10">
            Get three poems from <em className="text-amber-200/70">The Spirit of Solomon</em> — free, delivered instantly. No spam. Ever.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-white/[0.04] border border-white/12 text-white placeholder-white/25 text-sm focus:outline-none focus:border-amber-400/50 transition-colors duration-300"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-400 text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-amber-300 transition-colors duration-300 disabled:opacity-60 flex-shrink-0"
                >
                  {loading ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full border border-amber-400/40 flex items-center justify-center">
                  <Check className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-amber-200/80 text-sm uppercase tracking-[0.2em]">Your chapter is downloading</p>
                <p className="text-white/30 text-xs">Check your downloads folder for the file.</p>
                <button
                  onClick={() => downloadChapter(email)}
                  className="text-xs text-amber-400/50 hover:text-amber-400 transition-colors uppercase tracking-[0.2em] underline underline-offset-4"
                >
                  Download again
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-white/20 text-xs">
            By downloading, you agree to receive occasional updates from Kiminou Knox.
            Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
