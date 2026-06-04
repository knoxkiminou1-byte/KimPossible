import { id, nowIso, posts, requireAdmin, type BlogPost } from "../../_blog-data";

type Request = {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
  body?: Partial<BlogPost>;
  headers: Record<string, string | string[] | undefined>;
};

type Response = {
  status: (code: number) => { json: (body: unknown) => void };
  setHeader: (name: string, value: string | string[]) => void;
};

function value(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

export default function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    let result = [...posts];
    if (value(req.query?.published) === "true") {
      result = result.filter((post) => post.isPublished);
    }
    const category = value(req.query?.category);
    if (category) {
      result = result.filter((post) => post.categoryId === category);
    }
    return res.status(200).json(result);
  }

  if (!requireAdmin(req.headers)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const now = nowIso();
    const title = req.body?.title || "Untitled";
    const post: BlogPost = {
      id: id(),
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
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}
