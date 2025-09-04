import { 
  type User, 
  type InsertUser, 
  type BlogPost, 
  type InsertBlogPost,
  type BlogCategory,
  type InsertBlogCategory 
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog category methods
  getCategories(): Promise<BlogCategory[]>;
  getCategory(id: string): Promise<BlogCategory | undefined>;
  createCategory(category: InsertBlogCategory): Promise<BlogCategory>;
  updateCategory(id: string, category: Partial<InsertBlogCategory>): Promise<BlogCategory | undefined>;
  deleteCategory(id: string): Promise<boolean>;
  
  // Blog post methods
  getPosts(): Promise<BlogPost[]>;
  getPublishedPosts(): Promise<BlogPost[]>;
  getPost(id: string): Promise<BlogPost | undefined>;
  getPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getPostsByCategory(categoryId: string): Promise<BlogPost[]>;
  getPostsByTag(tag: string): Promise<BlogPost[]>;
  createPost(post: InsertBlogPost): Promise<BlogPost>;
  updatePost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deletePost(id: string): Promise<boolean>;
  publishPost(id: string): Promise<BlogPost | undefined>;
  unpublishPost(id: string): Promise<BlogPost | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, BlogCategory>;
  private posts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.posts = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Blog category methods
  async getCategories(): Promise<BlogCategory[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<BlogCategory | undefined> {
    return this.categories.get(id);
  }

  async createCategory(category: InsertBlogCategory): Promise<BlogCategory> {
    const id = randomUUID();
    const now = new Date();
    const newCategory: BlogCategory = { 
      ...category, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  async updateCategory(id: string, category: Partial<InsertBlogCategory>): Promise<BlogCategory | undefined> {
    const existing = this.categories.get(id);
    if (!existing) return undefined;
    
    const updated: BlogCategory = { 
      ...existing, 
      ...category, 
      updatedAt: new Date() 
    };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Blog post methods
  async getPosts(): Promise<BlogPost[]> {
    return Array.from(this.posts.values());
  }

  async getPublishedPosts(): Promise<BlogPost[]> {
    return Array.from(this.posts.values()).filter(post => post.isPublished);
  }

  async getPost(id: string): Promise<BlogPost | undefined> {
    return this.posts.get(id);
  }

  async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.posts.values()).find(post => post.slug === slug);
  }

  async getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
    return Array.from(this.posts.values()).filter(post => post.categoryId === categoryId);
  }

  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    return Array.from(this.posts.values()).filter(post => 
      post.tags && post.tags.includes(tag)
    );
  }

  async createPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const newPost: BlogPost = { 
      ...post, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.posts.set(id, newPost);
    return newPost;
  }

  async updatePost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.posts.get(id);
    if (!existing) return undefined;
    
    const updated: BlogPost = { 
      ...existing, 
      ...post, 
      updatedAt: new Date() 
    };
    this.posts.set(id, updated);
    return updated;
  }

  async deletePost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }

  async publishPost(id: string): Promise<BlogPost | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updated: BlogPost = { 
      ...post, 
      isPublished: true, 
      publishedAt: new Date(), 
      updatedAt: new Date() 
    };
    this.posts.set(id, updated);
    return updated;
  }

  async unpublishPost(id: string): Promise<BlogPost | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updated: BlogPost = { 
      ...post, 
      isPublished: false, 
      publishedAt: null, 
      updatedAt: new Date() 
    };
    this.posts.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
