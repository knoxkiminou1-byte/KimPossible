import { categories, id, nowIso, requireAdmin, type BlogCategory } from "../_blog-data";

type Request = {
  method?: string;
  body?: Partial<BlogCategory>;
  headers: Record<string, string | string[] | undefined>;
};

type Response = {
  status: (code: number) => { json: (body: unknown) => void };
  setHeader: (name: string, value: string | string[]) => void;
};

export default function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    return res.status(200).json(categories);
  }

  if (!requireAdmin(req.headers)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const now = nowIso();
    const name = req.body?.name || "Untitled";
    const category: BlogCategory = {
      id: id(),
      name,
      slug: req.body?.slug || name.toLowerCase().replace(/\s+/g, "-"),
      description: req.body?.description ?? null,
      createdAt: now,
      updatedAt: now
    };
    categories.push(category);
    return res.status(201).json(category);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}
