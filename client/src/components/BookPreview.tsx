import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Book, X, Download, ExternalLink, Heart, FileText, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";
import PoemModal from "@/components/PDFModal";

interface Poem {
  title: string;
  content: string;
}

interface BookData {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  samplePoems: Poem[];
  year: number;
  isbn?: string | null;
  themes: string[];
  description: string;
  buyLinks: {
    amazon?: string | null;
    googleBooks?: string | null;
    bookshop?: string | null;
    bn?: string | null;
  };
  featured?: boolean;
}

export default function BookPreview() {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [books, setBooks] = useState<BookData[]>([]);
  const [poemModal, setPoemModal] = useState<{id: string, poems: Poem[], title: string} | null>(null);
  const booksRef = useScrollAnimation();
  const blogRef = useScrollAnimation();

  // Load books from JSON
  useEffect(() => {
    fetch("/books.json")
      .then(r => r.json())
      .then(setBooks)
      .catch(() => setBooks([]));
  }, []);

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
              Poetry collections exploring wisdom, faith, identity, and love—with live PDF previews and real purchase links
            </p>
            <div className="mt-6">
              <Link href="/books">
                <button className="inline-flex items-center gap-2 text-primary hover:underline transition-all" data-testid="view-all-books">
                  <span>View All Books</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
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

                {/* Sample Preview */}
                <div className="mb-8">
                  <h3 className="font-bold mb-3">Published {selectedBook.year}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedBook.isbn ? `ISBN: ${selectedBook.isbn}` : "Available in digital format"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={selectedBook.buyLinks.amazon || selectedBook.buyLinks.googleBooks || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxury-button flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    data-testid="book-buy-link"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Purchase Book
                  </a>
                  <button 
                    onClick={() => setPoemModal({ id: selectedBook.id, poems: selectedBook.samplePoems, title: selectedBook.title })}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-border font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                    data-testid="book-sample-poems"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Sample
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Poem Modal */}
      {poemModal && (
        <PoemModal
          title={poemModal.title}
          poems={poemModal.poems}
          open={!!poemModal}
          onClose={() => setPoemModal(null)}
        />
      )}
    </>
  );
}