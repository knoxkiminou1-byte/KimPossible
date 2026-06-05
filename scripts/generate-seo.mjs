import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://kiminouknox.com";
const SITE_NAME = "Kiminou Knox";
const SITE_DESCRIPTION =
  "Official website of Kiminou Knox, an athlete, author, speaker, and creative voice from the Bay Area.";
const SITE_IMAGE = `${SITE_URL}/og-image.png`;
const MEDIUM_FEED_URL = "https://medium.com/feed/@knoxkiminou1";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "artifacts", "kiminou");
const publicRoot = path.join(siteRoot, "public");
const booksPath = path.join(publicRoot, "books.json");
const blogDataPath = path.join(siteRoot, "src", "content", "blogData.json");

const sitemapPath = path.join(publicRoot, "sitemap.xml");
const rssPath = path.join(publicRoot, "rss.xml");
const atomPath = path.join(publicRoot, "feed.xml");
const mediumCachePath = path.join(publicRoot, "medium-posts.json");
const entityProfilePath = path.join(publicRoot, "kiminou-knox-search-profile.json");

const now = new Date();
const today = now.toISOString().slice(0, 10);
const books = JSON.parse(fs.readFileSync(booksPath, "utf8"));
const blogData = JSON.parse(fs.readFileSync(blogDataPath, "utf8"));

const externalProfiles = [
  "https://medium.com/@knoxkiminou1",
  "https://www.goodreads.com/author/show/55621683.Kiminou_Knox",
  "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
  "https://podcasts.apple.com/si/podcast/kimyaps/id1850364308",
  "https://www.linkedin.com/in/kiminou-knox-50691a394/",
  "https://x.com/KnoxKiminou",
  "https://x.com/KiminouKnox",
  "https://www.instagram.com/hofkiminou",
  "https://www.youtube.com/@KiminouKnoxVevo",
  "https://about.me/kiminou",
  "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc",
  "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
  "https://prephoops.com/player/kiminou-knox/",
];

const discoveredMediumPosts = [
  {
    title: "It\u2019s Always the Same Writing in a Different Font",
    link: "https://medium.com/@knoxkiminou1/i-look-at-history-and-see-the-pattern-in-the-ink-i-watch-the-way-they-manufacture-how-the-people-bf880a960919",
    guid: "https://medium.com/p/bf880a960919",
    pubDate: "Sun, 11 Jan 2026 00:00:00 GMT",
    updatedAt: "2026-01-11T00:00:00.000Z",
    author: SITE_NAME,
    categories: ["history", "poetry", "poems-on-medium", "kiminou-knox"],
    thumbnail: SITE_IMAGE,
    excerpt:
      "A political and spiritual poem tracing systems of control through history, media, religion, algorithms, housing, and private prisons.",
    source: "public-search",
  },
  {
    title: "Why I Yearn for Love",
    link: "https://medium.com/@knoxkiminou1/why-i-yearn-for-love-efaf7c2129fa",
    guid: "https://medium.com/p/efaf7c2129fa",
    pubDate: "Fri, 09 Jan 2026 00:00:00 GMT",
    updatedAt: "2026-01-09T00:00:00.000Z",
    author: SITE_NAME,
    categories: ["love", "poetry", "poetry-on-medium", "kiminou-knox"],
    thumbnail: SITE_IMAGE,
    excerpt:
      "A poem about longing for love, fearing real intimacy, and wanting something honest enough to change a life.",
    source: "public-search",
  },
];

function absoluteUrl(route) {
  return new URL(route, SITE_URL).toString();
}

function xmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function decodeEntities(value) {
  return String(value ?? "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)))
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ");
}

function stripHtml(value) {
  return decodeEntities(String(value ?? "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(value, length = 220) {
  const text = stripHtml(value);
  return text.length > length ? `${text.slice(0, length - 3).trim()}...` : text;
}

function tagValue(xml, tagName) {
  const match = xml.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  if (!match) return "";
  const raw = match[1].trim();
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return decodeEntities(cdata ? cdata[1] : raw);
}

function tagValues(xml, tagName) {
  return [...xml.matchAll(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "gi"))].map(
    (match) => {
      const raw = match[1].trim();
      const cdata = raw.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
      return decodeEntities(cdata ? cdata[1] : raw);
    },
  );
}

function firstContentImage(html) {
  for (const match of html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)) {
    const src = decodeEntities(match[1]);
    if (!src.includes("medium.com/_/stat")) return src;
  }
  return "";
}

function parseMediumFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map((match) => {
      const itemXml = match[1];
      const content = tagValue(itemXml, "content:encoded");
      return {
        title: tagValue(itemXml, "title"),
        link: tagValue(itemXml, "link").replace(/\?source=.*$/, ""),
        guid: tagValue(itemXml, "guid"),
        pubDate: tagValue(itemXml, "pubDate"),
        updatedAt: tagValue(itemXml, "atom:updated"),
        author: tagValue(itemXml, "dc:creator") || SITE_NAME,
        categories: tagValues(itemXml, "category"),
        thumbnail: firstContentImage(content) || SITE_IMAGE,
        excerpt: excerpt(content),
      };
    })
    .filter((item) => item.title && item.link);
}

function mergeMediumPosts(items) {
  const byLink = new Map();
  for (const item of [...items, ...discoveredMediumPosts]) {
    byLink.set(item.link, item);
  }

  return [...byLink.values()].sort(
    (a, b) => new Date(b.pubDate || b.updatedAt || 0).getTime() - new Date(a.pubDate || a.updatedAt || 0).getTime(),
  );
}

function readMediumCache() {
  if (!fs.existsSync(mediumCachePath)) {
    return [];
  }

  try {
    const cached = JSON.parse(fs.readFileSync(mediumCachePath, "utf8"));
    return Array.isArray(cached.items) ? cached.items : [];
  } catch {
    return [];
  }
}

async function fetchMediumPosts() {
  if (process.env.MEDIUM_RSS_PATH && fs.existsSync(process.env.MEDIUM_RSS_PATH)) {
    const xml = fs.readFileSync(process.env.MEDIUM_RSS_PATH, "utf8");
    const items = parseMediumFeed(xml);
    if (items.length > 0) return mergeMediumPosts(items);
  }

  try {
    const response = await fetch(MEDIUM_FEED_URL, {
      headers: {
        "user-agent": "KiminouKnoxSEOGenerator/1.0 (+https://kiminouknox.com)",
      },
    });

    if (!response.ok) {
      throw new Error(`Medium RSS returned ${response.status}`);
    }

    const xml = await response.text();
    const items = parseMediumFeed(xml);
    if (items.length === 0) {
      throw new Error("Medium RSS returned no items");
    }

    return mergeMediumPosts(items);
  } catch (error) {
    const cached = readMediumCache();
    if (cached.length > 0) return mergeMediumPosts(cached);
    console.warn(`[seo] Medium RSS unavailable: ${error.message}`);
    return mergeMediumPosts([]);
  }
}

const publishedPosts = blogData.posts
  .filter((post) => post.isPublished)
  .sort((a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime());

const routes = [
  { loc: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { loc: "/about", changefreq: "monthly", priority: "0.9", lastmod: today },
  { loc: "/works", changefreq: "monthly", priority: "0.9", lastmod: today },
  { loc: "/author", changefreq: "monthly", priority: "0.9", lastmod: today },
  { loc: "/books", changefreq: "weekly", priority: "0.95", lastmod: today },
  { loc: "/speaking", changefreq: "monthly", priority: "0.85", lastmod: today },
  { loc: "/contact", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/press", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/sports", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/portfolio", changefreq: "monthly", priority: "0.75", lastmod: today },
  { loc: "/blog", changefreq: "weekly", priority: "0.9", lastmod: today },
  { loc: "/reading-list", changefreq: "monthly", priority: "0.75", lastmod: today },
];

for (const book of books) {
  routes.push({
    loc: `/books/${book.id}`,
    changefreq: "monthly",
    priority: book.featured ? "0.85" : "0.8",
    lastmod: book.datePublished || today,
  });
}

for (const post of publishedPosts) {
  routes.push({
    loc: `/blog/${post.slug}`,
    changefreq: "monthly",
    priority: "0.82",
    lastmod: (post.updatedAt || post.publishedAt || today).slice(0, 10),
  });
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ loc, changefreq, priority, lastmod }) => `  <url>
    <loc>${xmlEscape(absoluteUrl(loc))}</loc>
    <lastmod>${xmlEscape(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(`${SITE_NAME} Journal`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${xmlEscape("Essays by Kiminou Knox on faith, identity, love, discipline, writing, and Black boy life.")}</description>
    <language>en-us</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${publishedPosts
  .map(
    (post) => `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(absoluteUrl(`/blog/${post.slug}`))}</link>
      <guid isPermaLink="true">${xmlEscape(absoluteUrl(`/blog/${post.slug}`))}</guid>
      <description>${xmlEscape(post.excerpt || excerpt(post.content))}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${(post.tags || []).map((tag) => `<category>${xmlEscape(tag)}</category>`).join("\n      ")}
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${xmlEscape(`${SITE_NAME} Journal`)}</title>
  <id>${SITE_URL}/blog</id>
  <link href="${SITE_URL}/blog" />
  <link href="${SITE_URL}/feed.xml" rel="self" type="application/atom+xml" />
  <updated>${now.toISOString()}</updated>
  <author><name>${SITE_NAME}</name></author>
${publishedPosts
  .map(
    (post) => `  <entry>
    <title>${xmlEscape(post.title)}</title>
    <id>${xmlEscape(absoluteUrl(`/blog/${post.slug}`))}</id>
    <link href="${xmlEscape(absoluteUrl(`/blog/${post.slug}`))}" />
    <updated>${new Date(post.updatedAt || post.publishedAt).toISOString()}</updated>
    <published>${new Date(post.publishedAt).toISOString()}</published>
    <summary>${xmlEscape(post.excerpt || excerpt(post.content))}</summary>
  </entry>`,
  )
  .join("\n")}
</feed>
`;

const mediumPosts = await fetchMediumPosts();
const mediumJson = {
  source: MEDIUM_FEED_URL,
  profile: "https://medium.com/@knoxkiminou1",
  generatedAt: now.toISOString(),
  items: mediumPosts,
};

const entityProfile = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateModified: now.toISOString(),
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    alternateName: "Kiminou",
    url: SITE_URL,
    image: `${SITE_URL}/kiminou-knox-official-author-portrait.jpg`,
    description: SITE_DESCRIPTION,
    birthPlace: "Hayward, California",
    homeLocation: "Oakland, California",
    knowsAbout: [
      "Poetry",
      "Basketball",
      "Creative writing",
      "Faith",
      "Black boyhood",
      "Youth leadership",
      "Publishing",
    ],
    sameAs: externalProfiles,
  },
  officialFeeds: [`${SITE_URL}/rss.xml`, `${SITE_URL}/feed.xml`, MEDIUM_FEED_URL],
};

fs.writeFileSync(sitemapPath, sitemapXml, "utf8");
fs.writeFileSync(rssPath, rssXml, "utf8");
fs.writeFileSync(atomPath, atomXml, "utf8");
fs.writeFileSync(mediumCachePath, `${JSON.stringify(mediumJson, null, 2)}\n`, "utf8");
fs.writeFileSync(entityProfilePath, `${JSON.stringify(entityProfile, null, 2)}\n`, "utf8");
