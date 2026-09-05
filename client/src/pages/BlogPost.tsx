import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { BlogPost, BlogCategory } from "@shared/schema";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { format } from "date-fns";

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  // Fetch the specific post
  const { data: post, isLoading: postLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog/posts", slug],
    enabled: !!slug,
  });

  // Fetch categories for reference
  const { data: categories = [] } = useQuery<BlogCategory[]>({
    queryKey: ["/api/blog/categories"],
  });

  // Fetch related posts (published posts from same category)
  const { data: relatedPosts = [] } = useQuery<BlogPost[]>({
    queryKey: [`/api/blog/posts?published=true&category=${post?.categoryId}`],
    enabled: !!post?.categoryId,
  });

  if (postLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  // Don't show unpublished posts in public view
  if (!post.isPublished) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Available</h1>
          <p className="text-muted-foreground mb-6">
            This article is not currently published.
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
  const otherRelatedPosts = relatedPosts.filter(p => p.id !== post.id).slice(0, 3);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
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
                {post.publishedAt && format(new Date(post.publishedAt), "MMMM d, yyyy")}
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
                Bay Area raised, New Orleans based author and poet. Passionate about 
                books, essays, faith, Black boyhood, love, grief, family, and becoming.
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
                        {relatedPost.publishedAt && format(new Date(relatedPost.publishedAt), "MMM d")}
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
