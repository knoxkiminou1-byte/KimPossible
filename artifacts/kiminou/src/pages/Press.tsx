import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const pressItems = [
  {
    date: "May 2025",
    source: "Miles Hall Foundation",
    fact: "Essay recognition announcement — Top Youth Summit Essay Finalist",
    link: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist",
  },
  {
    date: "February 2025",
    source: "Miles Hall Foundation Youth Summit",
    fact: "Top essay finalist for mental health advocacy, addressing community issues through personal narrative",
    link: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist",
  },
  {
    date: "2024 – 2025",
    source: "Amazon / Google Books",
    fact: "Poetry collections active and available on all major book platforms — Amazon Author Page",
    link: "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
  },
  {
    date: "2024",
    source: "NCSA Sports",
    fact: "Verified NCAA athletic recruiting profile — Height 6'7\", Weight 235 lbs, Forward/Center",
    link: "https://www.ncsasports.org",
  },
  {
    date: "2024",
    source: "MaxPreps",
    fact: "High school basketball stats and team performance data published for public record",
    link: "https://www.maxpreps.com",
  },
  {
    date: "2024",
    source: "BookShop.org Community",
    fact: "Poetry collections featured in independent bookstore community — Hopeless Romantic listed",
    link: "https://bookshop.org",
  },
];

const creativeWorkSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Miles Hall Foundation Youth Summit Top Essay",
  publisher: { "@type": "Organization", name: "Miles Hall Foundation" },
  url: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist",
};

function RevealItem({ item, index }: { item: (typeof pressItems)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group border-t border-white/8 py-8 grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-4 md:gap-8 items-start hover:border-amber-400/20 transition-colors duration-400"
      data-testid={`press-item-${index}`}
    >
      <span className="font-serif text-sm text-amber-400/50 group-hover:text-amber-400/80 transition-colors duration-300 italic">
        {item.date}
      </span>
      <div>
        <p className="text-base font-medium text-white/80 mb-2 group-hover:text-white transition-colors duration-300">{item.source}</p>
        <p className="text-sm text-white/40 leading-relaxed">{item.fact}</p>
      </div>
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer external"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400/50 hover:text-amber-400 transition-colors duration-200 shrink-0"
          data-testid={`press-link-${index}`}
        >
          View <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </motion.div>
  );
}

export default function Press() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Helmet>
        <title>Press - Kiminou Knox</title>
        <meta name="description" content="Selected features and announcements that verify public facts about the work of writer and athlete Kiminou Knox." />
        <link rel="canonical" href="https://kiminouknox.com/press" />
        <script type="application/ld+json">{JSON.stringify(creativeWorkSchema)}</script>
      </Helmet>
      <Header />

      <main className="min-h-screen bg-black text-white">
        <section className="relative pt-40 pb-24" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-amber-500/3 rounded-full blur-[120px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Media</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6" data-testid="press-heading">
                Press &<br />
                <span className="italic text-amber-200/90">Recognition</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Selected features and announcements that verify public facts about my work. For media requests use the{" "}
                <Link href="/contact">
                  <span className="text-amber-400/70 hover:text-amber-300 transition-colors cursor-pointer">contact form</span>
                </Link>.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {pressItems.map((item, i) => (
              <RevealItem key={i} item={item} index={i} />
            ))}
            <div className="border-t border-white/6" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
