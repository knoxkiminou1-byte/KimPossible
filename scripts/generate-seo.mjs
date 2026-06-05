import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "artifacts", "kiminou");
const booksPath = path.join(siteRoot, "src", "content", "books.json");
const sitemapPath = path.join(siteRoot, "public", "sitemap.xml");

const books = JSON.parse(fs.readFileSync(booksPath, "utf8"));

const routes = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/home", changefreq: "weekly", priority: "0.95" },
  { loc: "/about", changefreq: "monthly", priority: "0.9" },
  { loc: "/works", changefreq: "monthly", priority: "0.9" },
  { loc: "/author", changefreq: "monthly", priority: "0.9" },
  { loc: "/books", changefreq: "weekly", priority: "0.95" },
  { loc: "/speaking", changefreq: "monthly", priority: "0.85" },
  { loc: "/contact", changefreq: "monthly", priority: "0.8" },
  { loc: "/press", changefreq: "monthly", priority: "0.8" },
  { loc: "/sports", changefreq: "monthly", priority: "0.8" },
  { loc: "/portfolio", changefreq: "monthly", priority: "0.75" },
  { loc: "/blog", changefreq: "weekly", priority: "0.85" },
  { loc: "/reading-list", changefreq: "monthly", priority: "0.75" },
];

const blogSlugs = [
  "what-black-boys-are-not-allowed-to-feel",
  "the-court-and-the-page-are-the-same-discipline",
  "what-i-mean-when-i-write-about-faith",
  "seven-books-before-twenty-why-i-couldnt-stop",
  "on-love-that-doesnt-perform",
  "the-lie-i-was-told-about-discipline",
];

for (const book of books) {
  routes.push({
    loc: `/books/${book.id}`,
    changefreq: "monthly",
    priority: book.featured ? "0.85" : "0.8",
  });
}

for (const slug of blogSlugs) {
  routes.push({
    loc: `/blog/${slug}`,
    changefreq: "weekly",
    priority: "0.8",
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ loc, changefreq, priority }) => `  <url>
    <loc>https://kiminouknox.com${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(sitemapPath, xml, "utf8");
