import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { randomUUID } from "crypto";

const router: IRouter = Router();

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  categoryId: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  featuredImage: string | null;
  readTime: number | null;
  tags: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

const categories: BlogCategory[] = [];
const posts: BlogPost[] = [];

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    return next();
  }
  const key = req.headers["x-admin-key"];
  if (key !== adminSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return next();
}

router.get("/blog/categories", (_req, res) => {
  res.json(categories);
});

router.post("/blog/categories", requireAdmin, (req, res) => {
  const now = new Date();
  const cat: BlogCategory = {
    id: randomUUID(),
    name: req.body.name,
    slug: req.body.slug || req.body.name.toLowerCase().replace(/\s+/g, "-"),
    description: req.body.description ?? null,
    createdAt: now,
    updatedAt: now,
  };
  categories.push(cat);
  res.status(201).json(cat);
});

router.put("/blog/categories/:id", requireAdmin, (req, res) => {
  const idx = categories.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Category not found" });
  categories[idx] = { ...categories[idx], ...req.body, updatedAt: new Date() };
  res.json(categories[idx]);
});

router.delete("/blog/categories/:id", requireAdmin, (req, res) => {
  const idx = categories.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Category not found" });
  categories.splice(idx, 1);
  res.json({ ok: true });
});

router.get("/blog/posts", (req, res) => {
  let result = [...posts];
  if (req.query.published === "true") {
    result = result.filter((p) => p.isPublished);
  }
  if (req.query.category) {
    result = result.filter((p) => p.categoryId === req.query.category);
  }
  res.json(result);
});

router.get("/blog/posts/:identifier", (req, res) => {
  const post = posts.find(
    (p) => p.id === req.params.identifier || p.slug === req.params.identifier,
  );
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

router.post("/blog/posts", requireAdmin, (req, res) => {
  const now = new Date();
  const post: BlogPost = {
    id: randomUUID(),
    title: req.body.title,
    slug: req.body.slug || req.body.title.toLowerCase().replace(/\s+/g, "-"),
    excerpt: req.body.excerpt ?? null,
    content: req.body.content,
    categoryId: req.body.categoryId ?? null,
    isPublished: req.body.isPublished ?? false,
    publishedAt: req.body.isPublished ? now : null,
    featuredImage: req.body.featuredImage ?? null,
    readTime: req.body.readTime ?? null,
    tags: req.body.tags ?? null,
    createdAt: now,
    updatedAt: now,
  };
  posts.push(post);
  res.status(201).json(post);
});

router.put("/blog/posts/:id", requireAdmin, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  posts[idx] = { ...posts[idx], ...req.body, updatedAt: new Date() };
  res.json(posts[idx]);
});

router.patch("/blog/posts/:id/publish", requireAdmin, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  posts[idx].isPublished = true;
  posts[idx].publishedAt = new Date();
  posts[idx].updatedAt = new Date();
  res.json(posts[idx]);
});

router.patch("/blog/posts/:id/unpublish", requireAdmin, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  posts[idx].isPublished = false;
  posts[idx].updatedAt = new Date();
  res.json(posts[idx]);
});

router.delete("/blog/posts/:id", requireAdmin, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  posts.splice(idx, 1);
  res.json({ ok: true });
});

export default router;
