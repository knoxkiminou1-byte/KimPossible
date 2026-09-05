import { Helmet } from "react-helmet-async";
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import {
  blogCategories,
  findPublishedBlogPost,
  relatedPublishedBlogPosts,
} from "@/content/blogContent";

function ShareButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-amber-400/40 hover:text-amber-300 transition-colors duration-300"
    >
      {children}
    </button>
  );
}

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = findPublishedBlogPost(slug);
  const categories = blogCategories;

  if (!post) {
    return (
      <>
        <Header />
        <div id="main-content" className="min-h-screen bg-black flex items-center justify-center px-6">
          <Helmet>
            <title>Keep Reading — Kiminou Knox</title>
            <meta name="robots" content="noindex,nofollow" />
          </Helmet>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-400/40 mb-6">404</p>
            <h1 className="font-serif text-5xl font-light text-white mb-6">This one has moved on</h1>
            <p className="text-white/40 mb-8">The rest of the writing is still waiting for you.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 text-amber-400/60 hover:text-amber-300 transition-colors text-xs uppercase tracking-[0.3em]">
              <ArrowLeft className="w-3 h-3" /> Explore the blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const category = categories.find(c => c.id === post.categoryId);
  const otherRelatedPosts = relatedPublishedBlogPosts(post);
  const publishedAtIso = post.publishedAt?.toISOString();
  const updatedAtIso = post.updatedAt?.toISOString() || publishedAtIso;

  const shareUrl = typeof window !== "undefined" ? window.location.href : `${SITE_URL}/blog/${post.slug}`;
  const shareText = `${post.title} by Kiminou Knox`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        navigator.clipboard.writeText(shareUrl);
        return;
    }
    window.open(url, "_blank", "width=600,height=400");
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.title,
    "url": `https://www.kiminouknox.com/blog/${post.slug}`,
    "datePublished": publishedAtIso,
    "dateModified": updatedAtIso,
    "image": "https://www.kiminouknox.com/kiminou-knox-social-share.png",
    "inLanguage": "en-US",
    "keywords": post.tags || [],
    "author": {
      "@type": "Person",
      "name": "Kiminou Knox",
      "@id": "https://www.kiminouknox.com/#person",
      "url": "https://www.kiminouknox.com",
      "image": "https://www.kiminouknox.com/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg"
    },
    "publisher": {
      "@type": "Person",
      "name": "Kiminou Knox",
      "url": "https://www.kiminouknox.com",
      "logo": { "@type": "ImageObject", "url": "https://www.kiminouknox.com/favicon-512x512.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.kiminouknox.com/blog/${post.slug}` }
  };
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  return (
    <>
      <Helmet>
        <title>{post.title} — Kiminou Knox</title>
        <meta name="description" content={post.excerpt || `${post.title} — An essay by Kiminou Knox.`} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={`https://www.kiminouknox.com/blog/${post.slug}`} />
        <link rel="alternate" type="application/rss+xml" title="Kiminou Knox Journal RSS" href="https://www.kiminouknox.com/rss.xml" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} — Kiminou Knox`} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={`https://www.kiminouknox.com/blog/${post.slug}`} />
        <meta property="og:image" content="https://www.kiminouknox.com/kiminou-knox-social-share.png" />
        <meta property="og:image:alt" content={`${post.title} by Kiminou Knox`} />
        <meta property="article:author" content="Kiminou Knox" />
        {publishedAtIso && <meta property="article:published_time" content={publishedAtIso} />}
        {updatedAtIso && <meta property="article:modified_time" content={updatedAtIso} />}
        {post.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — Kiminou Knox`} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content="https://www.kiminouknox.com/kiminou-knox-social-share.png" />
        <meta name="twitter:creator" content="@KnoxKiminou" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">
        <div className="pt-28 pb-0">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/30 hover:text-amber-400/60 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              All Articles
            </Link>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              {category && (
                <span className="text-xs uppercase tracking-[0.3em] text-amber-400/60 border border-amber-400/20 px-3 py-1">
                  {category.name}
                </span>
              )}
              <div className="flex items-center text-xs text-white/30 gap-4 uppercase tracking-[0.15em]">
                {post.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {format(post.publishedAt, "MMMM d, yyyy")}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {post.readTime || 5} min read
                </span>
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-light leading-tight text-white mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="font-serif text-xl text-white/50 italic leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 border border-white/10 text-xs text-white/35 uppercase tracking-[0.1em]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-white/25">Share</span>
              <div className="flex gap-2">
                <ShareButton label="Share on Twitter" onClick={() => handleShare("twitter")}>
                  <Twitter className="w-4 h-4" />
                </ShareButton>
                <ShareButton label="Share on Facebook" onClick={() => handleShare("facebook")}>
                  <Facebook className="w-4 h-4" />
                </ShareButton>
                <ShareButton label="Share on LinkedIn" onClick={() => handleShare("linkedin")}>
                  <Linkedin className="w-4 h-4" />
                </ShareButton>
                <ShareButton label="Copy link" onClick={() => handleShare("copy")}>
                  <Share2 className="w-4 h-4" />
                </ShareButton>
              </div>
            </div>

            <div className="w-full h-px bg-white/8" />
          </header>

          <div className="font-serif text-lg text-white/70 leading-relaxed whitespace-pre-wrap mb-16">
            {post.content}
          </div>

          <div className="h-px bg-white/8 mb-16" />

          <div className="border border-white/8 bg-white/[0.015] p-8 mb-16">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 flex-shrink-0 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-300 font-serif text-xl">
                KK
              </div>
              <div>
                <h3 className="font-serif text-xl text-white mb-2">Kiminou Knox</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">
                  Bay Area raised, New Orleans based author and poet. Ten published books. He writes what others leave out.
                </p>
                <div className="flex gap-4 text-xs uppercase tracking-[0.2em]">
                  <Link href="/author" className="text-amber-400/60 hover:text-amber-300 transition-colors">
                    View Profile
                  </Link>
                  <Link href="/blog" className="text-amber-400/60 hover:text-amber-300 transition-colors">
                    More Articles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {otherRelatedPosts.length > 0 && (
            <section>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/40 mb-6">Related Articles</p>
              <div className="grid sm:grid-cols-3 gap-5">
                {otherRelatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group block border border-white/8 bg-white/[0.015] hover:border-amber-400/25 hover:bg-white/[0.04] transition-all duration-300 p-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/50">
                      {categories.find(c => c.id === relatedPost.categoryId)?.name || "Uncategorized"}
                    </span>
                    <h3 className="font-serif text-base text-white/85 mt-2 mb-2 leading-snug line-clamp-2 group-hover:text-amber-100 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs text-white/35 line-clamp-2 leading-relaxed">{relatedPost.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}

export default BlogPostPage;
