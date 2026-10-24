import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const catalog = JSON.parse(read("artifacts/kiminou/src/content/books.json"));
const profile = JSON.parse(read("artifacts/kiminou/src/content/author-profile.json"));
const config = JSON.parse(read("vercel.json"));
const seoSource = read("artifacts/kiminou/src/lib/seo.ts");
const failures = [];
const check = (ok, description) => { if (!ok) failures.push(description); };
const clean = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "");

check(catalog.length === 10, "Catalog must have exactly ten distinct published works.");
check(profile.publishedBookCount === catalog.length, "Bio book count and canonical catalog disagree.");
check(new Set(catalog.map((book) => book.id)).size === catalog.length, "Duplicate book IDs.");
check(catalog.some((book) => book.id === "my-father"), "My Father is missing.");
check(!catalog.some((book) => book.id === "black-boy-poems"), "Paperback alias counted as a second work.");
check(catalog.filter((book) => clean(book.title).includes("blackboy")).length === 1, "Black Boy title duplicated.");
check(catalog.some((book) => book.id === "boys-raised-in-silence" && book.title === "Boys Raised in Silence"), "Correct In Silence title missing.");
const covers = new Set();
for (const book of catalog) {
  check(typeof book.title === "string" && book.title.length > 0, "Missing book title: " + book.id);
  check(typeof book.cover === "string" && book.cover.startsWith("/"), "Missing local cover: " + book.id);
  if (book.cover?.startsWith("/")) {
    const full = path.resolve(root, "artifacts/kiminou/public", "." + book.cover);
    check(fs.existsSync(full), "Missing cover file: " + book.cover);
    covers.add(book.cover);
  }
  for (const url of Object.values(book.buyLinks || {})) {
    check(!url || /^https:\/\//.test(url), "Non-HTTPS book retailer link: " + book.id);
  }
}
check(profile.canonicalBooks?.length === catalog.length, "Author profile bibliography must list ten.");
const bookNames = new Set(catalog.map((b) => clean(b.title)));
for (const b of profile.canonicalBooks || []) {
  check(bookNames.has(clean(b.title)), "Profile title missing from catalog: " + b.title);
}
check(new Set((profile.canonicalBooks || []).map((b) => clean(b.title))).size === 10, "Repeated title in profile.");
const redirect = (config.redirects || []).find((r) => r.source === "/books/black-boy-poems");
check(redirect?.destination === "/books/poems-black-boy" && redirect.permanent === true, "Paperback alias canonical redirect missing.");
check(seoSource.includes("kiminou-knox-official-author-headshot-2026"), "Approved social headshot reference was changed.");
check(seoSource.includes("SITE_PERSON_IMAGE"), "Person structured-data image constant missing.");
check(catalog.find((b) => b.id === "boys-raised-in-silence")?.cover === "/covers/boys-raised-in-silence-title-card.svg", "Original book cover is still unverified; preserve temporary title-card image.");
if (failures.length) {
  for (const issue of failures) console.error("[check-seo-content]", issue);
  process.exit(1);
}
console.log("[check-seo-content] 10 canonical works, cover paths, book links, author profile, alias redirect and approved headshot checks passed.");
