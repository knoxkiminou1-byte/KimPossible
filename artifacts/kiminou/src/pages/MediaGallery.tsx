import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { KIMINOU_MEDIA_IMAGES } from "@/lib/kiminouMedia";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

type Book = { id: string; title: string; cover: string; year: number };

type GalleryItem = {
  src: string;
  title: string;
  alt: string;
  caption: string;
  category: "Author" | "Athlete" | "Speaker" | "Strategy" | "Archive" | "Brand" | "Books";
  width: number;
  height: number;
};

const PHOTO_ITEMS: GalleryItem[] = KIMINOU_MEDIA_IMAGES.map((img) => ({
  ...img,
  category: img.category as GalleryItem["category"],
}));

const CATEGORIES = ["All", "Author", "Athlete", "Speaker", "Strategy", "Archive", "Brand", "Books"] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const isBook = item.category === "Books";
  return (
    <Reveal delay={(index % 6) * 0.05}>
      <div className="group relative border border-white/8 bg-white/[0.015] overflow-hidden hover:border-amber-400/25 transition-colors duration-300">
        <div className={`relative overflow-hidden ${isBook ? "aspect-[3/4]" : "aspect-[3/4]"} bg-black`}>
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-xs text-white/70 leading-snug mb-3 line-clamp-2">{item.caption}</p>
            <a
              href={item.src}
              download
              className="inline-flex items-center justify-center gap-2 py-2 border border-amber-400/40 text-amber-300 text-[10px] uppercase tracking-[0.2em] hover:bg-amber-400 hover:text-black transition-all duration-300"
            >
              <Download className="w-3 h-3" /> Download
            </a>
          </div>
          <span className="absolute top-3 left-3 px-2 py-1 bg-black/70 border border-white/10 text-[9px] uppercase tracking-[0.2em] text-amber-400/70">
            {item.category}
          </span>
        </div>
        <div className="p-3">
          <p className="text-xs text-white/50 truncate">{item.title}</p>
          {!isBook && <p className="text-[10px] text-white/25 mt-0.5">{item.width} × {item.height}</p>}
        </div>
      </div>
    </Reveal>
  );
}

export default function MediaGallery() {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    fetch("/books.json").then((r) => r.json()).then(setBooks).catch(() => setBooks([]));
  }, []);

  const bookItems: GalleryItem[] = books.map((b) => ({
    src: b.cover,
    title: `${b.title} cover`,
    alt: `${b.title} book cover`,
    caption: `Official book cover — ${b.title} (${b.year}).`,
    category: "Books",
    width: 0,
    height: 0,
  }));

  const allItems = [...PHOTO_ITEMS, ...bookItems];
  const filtered = activeCategory === "All" ? allItems : allItems.filter((i) => i.category === activeCategory);
  const photoSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${SITE_URL}/media#image-gallery`,
    name: "Kiminou Knox media gallery",
    description: "Approved photos and media images for Kiminou Knox.",
    about: { "@id": `${SITE_URL}/#person` },
    image: PHOTO_ITEMS.map((image) => ({
      "@type": "ImageObject",
      "@id": `${SITE_URL}${image.src}#image`,
      url: `${SITE_URL}${image.src}`,
      contentUrl: `${SITE_URL}${image.src}`,
      name: image.title,
      description: image.alt,
      caption: image.caption,
      width: image.width,
      height: image.height,
      representativeOfPage: image.src === "/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg",
    })),
  };

  return (
    <>
      <Helmet>
        <title>Media Gallery — Kiminou Knox</title>
        <meta
          name="description"
          content="Approved media assets for Kiminou Knox: headshots, athletic photos, speaker photos, and book covers, available for download in high resolution."
        />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/media`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Media Gallery — Kiminou Knox" />
        <meta property="og:description" content="Approved headshots, athletic photos, speaker photos, and book covers — available for download." />
        <meta property="og:url" content={`${SITE_URL}/media`} />
        <meta property="og:image" content={`${SITE_URL}/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg`} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <meta name="twitter:image" content={`${SITE_URL}/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg`} />
        <script type="application/ld+json">{JSON.stringify(photoSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Press", url: `${SITE_URL}/press` },
            { name: "Media Gallery", url: `${SITE_URL}/media` },
          ]))}
        </script>
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="relative pt-40 pb-16 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/4 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Approved Assets</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6">
                Media <span className="italic text-amber-200/90">Gallery</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Headshots, athletic photos, speaker photos, and book covers — free to use for press coverage, event programs, and editorial mentions. Hover any image to download.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/6 py-5 sticky top-16 md:top-20 z-30 bg-black/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                    activeCategory === cat
                      ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                      : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((item, i) => (
                <GalleryCard key={item.src} item={item} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-serif text-xl text-white/25">Loading assets…</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
