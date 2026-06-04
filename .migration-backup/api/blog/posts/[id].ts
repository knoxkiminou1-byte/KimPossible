import { posts, requireAdmin } from "../../_blog-data";

type Request = {
  method?: string;
  query?: { id?: string | string[] };
  body?: Record<string, unknown>;
  headers: Record<string, string | string[] | undefined>;
};

type Response = {
  status: (code: number) => { json: (body: unknown) => void };
  setHeader: (name: string, value: string | string[]) => void;
};

function identifier(req: Request) {
  const raw = req.query?.id;
  return Array.isArray(raw) ? raw[0] : raw;
}

export default function handler(req: Request, res: Response) {
  const key = identifier(req);
  const index = posts.findIndex((post) => post.id === key || post.slug === key);

  if (req.method === "GET") {
    if (index === -1) return res.status(404).json({ error: "Post not found" });
    return res.status(200).json(posts[index]);
  }

  if (!requireAdmin(req.headers)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (index === -1) return res.status(404).json({ error: "Post not found" });

  if (req.method === "PUT") {
    posts[index] = { ...posts[index], ...req.body, updatedAt: new Date().toISOString() };
    return res.status(200).json(posts[index]);
  }

  if (req.method === "DELETE") {
    posts.splice(index, 1);
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed" });
}
