import { Router } from "express";
import { db, blogPostsTable, blogCategoriesTable, insertBlogPostSchema, insertBlogCategorySchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

const ADMIN_SECRET = process.env.ADMIN_SECRET || "";

function checkAdmin(req: any, res: any): boolean {
  const key = req.headers["x-admin-key"] as string | undefined;
  if (!ADMIN_SECRET || key !== ADMIN_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

router.get("/blog/categories", async (req, res) => {
  try {
    const categories = await db.select().from(blogCategoriesTable);
    res.json(categories);
  } catch (err) {
    logger.error({ err }, "Failed to fetch blog categories");
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.post("/blog/categories", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const data = insertBlogCategorySchema.parse(req.body);
    const [category] = await db.insert(blogCategoriesTable).values(data).returning();
    res.status(201).json(category);
  } catch (err) {
    logger.error({ err }, "Failed to create blog category");
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.put("/blog/categories/:id", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const data = insertBlogCategorySchema.partial().parse(req.body);
    const [category] = await db.update(blogCategoriesTable).set(data).where(eq(blogCategoriesTable.id, req.params.id)).returning();
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    logger.error({ err }, "Failed to update blog category");
    res.status(500).json({ error: "Failed to update category" });
  }
});

router.delete("/blog/categories/:id", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    await db.delete(blogCategoriesTable).where(eq(blogCategoriesTable.id, req.params.id));
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to delete blog category");
    res.status(500).json({ error: "Failed to delete category" });
  }
});

router.get("/blog/posts", async (req, res) => {
  try {
    const posts = await db.select().from(blogPostsTable).orderBy(blogPostsTable.createdAt);
    res.json(posts);
  } catch (err) {
    logger.error({ err }, "Failed to fetch blog posts");
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/blog/posts/:id", async (req, res) => {
  try {
    const [post] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    logger.error({ err }, "Failed to fetch blog post");
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

router.post("/blog/posts", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const data = insertBlogPostSchema.parse(req.body);
    const [post] = await db.insert(blogPostsTable).values(data).returning();
    res.status(201).json(post);
  } catch (err) {
    logger.error({ err }, "Failed to create blog post");
    res.status(500).json({ error: "Failed to create post" });
  }
});

router.put("/blog/posts/:id", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const data = insertBlogPostSchema.partial().parse(req.body);
    const [post] = await db.update(blogPostsTable).set(data).where(eq(blogPostsTable.id, req.params.id)).returning();
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    logger.error({ err }, "Failed to update blog post");
    res.status(500).json({ error: "Failed to update post" });
  }
});

router.delete("/blog/posts/:id", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    await db.delete(blogPostsTable).where(eq(blogPostsTable.id, req.params.id));
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to delete blog post");
    res.status(500).json({ error: "Failed to delete post" });
  }
});

router.patch("/blog/posts/:id/publish", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const [post] = await db.update(blogPostsTable)
      .set({ isPublished: true, publishedAt: new Date() })
      .where(eq(blogPostsTable.id, req.params.id))
      .returning();
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    logger.error({ err }, "Failed to publish blog post");
    res.status(500).json({ error: "Failed to publish post" });
  }
});

router.patch("/blog/posts/:id/unpublish", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const [post] = await db.update(blogPostsTable)
      .set({ isPublished: false })
      .where(eq(blogPostsTable.id, req.params.id))
      .returning();
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    logger.error({ err }, "Failed to unpublish blog post");
    res.status(500).json({ error: "Failed to unpublish post" });
  }
});

export default router;
