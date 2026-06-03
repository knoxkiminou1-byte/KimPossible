import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { BlogPost, BlogCategory } from "@/lib/schema";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function PostCard({ post, categories, index }: { post: BlogPost; categories: BlogCategory[]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const cat = categories.find(c => c.id === post.categoryId);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div
          className="group border border-white/8 bg-white/[0.02] p-7 flex flex-col gap-4 hover:border-amber-400/25 hover:bg-white/[0.045] transition-all duration-400 cursor-pointer"
          data-testid={`post-card-${post.slug}`}
        >
          <div className="flex items-center justify-between">
            {cat && (
              <span className="text-xs uppercase tracking-[0.2em] text-amber-400/60 font-medium">{cat.name}</span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-white/25">
              <Clock className="w-3 h-3" />
              {post.readTime || 5} min
            </span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-light text-white/85 leading-snug group-hover:text-amber-100 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{post.excerpt}</p>
          )}
          <div className="flex items-center justify-between pt-2 border-t border-white/6">
            <span className="flex items-center gap-1.5 text-xs text-white/25">
              <Calendar className="w-3 h-3" />
              {post.publishedAt && format(new Date(post.publishedAt), "MMM d, yyyy")}
            </span>
            <span className="text-xs uppercase tracking-[0.15em] text-amber-400/50 group-hover:text-amber-400 transition-colors duration-300 flex items-center gap-1">
              Read <ArrowRight className="w-3 h-3" />
            </span>
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative pt-40 pb-20 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-amber-500/3 rounded-full blur-[140px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Writing</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6">
                Author's<br />
                <span className="italic text-amber-200/90">Journal</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Thoughts, insights, and stories from an athlete, author, and entrepreneur navigating the intersection of sports, literature, and community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter / Search */}
        <section className="border-y border-white/6 py-6 sticky top-16 md:top-20 z-30 bg-black/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                    selectedCategory === "all"
                      ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                      : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"
                  }`}
                >
                  All
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                      selectedCategory === c.id
                        ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                        : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-amber-400/40 transition-colors duration-300 w-56"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-16 pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <motion.div
                  className="w-10 h-10 border-2 border-amber-400/20 border-t-amber-400/60 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-32">
                <p className="font-serif text-2xl font-light text-white/30 mb-4">No articles found</p>
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  className="text-xs uppercase tracking-[0.2em] text-amber-400/60 hover:text-amber-400 transition-colors"
                >
                  Clear filters →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((post, i) => (
                  <PostCard key={post.id} post={post} categories={categories} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
