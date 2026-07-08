import type { BlogCategory, BlogPost } from "@/lib/schema";
import blogData from "./blogData.json";

function toDate(value: string | null) {
  return value ? new Date(value) : null;
}

export const blogCategories: BlogCategory[] = blogData.categories.map((category) => ({
  ...category,
  createdAt: toDate(category.createdAt),
  updatedAt: toDate(category.updatedAt),
}));

export const blogPosts: BlogPost[] = blogData.posts.map((post) => ({
  ...post,
  createdAt: toDate(post.createdAt),
  updatedAt: toDate(post.updatedAt),
  publishedAt: toDate(post.publishedAt),
}));

export const publishedBlogPosts = blogPosts
  .filter((post) => post.isPublished)
  .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0));

export function findPublishedBlogPost(slug: string | undefined) {
  return publishedBlogPosts.find((post) => post.slug === slug);
}

export function relatedPublishedBlogPosts(post: BlogPost, limit = 3) {
  return publishedBlogPosts
    .filter((candidate) => candidate.id !== post.id && candidate.categoryId === post.categoryId)
    .slice(0, limit);
}
