export const canonicalDomain = "https://www.kiminouknox.com";
export const personId = `${canonicalDomain}/#person`;

export type PublicProfile = {
  label: string;
  url: string;
  source: string;
  category: "official" | "writing" | "books" | "podcast" | "social" | "athletics" | "store";
  description: string;
};

export type EntityBook = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  datePublished: string;
  format: "Ebook" | "Paperback";
  price?: string;
  authors: string[];
  cover?: string | null;
  themes: string[];
  description: string;
  samplePoems: Array<{ title: string; content: string }>;
  buyLinks: Record<string, string | null | undefined>;
  featured?: boolean;
};

export type EditorialCredit = {
  id: string;
  title: string;
  role: string;
  datePublished: string;
  format: "Ebook" | "Paperback";
  price: string;
  creators: string[];
  description: string;
  publicUrl?: string;
};

export const kiminouEntity = {
  canonicalDomain,
  personId,
  name: "Kiminou Knox",
  alternateName: "Kiminou",
  image: `${canonicalDomain}/author-kiminou.jpg`,
  shortBio:
    "Kiminou Knox is a Bay Area writer, athlete, program builder, author, chief editor, podcast host, and creator from the Oakland / East Palo Alto community, building across books, essays, KimYaps, AAFC, web design, athletics, and youth-centered storytelling.",
  expandedBio:
    "Kiminou Knox is a Bay Area writer, athlete, program builder, author, chief editor, podcast host, and creator. He is the author of 10 published works, with public work spanning books, chief-editor credits on client projects, KimYaps, Medium essays, AAFC / Artists and Athletes for Change program work, AAFC Builders, web design, athletics, youth-centered storytelling, and community-facing creative work.",
  roles: ["Writer", "Athlete", "Program Builder", "Author", "Chief Editor", "Podcast Host", "Creator"],
  homeLocation: "Oakland / East Palo Alto community",
  knowsAbout: [
    "Books",
    "Poetry",
    "Medium essays",
    "KimYaps",
    "Podcasting",
    "AAFC (Artists and Athletes for Change)",
    "AAFC Builders",
    "Web design",
    "Youth-centered storytelling",
    "Athletics",
    "Editorial development",
  ],
  publicProfiles: [
    {
      label: "Official Website",
      url: "https://www.kiminouknox.com/",
      source: "KiminouKnox.com",
      category: "official",
      description: "Official website and public entity home for Kiminou Knox.",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/kiminou-knox-50691a394",
      source: "LinkedIn",
      category: "official",
      description: "Professional profile for Kiminou Knox.",
    },
    {
      label: "Medium",
      url: "https://medium.com/@knoxkiminou1/about",
      source: "Medium",
      category: "writing",
      description: "Medium author profile for essays and public writing.",
    },
    {
      label: "Goodreads",
      url: "https://www.goodreads.com/author/show/55621683.Kiminou_Knox",
      source: "Goodreads",
      category: "books",
      description: "Goodreads author profile and book records.",
    },
    {
      label: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308",
      source: "Apple Podcasts",
      category: "podcast",
      description: "KimYaps podcast profile on Apple Podcasts.",
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com/@KiminouKnoxOfficial",
      source: "YouTube",
      category: "social",
      description: "Official YouTube channel for Kiminou Knox.",
    },
    {
      label: "About.me",
      url: "https://about.me/kiminou",
      source: "About.me",
      category: "official",
      description: "Public profile page for Kiminou Knox.",
    },
    {
      label: "Stan Store",
      url: "https://stan.store/kiminou",
      source: "Stan Store",
      category: "store",
      description: "Public creator storefront for Kiminou Knox.",
    },
    {
      label: "Wikidata",
      url: "https://www.wikidata.org/wiki/Q137260299",
      source: "Wikidata",
      category: "official",
      description: "Wikidata entity record for Kiminou Knox.",
    },
    {
      label: "Spotify Show",
      url: "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg",
      source: "Spotify",
      category: "podcast",
      description: "Spotify show link currently present in the repository.",
    },
    {
      label: "NCSA Recruiting Profile",
      url: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
      source: "NCSA",
      category: "athletics",
      description: "Public recruiting profile used for athlete verification.",
    },
    {
      label: "Prep Hoops Profile",
      url: "https://prephoops.com/player/kiminou-knox/",
      source: "Prep Hoops",
      category: "athletics",
      description: "Public basketball profile used for athlete verification.",
    },
    {
      label: "MaxPreps Basketball Profile",
      url: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2",
      source: "MaxPreps",
      category: "athletics",
      description: "Public athletic profile used for verification.",
    },
  ] satisfies PublicProfile[],
  podcastProfiles: {
    apple: "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308",
    spotify: "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg",
    rss: "",
    youtube: "https://www.youtube.com/@KiminouKnoxOfficial",
  },
  recognitionItems: [
    {
      title: "Miles Hall Foundation Youth Summit Essay Finalist",
      source: "The Miles Hall Foundation",
      date: "2025-05-05",
      url: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist",
      description: "Public recognition connected to youth advocacy and mental health writing.",
    },
  ],
  authoredBooks: [] as EntityBook[],
  editorialCredits: [] as EditorialCredit[],
  buildPortfolio: [
    ["Kiminou Knox Website", "Personal brand", "Official entity website and public portfolio system.", "live/public"],
    ["AAFC Builders", "Web design", "Websites, landing pages, and digital infrastructure.", "project note"],
    ["Ricardo Scales Piano", "Music services", "Piano and music-service web presence.", "project note"],
    ["DGRP Baysound", "Music / production", "Digital presence for a Bay Area sound project.", "project note"],
    ["Marchitects", "Architecture / design", "Landing page and brand system concept.", "project note"],
    ["SL Montgomery Law", "Legal services", "Law-firm landing page and service positioning.", "project note"],
    ["Muisi / Kongo Malonga", "Arts / culture", "Cultural and creative web presence.", "project note"],
    ["Wellness Escape", "Wellness", "Wellness concept and landing page system.", "project note"],
    ["Hair Two Red", "Beauty", "Hair and beauty campaign web concept.", "project note"],
    ["7 Day Reset", "Coaching / wellness", "Short-form challenge and funnel concept.", "project note"],
    ["Dextereous", "Service business", "Public service website project.", "project note"],
    ["Hair NQFL", "Beauty", "Hair campaign and brand page concept.", "project note"],
    ["RecipeRoulette", "Web app", "Interactive recipe discovery app concept.", "project note"],
    ["Social Following", "Creator growth", "Creator growth and audience-building concept.", "project note"],
  ].map(([name, category, description, status]) => ({
    name,
    category,
    role: "Web design and digital infrastructure",
    description,
    status,
    url: "",
    screenshot: "",
  })),
  sitemapPublicRoutes: [
    "/",
    "/about",
    "/author",
    "/books",
    "/blog",
    "/essays",
    "/kimyaps",
    "/press",
    "/portfolio",
    "/aafc-builders",
    "/editorial",
    "/sports",
    "/speaking",
    "/works",
    "/contact",
  ],
};

export const authoredBooks: EntityBook[] = [
  {
    id: "kiminous-world-of-imagination-the-basics",
    title: "Kiminou's World of Imagination: The Basics",
    subtitle: "A Children's Imagination and Creativity Book",
    year: 2026,
    datePublished: "2026-02-18",
    format: "Paperback",
    price: "$15.99",
    authors: ["Kiminou Knox"],
    cover: null,
    themes: ["Imagination", "Creativity", "Childhood"],
    description: "A children's creativity book introducing imagination, world-building, and the basics of seeing possibility through story.",
    samplePoems: [],
    buyLinks: {},
  },
  {
    id: "adventures-kiminou-chua",
    title: "The Adventures of Kiminou the Great and Chua the Wise",
    subtitle: "A Journey of Friendship and Discovery",
    year: 2025,
    datePublished: "2025-09-28",
    format: "Ebook",
    price: "$7.99",
    authors: ["Kiminou Knox", "Matsoua Malonga"],
    cover: "/covers/adventures-chua-kiminou.jpg",
    themes: ["Friendship", "Growth", "Adventure"],
    description: "A children's story about two friends learning how courage and wisdom can work together.",
    samplePoems: [],
    buyLinks: { googleBooks: "https://play.google.com/store/books/details/Kiminou_Knox_The_Adventures_of_Kiminou_the_Great_a?id=CHyKEQAAQBAJ" },
  },
  {
    id: "poems-black-boy",
    title: "Poems From A Black Boy",
    subtitle: "Identity, Heritage, and Hope",
    year: 2025,
    datePublished: "2025-09-28",
    format: "Ebook",
    price: "$7.99",
    authors: ["Kiminou Knox"],
    cover: "/covers/poems-black-boy.jpg",
    themes: ["Identity", "Heritage", "Resilience"],
    description: "Raw, unfiltered verse on belonging, history, and the beauty found in surviving and becoming.",
    samplePoems: [],
    buyLinks: { googleBooks: "https://play.google.com/store/books/details/Kiminou_Knox_Poems_From_A_Black_Boy?id=0HuKEQAAQBAJ" },
  },
  {
    id: "black-boy-poems",
    title: "Black Boy Poems",
    subtitle: "Identity, Silence, Trauma, and Redemption",
    year: 2025,
    datePublished: "2025-09-29",
    format: "Paperback",
    price: "",
    authors: ["Kiminou Knox"],
    cover: "https://images-us.bookshop.org/ingram/9798267606912.jpg?v=18c67c745ee1446209d7474a2fe9ee04",
    themes: ["Black Boyhood", "Healing", "Resilience"],
    description: "A poetry collection on identity, silence, trauma, healing, faith, and the fullness of Black boyhood.",
    samplePoems: [],
    buyLinks: {
      bookshop: "https://bookshop.org/p/books/black-boy-poems-kiminou-knox/aaa3d62740820b18?ean=9798267606912",
      goodreads: "https://www.goodreads.com/book/show/242205179-black-boy-poems",
      booksAMillion: "https://www.booksamillion.com/p/Black-Boy-Poems/Kiminou-Knox/9798267606912",
      hatchards: "https://www.hatchards.co.uk/book/black-boy-poems/kiminou-knox/9798267606912",
    },
  },
  {
    id: "boys-raised-in-silence",
    title: "Boys Raised In Silence",
    subtitle: "Breaking the Quiet, Finding Voice",
    year: 2025,
    datePublished: "2025-09-28",
    format: "Ebook",
    price: "$5.99",
    authors: ["Kiminou Knox"],
    cover: "/covers/boys-raised-silence.jpg",
    themes: ["Silence", "Masculinity", "Healing"],
    description: "Poems about silence, pressure, and the work of learning how to speak honestly as a young Black man.",
    samplePoems: [],
    buyLinks: { googleBooks: "https://play.google.com/store/books/details/Kiminou_Knox_Boys_Raised_in_Silence?id=RxZNEQAAQBAJ" },
  },
  {
    id: "spirit-solomon",
    title: "The Spirit of Solomon",
    subtitle: "What is Love To A Man Made To Destroy It",
    year: 2025,
    datePublished: "2025-07-09",
    format: "Ebook",
    price: "$7.99",
    authors: ["Kiminou Knox"],
    cover: "/covers/spirit-solomon.jpg",
    themes: ["Wisdom", "Faith", "Reckoning"],
    description: "A confession in verse tracing the rise and fall of a man who believed he could have it all without paying the price.",
    samplePoems: [],
    buyLinks: { googleBooks: "https://play.google.com/store/books/details/Kiminou_Knox_The_Spirit_of_Solomon?id=yIRsEQAAQBAJ" },
  },
  {
    id: "hopeless-romantic",
    title: "Hopeless Romantic",
    subtitle: "Love, Loss, and Everything Between",
    year: 2025,
    datePublished: "2025-07-09",
    format: "Ebook",
    price: "$7.99",
    authors: ["Kiminou Knox"],
    cover: "/covers/hopeless-romantic.jpg",
    themes: ["Love", "Heartbreak", "Healing"],
    description: "An intimate, emotionally charged collection on longing, closure, and the courage to stay tender.",
    samplePoems: [],
    buyLinks: { googleBooks: "https://play.google.com/store/books/details/Kiminou_Knox_Hopeless_Romantic?id=AdZrEQAAQBAJ" },
    featured: true,
  },
  {
    id: "our-father",
    title: "Our Father ?",
    subtitle: "A Poetic Journey Through Faith, Doubt, and Divine Silence",
    year: 2025,
    datePublished: "2025-03-10",
    format: "Ebook",
    price: "$7.99",
    authors: ["Kiminou Knox"],
    cover: "/covers/our-father.jpg",
    themes: ["Faith", "Silence", "Searching"],
    description: "A candid wrestling with prayer and presence when belief collides with unanswered questions.",
    samplePoems: [],
    buyLinks: { googleBooks: "https://play.google.com/store/books/details/Kiminou_Knox_Our_Father?id=PbFNEQAAQBAJ" },
  },
];

export const editorialCredits: EditorialCredit[] = [
  {
    id: "rhythm-and-roux",
    title: "Rhythm & Roux: Still Choosing Us: Conversations on Love, Partnership, and Choosing Each Other",
    role: "Chief Editor / client book",
    datePublished: "2026-03-14",
    format: "Ebook",
    price: "$14.99",
    creators: ["Ron Smith", "Chef Brenda", "Linea Culture"],
    description: "Client book project with editorial development, sequencing, and publishing finish support.",
  },
  {
    id: "voicing-the-lens",
    title: "Voicing The Lens: Photography by Sadiki Smith",
    role: "Chief Editor / client book",
    datePublished: "2026-02-18",
    format: "Ebook",
    price: "$12.99",
    creators: ["Sadiki Smith", "Artists and Athletes for Change", "Kiminou Knox"],
    description: "Client book project connected to photography, creator collaboration, and editorial finish.",
  },
];

kiminouEntity.authoredBooks = authoredBooks;
kiminouEntity.editorialCredits = editorialCredits;

export const sameAsLinks = kiminouEntity.publicProfiles.map((profile) => profile.url);
