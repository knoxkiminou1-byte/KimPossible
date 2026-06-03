import { categories, requireAdmin } from "../../_blog-data";

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

function id(req: Request) {
  const raw = req.query?.id;
  return Array.isArray(raw) ? raw[0] : raw;
}

export default function handler(req: Request, res: Response) {
  if (!requireAdmin(req.headers)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const index = categories.findIndex((category) => category.id === id(req));
  if (index === -1) return res.status(404).json({ error: "Category not found" });

  if (req.method === "PUT") {
    categories[index] = {
      ...categories[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    return res.status(200).json(categories[index]);
  }

  if (req.method === "DELETE") {
    categories.splice(index, 1);
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed" });
}
