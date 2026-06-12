import { Helmet } from "react-helmet-async";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { format } from "date-fns";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import {
  blogCategories,
  findPublishedBlogPost,
  relatedPublishedBlogPosts,
} from "@/content/blogContent";

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = findPublishedBlogPost(slug);
  const categories = blogCategories;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Helmet>
          <title>Article Not Found - Kiminou Knox</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button data-testid="button-back-to-blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === post.categoryId);
  const otherRelatedPosts = relatedPublishedBlogPosts(post);
  const publishedAtIso = post.publishedAt?.toISOString();
  const updatedAtIso = post.updatedAt?.toISOString() || publishedAtIso;

  const shareUrl = window.location.href;
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
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
      {/* Header Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm" data-testid="button-back-to-blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            {category && (
              <Badge variant="secondary" className="px-3 py-1">
                {category.name}
              </Badge>
            )}
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {post.publishedAt && format(post.publishedAt, "MMMM d, yyyy")}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime || 5} min read
              </span>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="px-3 py-1">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm text-muted-foreground">Share this article:</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare("twitter")}
                data-testid="button-share-twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare("facebook")}
                data-testid="button-share-facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare("linkedin")}
                data-testid="button-share-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare("copy")}
                data-testid="button-copy-link"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator className="mb-8" />
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="whitespace-pre-wrap leading-relaxed text-foreground">
            {post.content}
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Author Bio */}
        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 mb-12">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
              KK
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Kiminou Knox</h3>
              <p className="text-muted-foreground mb-4">
                19-year-old author, athlete, and builder from the Bay Area. Eight books. NCAA registered. He writes what others leave out.
              </p>
              <div className="flex gap-2">
                <Link href="/">
                  <Button variant="outline" size="sm" data-testid="link-author-profile">
                    View Profile
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="sm" data-testid="link-more-articles">
                    More Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {otherRelatedPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherRelatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === relatedPost.categoryId)?.name || "Uncategorized"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {relatedPost.publishedAt && format(relatedPost.publishedAt, "MMM d")}
                      </span>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button variant="ghost" size="sm" data-testid={`link-related-post-${relatedPost.slug}`}>
                          Read
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

export default BlogPostPage;
