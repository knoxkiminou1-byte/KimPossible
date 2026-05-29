type BookLinkMap = Record<string, string | null | undefined>;

type BookSeo = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  isbn?: string;
  datePublished: string;
  cover: string;
  description: string;
  buyLinks: BookLinkMap;
};

type ProofLink = {
  name: string;
  source: string;
  url: string;
  category: string;
  description: string;
};

type SeoData = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  ogType: string;
  graph: Array<Record<string, unknown>>;
};

const SITE_URL = "https://www.kiminouknox.com";
const LASTMOD = "2026-05-29";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const sameAsLinks = [
  "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2",
  "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
  "https://prephoops.com/player/kiminou-knox/",
  "https://www.goodreads.com/author/show/55621683.Kiminou_Knox",
  "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
  "https://www.instagram.com/kiminouknox",
  "https://www.linkedin.com/in/kiminou-knox-50691a394/",
  "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg",
];

export const proofLinks: ProofLink[] = [
  {
    name: "Miles Hall Foundation Youth Summit Essay Finalist",
    source: "The Miles Hall Foundation",
    url: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist",
    category: "Recognition",
    description: "Public recognition connected to youth advocacy and mental health writing.",
  },
  {
    name: "Amazon Author Store",
    source: "Amazon",
    url: "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
    category: "Books",
    description: "Author storefront listing published books by Kiminou Knox.",
  },
  {
    name: "Goodreads Author Profile",
    source: "Goodreads",
    url: "https://www.goodreads.com/author/show/55621683.Kiminou_Knox",
    category: "Books",
    description: "Reader-facing author profile and book listings, including the public Goodreads author ID.",
  },
  {
    name: "Google Play Books Listings",
    source: "Google Play Books",
    url: "https://play.google.com/store/search?q=Kiminou%20Knox&c=books",
    category: "Books",
    description: "Google book listings connected to Kiminou Knox titles.",
  },
  {
    name: "MaxPreps Basketball Profile",
    source: "MaxPreps",
    url: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2",
    category: "Athletics",
    description: "Basketball profile and stat page for Kiminou Knox.",
  },
  {
    name: "NCSA Recruiting Profile",
    source: "NCSA",
    url: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
    category: "Athletics",
    description: "Recruiting profile for basketball verification.",
  },
  {
    name: "Prep Hoops Profile",
    source: "Prep Hoops",
    url: "https://prephoops.com/player/kiminou-knox/",
    category: "Athletics",
    description: "Basketball profile on Prep Hoops.",
  },
  {
    name: "LinkedIn Profile",
    source: "LinkedIn",
    url: "https://www.linkedin.com/in/kiminou-knox-50691a394/",
    category: "Profiles",
    description: "Professional profile for Kiminou Knox.",
  },
  {
    name: "Instagram Profile",
    source: "Instagram",
    url: "https://www.instagram.com/kiminouknox",
    category: "Profiles",
    description: "Public social profile.",
  },
  {
    name: "Spotify Show",
    source: "Spotify",
    url: "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg",
    category: "Profiles",
    description: "Audio profile connected to Kiminou Knox.",
  },
];

const books: BookSeo[] = [
  {
    id: "spirit-solomon",
    title: "The Spirit of Solomon",
    subtitle: "What is Love To A Man Made To Destroy It",
    year: 2025,
    isbn: "9798316662975",
    datePublished: "2025-04-03",
    cover: "/covers/spirit-solomon.jpg",
    description:
      "A confession in verse tracing the rise and fall of a man who believed he could have it all without paying the price.",
    buyLinks: {
      amazon: "https://www.amazon.com/Spirit-Solomon-What-Love-Destroy/dp/B0F3VGQ1TK",
      googleBooks:
        "https://play.google.com/store/books/details/Kiminou_Knox_The_Spirit_of_Solomon?id=yIRsEQAAQBAJ",
      bookshop:
        "https://bookshop.org/p/books/the-spirit-of-solomon-what-is-love-to-a-man-made-to-destroy-it/6a03b29b81766c60",
    },
  },
  {
    id: "our-father",
    title: "Our Father?",
    subtitle: "A Poetic Journey Through Faith, Doubt, and Divine Silence",
    year: 2025,
    isbn: "9798316682850",
    datePublished: "2025-02-10",
    cover: "/covers/our-father.jpg",
    description:
      "A candid wrestling with prayer and presence when belief collides with unanswered questions.",
    buyLinks: {
      amazon: "https://www.amazon.com/Our-Father-Where-Are-You/dp/B0FH2TPMT4",
      amazonUK:
        "https://www.amazon.co.uk/Our-Father-Poetic-Journey-Silence/dp/B0FH2TPMT4",
      googleBooks:
        "https://play.google.com/store/books/details/Kiminou_Knox_Our_Father?id=PbFNEQAAQBAJ",
      waterstones:
        "https://www.waterstones.com/book/our-father/kiminou-knox/9798316682850",
      hatchards: "https://www.hatchards.co.uk/book/our-father/kiminou-knox/9798316682850",
    },
  },
  {
    id: "poems-black-boy",
    title: "Poems from a Black Boy",
    subtitle: "Identity, Heritage, and Hope",
    year: 2025,
    datePublished: "2025-09",
    cover: "/covers/poems-black-boy.jpg",
    description:
      "Raw, unfiltered verse on belonging, history, and the beauty found in surviving and becoming.",
    buyLinks: {
      amazon: "https://www.amazon.com/Poems-Black-Boy-Kiminou-Knox/dp/B0FK8WPQR2",
      googleBooks:
        "https://play.google.com/store/books/details/Kiminou_Knox_Poems_From_A_Black_Boy?id=0HuKEQAAQBAJ",
      goodreads: "https://www.goodreads.com/book/show/210495467-poems-from-a-black-boy",
    },
  },
  {
    id: "black-boy-poems",
    title: "Black Boy Poems",
    subtitle: "Identity, Silence, Trauma, and Redemption",
    year: 2025,
    isbn: "9798267606912",
    datePublished: "2025-09-29",
    cover: "/og-image.png",
    description:
      "A poetry collection on identity, silence, trauma, healing, faith, and the fullness of Black boyhood.",
    buyLinks: {
      bookshop:
        "https://bookshop.org/p/books/black-boy-poems-kiminou-knox/aaa3d62740820b18?ean=9798267606912",
      goodreads: "https://www.goodreads.com/book/show/242205179-black-boy-poems",
      booksAMillion:
        "https://www.booksamillion.com/p/Black-Boy-Poems/Kiminou-Knox/9798267606912",
      hatchards:
        "https://www.hatchards.co.uk/book/black-boy-poems/kiminou-knox/9798267606912",
    },
  },
  {
    id: "hopeless-romantic",
    title: "Hopeless Romantic",
    subtitle: "Love, Loss, and Everything Between",
    year: 2025,
    isbn: "9798291608128",
    datePublished: "2025-03-05",
    cover: "/covers/hopeless-romantic.jpg",
    description:
      "An intimate, emotionally charged collection on longing, closure, and the courage to stay tender.",
    buyLinks: {
      amazon: "https://www.amazon.com/Hopeless-Romantic-Kiminou-Knox/dp/B0FH32385N",
      amazonUK: "https://www.amazon.co.uk/Hopeless-Romantic-Kiminou-Knox/dp/B0FH32385N",
      googleBooks:
        "https://play.google.com/store/books/details/Kiminou_Knox_Hopeless_Romantic?id=AdZrEQAAQBAJ",
      waterstones:
        "https://www.waterstones.com/book/hopeless-romantic/kiminou-knox/9798291608128",
      hatchards:
        "https://www.hatchards.co.uk/book/hopeless-romantic/kiminou-knox/9798291608128",
    },
  },
  {
    id: "boys-raised-in-silence",
    title: "Boys Raised in Silence",
    subtitle: "Breaking the Quiet, Finding Voice",
    year: 2024,
    isbn: "9798316735821",
    datePublished: "2024-06-15",
    cover: "/covers/boys-raised-silence.jpg",
    description:
      "Poems about silence, pressure, and the work of learning how to speak honestly as a young Black man.",
    buyLinks: {
      amazon: "https://www.amazon.com/Boys-Raised-Silence-Kiminou-Knox/dp/B0FK95TQRM",
      googleBooks:
        "https://play.google.com/store/books/details/Kiminou_Knox_Boys_Raised_in_Silence?id=RxZNEQAAQBAJ",
      waterstones:
        "https://www.waterstones.com/book/boys-raised-in-silence/kiminou-knox/9798316735821",
    },
  },
  {
    id: "adventures-kiminou-chua",
    title: "The Adventures of Kiminou the Great and Chua the Wise",
    subtitle: "A Journey of Friendship and Discovery",
    year: 2025,
    isbn: "9798316591204",
    datePublished: "2025-01-20",
    cover: "/covers/adventures-chua-kiminou.jpg",
    description:
      "A children's story about two friends learning how courage and wisdom can work together.",
    buyLinks: {
      amazon: "https://www.amazon.com/Adventures-Kiminou-Great-Chua-Wise/dp/B0FH38DNQ5",
      googleBooks:
        "https://play.google.com/store/books/details/Kiminou_Knox_The_Adventures_of_Kiminou_the_Great_a?id=CHyKEQAAQBAJ",
    },
  },
];

const basePages = [
  { path: "/", title: "Home", priority: "1.0", changefreq: "weekly" },
  { path: "/about", title: "About", priority: "0.9", changefreq: "monthly" },
  { path: "/author", title: "Author Bio", priority: "0.9", changefreq: "monthly" },
  { path: "/books", title: "Books", priority: "0.9", changefreq: "monthly" },
  { path: "/sports", title: "Basketball", priority: "0.8", changefreq: "monthly" },
  { path: "/speaking", title: "Speaking", priority: "0.8", changefreq: "monthly" },
  { path: "/press", title: "Verification and Press", priority: "0.8", changefreq: "monthly" },
  { path: "/portfolio", title: "Portfolio", priority: "0.7", changefreq: "monthly" },
  { path: "/works", title: "Works", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", title: "Blog", priority: "0.7", changefreq: "weekly" },
  { path: "/contact", title: "Contact", priority: "0.7", changefreq: "monthly" },
];

function absoluteUrl(pathname = "/") {
  return `${SITE_URL}${pathname}`;
}

function absoluteAsset(pathname: string) {
  return pathname.startsWith("http") ? pathname : `${SITE_URL}${pathname}`;
}

function normalizePath(rawUrl: string) {
  const pathname = new URL(rawUrl || "/", SITE_URL).pathname;
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeScript(value: string) {
  return value.replace(/</g, "\\u003c");
}

function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Kiminou Knox",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/author-kiminou.jpg`,
    jobTitle: ["Author", "Poet", "Athlete", "Speaker", "Program Builder"],
    description:
      "Kiminou Knox is a Bay Area author, poet, athlete, speaker, and program builder working across books, poetry, basketball, speaking, and youth-facing projects.",
    homeLocation: {
      "@type": "Place",
      name: "Oakland and East Palo Alto Bay Area",
    },
    nationality: "American",
    knowsAbout: [
      "Books",
      "Poetry",
      "Basketball",
      "Creative Writing",
      "Bay Area Literature",
      "Youth Leadership",
      "Community Programs",
    ],
    sameAs: sameAsLinks,
  };
}

function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Kiminou Knox",
    alternateName: "Kiminou Knox Official",
    url: `${SITE_URL}/`,
    publisher: {
      "@id": PERSON_ID,
    },
    inLanguage: "en-US",
  };
}

function webPageSchema(pathname: string, title: string, description: string, type = "WebPage") {
  const canonical = absoluteUrl(pathname);
  return {
    "@type": type,
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": PERSON_ID,
    },
    inLanguage: "en-US",
  };
}

function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function bookSchema(book: BookSeo) {
  const bookUrl = absoluteUrl(`/books/${book.id}`);
  const retailerUrls = Object.values(book.buyLinks).filter(Boolean) as string[];

  return {
    "@type": "Book",
    "@id": `${bookUrl}#book`,
    name: book.title,
    alternateName: book.subtitle,
    description: book.description,
    image: absoluteAsset(book.cover),
    url: bookUrl,
    author: {
      "@id": PERSON_ID,
    },
    publisher: {
      "@id": PERSON_ID,
    },
    datePublished: book.datePublished,
    copyrightYear: book.year,
    inLanguage: "en-US",
    ...(book.isbn ? { isbn: book.isbn } : {}),
    sameAs: retailerUrls,
    workExample: Object.entries(book.buyLinks)
      .filter(([, url]) => Boolean(url))
      .map(([key, url]) => ({
        "@type": "Book",
        bookFormat: key === "googleBooks" ? "https://schema.org/EBook" : "https://schema.org/Paperback",
        url,
      })),
  };
}

function bookListSchema() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/books#book-list`,
    name: "Books by Kiminou Knox",
    itemListElement: books.map((book, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/books/${book.id}`),
      item: {
        "@id": `${absoluteUrl(`/books/${book.id}`)}#book`,
      },
    })),
  };
}

function proofListSchema() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/press#verification-list`,
    name: "Public verification links for Kiminou Knox",
    itemListElement: proofLinks.map((link, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        name: link.name,
        url: link.url,
        publisher: {
          "@type": "Organization",
          name: link.source,
        },
        about: link.description,
      },
    })),
  };
}

function routeMeta(pathname: string) {
  const routeData: Record<string, { title: string; description: string; type?: string }> = {
    "/": {
      title: "Kiminou Knox | Author, Athlete & Program Builder",
      description:
        "Official home of Kiminou Knox: Bay Area author, poet, athlete, speaker, and program builder working across books, basketball, speaking, and community projects.",
      type: "ProfilePage",
    },
    "/about": {
      title: "About Kiminou Knox | Author, Athlete & Program Builder",
      description:
        "Learn about Kiminou Knox, a Bay Area author, poet, basketball player, speaker, and program builder.",
      type: "ProfilePage",
    },
    "/author": {
      title: "Author Bio | Kiminou Knox",
      description:
        "Official author biography for Kiminou Knox, including books, poetry, basketball, speaking, and public profiles.",
      type: "ProfilePage",
    },
    "/books": {
      title: "Books by Kiminou Knox | Poetry, Faith & Youth Stories",
      description:
        "Explore books by Kiminou Knox, including poetry collections, faith-centered writing, and youth stories available through major book retailers.",
      type: "CollectionPage",
    },
    "/sports": {
      title: "Basketball | Kiminou Knox",
      description:
        "Basketball background, recruiting profiles, and athletic information for Kiminou Knox.",
    },
    "/speaking": {
      title: "Speaking | Kiminou Knox",
      description:
        "Speaking topics and booking information for Kiminou Knox across youth leadership, writing, sports, and community work.",
    },
    "/press": {
      title: "Verification & Press | Kiminou Knox",
      description:
        "Public links, book listings, athletics profiles, and recognition sources that help verify Kiminou Knox online.",
      type: "CollectionPage",
    },
    "/portfolio": {
      title: "Portfolio | Kiminou Knox",
      description:
        "Selected projects, books, basketball work, and creative portfolio pieces from Kiminou Knox.",
      type: "CollectionPage",
    },
    "/works": {
      title: "Works | Kiminou Knox",
      description:
        "Creative works and published writing from Kiminou Knox, including poetry and youth-centered stories.",
      type: "CollectionPage",
    },
    "/blog": {
      title: "Blog | Kiminou Knox",
      description:
        "Writing, updates, and reflections from Kiminou Knox on books, basketball, faith, leadership, and community.",
      type: "Blog",
    },
    "/contact": {
      title: "Contact | Kiminou Knox",
      description:
        "Contact Kiminou Knox for speaking, media, book, basketball, and community project inquiries.",
      type: "ContactPage",
    },
  };

  return routeData[pathname];
}

function buildGraph(pathname: string, title: string, description: string, pageType?: string) {
  const graph: Array<Record<string, unknown>> = [
    personSchema(),
    webSiteSchema(),
    webPageSchema(pathname, title, description, pageType),
  ];

  if (pathname !== "/") {
    const match = basePages.find((page) => page.path === pathname);
    graph.push(
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: match?.title ?? title.replace(" | Kiminou Knox", ""), path: pathname },
      ]),
    );
  }

  if (pathname === "/books") {
    graph.push(bookListSchema(), ...books.map(bookSchema));
  }

  if (pathname === "/press") {
    graph.push(proofListSchema());
  }

  return graph;
}

export function getSeoData(rawUrl: string): SeoData {
  let pathname = normalizePath(rawUrl);

  if (pathname === "/home") {
    pathname = "/";
  }

  if (pathname === "/basketball") {
    pathname = "/sports";
  }

  if (pathname === "/press-kit" || pathname === "/presskit") {
    pathname = "/contact";
  }

  const book = books.find((item) => pathname === `/books/${item.id}`);
  if (book) {
    const title = `${book.title} | Kiminou Knox`;
    const description = `${book.description} ${book.subtitle}.`;
    return {
      title,
      description,
      canonical: absoluteUrl(`/books/${book.id}`),
      image: absoluteAsset(book.cover),
      ogType: "book",
      graph: [
        personSchema(),
        webSiteSchema(),
        webPageSchema(`/books/${book.id}`, title, description, "ItemPage"),
        bookSchema(book),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Books", path: "/books" },
          { name: book.title, path: `/books/${book.id}` },
        ]),
      ],
    };
  }

  if (pathname.startsWith("/blog/")) {
    const title = "Blog | Kiminou Knox";
    const description =
      "Writing and updates from Kiminou Knox on books, basketball, faith, leadership, and community.";
    return {
      title,
      description,
      canonical: absoluteUrl(pathname),
      image: DEFAULT_IMAGE,
      ogType: "article",
      graph: [
        personSchema(),
        webSiteSchema(),
        webPageSchema(pathname, title, description, "BlogPosting"),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      ],
    };
  }

  const meta = routeMeta(pathname) ?? routeMeta("/")!;

  return {
    title: meta.title,
    description: meta.description,
    canonical: absoluteUrl(pathname === "/" ? "/" : pathname),
    image: DEFAULT_IMAGE,
    ogType: meta.type === "ProfilePage" ? "profile" : "website",
    graph: buildGraph(pathname, meta.title, meta.description, meta.type),
  };
}

function upsertHeadTag(html: string, matcher: RegExp, tag: string) {
  if (matcher.test(html)) {
    return html.replace(matcher, tag);
  }
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

export function injectSeo(html: string, rawUrl: string) {
  const seo = getSeoData(rawUrl);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": seo.graph,
  });

  let output = html.replace(
    /<script type="application\/ld\+json" data-server-seo="true">[\s\S]*?<\/script>\s*/g,
    "",
  );

  output = upsertHeadTag(
    output,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeAttribute(seo.title)}</title>`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeAttribute(seo.description)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+name=["']robots["'][^>]*>/i,
    `<meta name="robots" content="index, follow, max-image-preview:large">`,
  );
  output = upsertHeadTag(
    output,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeAttribute(seo.canonical)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+property=["']og:type["'][^>]*>/i,
    `<meta property="og:type" content="${escapeAttribute(seo.ogType)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${escapeAttribute(seo.canonical)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeAttribute(seo.title)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+property=["']og:site_name["'][^>]*>/i,
    `<meta property="og:site_name" content="Kiminou Knox">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeAttribute(seo.description)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${escapeAttribute(seo.image)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+(?:name|property)=["']twitter:card["'][^>]*>/i,
    `<meta name="twitter:card" content="summary_large_image">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+(?:name|property)=["']twitter:url["'][^>]*>/i,
    `<meta name="twitter:url" content="${escapeAttribute(seo.canonical)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+(?:name|property)=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeAttribute(seo.title)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+(?:name|property)=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeAttribute(seo.description)}">`,
  );
  output = upsertHeadTag(
    output,
    /<meta\s+(?:name|property)=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${escapeAttribute(seo.image)}">`,
  );

  return output.replace(
    /<\/head>/i,
    `    <script type="application/ld+json" data-server-seo="true">${escapeScript(jsonLd)}</script>\n  </head>`,
  );
}

export function generateSitemapXml() {
  const pages = [
    ...basePages,
    ...books.map((book) => ({
      path: `/books/${book.id}`,
      title: book.title,
      priority: "0.8",
      changefreq: "monthly",
    })),
  ];

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function getStaticSeoPaths() {
  return [
    ...basePages.map((page) => page.path),
    ...books.map((book) => `/books/${book.id}`),
  ];
}

export function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export function getSeoEntityData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      webSiteSchema(),
      webPageSchema("/", "Kiminou Knox", "Official website for Kiminou Knox.", "ProfilePage"),
      bookListSchema(),
      proofListSchema(),
      ...books.map(bookSchema),
    ],
  };
}
