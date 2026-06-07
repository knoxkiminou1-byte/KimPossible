export const SITE_NAME = "Kiminou Knox";
export const SITE_URL = "https://www.kiminouknox.com";
export const SITE_DESCRIPTION =
  "Official website of Kiminou Knox, an athlete, author, speaker, and creative voice from the Bay Area.";
export const SITE_IMAGE = "https://www.kiminouknox.com/og-image.png";
export const SITE_TWITTER = "@KnoxKiminou";
export const SITE_FEED = "https://www.kiminouknox.com/rss.xml";
export const SITE_MEDIUM_PROFILE = "https://medium.com/@knoxkiminou1";
export const SITE_GOODREADS_PROFILE =
  "https://www.goodreads.com/author/show/55621683.Kiminou_Knox";

export const SITE_SAME_AS = [
  SITE_MEDIUM_PROFILE,
  SITE_GOODREADS_PROFILE,
  "https://x.com/KnoxKiminou",
  "https://x.com/KiminouKnox",
  "https://www.instagram.com/kiminouknox",
  "https://www.youtube.com/@KiminouKnoxVevo",
  "https://www.linkedin.com/in/kiminou-knox-50691a394/",
  "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
  "https://podcasts.apple.com/si/podcast/kimyaps/id1850364308",
  "https://about.me/kiminou",
  "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc",
  "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
  "https://prephoops.com/player/kiminou-knox/",
];

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    alternateName: "Kiminou",
    url: SITE_URL,
    image: "https://www.kiminouknox.com/kiminou-knox-official-author-portrait.jpg",
    jobTitle: ["Athlete", "Author", "Speaker", "Entrepreneur"],
    description: SITE_DESCRIPTION,
    birthPlace: {
      "@type": "Place",
      name: "Hayward, California",
    },
    homeLocation: {
      "@type": "Place",
      name: "Oakland, California",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Ygnacio Valley High School",
    },
    knowsAbout: [
      "Poetry",
      "Basketball",
      "Creative writing",
      "Speaking",
      "Faith",
      "Black boy life",
      "Youth leadership",
      "Publishing",
      "Black boyhood",
      "Bay Area literature",
    ],
    sameAs: SITE_SAME_AS,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
