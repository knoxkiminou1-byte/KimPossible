import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://www.kiminouknox.com";
const SITE_NAME = "Kiminou Knox";
const SITE_DESCRIPTION =
  "Official website of Kiminou Knox, author of 10 original works and seven remastered editions, athlete, speaker, KimYaps podcast host, and creative voice from the Bay Area.";
const SITE_IMAGE = `${SITE_URL}/og-image.png`;
const KIMINOU_PHOTOS = {
  officialHeadshot: {
    loc: "/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg",
    title: "Kiminou Knox official author headshot",
    caption: "Official headshot of Kiminou Knox for author, press, and speaker profiles.",
  },
  outdoorPortrait: {
    loc: "/photos/kiminou-knox-08-outdoor-candid.jpg",
    title: "Kiminou Knox outdoor portrait",
    caption: "Kiminou Knox outdoor portrait for biography and author profile pages.",
  },
  basketballHuddle: {
    loc: "/photos/kiminou-knox/kiminou-knox-basketball-huddle.jpg",
    title: "Kiminou Knox basketball huddle",
    caption: "Kiminou Knox with teammates during a basketball game huddle.",
  },
  basketballJumpShot: {
    loc: "/photos/kiminou-knox/kiminou-knox-basketball-jump-shot.jpg",
    title: "Kiminou Knox basketball jump shot",
    caption: "Kiminou Knox taking a jump shot during basketball warmups.",
  },
  basketballWarmupSmile: {
    loc: "/photos/kiminou-knox/kiminou-knox-basketball-warmup-smile.jpg",
    title: "Kiminou Knox basketball warmup",
    caption: "Kiminou Knox smiling during basketball warmups.",
  },
  chessStrategy: {
    loc: "/photos/kiminou-knox/kiminou-knox-chess-strategy.jpg",
    title: "Kiminou Knox chess strategy",
    caption: "Kiminou Knox studying chess as a visual signal of strategy, focus, and discipline.",
  },
  footballMediaDay: {
    loc: "/photos/kiminou-knox/kiminou-knox-football-media-day.jpg",
    title: "Kiminou Knox football media day",
    caption: "Kiminou Knox in football uniform during a field media moment.",
  },
  footballLockerRoom: {
    loc: "/photos/kiminou-knox/kiminou-knox-ygnacio-football-locker-room.jpg",
    title: "Kiminou Knox Ygnacio football locker room",
    caption: "Kiminou Knox seated in a Ygnacio football uniform in the locker room.",
  },
};
const KIMINOU_PERSON_IMAGE = `${SITE_URL}${KIMINOU_PHOTOS.officialHeadshot.loc}`;
const MEDIUM_FEED_URL = "https://medium.com/feed/@knoxkiminou1";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "artifacts", "kiminou");
const publicRoot = path.join(siteRoot, "public");
const booksPath = path.join(publicRoot, "books.json");
const blogDataPath = path.join(siteRoot, "src", "content", "blogData.json");

const sitemapPath = path.join(publicRoot, "sitemap.xml");
const imageSitemapPath = path.join(publicRoot, "image-sitemap.xml");
const rssPath = path.join(publicRoot, "rss.xml");
const atomPath = path.join(publicRoot, "feed.xml");
const mediumCachePath = path.join(publicRoot, "medium-posts.json");
const entityProfilePath = path.join(publicRoot, "kiminou-knox-search-profile.json");
const routeManifestPath = path.join(publicRoot, "seo-routes.json");
const robotsPath = path.join(publicRoot, "robots.txt");

const now = new Date();
const today = now.toISOString().slice(0, 10);
const books = JSON.parse(fs.readFileSync(booksPath, "utf8"));
const blogData = JSON.parse(fs.readFileSync(blogDataPath, "utf8"));

const externalProfiles = [
  "https://medium.com/@knoxkiminou1",
  "https://www.goodreads.com/author/show/55621683.Kiminou_Knox",
  "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
  "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308",
  "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg",
  "https://music.amazon.com/podcasts/3db7d37c-3071-4eba-9fea-cadc50f5c543/kimyaps",
  "https://www.linkedin.com/in/kiminou-knox-50691a394/",
  "https://x.com/KnoxKiminou",
  "https://www.youtube.com/@KiminouKnoxOfficial",
  "https://about.me/kiminou",
  "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc",
  "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
  "https://prephoops.com/player/kiminou-knox/",
  "https://about.me/kiminou",
  "https://stan.store/kiminouknox",
  "https://www.wikidata.org/wiki/Q137260299",
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

function compactText(value, length = 360) {
  const text = stripHtml(Array.isArray(value) ? value.join(" ") : value);
  return text.length > length ? `${text.slice(0, length - 3).trim()}...` : text;
}

function dateOnly(value, fallback = today) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString().slice(0, 10);
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
        "user-agent": "KiminouKnoxSEOGenerator/1.0 (+https://www.kiminouknox.com)",
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

const baseRouteMeta = [
  {
    loc: "/",
    title: "Kiminou Knox | Athlete, Author, Speaker",
    description:
      "Official home of Kiminou Knox: author, athlete, speaker, and creative voice from the Bay Area. Explore books, essays, sports, and booking info.",
    image: KIMINOU_PHOTOS.officialHeadshot.loc,
    keywords: ["Kiminou Knox", "author", "athlete", "speaker", "Bay Area", "poetry"],
    sections: [
      {
        heading: "Kiminou Knox",
        text: SITE_DESCRIPTION,
      },
      {
        heading: "Featured Work",
        text: "Books, essays, basketball, speaking, and press information from the official Kiminou Knox website.",
      },
    ],
    schemaType: "WebPage",
  },
  {
    loc: "/about",
    title: "About - Kiminou Knox",
    description:
      "About Kiminou Knox, Bay Area author, athlete, speaker, and creative voice writing across faith, identity, love, and discipline.",
    image: KIMINOU_PHOTOS.outdoorPortrait.loc,
    keywords: ["Kiminou Knox biography", "Kiminou Knox about", "Bay Area author", "athlete author"],
    sections: [
      {
        heading: "About Kiminou Knox",
        text: "Kiminou Knox is an author, athlete, speaker, and creative voice from the Bay Area.",
      },
    ],
    schemaType: "AboutPage",
  },
  {
    loc: "/works",
    title: "10 Published Works by Kiminou Knox",
    description:
      "The official 10-work catalog by Kiminou Knox, including poetry, faith-centered writing, love poems, Black boyhood, family, imagination, and legacy.",
    image: "/kiminou-knox-social-share.png",
    keywords: ["Kiminou Knox books", "Kiminou Knox works", "poetry books", "Poems From A Black Boy"],
    sections: [
      {
        heading: "Works",
        text: books.map((book) => `${book.title}: ${book.description}`).join(" "),
      },
    ],
    schemaType: "CollectionPage",
  },
  {
    loc: "/author",
    title: "Kiminou Knox | Author Profile",
    description:
      "Author profile for Kiminou Knox, a young Bay Area writer with published books across poetry, faith, identity, love, and voice.",
    image: KIMINOU_PHOTOS.officialHeadshot.loc,
    keywords: ["Kiminou Knox author", "author profile", "young author", "Bay Area writer"],
    sections: [
      {
        heading: "Author Profile",
        text: "Kiminou Knox writes across poetry, faith, Black boyhood, discipline, emotional honesty, and the cost of finding a voice.",
      },
    ],
    schemaType: "ProfilePage",
  },
  {
    loc: "/books",
    title: "Published Books - Kiminou Knox",
    description:
      "Explore published books by Kiminou Knox, including The Spirit of Solomon, Our Father?, Hopeless Romantic, and Poems from a Black Boy.",
    image: "/kiminou-knox-book-universe-portal.png",
    keywords: ["Kiminou Knox books", "published books", "poetry collections", "The Spirit of Solomon"],
    sections: [
      {
        heading: "Published Books",
        text: books.map((book) => `${book.title}, ${book.subtitle}. ${book.description}`).join(" "),
      },
    ],
    schemaType: "CollectionPage",
  },
  {
    loc: "/speaking",
    title: "Speaking & KimYaps Podcast - Kiminou Knox",
    description:
      "Book Kiminou Knox for talks on discipline, Black boy voice, faith, youth leadership, writing, athletics, and creative work, or tune into KimYaps podcast episodes.",
    image: KIMINOU_PHOTOS.officialHeadshot.loc,
    keywords: ["Kiminou Knox speaker", "KimYaps podcast", "youth speaker", "athlete speaker", "author speaker"],
    sections: [
      {
        heading: "Speaking & KimYaps",
        text: "Kiminou Knox speaks on discipline, faith, youth voice, Black boyhood, creative work, and the bridge between athletics and writing. KimYaps carries that voice into honest podcast conversations about pain, purpose, faith, and grace.",
      },
    ],
    schemaType: "WebPage",
  },
  {
    loc: "/contact",
    title: "Contact - Kiminou Knox",
    description:
      "Contact Kiminou Knox for speaking, press, book, basketball, interview, school, and creative collaboration inquiries.",
    image: KIMINOU_PHOTOS.officialHeadshot.loc,
    keywords: ["contact Kiminou Knox", "book Kiminou Knox", "Kiminou Knox speaking"],
    sections: [
      {
        heading: "Contact",
        text: "Use the official contact page for speaking, press, books, basketball, school, and collaboration inquiries.",
      },
    ],
    schemaType: "ContactPage",
  },
  {
    loc: "/press",
    title: "Press & Recognition - Kiminou Knox",
    description:
      "Press, recognition, biography, official links, and media resources for Kiminou Knox.",
    image: KIMINOU_PHOTOS.officialHeadshot.loc,
    keywords: ["Kiminou Knox press", "Kiminou Knox media", "Kiminou Knox recognition"],
    sections: [
      {
        heading: "Press & Recognition",
        text: "Official press context, recognition, biography, books, athletics, and media information for Kiminou Knox.",
      },
    ],
    schemaType: "ProfilePage",
  },
  {
    loc: "/sports",
    title: "Sports & Athletics - Kiminou Knox",
    description:
      "Athletic profile for Kiminou Knox, Bay Area basketball player and multi-sport athlete with recruiting and performance links.",
    image: KIMINOU_PHOTOS.basketballJumpShot.loc,
    keywords: ["Kiminou Knox basketball", "Kiminou Knox athlete", "Bay Area basketball player"],
    sections: [
      {
        heading: "Sports & Athletics",
        text: "Kiminou Knox is a Bay Area basketball player and multi-sport athlete with public athletic profiles and recruiting context.",
      },
    ],
    schemaType: "ProfilePage",
  },
  {
    loc: "/portfolio",
    title: "Kiminou Knox | Portfolio - Author, Athlete, Builder & Entrepreneur",
    description:
      "Portfolio for Kiminou Knox across published books, athletics, speaking, youth leadership, editorial work, and creative projects.",
    image: KIMINOU_PHOTOS.outdoorPortrait.loc,
    keywords: ["Kiminou Knox portfolio", "author athlete entrepreneur", "creative portfolio"],
    sections: [
      {
        heading: "Portfolio",
        text: "A portfolio spanning books, athletics, speaking, youth leadership, editorial work, and creative direction.",
      },
    ],
    schemaType: "ProfilePage",
  },
  {
    loc: "/blog",
    title: "Author's Journal - Kiminou Knox | Essays & Writing",
    description:
      "Essays and poems by Kiminou Knox on faith, identity, love, discipline, writing, basketball, and Black boy life.",
    image: "/kiminou-knox-social-share.png",
    keywords: ["Kiminou Knox blog", "Kiminou Knox essays", "Kiminou Knox Medium", "author blog"],
    sections: [
      {
        heading: "Author's Journal",
        text: publishedPosts.map((post) => `${post.title}: ${post.excerpt}`).join(" "),
      },
    ],
    schemaType: "Blog",
  },
  {
    loc: "/reading-list",
    title: "Reading List - Kiminou Knox | Books Worth Your Time",
    description:
      "Kiminou Knox's reading list across faith, discipline, basketball, Black literature, writing craft, and creative growth.",
    image: "/kiminou-knox-social-share.png",
    keywords: ["Kiminou Knox reading list", "books worth reading", "author reading list"],
    sections: [
      {
        heading: "Reading List",
        text: "Books and influences connected to faith, discipline, basketball, Black literature, writing craft, and creative growth.",
      },
    ],
    schemaType: "CollectionPage",
  },
];

const bookRouteMeta = books.map((book) => ({
  loc: `/books/${book.id}`,
  title: `${book.title} - Kiminou Knox | Poetry Collection`,
  description: compactText(`${book.title} by Kiminou Knox. ${book.subtitle}. ${book.description}`, 300),
  image: book.cover || "/kiminou-knox-social-share.png",
  ...(book.edition ? { imageWidth: 1600, imageHeight: 2560, imageType: "image/jpeg" } : {}),
  keywords: [book.title, "Kiminou Knox book", ...(book.themes || []), "poetry collection"],
  sections: [
    {
      heading: book.title,
      text: `${book.subtitle}. ${book.description} Published ${book.year}. ISBN ${book.isbn || "available through retailers"}.`,
    },
    {
      heading: "Themes",
      text: (book.themes || []).join(", "),
    },
    ...(book.samplePoems?.length
      ? [
          {
            heading: "Sample",
            text: `${book.samplePoems[0].title}: ${compactText(book.samplePoems[0].content, 500)}`,
          },
        ]
      : []),
  ],
  schemaType: "WebPage",
  schema: {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${absoluteUrl(`/books/${book.id}`)}#book`,
    name: book.title,
    alternateName: book.subtitle,
    url: absoluteUrl(`/books/${book.id}`),
    image: absoluteUrl(book.cover || "/kiminou-knox-social-share.png"),
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@type": "Person", name: SITE_NAME },
    datePublished: book.datePublished,
    isbn: book.isbn,
    ...(book.edition ? { bookEdition: book.edition } : {}),
    ...(book.numberOfPages ? { numberOfPages: book.numberOfPages } : {}),
    description: book.description,
    genre: "Poetry",
    inLanguage: "en-US",
    sameAs: Object.values(book.buyLinks || {}).filter(Boolean),
  },
}));

const blogRouteMeta = publishedPosts.map((post) => ({
  loc: `/blog/${post.slug}`,
  title: `${post.title} - Kiminou Knox`,
  description: post.excerpt || compactText(post.content, 250),
  image: post.featuredImage || "/kiminou-knox-social-share.png",
  keywords: [post.title, "Kiminou Knox essay", ...(post.tags || [])],
  sections: [
    {
      heading: post.title,
      text: post.excerpt || compactText(post.content, 360),
    },
    {
      heading: "Essay",
      text: compactText(post.content, 1800),
    },
  ],
  schemaType: "WebPage",
  schema: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#blogposting`,
    headline: post.title,
    description: post.excerpt || compactText(post.content, 250),
    url: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(post.featuredImage || "/kiminou-knox-social-share.png"),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    inLanguage: "en-US",
    keywords: post.tags || [],
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
  },
}));

const routeManifestRoutes = [...baseRouteMeta, ...bookRouteMeta, ...blogRouteMeta].map((route) => {
  const matchedSitemap = routes.find((entry) => entry.loc === route.loc);
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": route.schemaType || "WebPage",
    "@id": `${absoluteUrl(route.loc)}#webpage`,
    url: absoluteUrl(route.loc),
    name: route.title,
    description: route.description,
    image: absoluteUrl(route.image || "/og-image.png"),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
    dateModified: matchedSitemap?.lastmod || today,
  };

  return {
    ...route,
    url: absoluteUrl(route.loc),
    lastmod: matchedSitemap?.lastmod || today,
    image: absoluteUrl(route.image || "/og-image.png"),
    schemas: [webpageSchema, ...(route.schema ? [route.schema] : [])],
  };
});

const imageEntries = [
  {
    loc: "/",
    images: [
      {
        loc: "/og-image.png",
        title: "Kiminou Knox official website image",
        caption: "Kiminou Knox author, athlete, and speaker official website preview.",
      },
      {
        ...KIMINOU_PHOTOS.officialHeadshot,
      },
      {
        ...KIMINOU_PHOTOS.outdoorPortrait,
      },
    ],
  },
  {
    loc: "/about",
    images: [
      {
        ...KIMINOU_PHOTOS.outdoorPortrait,
      },
      {
        ...KIMINOU_PHOTOS.officialHeadshot,
      },
    ],
  },
  {
    loc: "/author",
    images: [
      {
        ...KIMINOU_PHOTOS.officialHeadshot,
      },
      {
        ...KIMINOU_PHOTOS.outdoorPortrait,
      },
      {
        ...KIMINOU_PHOTOS.chessStrategy,
      },
    ],
  },
  {
    loc: "/press",
    images: [
      {
        ...KIMINOU_PHOTOS.officialHeadshot,
      },
      {
        ...KIMINOU_PHOTOS.footballMediaDay,
      },
      {
        ...KIMINOU_PHOTOS.chessStrategy,
      },
    ],
  },
  {
    loc: "/sports",
    images: [
      {
        ...KIMINOU_PHOTOS.basketballJumpShot,
      },
      {
        ...KIMINOU_PHOTOS.basketballWarmupSmile,
      },
      {
        ...KIMINOU_PHOTOS.basketballHuddle,
      },
      {
        ...KIMINOU_PHOTOS.footballLockerRoom,
      },
      {
        ...KIMINOU_PHOTOS.footballMediaDay,
      },
    ],
  },
  {
    loc: "/portfolio",
    images: [
      {
        ...KIMINOU_PHOTOS.outdoorPortrait,
      },
      {
        ...KIMINOU_PHOTOS.officialHeadshot,
      },
      {
        ...KIMINOU_PHOTOS.basketballJumpShot,
      },
      {
        ...KIMINOU_PHOTOS.chessStrategy,
      },
    ],
  },
  ...books.map((book) => ({
    loc: `/books/${book.id}`,
    images: [
      {
        loc: book.cover,
        title: `${book.title} by Kiminou Knox`,
        caption: `${book.title} book cover by Kiminou Knox.`,
      },
    ].filter((image) => image.loc),
  })),
];

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

const imageSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries
  .filter((entry) => entry.images.length > 0)
  .map(
    (entry) => `  <url>
    <loc>${xmlEscape(absoluteUrl(entry.loc))}</loc>
${entry.images
  .map(
    (image) => `    <image:image>
      <image:loc>${xmlEscape(absoluteUrl(image.loc))}</image:loc>
      <image:title>${xmlEscape(image.title)}</image:title>
      <image:caption>${xmlEscape(image.caption)}</image:caption>
    </image:image>`,
  )
  .join("\n")}
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /splash

User-agent: Googlebot
Allow: /
Disallow: /admin/

User-agent: Googlebot-Image
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/image-sitemap.xml
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
    image: KIMINOU_PERSON_IMAGE,
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
fs.writeFileSync(imageSitemapPath, imageSitemapXml, "utf8");
fs.writeFileSync(rssPath, rssXml, "utf8");
fs.writeFileSync(atomPath, atomXml, "utf8");
fs.writeFileSync(mediumCachePath, `${JSON.stringify(mediumJson, null, 2)}\n`, "utf8");
fs.writeFileSync(entityProfilePath, `${JSON.stringify(entityProfile, null, 2)}\n`, "utf8");
fs.writeFileSync(
  routeManifestPath,
  `${JSON.stringify(
    {
      generatedAt: now.toISOString(),
      site: {
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        image: SITE_IMAGE,
        personImage: KIMINOU_PERSON_IMAGE,
        sameAs: externalProfiles,
      },
      routes: routeManifestRoutes,
    },
    null,
    2,
  )}\n`,
  "utf8",
);
fs.writeFileSync(robotsPath, robotsTxt, "utf8");
