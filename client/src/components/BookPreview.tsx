import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Book, X, Download, ExternalLink, Heart, FileText, Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";
// Book covers - using elegant placeholder images for now
const bookSpirit = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=600";
const bookFather = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=600";
const bookBlackBoy = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=600";
const bookRomantic = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=600";

interface BookData {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  year: number;
  themes: string[];
  excerpt: string;
  description: string;
  buyLink: string;
  featured?: boolean;
}

const books: BookData[] = [
  {
    id: "spirit-solomon",
    title: "The Spirit Of Solomon",
    subtitle: "Wisdom Beyond Years",
    cover: bookSpirit,
    year: 2020,
    themes: ["Wisdom", "Faith", "Growth"],
    excerpt: `"In the quiet chambers of the heart,\nWhere wisdom whispers soft and low,\nI seek the spirit that won't depart—\nThe ancient truths that help us grow.\n\nSolomon's temple built with care,\nEach stone a lesson, each beam a prayer..."`,
    description: "My first published work, exploring themes of wisdom, spiritual growth, and finding guidance in uncertain times. Written when I was just 14, this collection established my voice as a poet.",
    buyLink: "https://bookshop.org/",
    featured: true
  },
  {
    id: "our-father",
    title: "Our Father?",
    subtitle: "Questions of Faith and Family",
    cover: bookFather,
    year: 2022,
    themes: ["Faith", "Family", "Questions"],
    excerpt: `"Our Father, who art in heaven—\nBut what of fathers here on earth?\nThe ones who teach us how to pray,\nAnd show us what a man is worth.\n\nSome are present, some are gone,\nSome are perfect, some are flawed..."`,
    description: "A deeper exploration of faith, family relationships, and the complex nature of father figures—both divine and earthly. This collection asks difficult questions while seeking authentic answers.",
    buyLink: "https://bookshop.org/"
  },
  {
    id: "black-boy",
    title: "Poems from a Black Boy",
    subtitle: "Identity, Heritage, and Hope",
    cover: bookBlackBoy,
    year: 2022,
    themes: ["Identity", "Heritage", "Social Justice"],
    excerpt: `"I am the dream deferred,\nThe song that rises from the pain,\nThe voice that will not be deterred,\nThe sun that shines through acid rain.\n\nMy skin tells stories of the past,\nMy words write futures yet to come..."`,
    description: "Raw, honest poetry about growing up Black in America. These poems confront racism, celebrate heritage, and envision a future where young Black voices are heard and valued.",
    buyLink: "https://bookshop.org/"
  },
  {
    id: "hopeless-romantic",
    title: "Hopeless Romantic",
    subtitle: "Love, Loss, and Everything Between",
    cover: bookRomantic,
    year: 2024,
    themes: ["Love", "Relationships", "Growth"],
    excerpt: `"I am hopelessly, helplessly,\nA romantic in an age of swipes,\nSeeking sonnets in text messages,\nFinding poetry in your smile.\n\nCall me old-fashioned, call me naive,\nBut I still believe in forever..."`,
    description: "My most recent and personal collection, exploring the complexities of young love, heartbreak, and the courage to remain vulnerable in a cynical world.",
    buyLink: "https://bookshop.org/",
    featured: true
  }
];

export default function BookPreview() {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const booksRef = useScrollAnimation();
  const blogRef = useScrollAnimation();

  // Fetch latest blog posts
  const { data: latestPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts?published=true"],
  });

  const openPreview = (book: BookData) => {
    setSelectedBook(book);
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setSelectedBook(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="py-24 bg-background" data-testid="book-preview-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16" ref={booksRef}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="books-title">
              Published Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="books-subtitle">
              Four poetry collections exploring wisdom, faith, identity, and love—all published before age 19
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <div 
                key={book.id}
                className={`luxury-card group relative cursor-pointer ${book.featured ? 'ring-2 ring-primary/20' : ''}`}
                onClick={() => openPreview(book)}
                data-testid={`book-card-${index}`}
              >
                {/* Featured Badge */}
                {book.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      Featured
                    </div>
                  </div>
                )}

                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Book Cover */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={book.cover}
                      alt={`${book.title} book cover`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                        <Book className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-sm font-medium">Read Preview</div>
                      </div>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        {book.year}
                      </span>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {book.subtitle}
                    </p>
                    
                    {/* Themes */}
                    <div className="flex flex-wrap gap-2">
                      {book.themes.map((theme) => (
                        <span 
                          key={theme}
                          className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-6">
              Available in paperback and digital formats
            </p>
            <a 
              href="https://bookshop.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="luxury-button inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium uppercase tracking-[0.1em] hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              data-testid="books-shop-link"
            >
              <ExternalLink className="w-5 h-5" />
              Shop All Books
            </a>
          </div>
        </div>
      </section>

      {/* Latest Articles/Blog Section */}
      <section className="py-24 bg-muted/30" data-testid="blog-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16" ref={blogRef}>
            <div className="inline-flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Author's Journal</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="blog-title">
              Latest Articles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="blog-subtitle">
              Thoughts, insights, and stories from my journey as an athlete, author, and entrepreneur
            </p>
          </div>

          {latestPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {latestPosts.slice(0, 3).map((post, index) => (
                  <div 
                    key={post.id}
                    className="luxury-card group relative"
                    data-testid={`blog-card-${index}`}
                  >
                    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                      {/* Article Header */}
                      <div className="p-6 flex-grow">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-primary font-medium uppercase tracking-wider">Article</span>
                          <div className="flex items-center text-xs text-muted-foreground gap-2">
                            <Calendar className="w-3 h-3" />
                            {post.publishedAt && format(new Date(post.publishedAt), "MMM d")}
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        {post.excerpt && (
                          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span 
                                key={tag}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Article Footer */}
                      <div className="p-6 pt-0 mt-auto">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime || 5} min read
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <button className="luxury-button inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 rounded-lg border border-primary/20 hover:border-primary group">
                              Read Article
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Blog Call to Action */}
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Explore more thoughts, insights, and behind-the-scenes stories
                </p>
                <Link href="/blog">
                  <button className="luxury-button inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium uppercase tracking-[0.1em] hover:bg-primary/90 transition-all duration-300 hover:scale-105" data-testid="blog-view-all-link">
                    <FileText className="w-5 h-5" />
                    View All Articles
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                I'm working on some exciting new articles. Check back soon for fresh insights and stories!
              </p>
              <Link href="/admin/blog">
                <button className="luxury-button inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-lg">
                  <FileText className="w-4 h-4" />
                  Write First Article
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Preview Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" data-testid="book-modal">
          <div className="relative max-w-4xl max-h-full bg-card rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              data-testid="book-modal-close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
              {/* Book Cover */}
              <div className="relative">
                <img 
                  src={selectedBook.cover}
                  alt={`${selectedBook.title} book cover`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Book Details */}
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="font-serif text-3xl font-bold mb-2">{selectedBook.title}</h2>
                  <p className="text-lg text-muted-foreground mb-4">{selectedBook.subtitle}</p>
                  
                  {/* Themes */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedBook.themes.map((theme) => (
                      <span 
                        key={theme}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3">About This Collection</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedBook.description}
                  </p>
                </div>

                {/* Excerpt */}
                <div className="mb-8">
                  <h3 className="font-bold mb-3">Excerpt</h3>
                  <blockquote className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                    <pre className="font-serif text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedBook.excerpt}
                    </pre>
                  </blockquote>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={selectedBook.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxury-button flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    data-testid="book-buy-link"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Purchase Book
                  </a>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-border font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Download className="w-4 h-4" />
                    Sample PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}