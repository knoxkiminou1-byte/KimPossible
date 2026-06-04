import { Router } from "express";
import { categories, posts, requireAdmin, nowIso, newId } from "./blogData";

const router = Router();

router.get("/blog/categories", (req, res) => {
  res.json(categories);
});

router.post("/blog/categories", (req, res) => {
  if (!requireAdmin(req.headers as Record<string, string | string[] | undefined>)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const now = nowIso();
  const name = req.body?.name || "Untitled";
  const category = {
    id: newId(),
    name,
    slug: req.body?.slug || name.toLowerCase().replace(/\s+/g, "-"),
    description: req.body?.description ?? null,
    createdAt: now,
    updatedAt: now
  };
  categories.push(category);
  return res.status(201).json(category);
});

router.put("/blog/categories/:id", (req, res) => {
  if (!requireAdmin(req.headers as Record<string, string | string[] | undefined>)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const index = categories.findIndex((c) => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Category not found" });
  categories[index] = { ...categories[index], ...req.body, updatedAt: nowIso() };
  return res.json(categories[index]);
});

router.delete("/blog/categories/:id", (req, res) => {
  if (!requireAdmin(req.headers as Record<string, string | string[] | undefined>)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const index = categories.findIndex((c) => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Category not found" });
  categories.splice(index, 1);
  return res.json({ ok: true });
});

router.get("/blog/posts", (req, res) => {
  let result = [...posts];
  if (req.query.published === "true") {
    result = result.filter((p) => p.isPublished);
  }
  if (req.query.category) {
    result = result.filter((p) => p.categoryId === req.query.category);
  }
  return res.json(result);
});

router.post("/blog/posts", (req, res) => {
  if (!requireAdmin(req.headers as Record<string, string | string[] | undefined>)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const now = nowIso();
  const title = req.body?.title || "Untitled";
  const post = {
    id: newId(),
    title,
    slug: req.body?.slug || title.toLowerCase().replace(/\s+/g, "-"),
    excerpt: req.body?.excerpt ?? null,
    content: req.body?.content || "",
    categoryId: req.body?.categoryId ?? null,
    isPublished: req.body?.isPublished ?? false,
    publishedAt: req.body?.isPublished ? now : null,
    featuredImage: req.body?.featuredImage ?? null,
    readTime: req.body?.readTime ?? null,
    tags: req.body?.tags ?? null,
    createdAt: now,
    updatedAt: now
  };
  posts.push(post);
  return res.status(201).json(post);
});

router.get("/blog/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id || p.slug === req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  return res.json(post);
});

router.put("/blog/posts/:id", (req, res) => {
  if (!requireAdmin(req.headers as Record<string, string | string[] | undefined>)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const index = posts.findIndex((p) => p.id === req.params.id || p.slug === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  posts[index] = { ...posts[index], ...req.body, updatedAt: nowIso() };
  return res.json(posts[index]);
});

router.delete("/blog/posts/:id", (req, res) => {
  if (!requireAdmin(req.headers as Record<string, string | string[] | undefined>)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const index = posts.findIndex((p) => p.id === req.params.id || p.slug === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  posts.splice(index, 1);
  return res.json({ ok: true });
});

router.patch("/blog/posts/:id/publish", (req, res) => {
  if (!requireAdmin(req.headers as Record<string, string | string[] | undefined>)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  const now = nowIso();
  posts[index].isPublished = true;
  posts[index].publishedAt = now;
  posts[index].updatedAt = now;
  return res.json(posts[index]);
});

router.patch("/blog/posts/:id/unpublish", (req, res) => {
  if (!requireAdmin(req.headers as Record<string, string | string[] | undefined>)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  posts[index].isPublished = false;
  posts[index].updatedAt = nowIso();
  return res.json(posts[index]);
});

export default router;
