import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { BlogPost, BlogCategory } from "@/lib/schema";
import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function readingTime(text: string) {
  const words = (text || "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function FeaturedPost({ post, categories }: { post: BlogPost; categories: BlogCategory[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const cat = categories.find(c => c.id === post.categoryId);
  const minutes = post.readTime || readingTime(post.excerpt || "");

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-end overflow-hidden border-b border-white/6">
      {/* Parallax dark background with grain */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-black to-black"
        style={{ y: bgY }} />
      <div className="absolute inset-0 bg-[url('/og-image.png')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

      {/* Giant background text */}
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

          {/* Reading progress visual */}
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({ queryKey: ["/api/blog/posts?published=true"] });
  const { data: categories = [] } = useQuery<BlogCategory[]>({ queryKey: ["/api/blog/categories"] });

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

  return (
    <>
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

        {/* ─── POSTS GRID ─── */}
        <section className="py-16 pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <motion.div className="w-10 h-10 border-2 border-amber-400/20 border-t-amber-400/60 rounded-full"
                  animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              </div>
            ) : gridPosts.length === 0 && !featuredPost ? (
              <div className="text-center py-32">
                <p className="font-serif text-2xl font-light text-white/30 mb-6">No articles found</p>
                <button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  className="text-xs uppercase tracking-[0.2em] text-amber-400/60 hover:text-amber-400 transition-colors">
                  Clear filters →
                </button>
              </div>
            ) : gridPosts.length === 0 ? null : (
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

            {/* Medium link */}
            <motion.div className="mt-16 border-t border-white/6 pt-10 text-center"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p className="text-xs uppercase tracking-[0.3em] text-white/20 mb-4">Also Available On</p>
              <a href="https://medium.com/@kiminouknox" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-amber-300 transition-colors duration-300 uppercase tracking-[0.25em] text-xs">
                Read essays on Medium →
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
