import { posts, requireAdmin } from "../../../_blog-data";

type Request = {
  method?: string;
  query?: { id?: string | string[] };
  headers: Record<string, string | string[] | undefined>;
};

type Response = {
  status: (code: number) => { json: (body: unknown) => void };
  setHeader: (name: string, value: string | string[]) => void;
};

function id(req: Request) {
  const raw = req.query?.id;
  return Array.isArray(raw) ? raw[0] : raw;
}

export default function handler(req: Request, res: Response) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!requireAdmin(req.headers)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const index = posts.findIndex((post) => post.id === id(req));
  if (index === -1) return res.status(404).json({ error: "Post not found" });

  posts[index].isPublished = false;
  posts[index].updatedAt = new Date().toISOString();
  return res.status(200).json(posts[index]);
}
