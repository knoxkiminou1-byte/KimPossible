import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { BlogPost, BlogCategory } from "@/lib/schema";
import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  breadcrumbSchema,
  SITE_FEED,
  SITE_GOODREADS_PROFILE,
  SITE_MEDIUM_PROFILE,
  SITE_URL,
} from "@/lib/seo";
import { blogCategories, publishedBlogPosts } from "@/content/blogContent";

function readingTime(text: string) {
  const words = (text || "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  thumbnail?: string;
  description?: string;
  excerpt?: string;
  categories: string[];
  author: string;
}

function useMediumPosts() {
  return useQuery<MediumPost[]>({
    queryKey: ["medium-feed"],
    queryFn: async () => {
      const local = await fetch("/medium-posts.json", { cache: "no-cache" });
      if (local.ok) {
        const data = await local.json();
        if (Array.isArray(data.items) && data.items.length > 0) {
          return data.items as MediumPost[];
        }
      }

      const rssUrl = encodeURIComponent("https://medium.com/feed/@knoxkiminou1");
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&count=12`
      );
      if (!res.ok) throw new Error("Failed to fetch Medium posts");
      const data = await res.json();
      if (data.status !== "ok") throw new Error("Medium RSS error");
      return (data.items as MediumPost[]).map((item) => ({
        ...item,
        excerpt: stripHtml(item.description || "").slice(0, 180),
      }));
    },
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

function mediumReadingTime(html: string) {
  const text = stripHtml(html);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function MediumPostCard({ post, index }: { post: MediumPost; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const sourceText = post.description || post.excerpt || "";
  const mins = mediumReadingTime(sourceText);
  const excerpt = post.excerpt || `${stripHtml(sourceText).slice(0, 140)}...`;
  const tag = post.categories?.[0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <a href={post.link} target="_blank" rel="noopener noreferrer" className="block group">
        <div className="border border-white/8 bg-white/[0.015] flex flex-col gap-0 hover:border-amber-400/25 hover:bg-white/[0.04] transition-all duration-400 overflow-hidden h-full">

          {post.thumbnail && (
            <div className="relative overflow-hidden h-44 bg-black/40">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 border border-white/10 px-2 py-1 rounded-sm">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white/60"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Medium</span>
              </div>
            </div>
          )}

          <div className="p-7 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between">
              {tag && (
                <span className="text-xs uppercase tracking-[0.2em] text-amber-400/60 font-medium truncate max-w-[70%]">{tag}</span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-white/20 uppercase tracking-[0.15em] ml-auto">
                <Clock className="w-3 h-3" />
                {mins} min
              </span>
            </div>

            <h3 className="font-serif text-xl md:text-2xl font-light text-white/85 leading-snug group-hover:text-amber-100 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-white/35 leading-relaxed line-clamp-2 flex-1">{excerpt}</p>

            <div className="flex items-center justify-between pt-3 border-t border-white/6 mt-auto">
              <span className="flex items-center gap-1.5 text-xs text-white/20 uppercase tracking-[0.15em]">
                <Calendar className="w-3 h-3" />
                {post.pubDate ? format(new Date(post.pubDate), "MMM d, yyyy") : ""}
              </span>
              <motion.span
                className="text-xs uppercase tracking-[0.18em] text-amber-400/50 group-hover:text-amber-400 transition-colors duration-300 flex items-center gap-1.5"
                whileHover={{ x: 3 }}
              >
                Read on Medium <ExternalLink className="w-3 h-3" />
              </motion.span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

function MediumSection() {
  const { data: posts, isLoading, isError } = useMediumPosts();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (isError) return null;

  return (
    <section className="py-20 border-t border-white/6" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-3 font-medium flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-amber-400/60"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                From Medium
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight">
                Essays & Reflections
              </h2>
              <div className="w-8 h-px bg-amber-400/50 mt-4" />
            </div>
            <a
              href="https://medium.com/@knoxkiminou1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-amber-400/30 text-amber-300/70 text-xs uppercase tracking-[0.25em] hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300"
            >
              Follow on Medium <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-white/8 bg-white/[0.015] h-80 animate-pulse" />
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <MediumPostCard key={post.link} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-white/25">No essays found</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ExternalWritingSection() {
  const links = [
    {
      label: "Medium",
      title: "Essays and poems",
      href: SITE_MEDIUM_PROFILE,
      text: "Current public writing by Kiminou Knox, including faith, love, discipline, and identity essays.",
    },
    {
      label: "Goodreads",
      title: "Author blog",
      href: `${SITE_GOODREADS_PROFILE}/blog`,
      text: "Reader-facing posts, book updates, author tags, and Goodreads author activity.",
    },
    {
      label: "Podcast",
      title: "KimYaps",
      href: "https://podcasts.apple.com/si/podcast/kimyaps/id1850364308",
      text: "Audio reflections from Kiminou Knox on faith, identity, pressure, and real life.",
    },
    {
      label: "Amazon",
      title: "Author page",
      href: "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
      text: "Book listings and author profile for Kiminou Knox titles available through Amazon.",
    },
  ];

  return (
    <section className="py-16 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3">Across the Web</p>
          <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight">Where the writing lives</h2>
          <div className="w-8 h-px bg-amber-400/50 mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-white/8 bg-white/[0.015] p-6 hover:border-amber-400/25 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4 mb-5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400/60">{link.label}</span>
                <ExternalLink className="w-4 h-4 text-white/25 group-hover:text-amber-300 transition-colors" />
              </div>
              <h3 className="font-serif text-2xl text-white/85 mb-3">{link.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{link.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPost({ post, categories }: { post: BlogPost; categories: BlogCategory[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const cat = categories.find(c => c.id === post.categoryId);
  const minutes = post.readTime || readingTime(post.excerpt || "");

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-end overflow-hidden border-b border-white/6">
      <motion.div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-black to-black"
        style={{ y: bgY }} />
      <div className="absolute inset-0 bg-[url('/kiminou-knox-social-share.png')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-serif text-[18vw] font-light text-white/[0.025] leading-none select-none whitespace-nowrap">
          JOURNAL
        </span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-16 md:pb-24">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
          {cat && (
            <span className="inline-block text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-5 border border-amber-400/20 px-3 py-1">
              {cat.name}
            </span>
          )}
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6 max-w-4xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mb-8">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-4 text-white/30 text-xs">
              <span className="flex items-center gap-1.5 uppercase tracking-[0.2em]">
                <Calendar className="w-3 h-3" />
                {post.publishedAt && format(new Date(post.publishedAt), "MMMM d, yyyy")}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5 uppercase tracking-[0.2em]">
                <Clock className="w-3 h-3" />
                {minutes} min read
              </span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-3 border border-amber-400/40 text-amber-300 text-xs uppercase tracking-[0.25em] hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-400 cursor-pointer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PostCard({ post, categories, index }: { post: BlogPost; categories: BlogCategory[]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const cat = categories.find(c => c.id === post.categoryId);
  const minutes = post.readTime || readingTime(post.excerpt || "");

  const totalChars = (post.title + (post.excerpt || "")).length;
  const progressWidth = Math.min(100, 25 + (totalChars % 75));

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <Link href={`/blog/${post.slug}`}>
        <div className="group border border-white/8 bg-white/[0.015] flex flex-col gap-0 hover:border-amber-400/25 hover:bg-white/[0.04] transition-all duration-400 cursor-pointer overflow-hidden"
          data-testid={`post-card-${post.slug}`}>

          <div className="h-0.5 bg-white/5">
            <motion.div className="h-full bg-gradient-to-r from-amber-400/50 to-amber-300/20"
              initial={{ width: "0%" }}
              animate={inView ? { width: `${progressWidth}%` } : {}}
              transition={{ duration: 1.5, delay: (index % 3) * 0.1 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} />
          </div>

          <div className="p-7 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between">
              {cat && (
                <span className="text-xs uppercase tracking-[0.2em] text-amber-400/60 font-medium">{cat.name}</span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-white/20 uppercase tracking-[0.15em]">
                <Clock className="w-3 h-3" />
                {minutes} min
              </span>
            </div>

            <h3 className="font-serif text-xl md:text-2xl font-light text-white/85 leading-snug group-hover:text-amber-100 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-sm text-white/35 leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-white/6 mt-auto">
              <span className="flex items-center gap-1.5 text-xs text-white/20 uppercase tracking-[0.15em]">
                <Calendar className="w-3 h-3" />
                {post.publishedAt && format(new Date(post.publishedAt), "MMM d, yyyy")}
              </span>
              <motion.span className="text-xs uppercase tracking-[0.18em] text-amber-400/50 group-hover:text-amber-400 transition-colors duration-300 flex items-center gap-1.5"
                whileHover={{ x: 3 }}>
                Read <ArrowRight className="w-3 h-3" />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("search") || "";
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const posts = publishedBlogPosts;
  const categories = blogCategories;
  const isLoading = false;

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.excerpt && p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCat = selectedCategory === "all" || p.categoryId === selectedCategory;
    return matchSearch && matchCat;
  });

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const featuredPost = posts[0];
  const gridPosts = featuredPost && !searchTerm && selectedCategory === "all" ? filtered.slice(1) : filtered;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Author's Journal — Kiminou Knox",
    "description": "Public writing by Kiminou Knox on faith, discipline, love, healing, Black boy life, and creative voice.",
    "url": "https://www.kiminouknox.com/blog",
    "author": {
      "@type": "Person",
      "name": "Kiminou Knox",
      "@id": "https://www.kiminouknox.com/#person",
      "url": "https://www.kiminouknox.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Kiminou Knox",
      "url": "https://www.kiminouknox.com"
    },
    "sameAs": [SITE_MEDIUM_PROFILE, SITE_GOODREADS_PROFILE, "https://podcasts.apple.com/si/podcast/kimyaps/id1850364308"],
    "blogPost": posts.slice(0, 6).map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `${SITE_URL}/blog/${post.slug}`,
      "datePublished": post.publishedAt?.toISOString(),
      "author": { "@id": `${SITE_URL}/#person` },
    }))
  };

  return (
    <>
      <Helmet>
        <title>Author's Journal — Kiminou Knox | Essays & Writing</title>
        <meta name="description" content="Public writing by Kiminou Knox on faith, discipline, love, healing, Black boy life, and creative voice. Essays and reflections from the Bay Area author." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/blog" />
        <link rel="alternate" type="application/rss+xml" title="Kiminou Knox Journal RSS" href={SITE_FEED} />
        <link rel="alternate" type="application/atom+xml" title="Kiminou Knox Journal Atom" href={`${SITE_URL}/feed.xml`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Author's Journal — Kiminou Knox | Essays & Writing" />
        <meta property="og:description" content="Public writing on faith, discipline, love, healing, Black boy life, and creative voice." />
        <meta property="og:url" content="https://www.kiminouknox.com/blog" />
        <meta property="og:image" content="https://www.kiminouknox.com/kiminou-knox-social-share.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Author's Journal — Kiminou Knox" />
        <meta name="twitter:description" content="Essays on faith, identity, love, and Black boy life." />
        <meta name="twitter:image" content="https://www.kiminouknox.com/kiminou-knox-social-share.png" />
        <meta name="twitter:creator" content="@KnoxKiminou" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Blog", url: `${SITE_URL}/blog` },
            ]),
          )}
        </script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-black text-white">

        {/* ─── HERO ─── */}
        <section className="relative pt-40 pb-20 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-amber-500/3 rounded-full blur-[140px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Writing</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6">
                Author's<br />
                <span className="italic text-amber-200/90">Journal</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Public writing on faith, discipline, love, healing, Black boy life, creative voice, and youth-centered storytelling. Essays on Medium and this official site.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURED POST ─── */}
        {!isLoading && featuredPost && !searchTerm && selectedCategory === "all" && (
          <FeaturedPost post={featuredPost} categories={categories} />
        )}

        {/* ─── FILTER / SEARCH ─── */}
        <section className="border-y border-white/6 py-5 sticky top-16 md:top-20 z-30 bg-black/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                    selectedCategory === "all"
                      ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                      : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"
                  }`}>
                  All
                </button>
                {categories.map(c => (
                  <button key={c.id} onClick={() => setSelectedCategory(c.id)}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                      selectedCategory === c.id
                        ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                        : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"
                    }`}>
                    {c.name}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input type="text" placeholder="Search articles..."
                  value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-amber-400/40 transition-colors duration-300 w-56"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── SITE POSTS GRID ─── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <motion.div className="w-10 h-10 border-2 border-amber-400/20 border-t-amber-400/60 rounded-full"
                  animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              </div>
            ) : gridPosts.length === 0 && !featuredPost ? null : gridPosts.length === 0 ? null : (
              <>
                {featuredPost && !searchTerm && selectedCategory === "all" && (
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/20 mb-6">More from the Journal</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {gridPosts.map((post, i) => (
                    <PostCard key={post.id} post={post} categories={categories} index={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ─── MEDIUM SECTION ─── */}
        <ExternalWritingSection />
        <MediumSection />

      </main>
      <Footer />
    </>
  );
}
