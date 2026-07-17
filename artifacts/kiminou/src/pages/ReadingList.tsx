import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Kiminou Knox's Reading List",
  "description": "Books curated by Kiminou Knox — author, athlete, and entrepreneur. Essential reads on Black identity, faith, creativity, and mindset.",
  "url": "https://www.kiminouknox.com/reading-list",
  "author": {
    "@type": "Person",
    "name": "Kiminou Knox",
    "url": "https://www.kiminouknox.com"
  }
};

interface Book {
  title: string;
  author: string;
  year?: number;
  why: string;
  link?: string;
  category: string;
}

const lists: { heading: string; subheading: string; books: Book[] }[] = [
  {
    heading: "If You Loved The Spirit of Solomon",
    subheading: "On wisdom, faith, and the cost of greatness",
    books: [
      {
        title: "The Book of Solomon",
        author: "The Bible — Ecclesiastes",
        why: "The original source. Everything I wrote in Spirit of Solomon starts here. Vanity of vanities — and yet, wisdom endures.",
        link: "https://www.biblegateway.com/passage/?search=Ecclesiastes+1&version=NIV",
        category: "Faith & Wisdom",
      },
      {
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        year: 1937,
        why: "Old as time, but the chapter on sexual transmutation changed how I think about discipline and creative energy. Solomon would understand.",
        link: "https://www.amazon.com/Think-Grow-Rich-Napoleon-Hill/dp/1585424331",
        category: "Mindset",
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        year: 1988,
        why: "The Personal Legend concept is the same thing Solomon chased. What's yours? This book will force you to answer.",
        link: "https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005",
        category: "Faith & Wisdom",
      },
    ],
  },
  {
    heading: "For Student-Athletes",
    subheading: "On discipline, pressure, and performing at your peak",
    books: [
      {
        title: "Relentless",
        author: "Tim S. Grover",
        year: 2013,
        why: "Tim Grover trained Kobe and MJ. This book is not comfortable. It will demand more from you than you think you have. Read it anyway.",
        link: "https://www.amazon.com/Relentless-Unstoppable-Tim-S-Grover/dp/1476714207",
        category: "Athletics & Performance",
      },
      {
        title: "The Mamba Mentality",
        author: "Kobe Bryant",
        year: 2018,
        why: "Kobe breaks down every detail of his craft. This is what obsession with your work actually looks like, documented.",
        link: "https://www.amazon.com/Mamba-Mentality-How-Play/dp/0374201234",
        category: "Athletics & Performance",
      },
      {
        title: "Can't Hurt Me",
        author: "David Goggins",
        year: 2018,
        why: "The accountability mirror concept alone is worth the read. No one gets to make excuses after finishing this.",
        link: "https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512287",
        category: "Athletics & Performance",
      },
    ],
  },
  {
    heading: "Black Voices, Black Stories",
    subheading: "Essential reads every young Black man should know",
    books: [
      {
        title: "Between the World and Me",
        author: "Ta-Nehisi Coates",
        year: 2015,
        why: "Written as a letter to his son. One of the most honest meditations on what it means to live in a Black body in America. Changed my writing.",
        link: "https://www.amazon.com/Between-World-Me-Ta-Nehisi-Coates/dp/0812993543",
        category: "Black Identity",
      },
      {
        title: "The Autobiography of Malcolm X",
        author: "Malcolm X & Alex Haley",
        year: 1965,
        why: "Required. There is no Black boy who should not read this. His transformation is the most radical arc in American literature.",
        link: "https://www.amazon.com/Autobiography-Malcolm-Told-Alex-Haley/dp/0345376714",
        category: "Black Identity",
      },
      {
        title: "The Color Purple",
        author: "Alice Walker",
        year: 1982,
        why: "Read it to understand Black women. Understand Black women to understand yourself. This is the empathy book.",
        link: "https://www.amazon.com/Color-Purple-Alice-Walker/dp/0156031825",
        category: "Black Identity",
      },
      {
        title: "Their Eyes Were Watching God",
        author: "Zora Neale Hurston",
        year: 1937,
        why: "The most beautiful prose in American literature. Hurston's love for Black people radiates off every page.",
        link: "https://www.amazon.com/Their-Eyes-Were-Watching-God/dp/0061120065",
        category: "Black Identity",
      },
    ],
  },
  {
    heading: "On Creativity and Craft",
    subheading: "Books that make you a better writer and thinker",
    books: [
      {
        title: "On Writing",
        author: "Stephen King",
        year: 2000,
        why: "Half memoir, half craft manual. King is honest in a way most writing books aren't. The advice about reading constantly will change your output.",
        link: "https://www.amazon.com/Writing-Memoir-Craft-Stephen-King/dp/1982159375",
        category: "Craft",
      },
      {
        title: "Bird by Bird",
        author: "Anne Lamott",
        year: 1994,
        why: "\"Shitty first drafts\" is the most liberating idea in writing. Permission to be bad first so you can be great later.",
        link: "https://www.amazon.com/Bird-Some-Instructions-Writing-Life/dp/0385480016",
        category: "Craft",
      },
      {
        title: "Steal Like an Artist",
        author: "Austin Kleon",
        year: 2012,
        why: "Short, but it reframes everything. Every creative person is a remix of what they consumed. Know your influences.",
        link: "https://www.amazon.com/Steal-Like-Artist-Things-Creative/dp/0761169253",
        category: "Craft",
      },
    ],
  },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function BookEntry({ book, index }: { book: Book; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group border-b border-white/6 py-8 hover:border-amber-400/15 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        <div className="flex-shrink-0 w-24">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400/40 font-medium">{book.category}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-light text-white/90 group-hover:text-amber-100 transition-colors duration-300 leading-tight">
                {book.title}
              </h3>
              <p className="text-sm text-white/35 mt-1 uppercase tracking-[0.15em]">
                {book.author}{book.year ? ` — ${book.year}` : ""}
              </p>
            </div>
            {book.link && (
              <a href={book.link} target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-amber-400/40 hover:text-amber-300 transition-colors duration-300 mt-1">
                Find it <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <p className="text-sm text-white/50 leading-relaxed italic">
            "{book.why}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReadingList() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Helmet>
        <title>Reading List — Kiminou Knox | Books Worth Your Time</title>
        <meta name="description" content="Books curated by Kiminou Knox — author and athlete. Essential reads on Black identity, faith, athletics, creativity, and wisdom that shaped his writing." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/reading-list" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiminou Knox's Reading List — Books Worth Your Time" />
        <meta property="og:description" content="Curated books on Black identity, faith, athletics, and craft from Kiminou Knox — author of 10 published works and NCAA athlete." />
        <meta property="og:url" content="https://www.kiminouknox.com/reading-list" />
        <meta property="og:image" content="https://www.kiminouknox.com/kiminou-knox-social-share.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox's Reading List" />
        <meta name="twitter:description" content="Books on Black identity, faith, athletics, and craft." />
        <meta name="twitter:image" content="https://www.kiminouknox.com/kiminou-knox-social-share.png" />

        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Reading List", url: `${SITE_URL}/reading-list` },
            ]),
          )}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-black text-white">

        {/* ─── HERO ─── */}
        <section className="relative pt-40 pb-20 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-amber-500/3 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Curated by Kiminou</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6">
                Reading<br />
                <span className="italic text-amber-200/90">List</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Books that shaped how I think, write, and compete. Not a syllabus — a survival kit. Each one earned its place.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── LISTS ─── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
          {lists.map((section, si) => (
            <section key={si} className="mb-24">
              <Reveal delay={0}>
                <div className="mb-10">
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-2">{section.heading}</h2>
                  <p className="text-sm text-white/35 uppercase tracking-[0.2em]">{section.subheading}</p>
                  <div className="w-10 h-px bg-amber-400/40 mt-5" />
                </div>
              </Reveal>

              <div>
                {section.books.map((book, bi) => (
                  <BookEntry key={bi} book={book} index={bi} />
                ))}
              </div>
            </section>
          ))}

          {/* ─── CTA ─── */}
          <Reveal>
            <div className="border border-amber-400/15 bg-amber-400/[0.02] p-10 md:p-14 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4">Your Turn</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-4">
                Now read mine.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto mb-8">
                Everything on this list influenced the Black Boy Lie universe. See where it went.
              </p>
              <Link href="/books">
                <motion.span
                  className="inline-flex items-center gap-2 px-10 py-3.5 border border-amber-400/40 text-amber-300 text-xs uppercase tracking-[0.25em] hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-400 cursor-pointer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Browse My Books
                </motion.span>
              </Link>
            </div>
          </Reveal>
        </div>

      </main>

      <Footer />
    </>
  );
}
