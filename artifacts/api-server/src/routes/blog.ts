import { Router } from "express";
import { z } from "zod";
import { storage } from "../storage";

const router = Router();

const insertBlogCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable().optional(),
});

const insertBlogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
  publishedAt: z.coerce.date().nullable().optional(),
  featuredImage: z.string().nullable().optional(),
  readTime: z.number().int().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
});

// Blog Categories
router.get("/blog/categories", async (req, res) => {
  try {
    const categories = await storage.getCategories();
    res.json(categories);
  } catch {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.post("/blog/categories", async (req, res) => {
  try {
    const data = insertBlogCategorySchema.parse(req.body);
    const category = await storage.createCategory(data);
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid category data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.put("/blog/categories/:id", async (req, res) => {
  try {
    const data = insertBlogCategorySchema.partial().parse(req.body);
    const category = await storage.updateCategory(req.params.id, data);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid category data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update category" });
  }
});

router.delete("/blog/categories/:id", async (req, res) => {
  try {
    const deleted = await storage.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

// Blog Posts
router.get("/blog/posts", async (req, res) => {
  try {
    const { published, category, tag } = req.query;
    let posts;
    if (published === "true") {
      posts = await storage.getPublishedPosts();
    } else if (category) {
      posts = await storage.getPostsByCategory(category as string);
    } else if (tag) {
      posts = await storage.getPostsByTag(tag as string);
    } else {
      posts = await storage.getPosts();
    }
    res.json(posts);
  } catch {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/blog/posts/:identifier", async (req, res) => {
  try {
    let post = await storage.getPost(req.params.identifier);
    if (!post) post = await storage.getPostBySlug(req.params.identifier);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

router.post("/blog/posts", async (req, res) => {
  try {
    const data = insertBlogPostSchema.parse(req.body);
    const post = await storage.createPost(data);
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid post data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create post" });
  }
});

router.put("/blog/posts/:id", async (req, res) => {
  try {
    const data = insertBlogPostSchema.partial().parse(req.body);
    const post = await storage.updatePost(req.params.id, data);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid post data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update post" });
  }
});

router.delete("/blog/posts/:id", async (req, res) => {
  try {
    const deleted = await storage.deletePost(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

router.patch("/blog/posts/:id/publish", async (req, res) => {
  try {
    const post = await storage.publishPost(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch {
    res.status(500).json({ error: "Failed to publish post" });
  }
});

router.patch("/blog/posts/:id/unpublish", async (req, res) => {
  try {
    const post = await storage.unpublishPost(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch {
    res.status(500).json({ error: "Failed to unpublish post" });
  }
});

export default router;
