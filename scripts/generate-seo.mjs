import fs from "node:fs";
import path from "node:path";

await import("../.migration-backup/scripts/generate-seo.mjs");

const sitemapPath = path.join(process.cwd(), "artifacts", "kiminou", "public", "sitemap.xml");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const today = new Date().toISOString().slice(0, 10);
const preservedRoutes = [
  { loc: "/basketball", lastmod: today, changefreq: "monthly", priority: "0.8" },
  { loc: "/books/black-boy-poems", lastmod: "2025-09-28", changefreq: "monthly", priority: "0.8" },
  { loc: "/books/world-of-imagination", lastmod: "2026-01-01", changefreq: "monthly", priority: "0.8" },
];

const additions = preservedRoutes
  .filter((route) => !sitemap.includes(`<loc>https://www.kiminouknox.com${route.loc}</loc>`))
  .map(
    (route) => `  <url>
    <loc>https://www.kiminouknox.com${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n");

if (additions) {
  fs.writeFileSync(sitemapPath, sitemap.replace("\n</urlset>", `\n${additions}\n</urlset>`), "utf8");
}
