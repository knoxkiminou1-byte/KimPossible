import { test, expect } from "@playwright/test";
import crypto from "node:crypto";
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

function isValidIsbn13(isbn: string) {
  if (!/^97[89]\d{10}$/.test(isbn)) return false;
  const digits = [...isbn].map(Number);
  const sum = digits.slice(0, 12).reduce((total, d, i) => total + d * (i % 2 === 0 ? 1 : 3), 0);
  return (10 - (sum % 10)) % 10 === digits[12];
}

test("every published ISBN is a valid ISBN-13", () => {
  const canonical = readJson("src/content/books.json") as { id: string; isbn?: string }[];
  for (const book of canonical) {
    if (!book.isbn) continue;
    expect(isValidIsbn13(book.isbn), `${book.id} has invalid ISBN ${book.isbn}`).toBe(true);
  }
});

test("no generated route description contains an empty sentence", () => {
  const seoRoutes = readJson("public/seo-routes.json");
  for (const route of seoRoutes.routes as { loc: string; description: string }[]) {
    expect(route.description, `${route.loc} description`).not.toMatch(/\.\s+\./);
  }
});

test("podcast hub is in the sitemap and has cached episodes", () => {
  const sitemap = fs.readFileSync(path.join(kiminouRoot, "public", "sitemap.xml"), "utf8");
  expect(sitemap).toContain("https://www.kiminouknox.com/podcast</loc>");
  const cache = readJson("public/podcast-episodes.json");
  expect(cache.episodes.length).toBeGreaterThan(0);
  for (const episode of cache.episodes as { title: string; audioUrl: string }[]) {
    expect(episode.audioUrl, episode.title).toMatch(/^https:\/\//);
  }
});

type CatalogImage = {
  id: string;
  src: string;
  title: string;
  alt: string;
  caption: string;
  category: string;
  width: number;
  height: number;
  approved?: boolean;
  ownerPhotoNumber?: number;
  sha256?: string;
};

const RESPONSIVE_WIDTHS = [480, 960, 1600];

function catalogImages() {
  return readJson("src/content/kiminouImages.json").images as CatalogImage[];
}

test("owner-approved photo set is complete and matches its source bytes", () => {
  const images = catalogImages();
  const approved = images.filter((image) => image.approved);

  expect(approved.map((image) => image.ownerPhotoNumber).sort((a, b) => a! - b!)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(new Set(images.map((image) => image.src)).size, "duplicate src in catalog").toBe(images.length);
  expect(new Set(approved.map((image) => image.sha256)).size, "same photo under two approved records").toBe(10);

  for (const image of approved) {
    const file = path.join(kiminouRoot, "public", image.src);
    const sha = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    expect(sha, `${image.id} bytes`).toBe(image.sha256);
    expect(image.src, `${image.id} src casing`).toBe(image.src.toLowerCase());
    for (const width of RESPONSIVE_WIDTHS.filter((w) => w < image.width)) {
      const base = image.src.replace(/\/([^/]+)\.jpg$/, "/responsive/$1");
      expect(fs.existsSync(path.join(kiminouRoot, "public", `${base}-${width}w.webp`)), `${image.id} ${width}w`).toBe(true);
    }
  }
});

test("primary headshot is owner photo #6 and drives the Person image", () => {
  const headshot = catalogImages().find((image) => image.id === "officialHeadshot")!;
  expect(headshot.ownerPhotoNumber).toBe(6);

  const seoRoutes = readJson("public/seo-routes.json");
  expect(seoRoutes.site.personImage).toBe(`https://www.kiminouknox.com${headshot.src}`);
  expect(seoRoutes.site.personImageObject.width).toBe(headshot.width);
  expect(seoRoutes.site.personImageObject.height).toBe(headshot.height);

  const seoTs = fs.readFileSync(path.join(kiminouRoot, "src", "lib", "seo.ts"), "utf8");
  expect(seoTs).toContain(`"https://www.kiminouknox.com${headshot.src}"`);
});

test("sports photos are labeled with the sport they show", () => {
  const byNumber = new Map(catalogImages().map((image) => [image.ownerPhotoNumber, image]));
  const text = (n: number) => {
    const image = byNumber.get(n)!;
    return `${image.src} ${image.title} ${image.alt} ${image.caption}`.toLowerCase();
  };
  // #9 shows a basketball sideline; it was once filed as a football tunnel.
  expect(text(9)).toContain("basketball");
  expect(text(9)).not.toContain("football");
  // #1 shows football action; it was once uploaded as brown-suit-author.jpg.
  expect(text(1)).toContain("football");
  expect(text(1)).not.toMatch(/suit|blazer|headshot/);
  expect(text(10)).toContain("basketball");
});

test("image sitemap promotes approved photos only", () => {
  const sitemap = fs.readFileSync(path.join(kiminouRoot, "public", "image-sitemap.xml"), "utf8");
  const images = catalogImages();
  const photoLocs = [...sitemap.matchAll(/<image:loc>https:\/\/www\.kiminouknox\.com(\/photos\/[^<]+)<\/image:loc>/g)].map((m) => m[1]);
  const approvedSrcs = new Set(images.filter((image) => image.approved).map((image) => image.src));

  for (const src of approvedSrcs) expect(photoLocs, `sitemap missing ${src}`).toContain(src);
  for (const loc of photoLocs) expect(approvedSrcs.has(loc), `non-approved photo in sitemap: ${loc}`).toBe(true);
});
