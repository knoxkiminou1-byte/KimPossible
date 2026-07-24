import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(__dirname, "..");
const kiminouRoot = path.join(repoRoot, "artifacts", "kiminou");

function readJson(relativePath: string) {
  return JSON.parse(fs.readFileSync(path.join(kiminouRoot, relativePath), "utf8"));
}

test("book count and ids match across every generated source", () => {
  const canonical = readJson("src/content/books.json");
  const publicBooks = readJson("public/books.json");
  const publicBooksFull = readJson("public/books-full.json");

  const canonicalIds = canonical.map((b: { id: string }) => b.id).sort();

  expect(publicBooks.map((b: { id: string }) => b.id).sort()).toEqual(canonicalIds);
  expect(publicBooksFull.map((b: { id: string }) => b.id).sort()).toEqual(canonicalIds);

  const uniqueIds = new Set(canonicalIds);
  expect(uniqueIds.size, "duplicate book id in canonical source").toBe(canonicalIds.length);
});

test("sitemap.xml has one /books/:id entry per canonical book", () => {
  const canonical = readJson("src/content/books.json");
  const sitemap = fs.readFileSync(path.join(kiminouRoot, "public", "sitemap.xml"), "utf8");

  for (const book of canonical as { id: string }[]) {
    expect(sitemap, `sitemap.xml missing /books/${book.id}`).toContain(`/books/${book.id}`);
  }
});

test("seo-routes.json has route metadata for every canonical book", () => {
  const canonical = readJson("src/content/books.json");
  const seoRoutes = readJson("public/seo-routes.json");
  const routeLocs = new Set(
    (seoRoutes.routes as { loc: string }[]).map((r) => r.loc),
  );

  for (const book of canonical as { id: string }[]) {
    expect(routeLocs.has(`/books/${book.id}`), `seo-routes.json missing /books/${book.id}`).toBe(true);
  }
});
